function xAjax(t){if(this===window)return new xAjax(t);var t=t||{};this.type=t.type,this.data=t.data,this.url=t.url,this.success=t.success,this.fail=t.fail,this.dataType=t.dataType,this.init()}function $(t,e){if("string"!=typeof t&&t===window||t===document)return t;if(""===t.trim())return!1;if("string"==typeof t){var n=t.trim().substr(0,1);return"#"===n?document.getElementById(t.replace(/#/,"")):e===!0?document.querySelectorAll(t):document.querySelector(t)}}function lazyLoad(t){var t=t||{};this.obj=t.obj,this.scope=t.scope||0,this.init()}function touchControl(t){t.eventsBind("touchstart",function(t){var e=t||window.event;startY=e.touches[0].clientY,e.stopPropagation()}),t.eventsBind("touchmove",function(t){var e=t||window.event,n=this;e.stopPropagation(),moveY=e.touches[0].clientY,startY-moveY>0&&n.scrollTop+n.offsetHeight>=n.scrollHeight-20&&e.preventDefault(),0>startY-moveY&&n.scrollTop<=20&&e.preventDefault()})}var events={index:0};Object.prototype.eventsBind=function(t,e,n){var s=this;if(!s||"function"!=typeof e)return!1;if(0===s.length&&s!=s.window)return!1;if(!n){if(s.length&&1!==s.length)return Array.prototype.forEach.call(s,function(n){if(void 0===events[n.dataset.bindcount]){events.index+=1;var s=events.index;n.dataset.bindcount=s,events[s]=[]}events[n.dataset.bindcount][t]=e,n.addEventListener(t,events[n.dataset.bindcount][t],!1)}),!1;var s=s[0]||s;if(s===window){if(void 0===events[s.bindcount]){events.index+=1;var a=events.index;s.bindcount=a,events[a]=[]}events[s.bindcount][t]=e,s.addEventListener(t,events[s.bindcount][t],!1)}else{if(void 0===events[s.dataset.bindcount]){events.index+=1;var a=events.index;s.dataset.bindcount=a,events[a]=[]}events[s.dataset.bindcount][t]=e,s.addEventListener(t,events[s.dataset.bindcount][t],!1)}return!1}if(s.length&&1!==s.length)s.forEach(function(s){s.addEventListener(t,function(t){var s=t||window.event;if(/.|#/.test(n)){if(/./.test(n)&&s.target.classList.contains(n.replace(/.|#/,"")))return e.call(s.target),!1;if(/#/.test(n)&&s.target.id===n.replace(/#/,""))return e.call(s.target),!1}else{if(s.target.tagName===n.toLocaleUpperCase())return e.call(s.target),!1;if(s.path){for(var a=0,i=s.path.length;i>a;a+=1)if(s.path[a].tagName===n.toLocaleUpperCase())return e.call(s.path[a]),!1;return!1}}},!1)});else{var s=s[0]||s;s.addEventListener(t,function(t){var s=t||window.event;if(/.|#/.test(n)){if(/./.test(n)&&s.target.classList.contains(n.replace(/.|#/,"")))return e.call(s.target),!1;if(/#/.test(n)&&s.target.id===n.replace(/#/,""))return e.call(s.target),!1}else{if(s.target.tagName===n.toLocaleUpperCase())return e.call(s.target),!1;if(s.path){for(var a=0,i=s.path.length;i>a;a+=1)if(s.path[a].tagName===n.toLocaleUpperCase())return e.call(s.path[a]),!1;return!1}}},!1)}},Object.prototype.eventsRemove=function(t){var e=this;return e?0===e.length&&e!=e.window?!1:void(e.length&&e.length>=1?Array.prototype.forEach.call(e,function(e){events[e.dataset.bindcount]&&e.removeEventListener(t,events[e.dataset.bindcount][t])}):e===window?events[e.bindcount]&&e.removeEventListener(t,events[e.bindcount][t]):events[e.dataset.bindcount]&&e.removeEventListener(t,events[e.dataset.bindcount][t])):!1},xAjax.prototype={init:function(){this.createXMLHttpRequest()},createXMLHttpRequest:function(){var t="",e=this;if(this.data)if("[object Object]"===Object.prototype.toString.call(this.data)){var n=Object.keys(this.data);Object.keys(this.data).length>0&&n.forEach(function(s,a){"[object Array]"===Object.prototype.toString.call(e.data[s])?e.data[s].forEach(function(e,i,o){t+=i+1>=o.length&&n.length<=a+1?s+"="+e:s+"="+e+"&"}):t+=n.length>a+1?s+"="+e.data[s]+"&":s+"="+e.data[s]})}else console.error("data not a Object");if(this.httpRequest=new XMLHttpRequest,!this.httpRequest)return alert("不支持XMLHttpRequert！"),!1;if(this.httpRequest.onreadystatechange=this.readystatechangeFn.bind(this),"post"===this.type.toLocaleLowerCase())this.httpRequest.open(this.type.toLowerCase(),this.url,!0),this.httpRequest.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),this.httpRequest.send(t);else{var s=t?this.url+"?"+t:this.url;this.httpRequest.open(this.type.toLowerCase(),s,!0),this.httpRequest.send()}},readystatechangeFn:function(){this.httpRequest.readyState===XMLHttpRequest.DONE&&(200===this.httpRequest.status?"function"==typeof this.success&&this.success("json"===this.dataType?JSON.parse(this.httpRequest.responseText):this.httpRequest.responseText):"function"==typeof this.fail&&this.fail("json"===this.dataType?JSON.parse(this.httpRequest.responseText):this.httpRequest.responseText))}},Object.prototype.index=function(){var t,e=this;return Array.prototype.forEach.call(e.parentElement.children,function(n,s){e===n&&(t=s)}),void 0===t?-1:t},Object.prototype.addClass=function(t){var e=this;return t&&null!==e&&0!==e.length?void(e.length?Array.prototype.forEach.call(e,function(e){e.classList.add(t)}):e.classList.add(t)):!1},Object.prototype.removeClass=function(t){var e=this;return t&&null!==e&&0!==e.length?void(e.length?Array.prototype.forEach.call(e,function(e){e.classList.remove(t)}):e.classList.remove(t)):!1},Object.prototype.hasClass=function(t){var e=this;return t&&null!==e&&0!==e.length?e.length?e[0].classList.contains(t):e.classList.contains(t):!1},lazyLoad.prototype={init:function(){this.loadTop=window.document.documentElement.clientHeight-this.scope,this.createLoadList(),this.loadImg(),this.scroll()},createLoadList:function(){var t=this;t.loadList=Array.prototype.map.call(t.obj,function(t){return t})},loadImg:function(){for(var t=this,e=0;e<t.loadList.length;e+=1)t.loadList[e].getBoundingClientRect().top<t.loadTop&&(t.loadList[e].src=t.loadList[e].dataset.src,t.loadList.splice(e,1),e--)},scroll:function(){var t=this,e=null;window.onscroll=function(){void 0===t.loadLis,0===t.loadList.length?window.onscroll=null:(e&&clearTimeout(e),e=setTimeout(function(){t.loadImg()},300))}}},Object.prototype.xAppend=function(t){var e=this;if(1===e.nodeType){var n=document.createElement("div"),s=document.createDocumentFragment();n.innerHTML=t;for(var a=0,i=n.children.length;i>a;a+=1){var o=n.children[a].cloneNode(!0);s.appendChild(o)}return e.append(s),e}};
"undefined"==typeof exports&&(exports=window),exports.tppl=function(r,e){var n=function(r){var e,p=[],t=[];for(e in r)p.push(e),t.push(r[e]);return new Function(p,n.$).apply(r,t)};if(!n.$){var p=r.split("[:");n.$="var $=''";for(var t=0;t<p.length;t++){var a=p[t].split(":]");0!=t&&(n.$+="="==a[0].charAt(0)?"+("+a[0].substr(1)+")":";"+a[0].replace(/\r\n/g,"")+"$=$"),n.$+="+'"+a[a.length-1].replace(/\'/g,"\\'").replace(/\r\n/g,"\\n").replace(/\n/g,"\\n").replace(/\r/g,"\\n")+"'"}n.$+=";return $;"}return e?n(e):n};
function postData(e,t){var n={},o=[];e.dataset.id?o.push(e.dataset.id):Array.prototype.forEach.call(document.querySelectorAll("[data-id]"),function(e){o.push(e.dataset.id)}),0===o.length?tipsF({code:2801,desc:"您已领取全部代金券"}):(n.baseId=o,t&&Object.assign(n,t),new xAjax({url:mainUrl+"lottery.do",type:"post",data:n,dataType:"json",success:function(t){t&&tipsF(t,e)}}))}function tipsF(e,t){if((2900===e.code||2901===e.code||2902===e.code||2801===e.code)&&(tips.textContent=e.desc,tips.addClass("tips-in"),setTimeout(function(){document.querySelector(".tips").removeClass("tips-in")},1600),2900===e.code&&new xAjax({url:mainUrl+"getBindVoucherByMid",type:"get",dataType:"json",success:function(e){var t=tppl(document.getElementById("list").innerHTML,e);document.querySelector(".list").innerHTML=t}})),2001===e.code&&AndroidClient.doLogin(),2903===e.code&&(over.removeClass("dn"),bindPhone.removeClass("dn")),2905===e.code)if("undefined"==typeof initGeetest){var n=document.createElement("script");n.onload=function(){check(t)},n.src="http://static.geetest.com/static/tools/gt.js",document.body.appendChild(n)}else check(t)}function check(e){new xAjax({url:"/getGeetestKey?t="+(new Date).getTime(),type:"get",dataType:"json",success:function(t){initGeetest({gt:t.gt,challenge:t.challenge,offline:!t.success,product:"embed",width:"600px"},function(t){handler(t,e)})}})}var AndroidClient={},mainUrl="/newperson/";if("undefined"==typeof AndroidClient)document.querySelector(".main").addClass("dn"),document.querySelector(".tip-page").removeClass("dn");else{document.querySelector(".rule").eventsBind("click",function(){document.querySelector(".over").removeClass("dn"),document.querySelector(".rule-box").removeClass("dn")}),document.querySelector(".rule-box>h4>i").eventsBind("click",function(){document.querySelector(".over").addClass("dn"),document.querySelector(".rule-box").addClass("dn")}),document.getElementById("cancelBtn").eventsBind("click",function(){document.querySelector(".over").addClass("dn"),document.querySelector(".bind-phone").addClass("dn")}),new xAjax({url:"sample.json",type:"get",dataType:"json",success:function(e){var t=tppl(document.getElementById("list").innerHTML,e);document.querySelector(".list").innerHTML=t}});var tips=document.querySelector(".tips"),bindPhone=document.querySelector(".bind-phone"),over=document.querySelector(".over");document.getElementById("cancelBtn").eventsBind("click",function(){bindPhone.addClass("dn"),over.addClass("dn")}),document.querySelector("body").eventsBind("click",function(){postData(this)},".get-js");var handler=function(e,t){document.querySelector(".over").removeClass("dn"),document.getElementById("captcha").removeClass("dn"),e.appendTo("#captcha"),e.onSuccess(function(){var n=e.getValidate();return n?(document.querySelector(".over").addClass("dn"),document.getElementById("captcha").addClass("dn"),document.getElementById("captcha").innerHTML="",void postData(t,{geetest_challenge:n.geetest_challenge,geetest_validate:n.geetest_validate,geetest_seccode:n.geetest_seccode})):alert("请完成验证")})}}touchControl(document.querySelector(".rule-box section"));