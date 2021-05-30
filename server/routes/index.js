var express = require('express');
var router = express.Router();
var Result =require("../Result/result")
// 引入数据库模型
var User =require('../models/User')
// 登录
router.post('/login',(req,res)=>{
  // 更新用户的登录状态为true
  User.findOne({
    userName:req.body.userName, 
    passWord:req.body.passWord
  },(err,data)=>{
    if(err||!data){
      new Result({},"账号或密码错误").fail(res)
    }else{
      User.updateOne({userName:req.body.userName},{$set:{loginStatus:true}},(err,doc)=>{
        if(!err){
          User.find({userName:req.body.userName},(err,doc)=>{
            if(!err){
              let user=doc[0]
              new Result({user,loginStatus:true},"登录成功").success(res)
            }
          })
        }
      })
    }
  })
})
// 退出登录
router.post('/logout',(req,res)=>{
  // 更新用户的登录状态为true
  User.findOneAndUpdate({userName:req.body.userName},{$set:{loginStatus:false}},(err,data)=>{
    if(!err){
      User.find({userName:req.body.userName},(err,doc)=>{
        if(!err){
          let user=doc[0]
          new Result({user,loginStatus:false},"退出登录").success(res)
        }
      })
    }
  })
})
// 注册
router.post('/register',(req,res)=>{
  User.findOne({userName:req.body.userName},function(err,data){
    if(err){
      new Result({},"服务器异常请稍后重试！").fail(res)
    }else if(data){
      new Result({},"该用户名已被注册!").fail(res)
    }else{
      User.create({
        userName:req.body.userName,
        passWord:req.body.passWord
      },(err,data)=>{
        if(!err){
          // 注册成功后将数据用户数据返回给前端
          new Result(data,"注册成功").success(res)
        }
      })
    }
  })
})

// 添加任务
router.post("/add",function(req,res){
  User.updateOne({userName:req.body.userName},{$addToSet:{todo:req.body.todo}},function(err,data){
    // nModified=1说明没有重复添加
    if(data.nModified==1){
      User.findOne({userName:req.body.userName},(err,data)=>{
        var user=data
        if(!err){
          new Result({user,loginStatus:true},"任务添加成功！").success(res)
        }
      })
    }else{
      new Result({},"该任务还未完成！").fail(res)
    }
  })
})

// 删除指定任务
router.post("/delete",function(req,res){
  User.findOne({userName:req.body.userName},function(err,data){
    if(!err){
      // 删除当前索引元素
      data.todo.splice(req.body.index,1)
      // 生成新的数组
      var newTodo=data.todo
      // 再把原数据库中的todo换掉
      User.updateOne({userName:req.body.userName},{$set:{todo:newTodo}},function(err,data){
        if(data.n==1&&data.nModified==1){
          User.findOne({userName:req.body.userName},function(err,data){
            var user=data
            new Result({user,loginStatus:true},"任务完成帮帮哒！").success(res)
          })
        }
      })
    }else{
      new Result({},"服务器繁忙稍后再试！").fail(res)
    }
  })
})

module.exports = router;
