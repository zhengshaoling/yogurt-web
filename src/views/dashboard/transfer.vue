<template>
  <div id="app-container">
    <el-tabs style="margin-top: 15px;" type="border-card">
      <el-tab-pane label="穿梭狂实例">
        <!--这里必须传入api-->
        <transfer :api="getAllList" @getAddList="getSelectedList"></transfer>
      </el-tab-pane>
    </el-tabs>
  </div>


</template>
<script>
import transfer from '@/components/Transfer/index'
import { getAllList } from '@/api/dashboard'
export default {
  components: { transfer },
  data() {
    return {
      selectedList: []
    }
  },

  methods: {
    getSelectedList(list) {
      this.selectedList = list;
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>

</style>
