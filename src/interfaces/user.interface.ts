import { Document, Error } from 'mongoose';

export interface InsertUserRequest {
  username: string;
  password: string;
}

export interface GenericUserByIdRequest {
  id: string;
}

export interface GenericError {
  status: number;
  error: boolean;
  message: string;
  stack?: Error;
}

export interface IUser extends Document {
  username: string;
  password: string;
  updated_at: Date;
}

export interface GenericResponse {
  status: number;
  message: string;
  data: object;
}

export interface GenericUserResponse extends GenericResponse {
  data: IUser;
}

export interface ListAllUserResponse extends GenericResponse {
  data: Array<IUser>;
}
