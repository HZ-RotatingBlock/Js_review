//后台管理模块
let express = require("express");
let router = express.Router();
let User = require("../models/User");
let Category = require('../models/Category');
let Content = require('../models/Content');
router.use( (req,res,next) => {
    if(!req.userInfo.isAdmin){
        //如果当前用户为非管理员的处理
        res.send('对不起，只有管理员才可以进入后台管理');
        return;
    }
    next();
});
// 首页
router.get('/', (req,res,next) => {
    res.render('admin/index',{
        userInfo: req.userInfo
    });
})

// 用户管理
router.get('/user', (req,res) => {
    //从数据库当中读取所有的用户数据
    // limit(Number):限制获取的数据条数
    // skip():忽略数据的条数
    //每页显示两条
    //读取记录
    let page = Number(req.query.page || 1);
    let limit = 10;
    let skip = 0;
    let pages = 0;
    //数据库查询当前数据总条数
    User.count().then( (count) => {
        //计算总页数
        pages = Math.ceil( count / limit );
        //取最小值，若当前页数超页数总数则取当前页数值，防止超过总页数
        page = Math.min( page,pages );
        //同时取值不能小于1
        page = Math.max( page,1 ); 
        skip = (page - 1) * limit;
        User.find().limit(limit).skip(skip).then( (users) => {
            res.render('admin/user_index',{
                userInfo: req.userInfo,
                users: users,
                page: page,
                count: count,
                pages: pages,
                limit: limit
            })
        });
    });    
});
//分类首页
router.get('/category',(req,res,) => {
    let page = Number(req.query.page || 1);
    let limit = 10;
    let skip = 0;
    let pages = 0;
    //数据库查询当前数据总条数
    Category.count().then( (count) => {
        //计算总页数
        pages = Math.ceil( count / limit );
        //取最小值，若当前页数超页数总数则取当前页数值，防止超过总页数
        page = Math.min( page,pages );
        //同时取值不能小于1
        page = Math.max( page,1 ); 
        skip = (page - 1) * limit;
        //sort()数据排序，选择按照什么排序并规定排序顺序, 1 为升序(从小到大) , -1 为降序(从大到小)
        Category.find().sort({_id: -1}).limit(limit).skip(skip).then( (categories) => {
            res.render('admin/category_index',{
                userInfo: req.userInfo,
                categories: categories,
                page: page,
                count: count,
                pages: pages,
                limit: limit
            })
        });
    });
});
//分类的添加
router.get('/category/add', (req,res) => {
    res.render('admin/category_add',{
        userInfo: req.userInfo
    });
});
//分类的保存
router.post('/category/add',(req,res) => {
    let name = req.body.name || "";
    if(name == ""){
        res.render('admin/error',{
            userInfo: req.userInfo,
            message: '名称不能为空'
        });
        return;
    }
    //数据库中是否已经存在同名分类名称
    Category.findOne({
        name: name
    }).then((rs) => {
        if(rs){
            //数据库中已经存在该分类了
            res.render('admin/error',{
                userInfo: req.userInfo,
                message: '分类已经存在了'
            })
            return Promise.reject();
        }else{
            //数据库中不存在该分类，可以保存
            return new Category({
                name: name
            }).save();
        }    
    }).then((newCategory) => {
        res.render('admin/success',{
            userInfo: req.userInfo,
            message: '分类保存成功',
            url: '/admin/category'
        });
    });
});
//分类修改
router.get('/category/edit',(req,res) => {
    //获取要修改的分类信息，并且用表单形式展现出来
    let id = req.query.id || '';
    //获取要修改的分类信息
    Category.findOne({
        _id: id
    }).then( (category) => {
        if(!category){
            res.render('admin/error',{
                userInfo: req.userInfo,
                message: '分类信息不存在'
            });
        }else{
            res.render('admin/category_edit',{
                userInfo: req.userInfo,
                category: category
            });
        }
    })
});
//分类的修改保存
router.post('/category/edit',(req,res) => {
    //获取要修改的分类信息，并且用表单形式展现出来
    let id = req.query.id || '';
    // 获取post提交过来的的名称
    let name = req.body.name || "";
    //获取要修改的分类信息
    Category.findOne({
        _id: id
    }).then( (category) => {
        if(!category){
            res.render('admin/error',{
                userInfo: req.userInfo,
                message: '分类信息不存在'
            });
            return Promise.project();
        }else{
            //当用户没有做任何的修改提交的时候    
            if(name == category.name){
                res.render('admin/success',{
                    userInfo: req.userInfo,
                    message: '修改成功',
                    url: '/admin/category'
                });
                console.log(url);
                return Promise.project();
            }else{
                //要修改的分类名称是否已经在数据库中存在
                return Category.findOne({
                    //$ne为mongoDB的查询条件，表示不相等
                    _id: {$ne: id},
                    name: name
                })
            }
        }
    }).then( (sameCategory) => {
        if(sameCategory){
            res.render('admin/error',{
                userInfo: req.userInfo,
                message: '数据库中已经存在同名分类'
            });
            return Promise.reject();
        }else{
            //更新数据
            return Category.update({
                _id: id
            },{
                name: name
            })
            console.log(url);
        }
    }).then( () => {
        res.render('admin/success',{
            userInfo: req.userInfo,
            message: '修改成功',
            url: '/admin/category'
        });
    })
});
//分类删除
router.get('/category/delete',(req,res) => {
    //获取要删除的分类id
    let id = req.query.id || "";
    Category.remove({
        _id: id
    }).then( () => {
        res.render('admin/success',{
            userInfo: req.userInfo,
            message: '删除成功',
            url: '/admin/category'
        })
    })
})
//内容首页
router.get('/content',(req,res) => {
    let page = Number(req.query.page || 1);
    let limit = 10;
    let skip = 0;
    let pages = 0;
    //数据库查询当前数据总条数
    Content.count().then( (count) => {
        //计算总页数
        pages = Math.ceil( count / limit );
        //取最小值，若当前页数超页数总数则取当前页数值，防止超过总页数
        page = Math.min( page,pages );
        //同时取值不能小于1
        page = Math.max( page,1 ); 
        skip = (page - 1) * limit;
        //MongoDB是文档型数据库，不是关系型数据库所以mongoose封装了一个populate()方法来关联其他文件
        Content.find().limit(limit).skip(skip).populate(['category','user']).sort({addTime: -1}).then( (contents) => {
            console.log(contents);
            res.render('admin/content_index',{
                userInfo: req.userInfo,
                contents: contents,
                page: page,
                count: count,
                pages: pages,
                limit: limit
            })
        });
    }); 
});
//内容添加
router.get('/content/add',(req,res) => {
    Category.find().sort({ _id: -1}).then( (categories) => {
        res.render('admin/content_add',{
            userInfo: req.userInfo,
            categories: categories
        });
    });
    
});
//内容保存
router.post('/content/add',(req,res) => {
    // console.log(req.body);
    if(req.body.category == ''){
        res.render("admin/error",{
            userInfo: req.userInfo,
            message: '内容分类不能为空'
        });
        return;
    }
    if(req.body.title == ''){
        res.render("admin/error",{
            userInfo: req.userInfo,
            message: '内容标题不能为空'
        });
        return;
    }
    //保存到数据库
    new Content({
        category: req.body.category,
        title: req.body.title,
        user: req.userInfo._id.toString(),
        description: req.body.description,
        content: req.body.content
    }).save().then( (rs) => {
        res.render('admin/success',{
            userInfo: req.userInfo,
            message: '内容保存成功',
            url: '/admin/content'
        })
    })
});
//修改内容
router.get('/content/edit',(req,res) => {
    let id = req.query.id || '';
    let categories = [];
    Category.find().sort({ _id: -1}).then( (rs) => {
        categories = rs;
        return Content.findOne({
            _id: id
        }).populate('category');
    }).then( (content) => {
        if(!content){
            res.render('admin/error',{
                userInfo: req.userInfo,
                message: '指定内容不存在'
            });
            return Promise.reject();
        }else{
            res.render('admin/content_edit',{
                userInfo: req.userInfo,
                categories: categories,
                content: content
            });
        }
    }); 
});
//保存修改内容
router.post('/content/edit',(req,res) => {
    let id = req.query.id || '';
    if(req.body.category == ''){
        res.render("admin/error",{
            userInfo: req.userInfo,
            message: '内容分类不能为空'
        });
        return;
    }
    if(req.body.title == ''){
        res.render("admin/error",{
            userInfo: req.userInfo,
            message: '内容标题不能为空'
        });
        return;
    }
    //数据库内容更新update()方法：第一个参数是条件，第二个是保存的内容
    Content.update({
        _id: id
    },{
        category: req.body.category,
        title: req.body.title,
        description: req.body.description,
        content: req.body.content
    }).then( () => {
        res.render('admin/success',{
            userInfo: req.userInfo,
            message: '内容保存成功',
            url: '/admin/content/edit?id=' + id
        })
    })
})
//内容删除
router.get('/content/delete',(req,res) => {
    let id = req.query.id || '';
    Content.remove({
        _id: id
    }).then( () => {
        res.render('admin/success',{
            userInfo: req.userInfo,
            message: '删除成功',
            url: '/admin/content'
        })
    })
})
module.exports = router;
