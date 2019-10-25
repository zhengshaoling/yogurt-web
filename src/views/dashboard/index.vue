<template>
  <div id="dashboard">
    <div class="tableBox">
      <div class="title">
        <div class="name">新增数据</div>
        <div class="selectTime">
          <el-select v-model="selectedTime" placeholder="请选择时间" class="filter-item" style="width: 100%;">
            <el-option v-for="(item,index) in timeList" :key="index" :label="item.name"
                       :value="item.id"/>
          </el-select>
        </div>
      </div>
      <div class="newAddData">
        <div class="addItem">
          <p>50</p>
          <p>新增用户</p>
         </div>
        <div class="addItem">
          <p>55</p>
          <p>新增反馈</p>
        </div>
      </div>
    </div>
    <div class="tableBox">
      <div class="title">
        <div class="name">订单通知</div>
      </div>
      <div class="content">
        <div class="item">
          <div class="itemName">您有新的订单</div>
          <div class="itemTime">2019-10-12</div>
        </div>
        <div class="item">
          <div class="itemName">推拿订单</div>
          <div class="itemTime">2019-09-12</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      selectedTime: '',
      timeList: [
        {id: 1, name: '本周'},
        {id: 2, name: '本月'},
        {id: 3, name: '本季度'}
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
  #dashboard {
    width: 100%;
    display: flex;
    justify-content: center;
    .tableBox {
      width: 500px;
      min-height: 400px;
      height: auto;
      border: 1px solid rgba(152,152,152,0.5);
      margin: 10px 60px;
      padding: 10px;
    }
    .title {
      font-size: 20px;
      font-weight: bold;
      height: 55px;
      line-height: 40px;
      border-bottom: 1px solid rgba(152,152,152,0.5);
      display: flex;
      justify-content: space-between;
      .titleName {
        width: 100px;
      }
      .selectTime {
        width: 200px;
      }
    }
    .newAddData {
      margin: 100px auto;
      text-align: center;
      .addItem {
        width: 100px;
        height: 100px;
        display: inline-block;
        text-align: center;
        font-weight: bold;
      }
    }
    .content {
      .item {
        display: flex;
        justify-content: space-between;
        margin: 5px 10px;
        font-size: 14px;
        line-height: 50px;
        height: 50px;
        border-bottom: 1px solid rgba(152, 152, 152, 0.5);
      }
    }
  }

</style>
