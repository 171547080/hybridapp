import {Model,Effect} from 'dva-core-ts';
import {Reducer} from 'redux';

interface LoadingState {
  loading: boolean;
  message: string;
  error: boolean;
}
const initalState = {
    loading: false,
    message:'',
    error:false
};

function delay(timeout:number) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, timeout);
  });
}

export interface LoadingModel extends Model {
  namespace: 'loading';
  state: LoadingState;
  reducers: {
    start: Reducer<LoadingState>;
    complete: Reducer<LoadingState>;
  };
  effects: {
    asyncLogin: Effect;
  };
}
const loadingModel: LoadingModel = {
  namespace: 'loading',
  state: {
    loading: false,
    message:'',
    error:false
  },
  reducers: {
    start(state = initalState, {payload, type}) {
      return {
        ...state,
        loading: true,
      };
    },
    complete(state = initalState, {payload, type}) {
      return {
        ...state,
        loading: false,
      };
    },
  },
  effects: {
    *asyncLogin({payload, type}, {call, put}) {
      yield call(delay, 300);
      // put传的也是action
      yield put({
        type: 'login', // 相当于【home/login】 当调用当前modal的action可以省略modal名称
        payload,
      });
    },
  },
};

export default loadingModel;
