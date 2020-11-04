import express from 'express';
import cors from 'cors';
import colors from 'colors';
import dotenv from 'dotenv';
import errorHandler from './controllers/errorController.js';
import connectDB from './config/db.js';
import areaRoutes from './routes/areaRoutes.js';
import userRoutes from './routes/userRoutes.js';
import employeeRoutes from './routes/employeeRoutes.js';
import studentRoutes from './routes/studentRoutes.js';

dotenv.config();

const app = express();

connectDB();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/areas', areaRoutes);
app.use('/api/users', userRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/students', studentRoutes);
app.get('/', (req, res) => {
  res.send('API is Running');
});

let port = process.env.PORT;
app.listen(port || 5000, () => {
  console.log(
    `Server is running on ${process.env.NODE_ENV} on port ${port}`.yellow.bold
  );

  app.all('*', (req, res, next) => {
    throw new Error(`Unable to locate ${req.originalUrl} on this server`, 404);
  });

  app.use(errorHandler);
});
