<template>
  <div class="panel">
    <el-input
      v-model="params.keywords"
      placeholder="请输入搜索字段"
      class="el-transfer-panel__filter"
      size="small"
      @mouseenter.native="inputHover = true"
      @mouseleave.native="inputHover = false"
      @input="debounceGetAll"
      @keydown.enter.native="getList"
    >
      <i slot="prefix"
         :class="['el-input__icon', 'el-icon-' + inputIcon]"
         @click="clearQuery"
      />
    </el-input>
    <el-table :data="allList" highlight-current-row style="width: 100%" max-height="300" @selection-change="handleSelectionLeft">
      <el-table-column :selectable="ifselected" type="selection" width="55"/>
      <el-table-column align="center" label="全部" >
        <template slot-scope="scope" property="false" >{{ scope.row.name }}</template>
      </el-table-column>
    </el-table>
    <pagination :page="page" :layout="layout" @paging="pages"/>
  </div>
</template>

<script>
  import pagination from '@/components/Pagination'
  import { defaultPage } from '@/utils/default'
  export default {
    name: "pannel",
    components: { pagination },


  }
</script>

<style scoped>

</style>
