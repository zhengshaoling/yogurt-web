// ////
import axios from "axios"
import { getToken } from "@/utils/auth"
const base = '';
export const getRequest = (url, params) => {
    // console.log(this.$store.getters.token)
  // let accessToken = getStore('accessToken');
  return axios({
    method: 'get',
    url: `${base}${url}`,
    params: params,
    headers: {
      'Authorization': getToken()
      // 'Authorization': t2

    }
  })
};

export const postRequest = (url, params) => {
  // let accessToken = getStore("accessToken");
  return axios({
    method: 'post',
    url: `${base}${url}`,
    data: params,
    // transformRequest: [function (data) {
    //   let ret = ''
    //   for (let it in data) {
    //     ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
    //   }
    //   return ret
    // }],
    headers: {
      'Content-Type': 'application/json',
      'Authorization': getToken()
      // 'Authorization': t2

    }
  })
};
