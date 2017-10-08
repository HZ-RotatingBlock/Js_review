<template>
    <div>
      <nav-header></nav-header>
      <div class="container">
        <div class="page-title-normal">
          <h2 class="page-title-h2"><span>订单结果</span></h2>
        </div>
        <!-- 进度条 -->
        <div class="check-step">
          <ul>
            <li class="cur"><span>确认</span>地址</li>
            <li class="cur"><span> 查看你的</span>订单</li>
            <li class="cur"><span>确定</span>付款</li>
            <li class="cur"><span>订单</span>结果</li>
          </ul>
        </div>

        <div class="order-create">
          <div class="order-create-pic"><img src="/static/ok-1.png" alt=""></div>
          <div class="order-create-main">
            <h3>恭喜! <br>您的订单处理成功!</h3>
            <p>
              <span>订单ID：{{orderId}}</span>
              <span>订单金额总计：{{orderTotal | currency('￥')}}</span>
            </p>
            <div class="order-create-btn-wrap">
              <div class="btn-l-wrap">
                <router-link class="btn btn--m" to="/cart">购物车列表</router-link>
              </div>
              <div class="btn-r-wrap">
                <router-link class="btn btn--m" to="/">商品列表</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <global-footer></global-footer>
    </div>
</template>
<script>
    import NavHeader from '@/components/header'
    import GlobalFooter from '@/components/footer'
    import NavBread from '@/components/NavBread'
    import Modal from '@/components/Modal'
    import {currency} from '@/util/currency'
    import axios from 'axios'
    export default{
      data () {
        return {
          orderId: '',
          orderTotal: 0
        }
      },
      components: {
        NavHeader,
        GlobalFooter,
        NavBread,
        Modal
      },
      filters: {
        currency: currency
      },
      mounted () {
        let orderId = this.$route.query.orderId
        if (!orderId) {
          return
        }
        axios.get('/users/orderDetail', {
          params: {
            orderId: orderId
          }
        }).then((response) => {
          let res = response.data
          if (res.status === '0') {
            this.orderId = orderId
            this.orderTotal = res.result.orderTotal
          }
        })
      }
    }
</script>
