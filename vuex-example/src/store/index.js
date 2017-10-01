import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
// 容器子模块selectModule/搜索下拉select模块
// 划分模块后，传参时参数将会直接传递到对应子模块中改变状态
// 取值时(找到对应状态): this.$store.state.selectModule.title
let selectModule = {
  state: {
    title: 'hello123',
    list: []
  },
  mutations: {
    changeTitle (state, payload) {
      state.title = payload.title
    },
    changeList (state, list) {
      state.list = list
    }
  },
  actions: {
    getListAction ({commit}) {
      // 发送Ajax请求
      axios.get('http://easy-mock.com/mock/59d02e089cabc90bb5e4fe90/example/list')
      .then( (data) => {
        // 获取数据后提交mutations改变状态
        commit('changeList', data.data)
      }).catch( (error) => {
        console.log(error)
      })
    }
  }
}
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

  },
  modules: {
    selectModule
  }
})

export default store
