import * as Router from 'koa-router';

import userRouter from './user';
import recordedRouter from './recorded';

const apiRouter = new Router({ prefix: '/api' });
apiRouter.use(userRouter.routes()).use(userRouter.allowedMethods());
apiRouter.use(recordedRouter.routes()).use(recordedRouter.allowedMethods());

export default apiRouter;
