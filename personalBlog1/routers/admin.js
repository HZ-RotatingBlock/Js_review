let express = require('express');
let router = express.Router();
let User = require('../models/User');
let Category = require('../models/Category');
let Content = require('../models/Content');
router.use((req,res,next) => {
    if(!req.userInfo.isAdmin){
        res.send('对不起，只有管理人员才可以进入后台管理~');
        return;
    }
    next();
});
// 首页
router.get('/', (req,res,next) => {
    res.render('admin/index',{
        userInfo: req.userInfo
    });
});
router.get('/user', (req,res) => {
    let page = Number(req.query.page || 1);
    let limit = 10;
    let pages = 0;
    //读取用户数据
    User.count().then( (count) => {
        //总页数
        pages = Math.ceil(count / limit);
        //取值不超过pages
        page = Math.min(page,pages);
        //取值不小于1
        page = Math.max(page,1);
        let skip = (page - 1) * limit;
        User.find().limit(limit).skip(skip).then((users) => {
            //  用户管理
            res.render('admin/user_index',{
                userInfo: req.userInfo,
                users: users,
                page: page,
                pages: pages,
                count: count,
                limit: limit
            });
        });
    });
    
});
// 分类首页
router.get('/category', (req,res) => {
    let page = Number(req.query.page || 1);
    let limit = 10;
    let pages = 0;
    //读取用户数据
    Category.count().then( (count) => {
        //总页数
        pages = Math.ceil(count / limit);
        //取值不超过pages
        page = Math.min(page,pages);
        //取值不小于1
        page = Math.max(page,1);
        let skip = (page - 1) * limit;
        Category.find().sort({_id: -1}).limit(limit).skip(skip).then((categories) => {
            //  用户管理
            res.render('admin/category_index',{
                userInfo: req.userInfo,
                categories: categories,
                page: page,
                pages: pages,
                count: count,
                limit: limit
            });
        });
    });
});
//分类添加
router.get('/category/add', (req,res) => {
    res.render('admin/category_add',{
        userInfo: req.userInfo,
    });
});
//分类保存
router.post('/category/add', (req,res) => {
    let name = req.body.name || '';
    if(name == ''){
        res.render('admin/error',{
            userInfo: req.userInfo,
            message: '名称不能为空'
        });
    }
    //查询数据库是否已存在同分类
    Category.findOne({
        name: name
    }).then( (result) => { 
        if(result){
            //  存在
            res.render('admin/error',{
                userInfo: req.userInfo,
                message: '分类已存在'
            });
            return Promise.reject();
        }else{
            // 不存在
            return new Category({
                name: name
            }).save();
        }
    }).then( (newCategory) => {
        res.render('admin/success',{
            userInfo: req.userInfo,
            message: '分类添加成功',
            url: '/admin/category'
        });
    })
});
// 分类修改
router.get('/category/edit', (req,res) => {
    // 获取要修改的分类信息，并用表单形式展示出来
    let id = req.query.id || '';
    // 获取要修改的分类信息
    Category.findOne({
        _id: id
    }).then( (category) => {
        if(!category){
            res.render('admin/error',{
                userInfo: req.userInfo,
                message: '分类信息不存在'
            });
            return Promise.reject();
        }else{
            res.render('admin/category_edit',{
                userInfo: req.userInfo,
                category: category
            })
        }
    });

})
// 分类的修改保存
router.post('/category/edit',(req,res) => {
    //获取要修改的分类信息，并且用表单形式展现出来
    let id = req.query.id || '';
    // 获取post提交过来的的名称
    let name = req.body.name || "";
    // 获取要修改的分类信息
    Category.findOne({
        _id: id
    }).then( (category) => {
        if(!category){
            res.render('admin/error',{
                userInfo: req.userInfo,
                message: '分类信息不存在'
            });
            return Promise.reject();
        }else{
            // 当用户没有做任何修改的时候
            if(name == category.name){
                res.render('admin/success',{
                    userInfo: req.userInfo,
                    message: '修改成功',
                    url: '/admin/category'
                });
                return Promise.reject();
            }else{
                // 要修改的分类名称是否已存在
                return Category.findOne({
                    _id: {$ne: id},
                    name: name
                })
            }
            
        }
    }).then((sameCategory) => {
        if(sameCategory){
            res.render('admin/error',{
                userInfo: req.userInfo,
                message: '已存在同名分类'
            });
            return Promise.reject();
        }else{
            return Category.update({
                _id: id
            },{
                name: name
            });
        }
    }).then( () => {
        res.render('admin/success',{
            userInfo: req.userInfo,
            message: '修改成功',
            url: '/admin/category'
        });
    });
})
// 分类删除
router.get('/category/delete', (req,res) => {
    let id = req.query.id || '';
    Category.remove({
        _id: id
    }).then( () => {
        res.render('admin/success',{
            userInfo: req.userInfo,
            message: '删除成功',
            url: '/admin/category'
        });
    });
});
//内容首页
router.get('/content', (req,res) => {
    let page = Number(req.query.page || 1);
    let limit = 10;
    let pages = 0;
    //读取用户数据
    Content.count().then( (count) => {
        //总页数
        pages = Math.ceil(count / limit);
        //取值不超过pages
        page = Math.min(page,pages);
        //取值不小于1
        page = Math.max(page,1);
        let skip = (page - 1) * limit;
        Content.find().limit(limit).skip(skip).populate(['category','user']).sort({
            publishTime: -1
        }).then((contents) => {
            //  用户管理
            res.render('admin/content_index',{
                userInfo: req.userInfo,
                contents: contents,
                page: page,
                pages: pages,
                count: count,
                limit: limit
            });
        });
    });
});
// 内容添加
router.get('/content/add', (req,res) => {
    Category.find().sort({_id: -1}).then((categories) => {
        res.render('admin/content_add',{
            userInfo: req.userInfo,
            categories: categories
        });
    });
    
});
// 内容保存
router.post('/content/add', (req,res) => {
    if(req.body.category == ''){
        res.render('admin/error', {
            userInfo: req.userInfo,
            message: '分类内容不能为空'
        });
        return;
    }
    if(req.body.title == ''){
        res.render('admin/error', {
            userInfo: req.userInfo,
            message: '内容标题不能为空'
        });
        return;
    }
    if(req.body.description == ''){
        res.render('admin/error', {
            userInfo: req.userInfo,
            message: '内容简介不能为空'
        });
        return;
    }
    if(req.body.contents == ''){
        res.render('admin/error', {
            userInfo: req.userInfo,
            message: '内容不能为空'
        });
        return;
    }
    // 保存数据到数据库
    new Content({
        category: req.body.category,
        title: req.body.title,
        user: req.userInfo._id.toString(),
        description: req.body.description,
        contents: req.body.contents
    }).save().then((rs) => {
        res.render('admin/success',{
            userInfo: req.userInfo,
            message: '内容保存成功'
        })
    });
});
// 修改内容
router.get('/content/edit', (req,res) => {
    let id = req.query.id || '';
    let categories = [];
    Category.find().sort({_id: -1}).then((rs) => {
        categories = rs;
        return Content.findOne({
            _id: id
        }).populate('category');
    }).then( (content) => {
        if(!content){
            res.render('admin/error', {
                userInfo: req.userInfo,
                message: '指定内容不存在'
            });
            return Promise.project();
        }else{
            res.render('admin/content_edit', {
                userInfo: req.userInfo,
                content: content,
                categories: categories
            })
        }
    });;
});
//保存修改内容
router.post('/content/edit', (req,res) => {
    let id = req.query.id || '';
    if(req.body.category == ''){
        res.render('admin/error', {
            userInfo: req.userInfo,
            message: '分类内容不能为空'
        });
        return;
    }
    if(req.body.title == ''){
        res.render('admin/error', {
            userInfo: req.userInfo,
            message: '内容标题不能为空'
        });
        return;
    }
    Content.update({
        _id: id
    },{
        category: req.body.category,
        title: req.body.title,
        description: req.body.description,
        contents: req.body.contents
    }).then( () => {
        console.log(req.body.contents);
        res.render('admin/success', {
            userInfo: req.userInfo,
            message: '内容修改成功',
            url: '/admin/content'
        });
    });
});
// 内容删除
router.get('/content/delete', (req,res) => {
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