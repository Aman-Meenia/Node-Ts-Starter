import express, { json, urlencoded } from 'express';
import cors from 'cors';
import logger from './logger/winston.js';
import connectDB from './db/connectDB.js';
import { errorHandler } from './middleware/errorMiddleware.js';
import config from './config/config.js';
import ApiError from './util/ApiError.js';

// Routes Import
import userRouter from './router/userRouter.js';

const app = express();

app.use(urlencoded({ extended: true }));
app.use(json());
app.use(cors());

// Routes
app.use('/api/user', userRouter);

// Not Found Middleware
app.use(() => {
  throw new ApiError({ statusCode: 404, message: 'Api Not Found' });
});

// Custom Error Middleware
app.use(errorHandler);
const PORT = config.PORT;

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    logger.info(`Server is running on PORT ${PORT}`);
  });
};
startServer();
