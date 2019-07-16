import * as Router from 'koa-router';

import userRouter from './user';

const apiRouter = new Router({ prefix: '/api' });
apiRouter.use(userRouter.routes()).use(userRouter.allowedMethods());

export default apiRouter;
