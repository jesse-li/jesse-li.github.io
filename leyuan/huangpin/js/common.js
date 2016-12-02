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
			url:baseUrl+"huangpin/listWinners.html?size=30",
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

function setCookie(name, value) {
    var Days = 1;   //cookie 将被保存1天
    var exp = new Date();  //获得当前时间
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);  //换成毫秒
    document.cookie = name + "=" + encodeURI(value) + ";expires=" + exp.toGMTString() + ";path=/";
}
function getCookie(name){
	var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
    if (arr != null){
    	return decodeURI(arr[2], 'utf-8');
    }else{
    	return null;
    }
    
}
var checkFlow = {
	$phoneCheck:$("#phoneCheck"),
	/*$banner:$(".banner"),*/
	$count:$(".index-tip").find("em"),
	checkType:function(obj,type){
		return Object.prototype.toString.call(obj).toLocaleLowerCase().indexOf(type) === -1?false:true;
	},
	checkUser:function(callBack,callBack2,from){
		var that = this;
		/*if(getCookie("phone") !== null){
			
		}else{
			
		}*/
		$.ajax({
   			type:"get",
   			url:baseUrl+"huangpin/checkUser.html",
   			async:true,
   			cache:false,
   			dataType:"json"
   		}).done(function(res){
   			if(from == "fromImgCode"){
   				if(that.$count.length>0){
   					that.$count.text(res.times);
   				}
   				
   				callBack();
   			}else{
   				if(res.code === 202){
	   				if($("#dragverify").children().length !== 0){
	   					$("#dragverify").html("");
	   				}
	   				that.getImgcode(callBack,callBack2);
	   				/*that.$banner.removeClass("dn");*/
	   				that.$phoneCheck.removeClass("dn");
	   			}else if(res.code === 200){
	   				//console.log("手机已经验证过");
	   				that.$count.text(res.times);
	   				
	   				if(callBack2&&that.checkType(callBack2,"function")){
	   					callBack2()
	   				}
	   				
	   			}else{
	   				console.log("checkUser.html出错")
	   			}
   			}
   			
   		}).fail(function(){});
	},
	getImgcode:function(callBack,callBack2){
		var that = this;
		$.ajax({
	        // 获取id，challenge，success（是否启用failback）
	        url: baseUrl+"geetest/startCaptcha.html",
	        type: "get",
	        dataType: "json"
		}).done(function(res){
			if(typeof(initGeetest) !== "undefined"){
				initGeetest({
	                gt: res.gt,
	                challenge: res.challenge,
	                product: "embed", // 产品形式，包括：float，embed，popup。注意只对PC版验证码有效
	                offline: !res.success, // 表示用户后台检测极验服务器是否宕机，一般不需要关注
	               width: "100%"
	            },function(captchaObj){
	            	that.handlerEmbed(captchaObj,callBack,callBack2)
	            });
			}else{
				var script = document.createElement("script");
				script.addEventListener("load",function(){
					initGeetest({
		                gt: res.gt,
		                challenge: res.challenge,
		                product: "embed", // 产品形式，包括：float，embed，popup。注意只对PC版验证码有效
		                offline: !res.success, // 表示用户后台检测极验服务器是否宕机，一般不需要关注
		               width: "100%"
		            },function(captchaObj){
		            	that.handlerEmbed(captchaObj,callBack,callBack2)
		            });
				},false);
				script.src = "http://static.geetest.com/static/tools/gt.js";
				document.body.appendChild(script);
			}
				
			
		});
	},
	handlerEmbed:function(captchaObj,callBack,callBack2){
		var that = this
		captchaObj.appendTo("#dragverify");
		captchaObj.onSuccess(function(){//极验证成功回调
			var phoneNum = $("input[type='number']").val();
			if(phoneNum === ""||phoneNum.length!==11||phoneNum.search(1) !== 0){
				
				//console.log("手机号不正确");
				setTimeout(function(){
					captchaObj.refresh();
				},800)
				return false;
			}
			//console.log(captchaObj.getValidate())
			$.ajax({
				url:baseUrl+"huangpin/checkPhone.html",
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
					//that.$count.text(111111111);
					that.$phoneCheck.addClass("dn");
					if(callBack&&that.checkType(callBack,"function")){
						//console.log("通过手机极验证");
						that.checkUser(callBack,"","fromImgCode");
					}
				}else{
					console.log(res.message)
					$("input[type='number']").val("");
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
							/*if(parseInt(that.data.sort) === 6){
								alert("谢谢参与");
								playF.resetF();
								that.t = true;
							}else{*/
								var html = tppl(that.tipHtml,that.data);//测试固定抽奖that.data
								$("body").append(html);
								that.$banner.removeClass("dn");
								that.t = true;
							/*}*/
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
			url:baseUrl+"huangpin/lottery.html",
			dataType:"json",
			async:true
		}).done(function(res){
			if(res.sort>=9&&res.sort<=12){//由于后台原因，处理id大于8情况(9-10为礼包，11以后为代金券)
				res.sort = 1;
			}else if(res.sort>=13){
				res.sort = 5;
			}
			that.data = res;
			//console.log("抽奖成功");
		});
	},
	checkCount:function(callBack){
		var that = this;
		if(that.t){
			checkFlow.checkUser("",function(){//手机验证成功回调（直接抽奖）
	   			that.t = false;
	   			if(parseInt(that.$count.text())>0){
	   				that.$count.text(parseInt(that.$count.text())-1);
	   				if(callBack&&that.checkType(callBack,"function")){
	   					callBack();
	   				}
	   			}else{
	   				that.timesError.fadeIn(100,function(){
	   					setTimeout(function(){
	   						that.timesError.hide();
	   						that.t = true;
	   					},1500)
	   				})
	   			}
	   		}
	   	)
		}
	}
}
/*$(document).on("click","#returnBtn",function(){
	window.history.go(-1);
});
*/
$(document).on("click",".get-btn",function(){
	$(this).parent().remove();
	$(".banner").addClass("dn");
	playF.resetF()
});

$(document).on("click",".closeBtn",function(){
	if($(this).parent().attr("id") === "cjResult"){
		playF.resetF();
		$(this).parent().remove();
	}else{
		$(this).parent().addClass("dn");
	}
	
	$(".banner").addClass("dn");
});
//手机号验证的返回按钮
$(".return-a").on("click",function(){
	$("#phoneCheck").addClass("dn");
	playF.t = true;
	
});
//手机号检验
$(".input").find("input").on("blur",function(){
	console.log("手机号检验");
	$(".input").removeClass("hide-after");
	if($(this).val() === "" || $(this).val().length !== 11 || $(this).val().search(1) !== 0){
		$(".input").addClass("error");
	}else{
		$(".input").removeClass("error");
	}
});

function listLoad(option){
	$.ajax({
		type:"get",
		url:baseUrl+option.url,
		async:true,
		dataType:"json"
	}).done(function(res){
		if(res){
			option.callback(res);
			
		}
		
	});
}

function checkNews(){
	$.ajax({
		type:"get",
		url:baseUrl+"huangpin/checkNews.json",
		dataType:"json",
		async:true,
		cache: false
	}).done(function(res){
		if(res&&res.code === 200){
			/*取消闪烁效果*/
			/*$(".bt").find("i").text(res.count);*/
			if(res.reflush === true){
				/*$(".bt").find("i").addClass("flash");*/
				$(".bt").find("i").removeClass("dn")
			}else{
				/*$(".bt").find("i").hide();*/
				$(".bt").find("i").addClass("dn")
			}
		}
	});
}