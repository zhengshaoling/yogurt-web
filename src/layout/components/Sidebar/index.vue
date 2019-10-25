<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu
      :show-timeout="200"
      :default-active="$route.path"
      :collapse="isCollapse"
      mode="vertical"
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409EFF"
    >
      <sidebar-item
        v-for="route in menu_routers"
        :key="route.id"
        :item="route"
        :base-path="route.url"
      />
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from "vuex";
import SidebarItem from "./SidebarItem";
import { getAuthorizedItem, getAuthorizedBtnAuthCode } from "@/api/login";
import { treeData } from "@/utils/tree";
export default {
  components: { SidebarItem },
  data() {
    return {
      menu_routers: []
    };
  },
  computed: {
    ...mapGetters([
      // 'permission_routers',
      "sidebar"
    ]),
    isCollapse() {
      return !this.sidebar.opened;
    }
  },
  mounted() {
    this.getMume();
    this.getAuthorizedBtn();
  },
  methods: {
    getMume() {
      getAuthorizedItem().then(response => {
        const list = treeData(response.list);
        // 子类url全部添加admin
        list.map(item => {
          if (item.children.length>0){
            item.children.map(citem => {
              citem.url=''+citem.url;
              return citem;
            })
          }
          return item;
        })
        console.log(list)
        this.menu_routers = list;
      });
    },
    // 获取按钮权限
    getAuthorizedBtn(){
      getAuthorizedBtnAuthCode().then(res => {
        if (res && res.list){
          const list=JSON.stringify(res.list)
          sessionStorage.setItem('buttenPermAdmin', list)
        }
      })
    }
  }
};
</script>
