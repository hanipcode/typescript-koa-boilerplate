import { Document } from 'mongoose';
import timestamp from './timestamp.interface';
import { GenericResponse } from './genericResponse.interface';

export interface InsertUserRequest {
  username: string;
  password: string;
}

export interface GenericUserByIdRequest {
  id: string;
}

export interface IUser extends Document, timestamp {
  username: string;
  password: string;
  updated_at: Date;
}

export interface GenericUserResponse extends GenericResponse {
  data: IUser;
}

export interface ListAllUserResponse extends GenericResponse {
  data: Array<IUser>;
}
