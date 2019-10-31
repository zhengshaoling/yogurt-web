<template>
  <div id="packageList">
    <div class="filter-container">
      <form-search ref="formSearch" :form-data="formData" :pan-params="query" @onSubmit="onSubmit" @reset="resetQuery" />
    </div>
    <div class="all_btn">
      <el-button type="primary" icon="el-icon-circle-plus-outline" @click="addPackage">添加</el-button>
      <el-button @click="packageManage">套餐管理</el-button>
      <el-button @click="delMost">批量删除</el-button>
    </div>
    <list-table ref="packageTable" :params="query" :api="getPackageList" @selection-change="handleSelectionChange">
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
          <el-button type="text" @click="soldout(scope.row.id)">下架</el-button>
          <el-button type="text" @click="edit(scope.row.id)">修改</el-button>
          <el-button type="text" @click="deleteRow(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </list-table>
    <div v-if="showAdd">
      <el-dialog :visible.sync="showAdd" :append-to-body="true" title="添加套餐" width="70%">
        <add />
      </el-dialog>
    </div>
  </div>


</template>
<script>
  import formSearch from '@/components/FormSearch';
  import listTable from '@/components/ListTable';
  import add from './component/addPackage';
  import { getPackageList, handleDeletePackage } from "@/api/package";
  export default {
    name: 'packageList',
    components: { formSearch, listTable, add },
    data() {
      return {
        getPackageList,
        multipleSelection: [],
        query: {},
        formData: {
          commonList: [
            {
              type: 'select',
              name: 'serviceName',
              label: '套餐',
              labelKey: 'value',
              valueKey: 'key',
              list: [
                { key: 1, value: '套餐1' },
                { key: 2, value: '套餐2' },
                { key: 3, value: '套餐3' }
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
        },
        showAdd: false
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
        this.$refs.packageTable.reload();
      },
      // 查看套餐
      package(id) {

      },
      // 下架
      soldout(id) {
        this.packageId = id;
        this.showDetail = true;
      },
      // 编辑
      edit(id) {

      },
      // 删除
      deleteRow(id) {
        this.$confirm('确定删除吗?删除之后无法撤回')
          .then(() => handleDeletePackage(id))
          .then(() => {
            this.$message.success('删除成功');
            this.reloadTable();
          })
      },
      // 新增套餐
      addPackage() {
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
  #packageList {
    margin: 20px;
  }

</style>
