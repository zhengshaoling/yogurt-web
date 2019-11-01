<template>
  <div id="feedBackIndex">
    <div class="filter-container">
      <form-search ref="formSearch" :form-data="formData" :pan-params="query" @onSubmit="onSubmit" @reset="resetQuery" />
    </div>
    <!--<div class="all_btn">-->
      <!--<el-button type="primary" icon="el-icon-circle-plus-outline" @click="addArtificier">添加</el-button>-->
      <!--<el-button @click="delMost">批量删除</el-button>-->
    <!--</div>-->
    <list-table ref="feedBackTable" :params="query" :api="getFeedBackList">
      <el-table-column type="index" width="55" fixed="left" align="center" label="行号"/>
      <el-table-column prop="accountId" label="用户账号" width="150" align="center" show-overflow-tooltip />
      <el-table-column prop="suggestion" label="反馈意见" width="250" align="center" show-overflow-tooltip />
      <el-table-column prop="date" label="反馈时间" width="100" align="center" show-overflow-tooltip />
    </list-table>
  </div>
</template>

<script>
  import { getFeedBackList, handleDeleteFeedBack } from '@/api/feedBack'
  import formSearch from '@/components/FormSearch'
  import listTable from '@/components/ListTable'
  export default {
    name: "index",
    components: { formSearch, listTable },
    data() {
      return {
        getFeedBackList,
        query: {},
        formData: {
          commonList: [
            {
              type: 'date',
              startName: '起始日期',
              endName: '结束日期',
              format: 'yyyy-MM-dd',
              label: '日期范围'
            }
          ]
        }
      }
    },
    methods: {
      onSubmit() {

      },
      resetQuery() {
        this.query = {};
      }
    }

  }
</script>

<style scoped>
#feedBackIndex {
  margin: 20px;
}
</style>
