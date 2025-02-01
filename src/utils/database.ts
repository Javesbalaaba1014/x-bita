import mysql from 'mysql2/promise';

export const dbConfig = {
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '12137', 10),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: false
  }
};

const pool = mysql.createPool(dbConfig);

// Add this function to generate a random wallet address
export const generateWalletAddress = (): string => {
  const prefix = '0x';
  const characters = '0123456789abcdef';
  const length = 40; // Standard Ethereum address length minus '0x'
  let address = prefix;
  
  for (let i = 0; i < length; i++) {
    address += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  
  return address;
};

export const initializeDatabase = async () => {
  try {
    console.log('🔄 Initializing database...');
    const connection = await pool.getConnection();

    // Drop existing tables if needed
    await connection.execute(`DROP TABLE IF EXISTS messages`);
    await connection.execute(`DROP TABLE IF EXISTS users`);

    // Create users table with all columns
    await connection.execute(`
      CREATE TABLE users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        wallet_address VARCHAR(42) UNIQUE,
        balance DECIMAL(10,2) DEFAULT 0,
        token_balance DECIMAL(18,8) DEFAULT 0,
        is_admin BOOLEAN DEFAULT false,
        is_approved BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create admin user
    console.log('👤 Creating admin user...');
    const walletAddress = generateWalletAddress();
    
    await connection.execute(
      'INSERT INTO users (name, email, password, wallet_address, is_admin) VALUES (?, ?, ?, ?, true)',
      ['Admin', 'admin@xbit.com', 'admin123', walletAddress, true]
    );
    console.log('✅ Admin user created');

    // Create messages table
    await connection.execute(`
      CREATE TABLE messages (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT,
        message TEXT NOT NULL,
        is_bot BOOLEAN DEFAULT false,
        is_read BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
      )
    `);

    console.log('✅ Database tables initialized');
    connection.release();
    return true;
  } catch (error: any) {
    console.error('❌ Database initialization error:', error.message);
    return false;
  }
};

export const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    await connection.ping();
    connection.release();
    return true;
  } catch (error: any) {
    console.error('❌ Connection error:', error.message);
    return false;
  }
};

process.on('SIGINT', () => {
  pool.end().then(() => {
    console.log('Pool connections terminated');
    process.exit(0);
  });
});

export default pool; 