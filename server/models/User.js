var mongoose =require("mongoose")
var Schema=mongoose.Schema;
mongoose.connect('mongodb://127.0.0.1:27017/new');
mongoose.connection.on('connected',function(){
	console.log('数据库连接成功!!!');
})
var todoSchema=new Schema({
	userName:{
		type:String,
		required:true
  },
    passWord:{
    type:String,
		// required:true 
  },
	todo:{
		type:Array,
		required:true
	},
	loginStatus:{
		type:Boolean,
		default:false,
			required:true
	}
})
module.exports=mongoose.model('User',todoSchema);