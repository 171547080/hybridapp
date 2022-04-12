import {Model, Effect} from 'dva-core-ts';
import {Reducer} from 'redux';

interface HomeState {
  num: number;
  username: string;
}
const initalState = {
  num: 0,
  username: '--',
};

function delay(timeout: number) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, timeout);
  });
}

export interface HomeModel extends Model {
  namespace: 'home';
  state: HomeState;
  // 对state的状态修改
  reducers: {
    add: Reducer<HomeState>;
    login: Reducer<HomeState>;
  };
  // 异步处理
  effects: {
    asyncLogin: Effect;
  };
}
const homeModel: HomeModel = {
  namespace: 'home',
  state: {
    num: 0,
    username: 'username',
  },
  reducers: {
    add(state = initalState, {payload, type}) {
      return {
        ...state,
        num: state.num + payload.num,
      };
    },
    login(state = initalState, {payload, type}) {
      return {
        ...state,
        username: payload.username,
      };
    },
  },
  effects: {
    *asyncLogin({payload, type}, {call, put}) {
      // 加载中
      yield put({
        type: 'loading/start', // 相当于【home/login】 当调用当前modal的action可以省略modal名称
        payload,
      });

      yield call(delay, 2000);
      // put传的也是action
      yield put({
        type: 'login', // 相当于【home/login】 当调用当前modal的action可以省略modal名称
        payload,
      });

      // 加载完成
      yield put({
        type: 'loading/complete',
        payload,
      });
    },
  },
};

export default homeModel;
