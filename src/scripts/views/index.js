var HTMLtxt=require("../templates/index.string");

var util=require("../util/util");

SPA.defineView("index",{
	html:HTMLtxt,
	//必须调取delegated插件，才能绑定bindActions事件；
	plugins:["delegated"],
	//设置显示默认页面
	modules:[{
		name:"content",		//子视图名称，用于引用的句柄；
		defaultTag:"home",  //默认页面；
		views:["home","find","my"],  //所有子视图集；
		container:".m-wrapper"  //子视图在主视图中显示的容器；
	}],
	bindEvents:{
		show:function(){}         
	},
	bindActions:{
		"switch.tabs":function(e,data){
			util.setFocus($(e.el));			
			this.modules.content.launch(data.tag);		
			//console.log(data);	
		},
		"goto.my":function(){
			SPA.open("login",{
				ani:{
					name:"dialog",
					width:280,
					height:200
				}
			})
		}
	}
})

document.addEventListener("touchmove",function(e){e.preventDefault()},false);



