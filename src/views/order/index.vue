<template>
  <div class="app-container calendar-list-container">
    <div class="tab-container">
      <el-tabs v-model="activeName" style="margin-top:15px;" type="border-card">
        <el-tab-pane v-for="item in tabOptions" :label="item.label" :key="item.key" :name="item.key">
          <list v-if="activeName==item.key" :type="item.key" />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
  import list from './component/list'
  export default {
    name: 'orderIndex',
    components: { list },
    data() {
      return {
        tabOptions: [
          { label: '未处理', key: '1'},
          { label: '已处理', key: '2'},
          { label: '取消审核', key: '3'},
        ],
        activeName: '1'
      }
    },
    created() {
      this.activeName = window.location.hash.substring(1) || '2'
    }
  }
</script>
<style lang="scss" scoped>
</style>
