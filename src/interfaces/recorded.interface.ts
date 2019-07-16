import { Document } from 'mongoose';
import timestamp from './timestamp.interface';
import { GenericResponse } from './genericResponse.interface';

export interface IRecordedFile {
  size: number;
  path: string;
  name: string;
  fileType: string;
  lastModifiedDate?: Date;
}

export interface IRecorded extends Document, timestamp {
  fileName: String;
  file: IRecordedFile;
}

export interface InsertRecordedRequest {
  fileName: String;
  file: IRecordedFile;
}

export interface GenericRecordedResponse extends GenericResponse {
  data: IRecorded;
}

export interface FindAllRecordedResponse extends GenericResponse {
  data: Array<IRecorded>;
}
