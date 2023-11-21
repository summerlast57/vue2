<template>
  <div class="search">
    <van-nav-bar fixed title="商品列表" left-arrow @click-left="$router.go(-1)" />

    <van-search
      readonly
      shape="round"
      background="#ffffff"
      :value="querySearch || '搜索商品' "
      show-action
      @click="$router.push('/search')"
    >
      <template #action>
        <van-icon class="tool" name="apps-o" />
      </template>
    </van-search>

    <!-- 排序选项按钮 -->
    <div class="sort-btns">
      <van-button @click="getProListByAll" class="sort-item" type="default">综合</van-button>
      <van-button @click="getProListBySales" class="sort-item" type="default">销量</van-button>
      <van-button @click="getProListByPrice" class="sort-item" type="default">价格</van-button>
    </div>

    <div class="goods-list">
      <GoodsItem v-for="item in proList" :key="item.goods_id" :item="item"></GoodsItem>
    </div>
  </div>
</template>

<script>
import GoodsItem from '@/components/GoodsItem.vue'
import { getProList } from '@/api/product'
export default {
  name: 'SearchListIndex',
  components: {
    GoodsItem
  },
  data () {
    return {
      page: 1,
      proList: [],
      sortType: 'all',
      sortPrice: 0
    }
  },
  created () {
    this.getProList()
  },
  computed: {
    // 获取地址栏的搜索关键字
    querySearch () {
      return this.$route.query.search
    }
  },
  methods: {
    async getProList () {
      const { data: { list } } = await getProList({
        sortType: this.sortType,
        sortPrice: this.sortPrice,
        categoryId: this.$route.query.categoryId,
        goodsName: this.querySearch,
        page: this.page
      })
      this.proList = list.data
    },
    getProListByAll () {
      this.sortType = 'all'
      this.getProList()
    },
    getProListBySales () {
      this.sortType = 'sales'
      this.getProList()
    },
    getProListByPrice () {
      this.sortType = 'price'
      this.sortPrice === 0 ? this.sortPrice = 1 : this.sortPrice = 0
      this.getProList()
    }
  }
}
</script>

<style lang="less" scoped>
.search {
  padding-top: 46px;
  ::v-deep .van-icon-arrow-left {
    color: #333;
  }
  .tool {
    font-size: 24px;
    height: 40px;
    line-height: 40px;
  }

  .sort-btns {
    display: flex;
    height: 36px;
    line-height: 36px;
    .sort-item {
      text-align: center;
      flex: 1;
      font-size: 16px;
    }
  }
}

// 商品样式
.goods-list {
  background-color: #f6f6f6;
}
</style>
