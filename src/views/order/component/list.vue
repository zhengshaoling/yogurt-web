<template>
  <div id="orderList">
    <div class="filter-container">
      <form-search ref="formSearch" :form-data="formData" :pan-params="query" @onSubmit="onSubmit" @reset="resetQuery" />
    </div>
    <div class="all_btn">
      <el-button type="primary" icon="el-icon-circle-plus-outline" @click="addOrder">添加</el-button>
      <el-button @click="pushMost">批量推送</el-button>

    </div>
    <list-table ref="orderTable" :params="query" :api="getOrderList" @selection-change="handleSelectionChange">
      <el-table-column fixed="left" type="selection" class="selection" prop="id" width="45" align="center" />
      <el-table-column prop="no" label="订单号" min-width="120" show-overflow-tooltip />
      <el-table-column prop="orderDate" label="下单时间" min-width="150" show-overflow-tooltip />
      <el-table-column label="操作" min-width="150" center>
        <template slot-scope="scope">
          <el-button type="text" @click="detail(scope.row.id)">详情</el-button>
          <el-button type="text" @click="pushToArtificier(scope.row.id)">推送给技师</el-button>
          <el-button type="text" @click="edit(scope.row.id)">修改</el-button>
          <el-button type="text" @click="deleteRow(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </list-table>

    <div v-if="showDetail">
      <el-dialog :visible.sync="showDetail" :append-to-body="true" title="订单详情" width="70%">
        <detail :order-id = 'orderId' />
      </el-dialog>
    </div>
    <div v-if="showAdd">
      <el-dialog :visible.sync="showAdd" :append-to-body="true" title="添加订单" width="70%">
        <add />
      </el-dialog>
    </div>
    <div v-if="showEdit">
      <el-dialog :visible.sync="showEdit" :append-to-body="true" title="编辑订单" width="70%">
        <edit :order-id = 'orderId'/>
      </el-dialog>
    </div>

  </div>
</template>
<script>
  import formSearch from '@/components/FormSearch';
  import pagination from '@/components/Pagination'
  import listTable from '@/components/ListTable';
  import detail from './detail';
  import add from './addOrder';
  import edit from './editOrder';
  import { getOrderList, handleDeleteOrder } from "@/api/order";
  import { defaultPage } from '@/utils/default'
  export default {
    name: 'orderList',
    components: { formSearch, pagination, listTable, detail, add, edit },
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
        showDetail: false,
        showAdd: false,
        showEdit: false,
        orderId: null,
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
      detail(id) {
        this.orderId = id;
        this.showDetail = true;
      },
      // 编辑
      edit(id) {
        this.orderId = id;
        this.showEdit = true;
      },
      // 删除
      deleteRow(id) {
        this.$confirm('确定删除吗?删除之后无法撤回')
          .then(() => handleDeleteOrder(id))
          .then(() => {
            this.$message.success('删除成功');
            this.reloadTable();
          })
      },
      // 推送给技师
      pushToArtificier(id) {

      },
      // 添加订单
      addOrder() {
        this.showAdd = true;
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
