<template>
  <div class="hello">
    <h2>分分钟学会Vue/NodeJS/MongoDB组合</h2>
    <Counter :num="num" @incre="increment" @decre="decrement"></Counter>
    <p>parent:{{num}}</p>
  </div>
</template>

<script>
import Counter from './Counter'
export default {
  data () {
    return {
      num: 10
    }
  },
  name: 'hello',
  components: {
    Counter
  },
  methods: {
    increment () {
      this.num++
    },
    decrement () {
      this.num--
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
