import logger from '../logger/winston.js';
import mongoose from 'mongoose';
import config from '../config/config.js';

const connectDB = async () => {
  logger.debug('Connect DB Function called successfully');
  try {
    await mongoose.connect(config.MONGO_URI);
    logger.info('Connected to DB successfully');
  } catch (err) {
    logger.error(`Failed to connect to DB ${err}`);
    process.exit(1);
  }
};

export default connectDB;
