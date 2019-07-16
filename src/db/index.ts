import Config from '../config';
import * as mongoose from 'mongoose';

const startDb = () => {
  return mongoose.connect(Config.DB_URL);
};

export { startDb };
