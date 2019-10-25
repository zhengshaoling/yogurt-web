<template>
  <div class="SearchForm">
    <!--高级搜索-->
    <el-popover v-if="formData.popoverList && formData.popoverList.length>0" ref="advanced" placement="bottom-start" width="500" trigger="click">
      <el-form :model="params" label-width="110px" label-position="left" style="width: 450px;padding-left:20px;">

        <el-form-item v-for="item in formData.popoverList" :key="item.name" :label="item.label">
          <!--input-->
          <el-input v-if="item.type==='input'" v-model.trim="params[item.name]" :placeholder="item.label" class="filter-item" clearable @input="debounceGetList"/>
          <!--select-->
          <el-select v-if="item.type==='select'" v-model.trim="params[item.name]" :placeholder="item.label" class="filter-item" style="width: 100%;" @change="debounceGetList">
            <el-option v-if="!item.closeAll" :value="typeof(params[item.name])=='string'?'':null" label="全部"/>
            <el-option v-for="(enumValue,enumKey) in item.list" :key="enumKey" :label="enumValue[item.labelKey]" :value="enumValue[item.valueKey]"/>
          </el-select>
          <!--开关-->
          <el-switch v-if="item.type==='switch'" v-model="params[item.name]" :active-value="item.activeValue" :inactive-value="item.inactiveValue" active-color="#FF9C00" inactive-color="#dcdfe6" @change="debounceGetList"/>
          <!---日期-->
          <el-row v-if="(item.type=='datetime') || (item.type=='date')">
            <el-col :span="11">
              <el-date-picker :type="item.type" v-model="params[item.startName]" :format="item.format" :value-format="item.format"
                              placeholder="起始日期" class="filter-item fff" style="width: 100%;" @change="debounceGetList"/>
            </el-col>
            <el-col :span="2" class="line" style="text-align: center">-</el-col>
            <el-col :span="11">
              <el-date-picker :type="item.type" v-model="params[item.endName]" :format="item.format" :value-format="item.format"
                              placeholder="结束日期" class="filter-item fff" style="width: 100%;" @change="debounceGetList"/>
            </el-col>
          </el-row>
          <!--三级分类-->
          <ufa-category v-if="(item.type=='gdsCategory')" :category-option="categoryOption" custom-class="category" @category="category"/>
        </el-form-item>

      </el-form>
    </el-popover>
    <!--高级搜索end-->

    <div class="filter-container">
      <el-form :inline="true" :model="params">
        <el-form-item v-for="item in formData.commonList" :key="item.name" :label="item.label">
          <!--input-->
          <el-input v-if="item.type==='input'" v-model.trim="params[item.name]" :placeholder="item.label" class="filter-item" clearable />
          <!--select-->
          <el-select v-if="item.type==='select'" v-model.trim="params[item.name]" :placeholder="item.label" class="filter-item" style="width: 100%;">
            <el-option v-if="!item.closeAll" :value="typeof(params[item.name])=='string'?'':null" label="全部"/>
            <el-option v-for="(enumValue,enumKey) in item.list" :key="enumKey" :label="enumValue[item.labelKey]" :value="enumValue[item.valueKey]"/>
          </el-select>
          <!--开关-->
          <el-switch v-if="item.type==='switch'" v-model="params[item.name]" :active-value="item.activeValue" :inactive-value="item.inactiveValue" active-color="#FF9C00" inactive-color="#dcdfe6"/>
          <!---日期-->
          <el-row v-if="(item.type=='datetime') || (item.type=='date')">
            <el-col :span="11">
              <el-date-picker :type="item.type" v-model="params[item.startName]" :format="item.format" :value-format="item.format" placeholder="起始日期"
                              class="filter-item fff" style="width: 100%;"/>
            </el-col>
            <el-col :span="2" class="line" style="text-align: center">-</el-col>
            <el-col :span="11">
              <el-date-picker :type="item.type" v-model="params[item.endName]" :format="item.format" :value-format="item.format" placeholder="结束日期"
                              class="filter-item fff" style="width: 100%;"/>
            </el-col>
          </el-row>
          <!--时间点选择-->
          <el-date-picker v-if="(item.type=='singledatetime') || (item.type=='singledate')" :type="item.type1" v-model="params[item.name]" :format="item.format" :placeholder="item.label" class="filter-item fff" style="width: 100%;"/>
          <!--范围选择-->
          <el-row v-if="(item.type=='numrange')">
            <el-col :span="6">
              <el-input :type="item.type1" v-model="params[item.startName]" class="filter-item fff" style="width: 80%; margin-right: 5px;"/>天
            </el-col>
            <el-col :span="2" class="line" style="text-align: center">-</el-col>
            <el-col :span="6">
              <el-input :type="item.type1" v-model="params[item.endName]" class="filter-item fff" style="width: 80%; margin-right: 5px;"/>天
            </el-col>
          </el-row>
          <!--三级分类-->
          <category v-if="(item.type=='gdsCategory')" :category-option="categoryOption" custom-class="category" @category="category"/>
        </el-form-item>
        <el-form-item>
          <el-button v-popover:advanced v-if="formData.popoverList && formData.popoverList.length>0" type="primary">高级搜索</el-button>
          <el-button v-if="!btnUfaSearch" type="primary" icon="el-icon-search" @click="onSubmit">查询</el-button>
          <el-button v-auth="btnUfaSearch" v-else type="primary" icon="el-icon-search" @click="onSubmit">查询</el-button>
          <el-button @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

  </div>
</template>

<script>
  import _ from "underscore";
  import { defaultPage } from "@/utils/default"; // 分页参数
  import Category from "@/components/Category"; // 商品分类组件
  import QueryTag from '@/components/QueryTag';
  import Pagination from '@/components/Pagination';
  export default {
    components: { Pagination, QueryTag, Category },
    props: {
      formData: {
        type: Object,
        default(){
          return {};
        }
      },
      panParams: {
        type: Object,
        default(){
          return {};
        }
      },
      btnUfaSearch: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        categoryOption: []
      }
    },
    computed: {
      params: {
        get(){
          return this.panParams
        },
        set(){}
      }
    },
    methods: {
      onSubmit() {
        // 商品分类
        if (this.categoryOption.length===3){
          this.params.catId=this.categoryOption[2]
        } else if (this.categoryOption.length===2){
          this.params.catId=this.categoryOption[1]
        } else if (this.categoryOption.length===1){
          this.params.catId=this.categoryOption[0]
        }
        this.$emit('onSubmit', this.params)
      },
      // 接收分类值
      category(data) {
        this.categoryOption = data;
      },
      // 重置查询
      reset(){
        this.categoryOption=[]
        for (const item in this.params){
          this.params[item]='';// 先重置为空，再移除掉，防止再次查询传空值
          delete this.params[item]
        }
        // this.$emit('reset', this.params)
        this.$emit('reset')
      },

      // 重置页数
      resetPage() {
        const page = defaultPage();
        this.params={ ...this.params, ...page }// 重置分页
      },

      // 高级搜索监听
      debounceGetList: _.debounce(function() {
        // 如果btnUfaSearch有值判断是否有权限
        if (this.btnUfaSearch){
          const buttonpermsStr=sessionStorage.getItem("buttenPermAdmin");
          const buttonperms=JSON.parse(buttonpermsStr);
          buttonperms.some(item => {
            if (item===this.btnUfaSearch){
              this.resetPage();
              this.onSubmit();
            }
          })
        } else {
          this.resetPage();
          this.onSubmit();
        }
      }, 1000)

    }
  }
</script>

<style scoped>

</style>
