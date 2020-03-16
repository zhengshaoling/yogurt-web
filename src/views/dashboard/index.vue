<template>
  <div class="warp">
    <div class="item"><img src="../../assets/images/0.png" /></div>
    <div class="item"><img src="../../assets/images/1.png" /></div>
    <div class="item"><img src="../../assets/images/2.png" /></div>
    <div class="item"><img src="../../assets/images/3.jpg" /></div>
    <div class="item"><img src="../../assets/images/4.png" /></div>
    <div class="item"><img src="../../assets/images/5.png" /></div>
    <div class="item"><img src="../../assets/images/6.png" /></div>
    <div class="item"><img src="../../assets/images/7.jpg" /></div>
    <div class="item"><img src="../../assets/images/8.png" /></div>
    <div class="item"><img src="../../assets/images/9.png" /></div>
    <div class="item"><img src="../../assets/images/0.png" /></div>
    <div class="item"><img src="../../assets/images/1.png" /></div>
    <div class="item"><img src="../../assets/images/2.png" /></div>
    <div class="item"><img src="../../assets/images/3.jpg" /></div>
    <div class="item"><img src="../../assets/images/4.png" /></div>
    <div class="item"><img src="../../assets/images/5.png" /></div>
    <div class="item"><img src="../../assets/images/6.png" /></div>
    <div class="item"><img src="../../assets/images/7.jpg" /></div>
    <div class="item"><img src="../../assets/images/8.png" /></div>
    <div class="item"><img src="../../assets/images/9.png" /></div>
  </div>

  <!--<div id="dashboard">
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
  </div>-->
</template>
<script>
import $ from 'jquery';
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
  },
  mounted() {
    this.waterFall();
  },

  methods: {
    waterFall() {
      var box = $(".item");
      var boxWidth = $(box).outerWidth() + 5;
      var windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      // var windowWidth = $(window).width();
      var cols = Math.floor(windowWidth / boxWidth);
      var heightArr = [];
      $.each(box,function(index,item){
        let boxHeight = $(item).outerHeight() + 5;
        if(index < cols) {
          heightArr[index] = boxHeight;
        } else {
          let minboxHeight = Math.min(...heightArr);
          let i = heightArr.indexOf(minboxHeight);
          item.style.position = 'absolute';
          item.style.top = minboxHeight + "px";
          item.style.left = i*boxWidth + 'px';
          // item.style = ({
          //   position: "absolute",
          //   top: minboxHeight + "px",
          //   left: i*boxWidth + 'px'
          // });
          heightArr[i] += boxHeight;
        }
      })
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  /*用js方法重新定位渲染*/
  .warp {
    position: relative;
    height: 100vh;
    /*height: 100%;*/
    /*overflow-y: scroll;*/
    .item {
      display: inline-block;
      border: solid 1px #f2f2f2;
      padding: 5px;
    }
    img {
      width: 250px;
      vertical-align: top;
    }
  }
  // 用column布局方法
  /*.warp {*/
    /*column-count: 4;*/
    /*.item {*/
      /*border: solid 1px #f2f2f2;*/
      /*margin: 5px;*/
      /*img {*/
        /*width: 100%;*/
      /*}*/
    /*}*/
  /*}*/
  // 用flex布局
  /*.warp {*/
    /*display: flex;*/
    /*flex-flow: column wrap;*/
    /*height: 100vh;*/
    /*.item {*/
      /*width: calc(100%/4  - 10px);*/
      /*margin: 5px;*/
      /*img {*/
        /*width: 100%;*/
      /*}*/
    /*}*/
  /*}*/
  #dashboard {
    width: 100%;
    display: flex;
    justify-content: center;
    transform: translate(0, 40%);
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
