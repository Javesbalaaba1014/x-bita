import mysql from 'mysql2/promise';
import { dbConfig } from './config';

async function testConnection() {
  try {
    const connection = await mysql.createConnection(dbConfig);
    console.log('Successfully connected to the database!');
    await connection.end();
  } catch (error) {
    console.error('Detailed connection error:', {
      message: error.message,
      code: error.code,
      errno: error.errno,
      sqlState: error.sqlState,
      sqlMessage: error.sqlMessage
    });
  }
}

console.log('Attempting database connection with following config:', {
  host: dbConfig.host,
  user: dbConfig.user,
  port: dbConfig.port,
  database: dbConfig.database
});

testConnection(); 