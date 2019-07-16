import * as mongoose from 'mongoose';
import { IRecorded } from '../../interfaces/recorded.interface';

const recordedModel = new mongoose.Schema(
  {
    fileName: String,
    file: {
      size: Number,
      path: String,
      name: String,
      fileType: String,
      lastModifiedDate: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Recorded = mongoose.model<IRecorded>('Recorded', recordedModel);

export default Recorded;
