util={
	setFocus:function(ele){
		ele.addClass("active").siblings().removeClass("active");
	},
	setDate:function(){
		console.log("今天是你的生日");
	}
}

module.exports=util;
