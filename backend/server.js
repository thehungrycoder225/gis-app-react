import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

let port = process.env.PORT;
app.listen(port || 5000, () => {
  console.log(`Server is running on ${process.env.NODE_ENV} on port ${port}`);
});

app.get('/api/students', (req, res) => {
  res.json();
});

app.get('/api/students/:id', (req, res) => {
  res.json();
});
