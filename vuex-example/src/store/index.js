import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 定义一个容器
let store = new Vuex.Store({
  // 将状态数据全部放入state对象中
  state: {
    count: 100
  },
  // getters方法类似于计算属性
  getters: {
    filterCount (state) {
      return state.count >= 120 ? 120 : state.count
    }
  },
  // 提交mutations时，状态必须是同步的，也就是状态一旦发上改变，则其他也必须同步更改，如果包含异步操作则需要用到actions
  mutations: {
    // 使用payload读取传递过来的对象及其中的参数
    addIncrement (state, payload) {
      // setTimeout( () => {
      //   state.count += payload.n
      // },1000)
      state.count += payload.n

    },
    deIncrement (state, payload) {
      state.count -= payload.de
    }
  },
  // actions用于异步操作
  actions: {
    // 这里的context指的不是当前的实例而是一个对象，这个对象包含了和实例一样的一些方法
    addAction ({commit, dispatch}) {
      setTimeout ( () => {
        // 改变状态,提交mutations
        commit('addIncrement', {n: 5})
        dispatch('textAction', {test: '测试'})
      }, 1000)
    },
    textAction (context, obj) {
      console.log(obj)
    }

  }
})

export default store
