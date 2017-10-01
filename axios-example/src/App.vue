<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
// import axios from 'axios'
export default {
  name: 'app',
  created () {
    // axios({
    //   method: 'post',
    //   url: 'http://easy-mock.com/mock/59d02e089cabc90bb5e4fe90/example/list'
    // }).then((res) => {
    //   console.log(res.data)
    // }).catch((err) => {
    //   console.log('请求失败！ 错误信息：' + err)
    // })
    // get传输第二个参数可以传递一个对象，对象中用params的对象方式传递参数{params:{abc:'hello'}}
    // post传输第二个参数直接就是数据对象，不需要像get那样另外写params对象，而是直接写对象和参数{abc:'123'}
    // axios.post('http://easy-mock.com/mock/59d02e089cabc90bb5e4fe90/example/list', {
    //   abc: '你好'
    // }).then((res) => {
    //   console.log(res.data)
    // }).catch((err) => {
    //   console.log(err)
    // })
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
