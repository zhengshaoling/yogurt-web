import { fileDownload, getGdsEmun, findEmunList } from "@/api/common";
import axios from 'axios'
import qs from 'qs';
// import { getToken } from '@/utils/auth'
// 关闭当前页面
export function closeView(){
  const thisVies=this.$route.fullPath;
  const visitedViews=this.$store.state.tagsView.visitedViews;
  let view=[];
  for (var i in visitedViews){
    if (thisVies === visitedViews[i].fullPath){
      view = visitedViews[i]
    }
  }
  if (view){
    this.$store.dispatch("delView", view).then(({ visitedViews }) => {
      const latestView = visitedViews.slice(-1)[0];
      if (latestView) {
        this.$router.back(-1);
      } else {
        this.$router.push(this.$store.getters.context+'/dashboard/index');
      }
    });
  }
}

// 下载Excel
export const downloadExcel = (fileName, filePath) => {
  loading()
  window.location.href = '/api/srm/gds/protected/comm/beanCrud/fileDownload?fileName=' + fileName + '&filePath=' + filePath;
  close_loading()
}

// 文件流下载
export const fileFlowExcel =(url, params, fileName, method) => {
  exportExcel(url, params, method).then(res => {
    const elink = document.createElement('a');
    elink.download = fileName;
    elink.style.display = 'none';
    elink.href = window.URL.createObjectURL(new Blob([res]));
    document.body.appendChild(elink);
    elink.click();
    URL.revokeObjectURL(elink.href); // 释放URL 对象
    document.body.removeChild(elink);
    close_loading()
  })
}

export function exportExcel(url, params, method) {
  loading();// 加载中
  return new Promise((resolve, reject) => {
    axios({
      url: url,
      data: qs.stringify(params),
      method: method|| 'post',
      responseType: 'blob'
    }).then(res => {
      resolve(res.data);
    }).catch(err => {
      close_loading()// 关闭加载
      reject(err);
    });
  })
}
// 开启加载
function loading(){
  const div=document.createElement("div");
  div.id ='loading'
  document.body.appendChild(div);
  div.innerHTML="<span><i class='el-icon-loading'></i>下载中...</span>"
}
// 关闭
function close_loading(){
  const loading=document.getElementById('loading')
  loading.remove()
}

