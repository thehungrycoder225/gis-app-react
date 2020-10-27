import express from 'express';
import cors from 'cors';
import colors from 'colors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import areaRoutes from './routes/areaRoutes.js';

dotenv.config();

const app = express();

connectDB();

app.use(cors());
app.use('/api/areas', areaRoutes);


let port = process.env.PORT;
app.listen(port || 5000, () => {
  console.log(
    `Server is running on ${process.env.NODE_ENV} on port ${port}`.yellow.bold
  );
});
