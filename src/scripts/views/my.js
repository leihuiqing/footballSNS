var myTxt=require("../templates/my.string");
SPA.defineView("my",{
	html:myTxt,
	plugins:["delegated"],
	bindEvents:{
		show:function(){
			//解决IScroll和Swiper的冲突;
			//获取视图下指定的widget
			var liveScroll=this.widgets["liveScroll"];
	 		liveScroll.options.scrollX=true;		
	 		liveScroll.options.scrollY=false;
		}
	}
})