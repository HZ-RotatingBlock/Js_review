<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
import axios from 'axios'
let HTTP = axios.create({
  baseURL: 'http://easy-mock.com/mock/59d02e089cabc90bb5e4fe90/example',
  timeout: 1000,
  responseType: 'json',
  params: {
    book: '123'
  },
  headers: {
    'custom-header': 'hello'
  }
})
export default {
  name: 'hello',
  data () {
    return {
      msg: '分分钟搞定axios'
    }
  },
  created () {
    HTTP.get('axios').then((res) => {
      console.log(res.data)
    }).catch((err) => {
      console.log(err)
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .hello{
    font-size: 30px;
  }
</style>
