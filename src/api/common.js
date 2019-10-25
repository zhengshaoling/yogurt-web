import request from '@/utils/request';
import axios from 'axios'
const gds = '/gds';
const sys='/sys';
const usr = '/usr';
// 查找所有分类
export function categoryList(params) {
  return request({
    url: gds + '',
    method: 'get',
    params
  });
}

// 根据父id获取子分类列表
export function findByParent(params) {
  return request({
    url: gds + '',
    method: 'get',
    params
  });
}

// 根据级数获取三级分类
export function findByLevel(params) {
  return request({
    url: gds + '',
    method: 'get',
    params
  });
}

// 地址
export function Level3Areas() {
  return request({
    url: sys+'',
    method: 'get'
  });
}

// 地址带其他地址
export function listDistrict() {
  return request({
    url: sys+'',
    method: 'get'
  });
}

// 根据地区code获取地址对象树
export function getAddressTree(disCode) {
  return request({
    url: sys+`/district/getAddressTree/${disCode}`,
    method: 'get'
  });
}

// 根据传入pid获取商品三级分类
export function findByLevelUnprotected(params) {
  return request({
    url: gds + '/goodsCategory/findByLevel',
    method: 'get',
    params
  });
}

// 获取供应商列表
export function findSupplierListByPurId(params = {}) {
  return request({
    url: usr + '/protected/corporate/findAllSupplierList',
    method: 'get',
    params: params
  });
}

// 下载文件
export function fileDownload(params) {
  return axios({
    method: 'get',
    url: '/api/srm'+ gds + '/protected/comm/beanCrud/fileDownload',
    responseType: 'blob',
    data: params
  });
}

// 获取枚举列表
// type的值为：payType|taxType|goodsPriceStatus|logistics，分别表示 结算方式|税率|价格表状态|运费
export function getGdsEmun(type) {
  return request({
    url: gds+'/protected/goodsPrice/getGdsEmun/'+type,
    method: 'get'
  });
}

// 银行状态获取枚举列表
// type的值为：
// auditStatus|finAccStatus|regType|bankType|tradeType|settleStatus|tradeStatus ，分别表示 审核状态|账户签约状态|注册类型|银行类型|交易类型|对账状态|交易专题
export function findEmunList(type) {
  return request({
    url: '/fin/protected/financeAccount/findEmunList/'+type,
    method: 'get'
  });
}

// type的值为：tradeType，分别表示 交易类型
export function paymentFindEmunList(type) {
  return request({
    url: '/fin/protected/payment/findEmunList/'+type,
    method: 'get'
  });
}
