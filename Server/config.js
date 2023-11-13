import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT || '3000';
export const DB_HOST = process.env.DB_HOST || 'localhost';
export const DB_USER = process.env.DB_USER || 'root';
export const DB_PASSWORD = process.env.DB_PASSWORD || 'root123';
export const DB_NAME = process.env.DB_NAME || 'employeems';
export const DB_PORT_NUMBER = process.env.DB_PORT_NUMBER || '3306';
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'your_default_secret_key';
export const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:5173';

