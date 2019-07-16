import * as Router from 'koa-router';
import userController from '../../controllers/user';
import {
  InsertUserRequest,
  GenericUserByIdRequest,
} from '../../interfaces/user.interface';

const userRouter = new Router({ prefix: '/user' });

userRouter.get('/', async ctx => {
  const body = await userController.listAllUser();
  ctx.body = body;
  ctx.status = body.status;
});

userRouter.post('/', async ctx => {
  const data = ctx.request.body as InsertUserRequest;
  const body = await userController.insertUser({
    username: data.username,
    password: data.password,
  });
  ctx.body = body;
  ctx.status = body.status;
});

userRouter.get('/:id', async ctx => {
  const data = ctx.params as GenericUserByIdRequest;
  const body = await userController.findUser({
    id: data.id,
  });
  ctx.body = body;
  ctx.status = body.status;
});

userRouter.delete('/:id', async ctx => {
  const data = ctx.params as GenericUserByIdRequest;
  const body = await userController.deleteUser({
    id: data.id,
  });
  ctx.status = body.status;
});

export default userRouter;
