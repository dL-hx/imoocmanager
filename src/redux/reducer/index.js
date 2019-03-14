// src\redux\reducer\index.js
/*
 * Reducer: 数据处理
 */

import { type } from "./../action";
const initialState = {
  menuName: "首页"
};

const ebikeData = (state = initialState, action) => {
  switch (action.type) {
    case type.SWITCH_MENU:
      return {
        ...state, // 旧值
        menuName: action.menuName // 新值
      };
    case type.SWITCH_USERS:
      return {
        ...state, // 旧值
        userName: action.userName //新值
      };
    default:
      return {
        ...state
      };
  }
};

export default ebikeData;
