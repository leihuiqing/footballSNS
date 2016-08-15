var guideTxt=require("../templates/guide.string");

SPA.defineView("guide",{
	html:guideTxt,
	plugins:["delegated"],
	bindEvents:{
		show:function(){
			var mySwiper = new Swiper('.swiper-container', {
				autoplay: 2000,//可选选项，自动滑动；
				loop:true 	//循环播放；
			}) 
		}
	},
	bindActions:{
		"open-btn":function(){
			SPA.open("index");	
		}
	}

})