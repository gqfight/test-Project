/*
能发送异步请求的函数模块
封装axios库
函数的返回值是promise对象
*/
import axios from 'axios'
export default function ajax(url,data={},type='GET'){
    if(type=='GET'){
      return axios.get(url,{
        params:data
      })
    }else{
      return axios.post(url,data)
    }
}