import mysql from 'mysql2/promise';
import { dbConfig } from './config';

const pool = mysql.createPool({
  ...dbConfig,
  connectionLimit: 10,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
});

export const testConnection = async () => {
  let connection;
  try {
    connection = await pool.getConnection();
    await connection.ping();
    console.log('✅ Database connected');
    return true;
  } catch (error: any) {
    console.error('❌ Database connection error:', error.message);
    return false;
  } finally {
    if (connection) connection.release();
  }
};

// Add connection testing
pool.getConnection()
  .then(connection => {
    console.log('Database connection successful');
    connection.release();
  })
  .catch(err => {
    console.error('Database connection failed:', err);
  });

// Add connection testing
pool.query('SELECT 1')
  .then(() => console.log('✅ Database connection verified'))
  .catch(err => console.error('❌ Database connection failed:', err));

export default pool; 