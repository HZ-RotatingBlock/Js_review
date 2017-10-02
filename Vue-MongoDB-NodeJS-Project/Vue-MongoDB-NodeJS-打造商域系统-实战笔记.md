#Vue框架对比


----------


### Vue和React相同点
* 利用虚拟DOM实现快速渲染
* 轻量级
* 响应式组件
* 服务器渲染
* 易于集成路由工具，打包工具以及状态管理工具
* 优秀的支持和社区
### Vue概况
* Vue本身并不是一个框架
* Vue结合周边生态构成一个灵活的、渐进式的框架
### 核心思想
* 数据驱动
* 组件化

----------
#Vue如何实现双向数据绑定？
* Object.defineProperty()函数

    	<input type="text" id="a"/>
    	<span id="b"></span>
    	<script type="text/javascript">
    		let obj = {};
    		Object.defineProperty(obj, 'hello', {
				set: function(newVal){
					document.getElementById('a').value = newVal;
					document.getElementById('b').innerHTML = newVal;
				}
			});
			document.getElementById('a').addEventListener('keyup',function(e){
				obj.hello = e.target.value;
			})
    	</script>

----------

#项目初始化
* cnpm install -g vue-cli
* vue init webpack 项目名
* cd 项目名
* cnpm install (安装依赖)
* cnpm run dev (运行)

----------
#Vue基础语法
* v-bind  -->  动态绑定数据，可以简写为":"
* v-on  -->  绑定事件监听器，可以简写为"@"
* v-text  -->  更新数据，会覆盖已有的结构
* v-html  -->  可以解析数据总的html
* v-show  -->  根据值的真假切换元素的display属性
* v-if  -->  根据元素的真假，切换元素的销毁与重建
* v-else-if  -->  多条件判断，威震则渲染
* v-else  -->  条件都不符合则渲染
* v-for  -->  基于源数据多次渲元素或模块
* v-model  -->  在表单控件元素上创建双向数据绑定
* v-pre  -->  跳过元素和子元素的编译过程
* v-once  -->  只渲染一次，随后数据更新不再重新渲染
* v-click  -->  隐藏为编译的Mustache语法，css中设置{v-clock}{display:block}

----------

#Vue注意点
* Vue不写分号
* 一切以数据驱动，尽可能的少直接操作DOM
* 使用单引号
* 导入组件时，"@"符号表示src文件目录，在build文件下的webpack.base.conf.js文件中可以更改

----------
#Vue项目结构
    .
    |-- build                      	// 项目构建(webpack)相关代码
    |   |-- build.js               	// 生产环境构建代码
    |   |-- check-version.js       	// 检查node、npm等版本
    |   |-- dev-client.js			// 热重载相关
    |   |-- dev-server.js			// 构建本地服务器
    |   |-- utils.js 				// 构建工具相关
    |   |-- webpack.base.conf.js 	// webpack基础配置(项目打包核心配置)
    |   |-- webpack.dev.conf.js  	// webpack开发环境配置
    |   |-- webpack.prod.conf.js 	// webpack生产环境配置
    |-- config  				 	// 项目开发环境配置
    |   |-- dev.env.js   			// 开发环境变量
    |   |-- index.js 				// 项目一些配置变量
    |   |-- prod.env.js  			// 生产环境变量
    |   |-- test.env.js  			// 测试环境变量
    |-- src  // 源码目录
    |   |-- components 				// 存储vue公共组件(一般被页面复用的就放在components)
    |   |-- store  					// vuex的状态管理
    |   |-- App.vue					// 页面入口文件
    |   |-- main.js					// 程序入口文件，加载各种公共组件
	|	|-- views					// 存储比较独立的组件（不复用）
    |-- static  					// 静态文件，比如一些图片，json数据等
    |   |-- data   					// 群聊分析得到的数据用于数据可视化
    |-- .babelrc 					// ES6语法编译配置
    |-- .editorconfig				// 定义代码格式
    |-- .gitignore   				// git上传需要忽略的文件格式
    |-- README.md					// 项目说明
    |-- favicon.ico 
    |-- index.html   				// 入口页面
    |-- package.json 				// 项目基本信息
    .

----------
# Vue模板语法
* Mustanche语法: {{ msg }}
* Html赋值: v-html=""
* 绑定属性: b-bind:id=""
* 使用表达式: {{ ok ? 'Yes' : 'No' }}
* 文本赋值: v-text=""
* 指令（决定销毁和重构）: v-if=""
* 过滤器: {{ message || capitalize }} 和 v-bind:id="rawId | formatId"

