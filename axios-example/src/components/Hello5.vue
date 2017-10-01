<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
import axios from 'axios'
// import queryString from 'queryString'
// let CancelToken = axios.CancelToken
// let source = CancelToken.source()
let HTTP = axios.create({
  baseURL: 'http://easy-mock.com/mock/59d02e089cabc90bb5e4fe90/example',
  timeout: 1000,
  responseType: 'json',
  // 查询字符串params
  // params: {
  //   book: '123'
  // },
  headers: {
    'custom-header': 'hello',
    'content-type': 'application/x-www-form-urlencoded'
  }
  // transformRequest中是个数组，传递一个或多个函数（可以转换多次），函数的参数是我们传递给后端的数据,注意，他没有返回值，需要用return,否则默认undefined
  // transformRequest: [function (data) {
  //   console.log(data)
  //   // data.age = 14
  //   return queryString.stringify(data)
  // }],
  // // transformResponse对请求回来的数据做进一步处理,也要手动设置return返回值
  // transformResponse: [function (data) {
  //   console.log('transformResponse' + '\n' + data)
  //   data.abc = '123'
  //   return data
  // }],
  // cancelToken: source.token
  // 验证状态码在哪个范围内属于成功，哪个范围内属于失败,如果在validateStatus中用return返回true,则一律是成功的,包括之后写的404
  // validateStatus (status) {
  //   console.log(status)
  //   return status < 400
  // }
})
// 请求拦截器,config参数为配置参数
HTTP.interceptors.request.use(function (config) {
  // 在发送请求之前做某事
  console.log('拦截')
  console.log(config)
  // 拦截请求后不让请求发送成功则不使用return返回配置参数
  // return config
}, function (err) {
  // 请求错误时做些事
  return Promise.reject(err)
})

HTTP.interceptors.response.use(function (data) {
  console.log('response:')
  console.log(data)
  // 如果不使用return返回拦截则为空
  return data
})

export default {
  name: 'hello',
  data () {
    return {
      msg: '分分钟搞定axios'
    }
  },
  created () {
    // HTTP.post('list', {
    //   test: 'hello',
    //   username: 'Vue'
    // })
    function http1 () {
      return HTTP.get('axios')
    }
    function http2 () {
      return HTTP.post('list')
    }
    // 取对应的请求结果
    axios.all([http1(), http2()]).then(axios.spread((res1, res2) => {
      console.log(res1)
      console.log(res2)
    }))
    .catch((err) => {
      if (axios.isCancel(err)) {
        console.log(err.message)
      } else {
        console.log(err)
      }
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
