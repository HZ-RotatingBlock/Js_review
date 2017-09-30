<template>
  <div>
    <h2>简易加法计算器</h2>
    <div>
      <input type="button" value="-" @click="deHandle({de:5})"/>
      <span>{{count}}</span>
      <input type="button" value="+" @click="addHandle"/>
      <p>{{num2}}</p>
    </div>
  </div>
</template>

<script>
    import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'
    export default {
      // computed: {
        // num () {
        //   // 已经注入的实例在每个组件的实例中都可以访问到(在这里访问了this.$store.state.count)
        //   return this.$store.state.count
        // },
        // num2 () {
        //   return this.$store.getters.filterCount
        // }
      // },
      // computed: mapState ({
        // 写法一
        // num: state => state.count
        // 写法二
        // num: 'count
        // 写法三
        // num (state) {
        //   return state.count + 100
        // }
        // 写法四
        // count: 'count'
      // }),
      // 写法五
      // computed: mapState(['count']),
      computed: {
        abc () {
          return 123
        },
        ...mapGetters({
          num2: 'filterCount'
        }),
        ...mapState(['count'])
      },
      methods: {
        // addHandle () {
          // 改变状态,提交mutations addIncrement,用commit提交,提交值即为容器对应的键,同时还可以传递额外的参数,传多值时可传递参数，容器用payload接收井读取
          // this.$store.commit('addIncrement', {
          //   n: 5
          // })
          // 触发一个action,要触发action需要使用dispatch,第一个参数为触发的action的函数的名字
          // this.$store.dispatch('addAction')
        // },
        ...mapActions ({
          addHandle: 'addAction'
        }),
        // 需要额外传参时可以在上方模板出事件触发的同时传入参数
        ...mapMutations({
          deHandle: 'deIncrement'
        }),
        // deHandle () {
          // this.$store.commit('deIncrement')
          // 另一种参数传递方式,其中type指定是更改mutations的哪个类型，下方de(自取)是更改的值
        //   this.$store.commit({
        //     type: 'deIncrement',
        //     de: 10
        //   })
        // }
      }

    }
</script>
<style>

</style>
