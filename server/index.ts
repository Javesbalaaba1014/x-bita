import express, { Request, Response, RequestHandler } from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt';
import pool from './database';
import { RowDataPacket } from 'mysql2';
import { Request as ExpressRequest } from 'express';
import dotenv from 'dotenv';
import { testConnection } from './database';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Extend Express Request type
interface CustomRequest extends ExpressRequest {
  user?: {
    id: number;
    is_admin: boolean;
  };
}

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(cors({
  origin: [
    'http://localhost:3000', 
    'https://www.xbitaitrade.com',
    'https://xbit.vercel.app',
    process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null
  ].filter(Boolean) as string[],
  credentials: true
}));

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../dist')));

// Test database connection
testConnection()
  .then(connected => {
    if (!connected) {
      console.error('Unable to connect to database. Server will continue to run, but database operations will fail.');
    }
  })
  .catch(error => {
    console.error('Database connection test failed:', error);
  });

// Log all requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`, req.body);
  next();
});

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Server is running' });
});

// Auth routes
const loginHandler: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
      return;
    }

    // Check user exists and get role
    const [rows] = await pool.execute<RowDataPacket[]>(
      'SELECT *, is_admin FROM users WHERE email = ?',
      [email]
    );

    if (rows.length === 0) {
      res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
      return;
    }

    // Verify password
    const user = rows[0];
    const isValidPassword = await bcrypt.compare(password, user.password);
    
    if (!isValidPassword) {
      res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
      return;
    }

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;
    
    res.status(200).json({
      success: true,
      data: {
        ...userWithoutPassword,
        isAdmin: Boolean(user.is_admin)
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Register handler
const registerHandler: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.status(400).json({
        success: false,
        message: 'Name, email and password are required'
      });
      return;
    }

    // Check if user already exists
    const [existing] = await pool.execute<RowDataPacket[]>(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    if (existing.length > 0) {
      res.status(400).json({
        success: false,
        message: 'Email already registered'
      });
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const [result] = await pool.execute(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, hashedPassword]
    );

    res.status(201).json({
      success: true,
      message: 'Registration successful',
      data: { name, email }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Admin routes
const getUsers: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    const [users] = await pool.execute<RowDataPacket[]>(
      'SELECT id, name, email, created_at, is_admin FROM users'
    );

    res.status(200).json({
      success: true,
      data: users
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Admin middleware
const isAdmin: RequestHandler = async (req: CustomRequest, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).json({ success: false, message: 'No token provided' });
    return;
  }

  try {
    // Get user from token and check if admin
    const [users] = await pool.execute<RowDataPacket[]>(
      'SELECT is_admin FROM users WHERE id = ?',
      [req.user?.id] // You'll need to set this in auth middleware
    );

    if (!users[0]?.is_admin) {
      res.status(403).json({ success: false, message: 'Admin access required' });
      return;
    }

    next();
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

app.post('/auth/login', loginHandler);
app.post('/auth/register', registerHandler);

// Admin routes
app.get('/api/admin/users', isAdmin, getUsers);

// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Something broke!',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
});

export default app; 