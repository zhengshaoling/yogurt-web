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
      <el-form-item prop="illustrate" lable="禁忌说明">
        <el-input v-model="addForm.illustrate" type="textarea" />
      </el-form-item>
    </el-form>
    <div class="all_btn">
      <el-button type="primary" icon="el-icon-circle-plus-outline" @click="handleAdd()">添加</el-button>
      <el-button @click="resetAdd()">重置</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "addPackage",
  data() {
    return {
      addForm: {},
      addRules: {
        title: [{ required: true, message: '套餐名称为必填项', trigger: 'blur'}]
      }
    }
  },
  methods: {
    handleAdd() {

    },
    resetAdd() {
      this.data.addForm = {}
    }
  }
}
</script>

<style scoped>

</style>
