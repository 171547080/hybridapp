import {
    ADD_COUNT,
    SUB_COUNT
} from './constants';
 
// 利用action来修改状态
// const addAction = {type:ADD_COUNT, num: 1};
// const subAction = {type:SUB_COUNT, num: -1};
export const addAction = (num)=>{
    return {type:ADD_COUNT, num: num};
};
export const subAction = (num)=>{
    return {type:SUB_COUNT, num: num};
};