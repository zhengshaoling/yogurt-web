<template>
  <div class="block">
    <el-cascader
      :options="listData"
      v-model="option"
      :props="props"
      :disabled="disabled"
      placeholder="输入分类名"
      filterable
      change-on-select
      style="width:300px"
      @change="handleItemChange"
    />
  </div>
</template>
<script>
  import { categoryList } from "@/api/common";
  import { treeList } from "@/utils/tree";
  export default {
    // props: ['categoryOption'],
    props: {
      categoryOption: {
        type: Array,
        default: function(){
          return []
        }
      },
      disabled: {
        type: Boolean,
        default: false
      },
    },
    data() {
      return {
        listData: [],
        props: {
          label: "name",
          value: "id",
          children: "children"
        },
        option: []
      };
    },
    watch: {
      categoryOption: {
        handler() {
          this.option=this.categoryOption;
        },
        immediate: true
      }
    },
    mounted() {
      this.list();
    },
    methods: {
      list() {
        categoryList().then(res => {
          this.listData = treeList(res.list);
        });
      },
      handleItemChange(val) {
        this.$emit("category", val);
      }
    }
  };
</script>

