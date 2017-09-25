//存取localStorage中的数据
let store = {
    save(key,value){
        localStorage.setItem(key,JSON.stringify(value));
    },
    fetch(key){
        return JSON.parse(localStorage.getItem(key)) || [];
    }
}
// let list = [
//     {
//         title: "吃饭打漏漏",
//         // 不选中状态
//         isChecked: false
//     },
//     {
//         title: "Hello Vue",
//         // 不选中状态
//         isChecked: false
//     },
//     {
//         title: "Hello NodeJS",
//         isChecked: true
//     }
// ];
let list = store.fetch("test-list");
let filter = {
    all: function(list){
        return list;
    },
    finished : function(list){
        return list.filter(function(item){
            return item.isChecked;
        });
    },
    unfinished : function(list){
        return list.filter(function(item){
            return !item.isChecked;
        });
    }
}
let vm = new Vue({
    el: ".main",
    data: {
         list: list,
         todo: "",
        //  记录正在编辑的数据
         editorTodos: "",
         // 记录正在编辑的数据的title
         beforeTitle: "",
        //  通过属性值的变化对数据进行筛选
         visibility: "all"
    },
    //潜监控和深监控
    watch: {
        // 监控list这个属性，当这个属性对应的值发生变化就会执行函数
        // 1.潜监控
        // list: function(){
        //     store.save("test-list",this.list);
        // }
        //2.深监控
        list: {
            handler: function(){
                store.save("test-list",this.list);
            },
            deep: true
        }
    },
    computed: {
        noCheckedLength: function(){
            return this.list.filter( (item) => {
                return !item.isChecked;
            }).length;
        },
        filteredList: function(){
            //过滤的三种情况 all finished unfinished       
            return filter[this.visibility] ? filter[this.visibility](this.list) : list;
        },
        optionTab: function(){
            if(this.visibility == "all"){
                return 1;
            }else if(this.visibility == "unfinished"){
                return 2;
            }else{
                return 3;
            }
        }
    },
    methods: {
         //添加任务
         addTodo(data,ev){
            //向list中添加一项任务
            //事件中的this指向的是当前这个根实例
            //将数据添加进list中
            //数据驱动视图用todo，这里的todo与前端v-model进行了双向数据绑定因此同步了数据
            if(this.todo != ""){
                this.list.push({
                    title: this.todo,
                    isChecked: false
                });
                this.todo = "";
            }         
         },
         //删除任务
         deleteTodo(item){
            let index = this.list.indexOf(item);
            this.list.splice(index,1);
         },
         //编辑任务
         editorTodo(item){
            //记录当前编辑的内容，以便取消编辑时返回内容
            this.beforeTitle = item.title;
             //比较操作的是否是当前的元素
            this.editorTodos = item;
            
         },
         //编辑任务成功
         editorTodoed(item){
            this.editorTodos = "";
         },
         //取消编辑任务，将内容回到编辑前的的内容
         cancelTodo(item){
            item.title = this.beforeTitle;
            this.beforeTitle = "";
            //状态转换
            this.editorTodos = "";
         }
     },
     directives: {
         "focus": {
             //数据更新时触发update(el,binding)，el指当前指令正在绑定的函数,
             update(el,binding){
                if(binding.value){
                    el.focus();
                }
             }
         }
     }
});
function watchHashChange(){
    let hash = window.location.hash.slice(1);
    vm.visibility = hash;
}
watchHashChange();
window.addEventListener("hashchange",watchHashChange);