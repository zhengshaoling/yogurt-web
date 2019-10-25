<template>
  <div>
    <el-table
      v-loading="queryLoading"
      :data="list"
      v-bind="$attrs"
      highlight-current-row
      stripe
      fit
      max-height="100%"
    >
      <slot />
    </el-table>
    <pagination :page="page" @paging="pages" />
  </div>
</template>

<script>
import pagination from '@/components/Pagination'
import { defaultPage } from '@/utils/default'

export default {
  name: 'ListTable',
  components: { pagination },
  props: {
    api: {
      type: Function,
      required: true
    },
    params: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      queryLoading: false,
      list: [],
      page: defaultPage()
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    async getList() {
      try {
        this.queryLoading = true
        const params = { ...this.params, ...this.page }
        if (typeof this.api !== 'function') {
          throw new Error('api应该传入一个方法')
        }
        const res = await this.api(params);
        console.log(res, 'res')
        this.list = res.list;
        this.page = res.page;
      } catch (e) {
        throw new Error('处理异常')
      }
      this.queryLoading = false;
    },
    pages(newPage) {
      this.page = newPage;
      this.getList()
    },
    _resetPage() {
      this.page = defaultPage(this.page)
    },
    reload() {
      this.$nextTick(() => {
        this._resetPage()
        this.getList()
      })
    }
  }
}
</script>

<style scoped>

</style>
