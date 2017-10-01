<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: '分分钟搞定axios'
    }
  },
  // 这里的this.$http相当于作为模块引入axios时的实例对象的使用
  created () {
    this.$http.get('http://easy-mock.com/mock/59d02e089cabc90bb5e4fe90/example/axios')
    .then((res) => {
      console.log(res.data)
    })
    .catch((err) => {
      console.log(err)
    })
    // source.cancel('操作被用户取消')
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .hello{
    font-size: 30px;
  }
</style>
