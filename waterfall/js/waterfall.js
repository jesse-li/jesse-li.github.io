var Waterfall=function(option){
	var option = option||{};
	this.obody = option.obody;//传入瀑布流主体
	this.layout = option.layout;//几分布局
	this.top = option.top;//上间距
	this.left = option.left;//左间距
	this.heightMode = option.heightMode;
	this.init();
}
Waterfall.prototype={
	init:function(){
		var _this=this;
		_this.topArr=[];
		_this.minObj=null
		_this.minindex=null;
		_this.maxObj=null;
		_this.count=0;
		_this._start();
		_this._resize();
	},
	_start:function(){
		var _this=this;
		_this._width = (_this.obody.width()-(_this.layout-1)*_this.left)/_this.layout;//计算并设置块的宽度
		_this.obody.children().width(_this._width);
		//_this.rowLength=Math.floor(_this.obody.width()/_this.obody.children().width());
		for(var i=0,j=_this.obody.children().length;i<j;i+=1){//需要所有图片加载完成才进行布局
			if(_this.obody.children().eq(i).find("img")[0].complete){
				_this.count+=1;
				if(_this.count == _this.obody.children().length){
					_this.setTop();
				}
			}else{
				_this.obody.children().eq(i).find("img").on("load",function(){
					_this.count+=1;
					if(_this.count == _this.obody.children().length){
					_this.setTop();
				}
				})
			}
		}
		
	},
	setTop:function(){//具体的布局方法（下一块总是插入现有最低的块）
		var _this = this,
		/*left = _this.left.indexOf("%")!=-1?(parseFloat(_this.left)/100)*_this.obody.width():parseFloat(_this.left);*/
		left = _this.left;
		for(var i=0,j=_this.obody.children().length;i<j;i+=1){
			_this.minObj=_this.topArr[0];
			_this.minindex=0;
			if(i<_this.layout){//提高计算效率，第一行单独处理
				var a={
					'obj':_this.obody.children().eq(i),
					'height':_this.obody.children().eq(i).height()+_this.top
					}
				_this.topArr.push(a);//保存第一行的数据数据
				
				_this.obody.children().eq(i).css({
					top:_this.top,
					left:i*_this.obody.children().width()+i*left
				})
			}else{//其他行的处理
				if(_this.heightMode){
					for(var _i=0,_j=_this.topArr.length;_i<_j;_i+=1){//循环比较计算出最小的height
						(function(__i){
							if(_this.topArr[__i].height<_this.minObj.height){//更新minobj[]和minindex
								_this.minObj=_this.topArr[__i];
								_this.minindex=__i
							}
						})(_i)
					}
				}
				
				_this.obody.children().eq(i).css({
						top:_this.minObj.height+_this.top,
						left:_this.minObj.obj.css("left")
					});
					var b={
						'obj':_this.obody.children().eq(i),
						'height':_this.obody.children().eq(i).position().top+_this.obody.children().eq(i).height()
						}
					_this.topArr.splice(_this.minindex,1)
					_this.topArr.push(b);//移除上一个最小height，插入新增的height
			}
		}
		if(_this.topArr&&_this.topArr.length>0){//因为是pasolute布局，需要计算出最高的height并给外层设置
			_this.maxObj=_this.topArr[0]
			for(var i=0,j=_this.topArr.length;i<j;i+=1){
				if(_this.topArr[i].height>_this.maxObj.height){
					_this.maxObj=_this.topArr[i]
				}
			}
			_this.obody.css("height",_this.maxObj.height)
		}
	},
	_resize:function(){
		var _this=this;
		$(window).on("resize",function(){
			_this.setTop()
		})
	}
}
