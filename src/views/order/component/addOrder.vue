<template>
  <div id="addPackage">
    <el-form ref="addForm" :model="addForm" :rules="addRules" class="add-form" auto-complete="on" label-width="150px" label-position="left">
      <el-form-item prop="title" lable="套餐名称">
        <el-input v-model="addForm.title" />
      </el-form-item>
      <el-form-item prop="originalCost" lable="原价">
        <el-input v-model="addForm.originalCost" type="number" />
      </el-form-item>
      <el-form-item prop="nowCost" lable="现价">
        <el-input v-model="addForm.nowCost" type="number" />
      </el-form-item>
      <el-form-item prop="time" lable="时长">
        <el-input v-model="addForm.time" type="number" />
      </el-form-item>
      <el-form-item prop="introduction" lable="项目简介">
        <el-input v-model="addForm.introduction" type="textarea" />
      </el-form-item>
      <el-form-item prop="illustration" lable="禁忌说明">
        <el-input v-model="addForm.illustration" type="textarea" />
      </el-form-item>
    </el-form>
    <div class="all_btn">
      <el-button type="primary" icon="el-icon-circle-plus-outline" @click="handleAdd()">添加</el-button>
      <el-button type="danger" icon="el-icon-back" @click="resetAdd()">重置</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "addPackage",
  data() {
    const validateNum = (rule, value, callback) => {
      var reg = /^\d+(.\d{1,2})?$/;
      if(value.trim().length > 0) {
        if(Number(value) <= 0) {
          callback(new Error('价格需要大于0'));
        }
        if(!reg.test(value)) {
          callback(new Error('价格最多只能有2位小数'));
        }
      } else {
        callback(new Error('请输入价格'));
      }
    };
    return {
      addForm: {},
      addRules: {
        title: [{ required: true, message: '套餐名称为必填项', trigger: 'blur' }],
        originalCost: [{ required: true, validator: validateNum, trigger: 'blur' }],
        nowCost: [{ required: true, validator: validateNum, trigger: 'blur' }]
      }
    }
  },
  methods: {
    handleAdd() {
      this.$refs['addForm'].validate((valid) => {
        if(valid) {

        }
      })
    },
    resetAdd() {
      for (const item in this.addForm){
        this.addForm[item] = '';
        delete this.addForm[item];
      }
    }
  }
}
</script>

<style scoped>

</style>
