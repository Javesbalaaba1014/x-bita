import express, { Request, Response, RequestHandler } from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt';
import pool from './database';
import { RowDataPacket } from 'mysql2';
import { Request as ExpressRequest } from 'express';

// Extend Express Request type
interface CustomRequest extends ExpressRequest {
  user?: {
    id: number;
    is_admin: boolean;
  };
}

const app = express();

// Basic CORS setup
app.use(cors({
  origin: process.env.NODE_ENV === 'production' ? 'https://www.xbitaitrade.com/' : 'http://localhost:3001', // Frontend URL
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Accept']
}));
app.use(express.json());

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

export default app; 