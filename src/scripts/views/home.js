var homeTxt=require("../templates/home.string");


var util=require("../util/util");


SPA.defineView("home",{
	html:homeTxt,
	plugins:["delegated",{
		name:"avalon", //应用avalon插件
		options:function(vm){
			vm.livedata=[] //vm是一个对象，可以任意添加属性及方法
		}
	}],
	init:{
		homeSwiper:null,
		hotSwiper:null,
		vm:null,
		arr:[],
		//套用排版模板，转换data数据为二维数组
		formatData:function(data){
			var tempArr=[];
			for(var i=0,len=Math.ceil(data.length/2);i<len;i++){
				tempArr[i]=[];
				tempArr[i].push(data[i*2],data[i*2+1]);
			}
			return tempArr;
		}
	},
	bindEvents:{
		beforeShow:function(){
			//获取vm;
			this.vm=this.getVM();
			//this是对当前视图的引用
			var _this=this;
			$.ajax({
				//url:"/football-app/mock/livelist.json",
				url:"/api/getLivelist.php", //线上的请求地址;
				data:{rtype:"origin"},
				success:function(rs){
					//必须将json数据挂接到vm上。
					_this.arr=rs.data;
					_this.vm.livedata=_this.formatData(rs.data);
					//console.log(vm.livedata);	
				},
				error:function(){
					console.log("请求失败");
				},
			})
		},		
		show:function(){
			var _this=this;			
	 		//tab切换 
	 		this.hotSwiper = new Swiper('#hot-container',{
	 			loop:false,
	 			onSlideChangeStart:function(swiper){
	 				//参数swiper是对new Swiper出来的实例化对象引用。
	 				var index=swiper.activeIndex, //activeIndex得到当前下标;
	 					lis=$("#hot-title li");
	 					util.setFocus(lis.eq(index));
	 			}
	 		})
	 		this.homeSwiper = new Swiper('#pic-container',{
	 			loop:false,
	 			onSlideChangeStart:function(swiper){
	 				//参数swiper是对new Swiper出来的实例化对象引用。
	 				var index=swiper.activeIndex, //activeIndex得到当前下标;
	 					lis=$(".m-home nav li");
	 					util.setFocus(lis.eq(index));
	 			}
	 		})

	 		//加载刷新
	 		var myScroll=this.widgets.scrolllist;
	 		//console.log(myScroll);
	 		var scrollSize=30;
	 		myScroll.scrollBy(0,-scrollSize);

	 		var head=$(".head img"),
	 			topImgHasClass=head.hasClass("up");
	 		var foot=$(".foot img"),
	 			bottomImgHasClass=head.hasClass("down");

	 		myScroll.on("scroll",function(){
	 			var y=this.y,
	 				MaxY=this.maxScrollY-y;
	 			if(y>=0){
	 				!topImgHasClass && head.addClass("up");
	 				return "";
	 			}
	 			if(MaxY>=0){  
	 				!bottomImgHasClass && foot.addClass("down");
	 				return "";
	 			}
	 		})

	 		myScroll.on("scrollEnd",function(){
	 			if(this.y>=-scrollSize && this.y<0){
	 				myScroll.scrollTo(0,-scrollSize);
	 				head.removeClass("up");
	 			}else if(this.y>=0){
	 				head.attr("src","/football-app/images/pics/ajax-loader.gif");

	 				//请求刷新数据
	 				$.ajax({
	 					//url:"/football-app/mock/livelist-more.json",
						url:"/api/getLivelist.php", //线上的请求地址;
						data:{rtype:"refresh"},
						success:function(rs){
							_this.vm.livedata=_this.formatData(rs.data.concat(_this.arr));
							_this.arr=rs.data.concat(_this.arr);
						}
	 				})

	 				myScroll.scrollTo(0,-scrollSize);
	 				head.removeClass("up");
	 				head.attr("src","/football-app/images/pics/arrow.png");
	 				

	 				
	 			}

	 			var maxY=this.maxScrollY-this.y;
	 			var self=this;
	 			if(maxY>-scrollSize && maxY<0){
	 				myScroll.scrollTo(0,self.maxScrollY+scrollSize);
	 				foot.removeClass("down");
	 			}else if(maxY>=0){
	 				foot.attr("src","/football-app/images/pics/ajax-loader.gif");
	 				//请求加载数据

	 				$.ajax({
	 					//url:"/football-app/mock/livelist-more.json",
						url:"/api/getLivelist.php", //线上的请求地址;
						data:{rtype:"more"},
						success:function(rs){
							_this.vm.livedata=_this.formatData(_this.arr.concat(rs.data));
							_this.arr=_this.arr.concat(rs.data);
						}
	 				})

	 					myScroll.refresh();
	 					
	 					myScroll.scrollTo(0,self.y);
	 					foot.removeClass("down");
	 					foot.attr("src","/football-app/images/pics/arrow.png");
	 				
	 			}
	 		})

	 				
		}
	},
	bindActions:{
		"tabs":function(e){
			//通过参数e的el方法获取当前点击的对象
			var i=$(e.el).index();
			//通过swiper的slideTo方法切换指定的slide
			this.homeSwiper.slideTo(i);
		},
		"hot-tab":function(e){
			//通过参数e的el方法获取当前点击的对象
			var i=$(e.el).index();
			//通过swiper的slideTo方法切换指定的slide
			this.hotSwiper.slideTo(i);
		},
		"goto.detail":function(e,data){
			SPA.open("detail",{
				param:data
			});
		}
	}
})