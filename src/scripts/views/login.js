var loginTxt=require("../templates/login.string");
SPA.defineView("login",{
	html:loginTxt,
	plugins:["delegated"],
	styles:{
		background:"transparent!important"
	},
	bindActions:{
		"tap.close":function(){
			this.hide();
						
		},
		"tap.register":function(){
			SPA.open("register",{
				ani:{
					name:"actionSheet",
					distance:180
				}			
			})
		}
	}
})