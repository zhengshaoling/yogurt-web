<template>
  <div id="artificierList">
    <div class="filter-container">
      <form-search ref="formSearch" :form-data="formData" :pan-params="query" @onSubmit="onSubmit" @reset="resetQuery" />
    </div>
    <div class="all_btn">
      <el-button type="primary" @click="addArtificier">添加</el-button>
      <el-button @click="delMost">批量删除</el-button>
    </div>
    <list-table ref="artificierTable" :params="query" :api="getArtificierList" @selection-change="handleSelectionChange">
      <el-table-column fixed="left" type="selection" class="selection" prop="id" width="45" align="center" />
      <el-table-column prop="no" label="订单号" min-width="120" show-overflow-tooltip />
      <el-table-column label="套餐" min-width="150" center>
        <template slot-scope="scope">
          <el-button type="text" @click="package(scope.row.id)">详情</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="changeDate" label="更新时间" min-width="150" show-overflow-tooltip />
      <el-table-column label="操作" min-width="150" center>
        <template slot-scope="scope">
          <el-button type="text" @click="detail(scope.row.id)">详情</el-button>
          <el-button type="text" @click="edit(scope.row.id)">修改</el-button>
          <el-button type="text" @click="deleteRow(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </list-table>

    <div v-if="showDetail">
      <el-dialog :visible.sync="showDetail" :append-to-body="true" title="技师详情" width="70%">
        <detail :artificier-id="artificierId" />
      </el-dialog>
    </div>
    <div v-if="showEdit">
      <el-dialog :visible.sync="showEdit" :append-to-body="true" title="编辑技师" width="70%">
        <edit :artificier-id="artificierId"></edit>
      </el-dialog>
    </div>

    <div v-if="showAdd">
      <el-dialog :visible.sync="showAdd" :append-to-body="true" title="添加技师" width="70%">
        <add />
      </el-dialog>
    </div>
  </div>
</template>
<script>
  import formSearch from '@/components/FormSearch';
  import listTable from '@/components/ListTable';
  import detail from './component/detail'
  import edit from './component/editAritificier'
  import add from './component/addAritificier'
  import { getArtificierList, handleDeleteArtificier } from "@/api/artificier";
  import EditAritificier from "./component/editAritificier";
  export default {
    name: 'artificierList',
    components: {EditAritificier, formSearch, listTable, detail, edit, add },
    data() {
      return {
        getArtificierList,
        multipleSelection: [],
        query: {},
        showDetail: false,
        showAdd: false,
        showEdit: false,
        artificierId: null,
        formData: {
          commonList: [
            {
              type: 'select',
              name: 'status',
              label: '状态',
              labelKey: 'value',
              valueKey: 'key',
              list: [
                { key: 1, value: '在职' },
                { key: 2, value: '休假' },
                { key: 3, value: '离职' }
              ]
            }, {
              type: 'input',
              name: 'phone',
              label: '手机号码'
            }, {
              type: 'input',
              name: 'name',
              label: '姓名'
            }
          ]
        }
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
        this.$refs.artificierTable.reload();
      },
      // 查看套餐
      package(id) {

      },
      // 查看详情
      detail(id) {
        this.artificierId = id;
        this.showDetail = true;
      },
      // 编辑
      edit(id) {
        this.artificierId = id;
        this.showEdit = true;
      },
      // 删除
      deleteRow(id) {
        this.$confirm('确定删除吗?删除之后无法撤回')
          .then(() => handleDeleteArtificier(id))
          .then(() => {
            this.$message.success('删除成功');
            this.reloadTable();
          })
      },
      // 新增技师
      addArtificier() {
        this.showAdd = true;
      },
      // 批量删除
      delMost() {

      },

      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
    }
  }
</script>
<style lang="scss" scoped>
  #artificierList {
    margin: 20px;
  }

</style>
