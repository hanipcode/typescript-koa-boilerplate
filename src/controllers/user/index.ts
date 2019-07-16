import models from '../../models';
import {
  InsertUserRequest,
  GenericUserByIdRequest,
  ListAllUserResponse,
  GenericUserResponse,
  IUser,
} from '../../interfaces/user.interface';
import { GenericError } from '../../interfaces/genericError.intraface';

export default {
  async listAllUser(): Promise<ListAllUserResponse> {
    const users: Array<IUser> = await models.User.find({});
    return {
      status: 200,
      message: '',
      data: users,
    };
  },

  async findUser(
    request: GenericUserByIdRequest
  ): Promise<GenericUserResponse | GenericError> {
    try {
      const user = await models.User.findById(request.id);
      if (!user) {
        return {
          status: 404,
          error: true,
          message: 'User Not Found',
        };
      }

      return {
        status: 200,
        message: 'Successfully get user',
        data: user,
      };
    } catch (error) {
      return {
        status: 404,
        error: true,
        message: 'User Not Found',
        stack: error,
      };
    }
  },

  async insertUser(request: InsertUserRequest): Promise<GenericUserResponse> {
    const newUser = new models.User();
    newUser.username = request.username;
    newUser.password = request.password;

    const savedUser = await newUser.save();
    return {
      message: 'Successfully Created New User',
      status: 201,
      data: savedUser,
    };
  },

  async deleteUser(
    request: GenericUserByIdRequest
  ): Promise<GenericUserResponse> {
    const user = models.User.findOne(request.id);
    const deletedUser = await user.remove();
    return {
      status: 200,
      message: 'Successfully delete user',
      data: deletedUser,
    };
  },
};
