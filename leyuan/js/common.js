var baseUrl = "http://leyuan.d.cn/";
/*var baseUrl = "http://192.168.29.131:8080/dj-cd-pply/";*/
var swiper ={
	sDemo: $("#swiperDemo").html(),
	$swiper: $(".my-wrapper"),
	$list: $('#acList'),
	init: function(){
		var that = this;
		$.ajax({
			type:"get",
			url:baseUrl+"qiaqia/listWinners.html?size=10",
			dataType:"json"
			   }).done(function(res){
				   	var html,data = res;
				   	html = tppl(that.sDemo,data);
				   		that.$swiper.append(html);
				   		$(window).on('resize', function () {
						    new Swiper(that.$list, {
						        direction: 'vertical',
						        lazyLoading: true,
						        lazyLoadingOnTransitionStart: true,
						        lazyLoadingInPrevNext: true,
						        wrapperClass: 'my-wrapper',
						        noSwiping: true,
						        loop: true,
						        noSwipingClass: 'stop-swiping',
						        autoplay: 5000,
						        speed: 300,
						        autoHeight: true,
						        setWrapperSize:true
						    });
						}).triggerHandler('resize');
		   }).fail(function(res){});
	}
}
/*var $sDemo = $("#swiperDemo").html(),
   	$swiper = $(".my-wrapper"),
   	$list = $('#acList'),
   	swiper;
$.ajax({
	type:"get",
	url:baseUrl+"qiaqia/listWinners.html?size=10",
	dataType:"json"
	   }).done(function(res){
		   	var html,data = {data:res}
		   	html = tppl($sDemo,data);
		   		$swiper.append(html);
		   		$(window).on('resize.swiper', function () {
		    swiper = new Swiper($list, {
		        direction: 'vertical',
		        lazyLoading: true,
		        lazyLoadingOnTransitionStart: true,
		        lazyLoadingInPrevNext: true,
		        wrapperClass: 'my-wrapper',
		        noSwiping: true,
		        loop: true,
		        noSwipingClass: 'stop-swiping',
		        autoplay: 5000,
		        speed: 300,
		        autoHeight: true,
		        setWrapperSize:true
		    });
		}).triggerHandler('resize.swiper');
   }).fail(function(res){
});*/

