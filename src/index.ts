import * as Koa from 'koa';

import * as logger from 'koa-logger';
import * as json from 'koa-json';
import * as bodyParser from 'koa-body';
import * as serve from 'koa-static';

import routes from './routes';

import { startDb } from './db';

const app = new Koa();

const SERVER_PORT = 3000;

app.use(json());
app.use(logger());
app.use(
  bodyParser({
    formidable: {
      uploadDir: `${__dirname}/../static/upload`,
      keepExtensions: true,
    },
    multipart: true,
    urlencoded: true,
    json: true,
  })
);
app.use(serve(`${__dirname}/../static`));
app.use(routes.routes()).use(routes.allowedMethods());

startDb().then(() => {
  app.listen(SERVER_PORT, () => {
    console.log('server started');
  });
});