----------

#Class和Style绑定
* **对象语法**: v-bind:class="{active:isActive,'text-danger':hasError}"
* **数组语法**:

    	<div v-bindLclass="{activeClass, errorClass}"
		
		data: {
			activeClass: 'active',
			errorClass: 'text-danger'
		}
* **style绑定-对象语法**: v-bind:style="{color:activeColor,fontSize:fontSize + 'px'}"

----------

#条件渲染
* v-if
* v-else
* v-else-if
* v-show
* v-clock （页面加载过快导致代码未能及时渲染时使用v-clock可以隐藏代码）

----------

#事件处理器
* v-on:click="方法名"或@click="事件名
* v-on:click.stop  -->  阻止冒泡
* v-on:click.stop.prevent  -->  阻止默认事件
* v-on:click.self  -->  给div绑定事件的对象本身，如果div有子元素，当点击子元素时是不起作用的
* v-on:click.once  -->  只给事件生效一次
* v-on:keyup.键名  -->  监听键盘按键事件

----------

#Vue组件
* 全局组件和局部组件
* 父子组件通讯-数据传递
* Slot(插槽)
* 子组件通过$emit('父组件事件名')来触发父组件的自定义事件

----------

#Vue-router 路由
###什么是前端路由？
* 路由时根据不同的url地址展示不同的内容或页面
* 前端路由就是把不同路由对应不同的内容或页面任务交给前端来做，之前是通过服务端根据url的不同的页面实现的
###什么时候使用前端路由？
* 在单页面应用，大部分页面结构不变，只改变部分内容的使用
###优点
* 用户体验好，不需要每次从服务器全部获取，快速展现给用户
###缺点
* 不利于SEO
* 使用浏览器的前进，后退会重新发送请求，没有合理的利用缓存
* 单页面无法记住之前的滚动的位置，无法在前进，后退的时候记住滚动的位置（Vue2.3已经可以）

----------

#路由基础
* vue-router用来构建SPA
* <router-link to="url"></router-link>或者this.$router.push({path:''})(编程式的路由)  -->  路由的跳转标签，鼠标点击后跳转到to指定的url，实质上是渲染了一个a标签
* <router-view></router-view>  -->  组件渲染的位置

----------
#动态路由匹配（实质上是对BOM的history的封装）
###什么是动态路由？(实例：商城详情页面根据商品的id来查询对应的信息显示不同的内容)
* **模式**：/user/:username  -->  **匹配路径**：/user/evan  -->  **$route.params**:  { username: 'evan' }
* **模式**：/user/:username/post/:post_id  -->  **匹配路径**：/user/evan/post/123  -->  **$route.params**:  { username: 'evan', post_id: 123 }
* **$route.params**可以取到动态路由后动态的值如'/user/:username'可以用$route.params.username取到其后的':username'
* 通过在路由声明处指定mode来设置url的模式，默认是'hash',可更改为'history'(主流加载模式),此时url就不会像hash那样默认出现#

----------
#嵌套路由
* 路由嵌套路由
* 注意router-link to中要写绝对路径，因为他不会自动拼接路径
* 在路由中定义子路由用children,它是一个数组

	    export default new Router({
	    	routes: [
	    		{
	    			path: '/goods',
	    			name: 'GoodsList',
	    			component: GoodsList,
	    			chlidren: [
	    				{
	    					//注意如果路径加'/'就会变成绝对地址（一级路由）
	    					path: 'title'，
	    					name: 'title',
	    					//组件名习惯大写
	    					component: Title
	    				},
				        {
				          path: 'image',
				          name: 'image',
				          component: Image
				        }
	    			]
	    		}
	    	]   
	    })
#编程式路由
* 通过js来四线页面的跳转
* this.$router.push('name')
* this.$router.push({path:'name'})
* this.$router.push({path:'name?a=123'})或者$router.push({path:'name',query:{a:123}})
* this.$router.go(1)  -->  前进或倒退
* {{$route.query.单个路由的属性名}}   -->  获取通过url传递过来的查询字符串的值

----------
#命名路由和命名视图
###什么是命名路由和命名视图
* 给路由定义不同的名字，根据名字进行匹配
* 给不同的router-view定义名字，通过名字进行对应组件键的渲染
* 通过命名式路由实现跳转时要注意设置为动态绑定的形式(不能直接写to，否则就相当于写了个原生属性)

    	//注意下面的params指的是路由的参数，并不是页面之间跳转的参数
		<router-link v-bind:to="{name: '路由名'，params:{Id:Id值}}">
