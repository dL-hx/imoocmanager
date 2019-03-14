// src\redux\action\index.js
/*
* Action类型:用户事件操作 
*/

export const type = {
    SWITCH_MENU:'SWITCH_MENU',
    SWITCH_USERS:'SWITCH_USERS'
};

//菜单点击切换,修改面包屑名称
export function switchMenu(menuName) {
    return {
        type:type.SWITCH_MENU,
        menuName
    }
}

// 用户点击登录,切换用户名称
export function switchUsers(userName) {
    return {
        type:type.SWITCH_USERS,
        userName
    }
}
