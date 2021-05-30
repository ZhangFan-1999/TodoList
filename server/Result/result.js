var ERROR_CODE=-1
var SUCCESS_CODE=0
// 创建一个服务端数据返回对象
class Result{
  // constructor()方法是类的默认方法，通过new命令生成对象实例时，自动调用该方法
  // 一个类必须有constructor()方法
  constructor(data,msg) {
    this.data = data
    this.msg = msg
  }
  // 创建一个基础的响应数据对象
  createResult() {
    let base = {
      code: this.code,
      data:this.data,
      msg: this.msg
    }
    return base
  }
  // 重写一下json方法
  json(res){
    res.json(this.createResult())
  }
  success(res) {
    this.code = SUCCESS_CODE
    this.json(res)
  }
  fail(res) {
    this.code = ERROR_CODE
    this.json(res)
  }
}
module.exports = Result