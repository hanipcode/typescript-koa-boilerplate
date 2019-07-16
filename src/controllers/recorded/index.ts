import models from '../../models';
import {
  FindAllRecordedResponse,
  IRecorded,
  GenericRecordedResponse,
  InsertRecordedRequest,
} from '../../interfaces/recorded.interface';
import { GenericError } from '../../interfaces/genericError.intraface';
import { GenericByIdRequest } from '../../interfaces/genericRequest.interface';

export default {
  async getAllRecorded(): Promise<FindAllRecordedResponse> {
    const AllRecorded: Array<IRecorded> = await models.Recorded.find({});
    return {
      data: AllRecorded,
      message: 'Succesfully load data',
      status: 200,
    };
  },
  async insertRecorded(
    request: InsertRecordedRequest
  ): Promise<GenericRecordedResponse | GenericError> {
    try {
      const newRecorded = new models.Recorded();
      newRecorded.file = request.file;
      newRecorded.fileName = request.fileName;
      console.log(newRecorded);

      const savedRecorded = await newRecorded.save();

      return {
        data: savedRecorded,
        message: 'Successfully save data',
        status: 201,
      };
    } catch (error) {
      return {
        message: 'Error when uploading file',
        stack: error,
        status: 400,
        error: true,
      };
    }
  },
  async deleteRecord(
    request: GenericByIdRequest
  ): Promise<GenericRecordedResponse | GenericError> {
    try {
      const record = await models.Recorded.findById(request.id);
      if (!record) {
        return {
          error: true,
          message: 'Record Not Found',
          status: 404,
        };
      }
      const deletedRecord = await record.remove();
      return {
        message: 'Successfully deleted record',
        status: 200,
        data: deletedRecord,
      };
    } catch (error) {
      return {
        error: true,
        status: 400,
        message: 'Error deleting record',
      };
    }
  },
  async getRecordById(
    request: GenericByIdRequest
  ): Promise<GenericRecordedResponse | GenericError> {
    try {
      const record = await models.Recorded.findById(request.id);
      if (!record) {
        return {
          error: true,
          message: 'Record Not Found',
          status: 404,
        };
      }
      return {
        message: 'Successfully get record',
        status: 200,
        data: record,
      };
    } catch (error) {
      return {
        error: true,
        status: 400,
        message: 'Error get record',
      };
    }
  },
};
