import { Error } from 'mongoose';

export interface GenericError {
  status: number;
  error: boolean;
  message: string;
  stack?: Error;
}
