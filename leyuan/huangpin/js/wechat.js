var baseUrl = baseUrl || "http://leyuan.d.cn/";
var checkWx = {
	init:function(option){
		var option = option || {};
		this.img = option.img;
		this.slink = option.slink;
		this.txt = option.txt;
		this.appid = option.appid;
		this.downloadOptions = option.download;
		this.check();
	},
	check:function(){
		var ua = window.navigator.userAgent.toLocaleLowerCase(),that = this;
		if(ua.indexOf("micromessenger") !== -1){
			this.downloadF();
			var script = document.createElement("script");
			script.addEventListener("load",function(){
				$.ajax({//请求wx jssdk需要的相关参数
					type:"get",
					url:baseUrl+"qiaqia/getWechatConfigInfo.json?url="+location.href.split("#")[0],
					async:true
				}).done(function(res){
					res = JSON.parse(res);
					if(res&&res.code === 200){
						that.wxF(res.data)
					}
				});
			},false);
			script.src = "http://res.wx.qq.com/open/js/jweixin-1.0.0.js";
			document.body.appendChild(script);
		}
	},
	wxF:function(res){
		
		var that = this; 
		wx.config({
		    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
		    appId: that.appid, // 必填，公众号的唯一标识
		    timestamp:res.timestamp , // 必填，生成签名的时间戳
		    nonceStr: res.noncestr, // 必填，生成签名的随机串
		    signature: res.signature,// 必填，签名，见附录1
		    jsApiList: ["onMenuShareTimeline","onMenuShareAppMessage"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
		});
/*		wx.error(function(res){

    for(var i in res){
    	$("body").append(res[i]);
    }

});*/
		wx.ready(function(){
			
			/*alert("ready");*/
			wx.onMenuShareTimeline({
			    title: that.txt, // 分享标题
			    link: that.slink, // 分享链接
			    imgUrl: that.img, // 分享图标
			    success: function () { 
			        // 用户确认分享后执行的回调函数
			        that.shareSuccess();
			    },
			    cancel: function () { 
			        // 用户取消分享后执行的回调函数
			       // $("body").append("pengyouquan-shibai");
			       that.cancelF();
			    },
			    fail: function(){
			    	that.failF();
			    }
			});
			wx.onMenuShareAppMessage({
				 title: that.txt, // 分享标题
			    link: that.slink, // 分享链接
			    imgUrl: that.img, // 分享图标
			    desc: that.txt, // 分享描述
			    type: '', // 分享类型,music、video或link，不填默认为link
			    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
			    success: function () { 
			        // 用户确认分享后执行的回调函数
			        that.shareSuccess();
			    },
			    cancel: function () { 
			        // 用户取消分享后执行的回调函数
			       // $("body").append("pengyouquan-shibai");
			       that.cancelF();
			    },
			    fail: function(){
			    	that.failF();
			    }
			});
		});
	},
	shareSuccess:function(){
		/*$.ajax({
			type:"get",
			url:baseUrl+"qiaqia/addTimes.html",
			async:true
		}).done(function(res){
			var res = res&&JSON.parse(res);
			if(res&&res.code === 200){
				alert("分享成功");
				if(checkFlow&&checkFlow.$count.length>0){
					checkFlow.checkUser(function(res){
	            		$("#phoneCheck").addClass("dn");
	            		$(".banner").addClass("dn");
            		});
				}
			}
			
		});*/
		alert("分享成功");
	},
	cancelF:function(){
		alert("用户取消分享");
	},
	failF:function(){
		alert("分享失败");
	},
	downloadF:function(){
		var that = this;
		$(document).on("click",that.downloadOptions.btn,function(){
			if($("."+that.downloadOptions.tipClass).length<=0){
				var img = $("<img/>");
				img.on("load",function(){
					$("body").append("<div class='"+that.downloadOptions.bannerClass+"'></div>");
					$("body").append(img);
				});
				img.attr({"src":that.downloadOptions.tipimg});
				img.addClass(that.downloadOptions.tipClass)
				$(document).on("click","."+that.downloadOptions.bannerClass,function(){
					$(this).addClass(that.downloadOptions.hideClass);
					$("."+that.downloadOptions.tipClass).addClass(that.downloadOptions.hideClass);
				});
			}else{
				var tipimg = $("."+that.downloadOptions.tipClass),banner = $("."+that.downloadOptions.bannerClass);
				tipimg.removeClass(that.downloadOptions.hideClass);
				banner.removeClass(that.downloadOptions.hideClass);
			}
			return false;
		});
	}
}
checkWx.init({
	img:"http://leyuan.d.cn/qiaqia/img/share.png",
	slink:"http://leyuan.d.cn/qiaqia/index.html",
	txt:"洽洽诚意送豪礼，马上点击领取！",
	appid:"wx10952a85267e690f",
	download:{//处理微信下载
		btn:".more-list a,#ylyList a,.use-game a,.now-use a",//下载btn
		bannerClass:"banner",
		tipimg:baseUrl+"qiaqia/img/wx_error.png",
		tipClass:"wx-tip",
		hideClass:"dn"
	}
})