var checkFlow = {
	$phoneCheck:$("#phoneCheck"),
	$banner:$(".banner"),
	$count:$(".index-tip").find("em"),
	checkType:function(obj,type){
		return Object.prototype.toString.call(obj).toLocaleLowerCase().indexOf(type) === -1?false:true;
	},
	checkUser:function(callBack,callBack2){
		var that = this;
		$.ajax({
   			type:"get",
   			url:baseUrl+"qiaqia/checkUser.html",
   			async:true
   		}).done(function(res){
   			/*if(callBack&&that.checkType(callBack,"function")){
   				var res=res&&JSON.parse(res);
   				callBack(res)
   			}*/
   			var res=res&&JSON.parse(res);
   			if(res.code === 202){
   				that.getImgcode(callBack);
   				that.$banner.removeClass("dn");
   				that.$phoneCheck.removeClass("dn");
   			}else{
   				//console.log("手机已经验证过");
   				if(callBack2&&that.checkType(callBack2,"function")){
   					callBack2()
   				}
   				that.$count.text(res.times)
   			}
   		}).fail(function(){});
	},
	getImgcode:function(callBack){
		var that = this;
		$.ajax({
	        // 获取id，challenge，success（是否启用failback）
	        url: baseUrl+"geetest/startCaptcha.html",
	        type: "get",
	        dataType: "json"
		}).done(function(res){
			
				initGeetest({
	                gt: res.gt,
	                challenge: res.challenge,
	                product: "embed", // 产品形式，包括：float，embed，popup。注意只对PC版验证码有效
	                offline: !res.success, // 表示用户后台检测极验服务器是否宕机，一般不需要关注
	               width: "100px"
	            },function(captchaObj){
	            	that.handlerEmbed(captchaObj,callBack)
	            });
			
		});
	},
	handlerEmbed:function(captchaObj,callBack){
		var that = this
		captchaObj.appendTo("#dragverify");
		captchaObj.onSuccess(function(){//极验证成功回调
			var phoneNum = $("input[type='tel']").val();
			if(phoneNum === ""||phoneNum.length!==11){
				
				//console.log("手机号不正确");
				setTimeout(function(){
					captchaObj.refresh();
				},800)
				return false;
			}
			//console.log(captchaObj.getValidate())
			$.ajax({
				url:baseUrl+"qiaqia/checkPhone.html",
				type:"get",
				dataType:"json",
				data:{
					phone:phoneNum,
					geetest_challenge:captchaObj.getValidate().geetest_challenge,
					geetest_validate:captchaObj.getValidate().geetest_validate,
					geetest_seccode:captchaObj.getValidate().geetest_seccode
				}
			}).done(function(res){
				if(res&&res.code === 200){
					if(callBack&&that.checkType(callBack,"function")){
						//console.log("通过手机极验证");
						that.checkUser();
						callBack(res);
					}
				}else{
					$("input[type='tel']").val("");
					setTimeout(function(){
						captchaObj.refresh();
					},800)
					return false;
				}
			});
		})
	}
}
var playF = {
	count : 1,
	t : true,
	timer : null,
	data:{},
	times:0,
	q:0,
	$count:$(".index-tip").find("em"),
	init:function(option){
		var option = option||{};
		var that = this;
		that.aLi = option.aLi;
		that.timesError = option.timesError;
		that.tipHtml = option.tipHtml;
		that.$banner = option.banner;
		that.sCurrClassName = option.CurrClassName;
		that.checkCount(function(){
			that.getData();
			that.start();
		})
	},
	start:function(){
		var that = this;
		
			if(that.count === 9){
				that.count = 1;
				that.q+=1;
			}
			that.aLi.removeClass(that.sCurrClassName);
			$("li[data-id='"+that.count+"']").addClass(that.sCurrClassName);
			if(that.q >= 2&&that.data.code){//先转两圈
				if(that.data.code === 200){//抽奖成功
					if(that.count === parseInt(that.data.sort)){//保证curr到正确的位置
						
						setTimeout(function(){
							if(parseInt(that.data.sort) === 6){
								alert("谢谢参与");
								playF.resetF();
								that.t = true;
							}else{
								var html = tppl(that.tipHtml,that.data);//测试固定抽奖that.data.sort
								$("body").append(html);
								that.$banner.removeClass("dn");
								that.t = true;
							}
							//data["data"+that.data.sort].href = that.data.url;
							
						},300)
					}else{
						that.count += 1;
						that.timer = setTimeout(function(){
							that.start();
						},200)
					}
				}else{//抽奖失败
					alert(that.data.message);
					//console.log(that.data);
					that.resetF();
				}
			}else{
				that.count += 1;
				that.timer = setTimeout(function(){
					that.start();
				},200)
			}
		
		
	},
	resetF:function(){
		var that = this;
		that.count = 1;
		that.t = true;
		that.q = 0;
		that.data={};
		that.aLi.removeClass(that.sCurrClassName);
	},
	checkType:function(obj,type){
		return Object.prototype.toString.call(obj).toLocaleLowerCase().indexOf(type) === -1?false:true;
	},
	getData:function(){
		var that = this;
		$.ajax({
			type:"get",
			url:baseUrl+"qiaqia/lottery.html",
			async:true
		}).done(function(res){
			var res = res&&JSON.parse(res);
			res.sort>8?res.sort = 1:"";//由于后台原因，处理id大于8的都为礼包类型
			that.data = res;
			//console.log("抽奖成功");
		});
	},
	checkCount:function(callBack){
		var that = this;
		if(that.t){
			that.t = false;
			$.ajax({
	   			type:"get",
	   			url:baseUrl+"qiaqia/checkUser.html",
	   			async:true
	   		}).done(function(res){
	   			var res = res&&JSON.parse(res);
	   			that.timers = res.times;
	   			/*that.$count.text(that.timers);*/
	   			if(res&&that.timers>0&&callBack&&that.checkType(callBack,"function")){
	   				that.$count.text(that.timers-1);
	   				callBack();
	   			}else{
	   				//console.log("times 0");
	   				that.timesError.fadeIn(100,function(){
	   					setTimeout(function(){
	   						that.timesError.hide();
	   						that.t = true;
	   					},1500)
	   				})
	   			}
	   			/*callBack();*/
	   		});
		}
		
	}
}
$(document).on("click","#returnBtn",function(){
	window.history.go(-1);
});
$(document).on("click",".get-btn",function(){
	$(this).parent().remove();
	$(".banner").addClass("dn");
	playF.resetF()
});
$(document).on("click",".closeBtn",function(){
	$(this).parent().addClass("dn");
	$(".banner").addClass("dn");
});
/*$(document).on("click",".game-list a",function(){
	var $this = $(this),id = $(this).data("id");
	$.ajax({
		type:"get",
		url:baseUrl+"qiaqia//lotteryGift.html?missionId="+id,
		async:true
	}).done(function(res){
		console.log("礼包领取请求成功");
		$this.parents("#cjResult").remove();
		$(".banner").addClass("dn");
		playF.resetF();
	});
});*/
function jpLoad(){
	$.ajax({
		type:"get",
		url:baseUrl+"qiaqia/listPrize.html",
		async:true
	}).done(function(res){
		var res=res&&JSON.parse(res),html = tppl($("#jpDemo").html(),res);
		$(".jp-list").append(html);
	});
}
/*$btn.on("click",function(){
	if(t === true){
		t = false;
		var type = test();
		start(type,data);
	}else{
		return false;
	}
});
function start(type){
	if(count === 9){
		count = 1;
	}
	aLi.removeClass("curr");
	$("li[data-id='"+count+"']").addClass("curr");
	if(count === type){
		setTimeout(function(){
			var html = tppl($("#resultTem").html(),data["data"+8]);
			$("body").append(html);
			$(".banner").show();
		},300)
		
	}else{
		count += 1;
		timer = setTimeout(function(){
			start(type);
		},200)
	}
}*/
/*$(document).on("click",".closeBtn",function(){
	//$(this).parent().remove();
	$(".banner").addClass("dn");
	$(this).parent().addClass("dn");
	
});
*/

