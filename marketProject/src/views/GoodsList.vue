<template>
    <div>
      <nav-header></nav-header>
      <nav-bread>
        <span slot="bread">商品列表</span>
      </nav-bread>
      <div class="accessory-result-page accessory-page">
        <div class="container">
          <div class="filter-nav">
            <span class="sortby">排序:</span>
            <a href="javascript:void(0)" class="default cur">默认</a>
            <a href="javascript:void(0)" class="price">价格 <svg class="icon icon-arrow-short"><use xlink:href="#icon-arrow-short"></use></svg></a>
            <a href="javascript:void(0)" class="filterby stopPop" @click="showFilterPop">条件筛选</a>
          </div>
          <div class="accessory-result">
            <!-- filter -->
            <div class="filter stopPop" id="filter" :class="{'filterby-show':filterBy}">
              <dl class="filter-price">
                <dt>价格区间:</dt>
                <dd><a href="javascript:void(0)" :class="{'cur':priceChecked == 'all'}" @click="priceChecked='all'">所有</a></dd>
                <dd v-for="(item, index) in priceFilter" @click="setPriceFilter(index)">
                  <a href="javascript:void(0)" :class="{'cur':priceChecked==index}">{{item.startPrice}} - {{item.endPrice}}</a>
                </dd>
              </dl>
            </div>

            <!-- search result accessories list -->
            <div class="accessory-list-wrap">
              <div class="accessory-list col-4">
                <ul>
                  <li v-for="(item, index) in goodsList">
                    <div class="pic">
                      <a href="#"><img v-lazy="`/static/${item.productImg}`" alt=""></a>
                    </div>
                    <div class="main">
                      <div class="name">{{ item.productName }}</div>
                      <div class="price">{{ item.productPrice }}</div>
                      <div class="btn-area">
                        <a href="javascript:;" class="btn btn--m">加入购物车</a>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div class="md-overlay" v-show="overLayFlag" @click="closePop"></div>
          </div>
        </div>
      </div>
      <global-footer></global-footer>
    </div>
</template>
<script>
import '@/assets/css/base.css'
import '@/assets/css/product.css'
import NavHeader from '@/components/header.vue'
import GlobalFooter from '@/components/footer.vue'
import NavBread from '@/components/NavBread.vue'
import axios from 'axios'
export default {
  data () {
    return {
      goodsList: [],
      priceFilter: [
        {
          startPrice: '0.00',
          endPrice: '100.00'
        },
        {
          startPrice: '100.00',
          endPrice: '500.00'
        },
        {
          startPrice: '500.00',
          endPrice: '1000.00'
        },
        {
          startPrice: '1000.00',
          endPrice: '2000.00'
        },
        {
          startPrice: '2000.00',
          endPrice: '5000.00'
        },
        {
          startPrice: '5000.00',
          endPrice: '(°Д°)'
        }
      ],
      priceChecked: 'all',
      filterBy: false,
      overLayFlag: false
    }
  },
  components: {
    NavHeader: NavHeader,
    GlobalFooter: GlobalFooter,
    NavBread: NavBread
  },
  mounted () {
    this.getGoodsList()
  },
  methods: {
    getGoodsList () {
      axios.get('/goods').then((res) => {
        this.goodsList = res.data.result
      })
    },
    showFilterPop () {
      this.filterBy = true
      this.overLayFlag = true
    },
    closePop () {
      this.filterBy = false
      this.overLayFlag = false
    },
    setPriceFilter (index) {
      this.priceChecked = index
      this.closePop()
    }

  }
}
</script>

<style>

</style>
