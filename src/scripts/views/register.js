var regTxt=require("../templates/register.string");

SPA.defineView("register",{
	html:regTxt,
	plugins:["delegated"],
	styles:{
		background:"transparent!important"
	},
	                                                                                                                     
	bindActions:{
		"tap.cancel":function(){
			this.hide();
		},
		"tap.sure":function(){
			var tel=$("#tel").val(),
				psw=$("#psw").val(),
				name=$("#name").val(),
				reg=/^1[34578]\d{9}&/;
			if(psw!="" && name!="" && reg.test(tel)){
				console.log("ok")
			}else{
				console.log("shurucuowu")
			}
		}
	}
})