var data={
	data1:{
		type:1,
		href:"http://baidu.com"
	},
	data2:{
		type:2,
		href:"http://baidu.com"
	},
	data3 :{
		type:3,
		href:"http://baidu.com"
 	},
 	data4 : {
 		type:4,
 		href:"http://baidu.com"
 	},
 	data5 :{
 		type:5,
 		href:"http://baidu.com"
 	},
 	data7 :{
 		type:7,
 		num:20,
 		href:"http://baidu.com"
 	},
 	data6 :{
 		type:6,
 		num:20,
 		href:"http://baidu.com"
 	},
 	data1:{
 		type:1,
 		list:[{id:41,img:"img/yly/game1.png",type:"apk",name:"放开那三国2",txt:"冠绝三国，不负王名！",href:"javascript:void(0)"},
        		{id:41,img:"img/yly/game2.png",type:"apk",name:"劲舞团",txt:"多种风格服饰装扮、海量全新流行音乐，做潮流时尚达人",href:"javascript:void(0)"},
        		{id:41,img:"img/yly/game3.png",type:"apk",name:"谁是卧底",txt:"史上最萌的天黑请闭眼&杀人游戏",href:"javascript:void(0)"},
        		{id:41,img:"img/yly/game4.png",type:"apk",name:"阴阳师",txt:"网易和风匠心巨制，开启唯美奇幻之旅",href:"javascript:void(0)"},
        		{id:41,img:"img/yly/game5.png",type:"apk",name:"诛仙",txt:"首款可自由御空飞行3DMMORPG修仙手游",href:"javascript:void(0)"}
 		]
	}
 }


/*var $indexBtn = $("#indexBtn"),
	$phoneCheck = $("#phoneCheck"),
	$banner = $(".banner");
	$indexBtn.on("click",function(){
		$.ajax({
   			type:"get",
   			url:baseUrl+"qiaqia/checkUser.html",
   			async:true
   		}).done(function(res){
   			var res=res&&JSON.parse(res);
   			if(res.code === 202){
   				getImgCode();
   				$banner.fadeIn(100);
   				$phoneCheck.fadeIn(100);
   			}
   		}).fail(function(){});
	});
function getImgCode(){
               			
               			
	$.ajax({
        // 获取id，challenge，success（是否启用failback）
        url: baseUrl+"geetest/startCaptcha.html",
        type: "get",
        dataType: "json",
        success: function (data) {

            // 使用initGeetest接口
            // 参数1：配置参数
            // 参数2：回调，回调的第一个参数验证码对象，之后可以使用它做appendTo之类的事件
            initGeetest({
                gt: data.gt,
                challenge: data.challenge,
                product: "embed", // 产品形式，包括：float，embed，popup。注意只对PC版验证码有效
                offline: !data.success, // 表示用户后台检测极验服务器是否宕机，一般不需要关注
               width: "100px"
            }, handlerEmbed);
        }
    });
}
function handlerEmbed(captchaObj){
	captchaObj.appendTo("#dragverify");
	captchaObj.onSuccess(function(){//极验证成功回调
		var phoneNum = $("input[type='tel']").val();
		if(phoneNum === ""||phoneNum.length!==11){
			captchaObj.refresh();
			return false;
		}
	console.log(captchaObj.getValidate())
	$.ajax({
		url:baseUrl+"qiaqia/checkPhone.html",
		type:"get",
		dataType:"json",
		data:{
			phone:phoneNum,
			geetest_challenge:captchaObj.getValidate().geetest_challenge,
			geetest_validate:captchaObj.getValidate().geetest_validate,
			geetest_seccode:captchaObj.getValidate().geetest_seccode
		}
	}).done(function(res){
		console.log(res)
		window.location.pathname = "detail.html"
	});
})
}*/