webpackJsonp([3],{14:function(e,s){"use strict";Object.defineProperty(s,"__esModule",{value:!0}),s["default"]={search:"",hot:!0,tofixed:function(e){return Number(e).toFixed(4)}}},19:function(e,s,t){var i,a;i=t(20),a=t(21),e.exports=i||{},e.exports.__esModule&&(e.exports=e.exports["default"]),a&&(("function"==typeof e.exports?e.exports.options:e.exports).template=a)},20:function(e,s,t){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(s,"__esModule",{value:!0});var a=t(14),o=i(a);s["default"]={data:function(){return{searchVal:"",result:{}}},ready:function(){""!=o["default"].search&&(this.searchVal=o["default"].search)},watch:{searchVal:function(e,s){this.fetch(e,s),o["default"].search=e}},methods:{fetch:function(e,s){console.log("search is old:"+s+" search is now:"+e);var t=this,i="http://3g.d.cn/api/game/search.json?id="+reId+"&keyword="+t.searchVal+"&isHot="+hot;t.$http.jsonp(i).then(function(e){t.result=e.data},function(e){console.log(e)})},change:function(){1==this.hot?(this.hot=!1,o["default"].hot=!1):(this.hot=!0,o["default"].hot=!0)}},filters:{tofixed:o["default"].tofixed}}},21:function(e,s){e.exports=' <section> <section class="search-box clearfix"> <input class=fl type=text v-model=searchVal debounce=500 /> <a class="fr bg" href=javascript:void(0)></a> </section> <section v-if="result.db&&result.db.count>0" class="line db"> <div class=clearfix> <h4 class=fl>数据库</h4> </div> <ul class=db-list> <li v-for="odb in result.db.data"> <a target=_blank class=clearfix :href=odb.url> <img class=fl :src=odb.img /> <p :class="[$index==result.db.data.length-1?\'last\':\'\']" class=fr>{{odb.title}}</p> </a> </li> </ul> </section> <section v-if="result.news&&result.news.count>0" class="line news"> <div class=clearfix> <h4 class=fl>攻略</h4> <a class="bg fr" v-link="\'/listnews\'"></a> </div> <ul class=news-list> <li v-if="$index<5" v-for="onews in result.news.data"> <a :class="[$index==result.news.data.length-1||$index==4?\'last\':\'\']" href={{onews.url}} target=_blank> <h5>{{onews.title}}</h5> <p>{{onews.date}}</p> <p><span>comments:<em v-text=onews.comments></em></span><span>likes:<em v-text=onews.likes></em></span><span>views:<em v-text=onews.views></em></span></p> <p><span>相关度:<em v-text=onews.esscore></em></span><span>热度:<em v-text="onews.hot_coefficient | tofixed"></em></span></p> </a> </li> </ul> </section> <section v-if="result.video&&result.video.count>0" class="line video"> <div class=clearfix> <h4 class=fl>视频</h4> <a class="bg fr" v-link="\'/listvideo\'"></a> </div> <ul class=video-list> <li v-if="$index<5" v-for="ovideo in result.video.data"> <a target=_blank :class="[$index==result.video.data.length-1||$index==4?\'last\':\'\']" class=clearfix href={{ovideo.url}} target=_blank> <div class=video-img> <img :src=ovideo.img /> <i class=bg></i> </div> <div class=video-info> <h5>{{ovideo.title}}</h5> <p>{{ovideo.date}}</p> <p><span>comments:<em v-text=ovideo.comments></em></span><span>likes:<em v-text=ovideo.likes></em></span><span>views:<em v-text=ovideo.views></em></span></p> <p><span>相关度:<em v-text=ovideo.esscore></em></span><span>热度:<em v-text="ovideo.hot_coefficient | tofixed"></em></span></p> </div> </a> </li> </ul> </section> </section> '}});
//# sourceMappingURL=3.3.js.map