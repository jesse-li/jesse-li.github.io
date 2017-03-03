var pw = {
		"小罗子":123456
	};
var code = {
	"822243":0212
};
$("#login").on("submit",function(){
	var $nick = $("#nick"),$pw = $("#pw");
	($nick.val() === "")&&(function(){alert("请输入昵称！！！");})();
	(pw[$nick.val()] === undefined)&&(function(){alert("没有这个昵称！！！！");return false})();
	(pw[$nick.val()]&&pw[$nick.val()] == $pw.val())&&(function(){$(".index-main-body").addClass("hide");return false})();
	return false;
});
