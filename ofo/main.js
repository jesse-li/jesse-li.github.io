var pw={"小罗子":123456,jesse:1},code={822243:138,1026858:4178,863219:7573,1066718:6592,1125369:9836,495995:1932,1465846:6695,1070637:3615,926523:7067,1076952:6353,1178694:346,738621:2691,1463831:1528,1081695:106,1026928:2124,1259158:1990,1012658:4012,1009585:1260,1023994:9686,1441627:7650,1070637:3615,542117:2378,733713:8630,1008873:7089,2104191:8780,1349037:9001};$("#login").on("submit",function(){var a=$("#nick"),e=$("#pw");return""===a.val()||""===e.val()?alert("你没长眼啊，这么多空！！"):void 0===pw[a.val()]?alert("没有这个昵称！！！！"):pw[a.val()]&&pw[a.val()]==e.val()&&("小罗子"===a.val()?alert("小婢子来啦。。"):"jesse"===a.val()&&alert("欢迎希大爷~"),$(".index-main-body").addClass("hide"),$(".input-num").removeClass("hidden")),!1}),$("#getPassword").on("submit",function(){$("#password").removeClass("show");var a=$("#inputBox");return""===a.val()?alert("你没长眼啊，这么多空！！"):void 0===code[a.val()]?alert("这个车牌还没有记录"):code[a.val()]&&$("#password").text(code[a.val()]).addClass("show"),!1});