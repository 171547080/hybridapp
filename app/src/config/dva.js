import {create} from 'dva-core-ts';
import modules from '../models/indes';
const app = create();
//加载modules

modules.forEach(model => {
  app.model(model);
});

app.start();
export default app._store;
