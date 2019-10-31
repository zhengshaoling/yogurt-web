<template>
  <div id="accountIndex">
    <div class="contact tab-container">
      <el-tabs style="margin-top: 15px;" type="border-card">
        <el-tab-pane label="系统账户管理"></el-tab-pane>
        <div class="all_btn">
          <el-button type="primary" icon="el-icon-circle-plus-outline" @click="addAccount">添加</el-button>
        </div>
        <div class="table">
          <list-table ref="accountTable" :api="getAccountList">
            <el-table-column type="index" label="行号" width="55" fixed="left" align="center"></el-table-column>
            <el-table-column prop="account" label="账户" min-width="120" show-overflow-tooltip />
            <el-table-column prop="right" label="权限" min-width="150" show-overflow-tooltip />
            <el-table-column prop="note" label="备注" min-width="150" show-overflow-tooltip />
            <el-table-column prop="createDate" label="创建时间" min-width="150" show-overflow-tooltip />
            <el-table-column label="操作" min-width="150" center>
              <template slot-scope="scope">
                <el-button type="text" @click="setRight(scope.row.id)">设置权限</el-button>
                <el-button type="text" @click="edit(scope.row.id)">修改密码</el-button>
                <el-button type="text" @click="deleteAccount(scope.row.id)">删除</el-button>
              </template>
            </el-table-column>
          </list-table>
        </div>
      </el-tabs>
      <el-tabs style="margin-top: 15px;" type="border-card">
        <el-tab-pane label="下单须知和联系我们编辑区"></el-tab-pane>
        <el-form ref="psForm" :model="params" :inline="false" label-width="100px" label-position="center">
          <el-form-item label="下单须知" prop="mustKnow">
            <vue-ueditor-wrap v-model="params.mustKnow" :config="myConfig" style="width: 1000px;" />
          </el-form-item>
          <el-form-item label="联系我们" prop="contactUs">
            <el-input type="textarea" v-model="params.contactUs" style="width: 400px;"></el-input>
          </el-form-item>
        </el-form>
        <div class="all_btn" style="margin-left: 20px;">
          <el-button type="primary" @click="savePs">保存</el-button>
          <el-button type="danger" icon="el-icon-back" @click="resetPs">重置</el-button>
        </div>
      </el-tabs>
    </div>

    <div v-if="showAdd">
      <el-dialog :visible.sync="showAdd" title="添加管理员" width="70%" :append-to-body="true">
        <add />
      </el-dialog>
    </div>
    <div v-if="showEdit">
      <el-dialog :visible.sync="showEdit" title="修改密码" width="600px" :append-to-body="true">
        <edit :account-id="accountId" />
      </el-dialog>
    </div>
    <div v-if="showSetRight">
      <el-dialog :visible.sync="showSetRight" title="设置权限" width="600px" :append-to-body="true">
        <edit :account-id="accountId" />
      </el-dialog>
    </div>

  </div>
</template>

<script>
import { getAccountList, handleDeleteAccount } from '@/api/account';
import add from './component/addAccount';
import edit from './component/editAccount';
import setRight from './component/setRight'
export default {
  name: "index",
  components: { add, edit, setRight },
  data() {
    return {
      getAccountList,
      showAdd: false,
      showEdit: false,
      showSetRight: false,
      accountId: null,
      params: {},
      myConfig: {
        UEDITOR_HOME_URL: '/static/UEditor/'
        // UEDITOR_HOME_URL: process.env.EDITOE_URL
      }
    }
  },
  methods: {
    // 添加账户
    addAccount() {
      this.showAdd = true;
    },
    // 设置权限
    setRight(id) {
      this.accountId = id;
      this.showSetRight = true;
    },
    // 修改密码
    edit(id) {
      this.showEdit = false;
      this.accountId = id;
    },
    // 删除账户
    async deleteAccount(id) {
      await this.$confirm('删除之后无法撤回,确定要删除吗?');
      await handleDeleteAccount(id);
      this.$message('删除成功!');
      this.reloadTable();
    },
    // 刷新列表
    reloadTable() {
      this.$refs.accountTable.reload();
    },
    // 保存下单须知和联系我们
    savePs() {
      // this.$refs.psForm.
    },
    // 重置下单须知和联系我们
    resetPs() {
      this.params = {};
    }

  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  #accountIndex {
    margin: 20px;
  }
</style>
