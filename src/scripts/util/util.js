util={
	setFocus:function(ele){
		ele.addClass("active").siblings().removeClass("active");
	},
	myfun:function(){
		console.log("这是在master下的一个分支")
	},
	setDate:function(){
		console.log("今天是你的生日");
	}
}

module.exports=util;
