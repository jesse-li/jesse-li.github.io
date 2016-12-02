var ua = window.navigator.userAgent.toLocaleLowerCase(),returnBtn = document.getElementById("returnBtn");
//在微信下隐藏头部
if(ua.indexOf("micromessenger") !== -1){
	$(".top,.header").addClass("dn");
}else{
	//绑定返回按钮
	if(typeof(returnBtn)!=="undefined"&&returnBtn!==null){
		returnBtn.addEventListener("click",function(){
			window.history.go(-1);
		},false);
	}
}
//判断设备做对应处理
if(ua.indexOf("iphone")!==-1){
	$(".now-use").addClass("dn");
	$(".use-game").find("a").addClass("dn");
}else{
	$(".now-use").on("click",function(){
		if(ua.indexOf("micromessenger")!==-1){
			$(".wxShadow,.wxTitle").removeClass("dn");
			return false;
		}
	});
	$(".use-game").find("a").on("click",function(){
		if(ua.indexOf("micromessenger")!==-1){
			$(".wxShadow,.wxTitle").removeClass("dn");
			return false;
		}
	});
	$("#ylyList").on("click",".download",function(){
		if(ua.indexOf("micromessenger")!==-1){
			$(".wxShadow,.wxTitle").removeClass("dn");
			return false;
		}
	});
	$(".wxShadow").on("click",function(){
		$(this).addClass("dn");
		$(".wxTitle").addClass("dn");
	});
}