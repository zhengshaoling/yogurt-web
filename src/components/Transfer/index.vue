<template>
  <div class="warp">
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
    <div class="btn" style="padding: 0 5px;">
      <el-button
        :disabled="rightChecked.length === 0"
        type="primary"
        @click.native="addToLeft">
        <i class="el-icon-arrow-left"/>
        <span> 还原 </span>
      </el-button>
      <el-button
        :disabled="leftChecked.length === 0"
        type="primary"
        @click.native="addToRight">
        <span> 添加 </span>
        <i class="el-icon-arrow-right"/>
      </el-button>
    </div>
    <div class="panel">
      <el-input
        v-model="query"
        placeholder="请输入搜索字段"
        class="el-transfer-panel__filter"
        size="small"
        @mouseenter.native="inputHover = true"
        @mouseleave.native="inputHover = false">
        <i slot="prefix"
           :class="['el-input__icon', 'el-icon-' + inputRightIcon]"
           @click="clearQueryRight"
        />
      </el-input>
      <el-table :data="query? filteredData: selectedList" highlight-current-row style="width: 100%" max-height="300" @selection-change="handleSelectionRight">
        <el-table-column type="selection" width="55"/>
        <el-table-column align="center" label="已选择">
          <template slot-scope="scope">{{ scope.row.name }}</template>
        </el-table-column>
      </el-table>
      <pagination :page="rightPage" :total="query? filteredData.length: selectedList.length" layout="total" />
    </div>
  </div>
</template>

<script>
  import _ from "underscore";
  import pagination from '@/components/Pagination'
  import { defaultPage } from '@/utils/default'
    export default {
      name: "index",
      components: { pagination },
      props: {
        api: {
          type: Function,
          required: true
        },
      },
      data() {
        return {
          allList: [], // 待选择数组
          selectedList: [], // 已选择数组
          leftChecked: [],
          rightChecked: [],
          query: '', // 右边选中框的搜索
          inputHover: false,
          params: {
            keywords: ''
          },
          page: defaultPage(), // 分页
          rightPage: defaultPage(),
          layout: "total, sizes, prev, pager, next",
        }
      },
      computed: {
        inputIcon() {
          return this.params.corName && this.inputHover
            ? 'circle-close'
            : 'search';
        },
        inputRightIcon() {
          return this.query && this.inputHover
            ? 'circle-close'
            : 'search';
        },
        filteredData() {
          return this.selectedList.filter(item => {
            const corName = item.name;
            return corName.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
          });
        }
      },
      watch: {
        'selectedList': function() {
          this.rightPage.totalSize = this.selectedList.length;
        }
      },
      mounted() {
        this.getList();
      },
      methods: {
        async getList() {
          try {
            const params = { ...this.params, ...this.page }
            if (!this.api || typeof this.api !== 'function') {
              throw new Error('api应该传入一个方法')

            }
            const res = await this.api(params);
            this.allList = res.list;
            this.page = res.page;
          } catch (e) {
            this.allList = [
              { id: 1, name: '返回示例name1' },
              { id: 2, name: 'name2' },
              { id: 3, name: 'name3' },
              { id: 4, name: 'name4' },
              { id: 5, name: 'name5' },
              { id: 6, name: 'name6' },
              { id: 7, name: 'name7' },
              { id: 8, name: 'name8' },
              { id: 9, name: 'name9' }
            ]
            throw new Error('处理异常')

          }
        },
        // 判断是否可选
        ifselected(row) {
          return (!this.selectedList.some(item => item.id === row.id))
        },
        // 还原
        addToLeft() {
          this.rightChecked.forEach(item => {
            const index = this.selectedList.indexOf(item);
            if (index > -1) {
              this.selectedList.splice(index, 1);
            }
          });
          this.$emit('getAddList', this.selectedList);
        },
        //  添加
        addToRight() {
          const itemsToBeMoved = [];
          this.leftChecked.forEach(item => {
            if (!(this.selectedList.some(selected_item => { selected_item.id === item.id }))) itemsToBeMoved.push(item);
          });
          this.selectedList = this.selectedList.concat(itemsToBeMoved);
          this.selectedList = this.selectedList.filter((x, index, self) => self.indexOf(x) === index);
          this.$emit('getAddList', this.selectedList);
        },
        // 监听左边选中行
        handleSelectionLeft(val) {
          this.leftChecked = val;
        },
        // 监听右边选中行
        handleSelectionRight(val) {
          this.rightChecked = val;
        },
        // 左边高级搜索监听
        debounceGetAll: _.debounce(function () {
          this.resetPage();
          this.getList();
        }, 1000),
        // 清空搜索
        clearQuery() {
          if (this.inputIcon === 'circle-close') {
            this.params.keywords = '';
            this.getList();
          }
        },
        // 清空右边搜索
        clearQueryRight() {
          if (this.inputRightIcon === 'circle-close') {
            this.query = '';
          }
        },
        // 左边切换分页
        pages() {
          this.getList();
        },
        // 左边重置页数
        resetPage() {
          this.page = defaultPage(this.page);
        },
      }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .warp {
    display: flex;
    align-items: center;
    min-height: 400px;
    width: 80%;
    margin: 10px auto;
    .panel {
      width: 45%;
      .el-table {
        height: 400px;
        margin: 15px auto;
      }
      .el-input {
        width: 85%;
        margin: 0 auto;
      }
    }
    .btn {
      width: 10%;
      display: flex;
      flex-direction: column;
      .el-button {
        width:80px;
        margin: 5px auto;
      }
    }
  }
</style>
