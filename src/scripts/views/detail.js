var detailHTML=require("../templates/detail.string");

SPA.defineView("detail",{
	html:detailHTML,
	plugins:["delegated",{
		name:"avalon",
		options:function(vm){
			vm.img=null,
			vm.title=null,
			vm.describe=null,
			vm.isVisible=true
		}
	}],
	bindActions:{
		"goto.index":function(){
			SPA.open("index");
		}
	},
	bindEvents:{
		show:function(){
			//console.log(this);
			var myScroll=this.widgets.listScroll;
			   setTimeout(function(){
				var top=$(".nav").offset().top-44;	
				console.log(top)		
				myScroll.on("scroll",function(){
					console.log(this.y)
					var nav=$(".m-detail").siblings(".nav");
					//当this.y的距离超过固定盒子到顶部的距离并且外面没有盒子时把nav盒子克隆到没有iscroll的大盒子外部即可加固定定位
					if(this.y<=-top && nav.length==0){
						$(".m-detail").after($(".nav").clone(true).addClass("fixed"));
					}else if(this.y>-top){
						//条件不满足是把克隆出来的盒子remove掉； 
						nav.removeClass("fixed").remove();
					}
				})
			},2000)
			
			//当滚动时实现页面中间导航固定

			
			//获取参数
			var id=this.param.id;
			var vm=this.getVM();
			$.ajax({
				url:"/api/getLivelist.php",
				data:{					
					id:id //传递参数
				},
				success:function(rs){
					setTimeout(function(){
						var data=rs.data;
						vm.img=data[id-1].img;
						vm.title=data[id-1].title;
						vm.describe=data[id-1].describe;
						vm.isVisible=false;
					},1000)					
				}
			})
		}
	}
})
