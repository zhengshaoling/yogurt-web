<template>
  <div id="artificierList">
    <div class="filter-container">
      <form-search ref="formSearch" :form-data="formData" :pan-params="query" @onSubmit="onSubmit" @reset="resetQuery" />
    </div>
    <div class="all_btn">
      <el-button type="primary" @click="addOrder">添加</el-button>
      <el-button @click="pushMost">批量推送</el-button>

    </div>
    <list-table ref="orderTable" :params="query" :api="getOrderList" @selection-change="handleSelectionChange">
      <el-table-column fixed="left" type="selection" class="selection" prop="id" width="45" align="center" />
      <el-table-column prop="no" label="订单号" min-width="120" show-overflow-tooltip />
      <el-table-column prop="orderDate" label="下单时间" min-width="150" show-overflow-tooltip />
      <el-table-column label="操作" min-width="150" center>
        <template slot-scope="scope">
          <el-button type="text" @click="detail(scope)">详情</el-button>
          <el-button type="text" @click="pushToArtificier(scope)">推送给技师</el-button>
          <el-button type="text" @click="edit(scope)">修改</el-button>
          <el-button type="text" @click="deleteRow(scope)">删除</el-button>
        </template>
      </el-table-column>
    </list-table>
  </div>
</template>
<script>
  import formSearch from '@/components/FormSearch';
  import listTable from '@/components/ListTable';
  import { getOrderList, handleDeleteOrder } from "@/api/order";
  export default {
    name: 'artificierList',
    components: { formSearch, listTable },
    props: {
      type: {
        type: String,
        default: '1'
      }
    },
    data() {
      return {
        getOrderList,
        multipleSelection: [],
        query: {
          status: this.type // 当前选中的tab
        },
        formData: {
          commonList: [
            {
              type: 'select',
              name: 'serviceName',
              label: '套餐',
              labelKey: 'value',
              valueKey: 'key',
              list: [
                { key: 1, value: '套餐1'},
                { key: 2, value: '套餐2'},
                { key: 3, value: '套餐3'}]
            }, {
              type: 'select',
              name: 'artificier',
              label: '技师',
              labelKey: 'value',
              valueKey: 'key',
              list: [
                { key: 1, value: '夏某某'},
                { key: 2, value: '郑某某'},
                { key: 3, value: '类'}
              ]
            }, {
              type: 'date',
              startName: 'serviceTimeStart',
              endName: 'serviceTimeEnd',
              label: '服务日期',
              format: 'yyyy/MM/dd'
            }],
          popoverList: [
            {
              type: 'input',
              name: 'no',
              label: '订单编号'
            }, {
              type: 'date',
              startName: 'orderTimeStart',
              endName: 'orderTimeEnd',
              label: '下单日期',
              format: 'yyyy/MM/dd'
            }]
        },
        page: defaultPage(),
      }
    },
    methods: {
      onSubmit(data) {
        this.query = data;
        this.reloadTable();
      },
      resetQuery() {
        this.query = {};
        this.reloadTable();
      },
      reloadTable() {
        this.$refs.orderTable.reload();
      },
      // 查看详情
      detail({ row }) {

      },
      // 编辑
      edit({ row }) {

      },
      // 删除
      deleteRow({ row }) {
        const { id } = row;
        this.$confirm('确定删除吗?删除之后无法撤回')
          .then(() => handleDeleteOrder([id]))
          .then(() => {
            this.$message.success('删除成功');
            this.reloadTable();
          })
      },
      // 推送给技师
      pushToArtificier({ row }) {

      },
      // 添加订单
      addOrder() {

      },
      // 批量推送
      pushMost() {

      },

      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
    }
  }
</script>
<style lang="scss" scoped>
  #orderList {
    margin: 20px;
  }

</style>
