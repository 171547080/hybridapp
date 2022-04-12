import {createStore} from 'redux';
import reducer from './reducer';
 
// 利用store来保存状态（state）
const store = createStore(reducer);
 
export default store;