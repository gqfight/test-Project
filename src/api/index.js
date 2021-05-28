/*
包含应用中所有接口请求函数的模块
每个函数的返回值都是promise
*/
import ajax from './ajax'
//获取数据接口
export const reqData = ()=> ajax('/login',{},"GET")