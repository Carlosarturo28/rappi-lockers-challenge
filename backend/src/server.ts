import 'reflect-metadata'; // Must be imported first for TypeORM decorators
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { AppDataSource } from './data-source';
import lockerRoutes from './routes/locker.routes';
import orderRoutes from './routes/order.routes';

dotenv.config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); // Enable CORS for all origins
app.use(express.json()); // Enable JSON body parsing

// API Routes
app.use('/api/v1/lockers', lockerRoutes);
app.use('/api/v1/orders', orderRoutes);

// Basic root endpoint
app.get('/', (req, res) => {
  res.send('Rappi Lockers Backend API is running!');
});

// Initialize database connection and start server
AppDataSource.initialize()
  .then(() => {
    console.log('Database connected!');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => console.error('Error connecting to the database:', error));
