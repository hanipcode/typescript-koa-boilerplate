import * as Router from 'koa-router';
import { Context } from 'koa';
import {
  GenericRecordedResponse,
  FindAllRecordedResponse,
} from '../../interfaces/recorded.interface';
import { GenericError } from '../../interfaces/genericError.intraface';
import recordedController from '../../controllers/recorded';
import { GenericByIdRequest } from '../../interfaces/genericRequest.interface';

const recordedRouter = new Router({ prefix: '/recorded' });

interface RecordedAllCtx extends Context {
  body: FindAllRecordedResponse | GenericError;
}

interface GenericRecordCtx extends Context {
  body: GenericRecordedResponse | GenericError;
}

recordedRouter.post('/', async (ctx: GenericRecordCtx) => {
  try {
    const fileKeys = Object.keys(ctx.request.files || []);
    if (fileKeys.length === 0 || !ctx.request.files) {
      ctx.body = {
        error: true,
        status: 400,
        message: 'file cannot be empty',
      };
      ctx.status = 400;
      return;
    }
    const file = ctx.request.files[fileKeys[0]];
    const pathSplit = file.path.split('/');
    const fileName = pathSplit[pathSplit.length - 1];
    ctx.body = await recordedController.insertRecorded({
      fileName,
      file: {
        name: file.name,
        path: file.path,
        size: file.size,
        fileType: file.type,
      },
    });
  } catch (error) {
    ctx.body = {
      status: 400,
      message: 'error during uploading file',
      error: true,
    };
    ctx.status = 400;
  }
});

recordedRouter.get('/', async (ctx: RecordedAllCtx) => {
  ctx.body = await recordedController.getAllRecorded();
  ctx.status = 200;
});

recordedRouter.delete('/:id', async (ctx: GenericRecordCtx) => {
  const data = ctx.params as GenericByIdRequest;
  const body = await recordedController.deleteRecord({
    id: data.id,
  });
  ctx.body = body;
  ctx.status = body.status;
});

recordedRouter.get('/:id', async (ctx: GenericRecordCtx) => {
  const data = ctx.params as GenericByIdRequest;
  const body = await recordedController.getRecordById({
    id: data.id,
  });
  ctx.body = body;
  ctx.status = body.status;
});

export default recordedRouter;