* 命名视图 在同一页面渲染多个视图：

		
		//App.vue
		<div id="app">
		    <img src="./assets/logo.png">
		    <router-view class="main"></router-view>
			<!--下方的name的值对应组件的命名-->
		    <router-view class="left" name="title"></router-view>
		    <router-view class="right" name="img"></router-view>
		 </div>


		//roter/index.js
		import Vue from 'vue'
		import Router from 'vue-router'
		import GoodsList from '@/views/GoodsList'
		import Title from '@/views/Title'
		import Image from '@/views/Image'
		import Cart from '@/views/Cart'
		
		Vue.use(Router)
		export default new Router({
		  mode: 'history',
		  routes: [
		    {
		      path: '/goods',
		      name: 'GoodsList',
			  // 下方原来的component改为components,变为一个对象
			  // 其中default值为默认渲染的组件，其次title和img为渲染Title和Image组件
		      components: {
		        default: GoodsList,
		        title: Title,
		        img: Image
		      }
		    },
		    {
		      path: '/cart/:cartId',
		      name: 'cart',
		      component: Cart
		    }
		  ]
		})
###效果
![](https://i.imgur.com/fbKi4wp.jpg)
#Vue-resource(2.0后不再更新，推荐使用axios)
* 安装： cnpm install vue-resource --save
### vue-resource的请求API时按照REST风格设计的，它提供了7种请求API
* get（url,[options])
* head(url,[options])
* delete(url,[options])
* jsonp(url,[options])
* post(url,[body],[options])
* put(url,[body],[options])
* patch(url,[body],[options])
![](https://i.imgur.com/0SmMIyg.jpg)
###全局拦截器interceptors

	Vue.http.interceptors.push((request, next) => {
			// ...
			// 请求发送前的处理逻辑
			// ...
		next((response) => {
			// ...
			// 请求发送后的处理逻辑
			// ...
			// 根据请求的状态，resonse参数会返回给successCallback或errorCalback
			return resonse
		})
	})


#axios
* axios.request(config)
* axios.get(url[,config])
* axios.delete(url[,config])
* axios.head(url[,config])
* axios.options(url[,config])
* axios.post(url[,data[,config]])
* axios.put(url[,data[,config]])
* axios.patch(url[,data[,config]]))

		//通过定义一个getUserAccount返回一个Promise对象
		function getUserAccount(){
			return axios.get('/user/12345');
		}
		//获取用户权限，也是返回Promise对象
		function getUserPermissions(){
			return axios.get('/user/12345/permissions');
		}
		//可以同时将getUserAccount接口和getUserAccount同时传递到数组中取，同时获得两个接口
		axios.all([getUserAccount(), getUserPermissions()]).then(axios.spread(function(acct,perms)){
			//Both requests are now complete
		}));
* axios与vue-resource有个区别是，axios没有挂载到实例中，而vue-resource挂载在实例中,axios直接暴露全局变量axios

		new Vue({
        el: "#app",
        data: {
          msg: ""
        },
        // axios的全局拦截器
        mounted: function(){
          // http请求拦截器
          axios.interceptors.request.use((config) => {
            console.log("请求拦截");
            //...
            // 添加loading处理等。。
            //...
            return config;
          })
          // http响应拦截器
          axios.interceptors.response.use((res) => {
            console.log("响应拦截")
            return res;
          })
        },
        methods: {
          get () {
            // axios.get请求
            axios.get("../package.json", {
              // 附带在get请求上的查询字符串
              params: {
                userId: "999"
              },
              // 附带请求头
              headers: {
                token: 'jack'
              }
            }).then( (res) => {
              this.msg = res.data
              console.log(this.msg);
            }).catch((err) => {
              console.log('请求失败！错误信息：' + err)
            })
          },
          post(){
            axios.post("../package.json", {
              userId: "888"
            },{
              headers: {
                token: "tom"
              }
            }).then( res => {
              this.msg = res.data;
              console.log(this.msg)
            })
          },
          http: function(){
            axios({
              url: "../package.json",
              method: "get",
              //post请求附带信息需要使用data设置而不是params
              data: {
                userId: "101"
              },
              //get请求附带信息系需要使用params设置而不是data
              params: {
                userId: "102"
              },
              headers: {
                token: "http-test"
              }
            }).then((res) => {
              console.log(res.data)
            }).catch((err) => {
              console.log("请求错误，错误信息：" + err)
            })
          }
        }
      });



		
	    
