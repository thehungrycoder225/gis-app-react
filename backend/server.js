import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

dotenv.config();

const app = express();

connectDB();

let port = process.env.PORT;
app.listen(port || 5000, () => {
  console.log(
    `Server is running on ${process.env.NODE_ENV} on port ${port}`.yellow.bold
  );
});

app.get('/api/students', (req, res) => {
  res.json();
});

app.get('/api/students/:id', (req, res) => {
  res.json();
});
