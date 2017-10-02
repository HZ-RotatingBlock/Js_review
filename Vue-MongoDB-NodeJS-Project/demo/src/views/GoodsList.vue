<template>
  <div>
    这是商品列表页面
    <span>{{$route.params.goodId}}</span><br/>
    <span>{{$route.params.name}}</span>
    <router-link to="/goods/title">显示商品标题</router-link>
    <router-link to="/goods/image">显示商品图片</router-link>
    <div>
      <router-view></router-view>
    </div>
    <router-link :to="{name: 'cart',params:{cartId: 123}}">跳转到购物车页面</router-link>

  </div>
</template>

<script>
export default {
  methods: {
    jump () {
      // this.$router.push({path: '/cart?abc=123'})
      this.$router.go(-2)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
