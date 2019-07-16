import * as Router from 'koa-router';
import userController from '../../controllers/user';
import {
  InsertUserRequest,
  GenericUserByIdRequest,
  ListAllUserResponse,
  GenericUserResponse,
} from '../../interfaces/user.interface';
import { Context } from 'koa';
import { GenericError } from '../../interfaces/genericError.intraface';

const userRouter = new Router({ prefix: '/user' });

interface CtxFindAllUser extends Context {
  body: ListAllUserResponse;
}

interface CtxGenericUser extends Context {
  body: GenericUserResponse | GenericError;
}

userRouter.get('/', async (ctx: CtxFindAllUser) => {
  const body = await userController.listAllUser();
  ctx.body = body;
  ctx.status = body.status;
});

userRouter.post('/', async (ctx: CtxGenericUser) => {
  const data = ctx.request.body as InsertUserRequest;
  const body = await userController.insertUser({
    username: data.username,
    password: data.password,
  });
  ctx.body = body;
  ctx.status = body.status;
});

userRouter.get('/:id', async (ctx: CtxGenericUser) => {
  const data = ctx.params as GenericUserByIdRequest;
  const body = await userController.findUser({
    id: data.id,
  });
  ctx.body = body;
  ctx.status = body.status;
});

userRouter.delete('/:id', async (ctx: CtxGenericUser) => {
  const data = ctx.params as GenericUserByIdRequest;
  const body = await userController.deleteUser({
    id: data.id,
  });
  ctx.status = body.status;
});

export default userRouter;
