//放大镜的构造函数,它的动态属性有id,width,height,scale,imgUrl
//其中width、和height是小图的宽高，大图的宽高是其的scale倍
//跟踪鼠标的滤镜块是width和height的scale分之一

;
(function($) {
	//放大镜的构造函数
	function Enlarge(element, width, height, scale, imgUrl) {
		this.container = element;
		this.width = width;
		this.height = height;
		this.scale = scale;
		this.src = imgUrl;
		this.init();

	}
	//放大镜构造函数的原型对象，
	Enlarge.prototype = {
		"constructor": Enlarge,
		//初始化函数
		"init": function() {
			this.createHTML();
			this.monitor();
		},
		//创造放大镜的html结构
		"createHTML": function() {
			//创建包括小图的div，并将它添加到给定容器中，再给它添加行内样式
			$("<div></div>").appendTo(this.container)
				.css({
					"width": this.width,
					"height": this.height,
					"position": "relative",
					"display": "inline-block",
					"cursor": "move"
				});
			// this.small = document.createElement("div");
			// this.container.appendChild(this.small);
			// this.small.style.cssText = "width: "+this.width+"px;height: "+this.height+"px;position: relative;display: inline-block;";

			//创建小图，给定其src，并将它添加到小div中，再给它添加行内样式
			$("<img src=\"" + this.src + "\" />").appendTo($("div", this.container))
				.css({
					"width": this.width,
					"height": this.height,
					"display": "block"
				});

			//			this.small_pic = document.createElement("img");
			//			this.small_pic.src = this.src;
			//			this.small.appendChild(this.small_pic);
			//			this.small_pic.style.cssText = "width: "+this.width+"px;height: "+this.height+"px;display: block;";
			//			
			//创建跟踪鼠标的滤镜，并将它添加到小div中，再给它添加行内样式
			$("<div></div>").appendTo($("div", this.container))
				.css({
					"width": this.width / this.scale,
					"height": this.height / this.scale,
					"background": "rgba(0,0,0,0.4)",
					"position": "absolute",
					"top": 0,
					"left": 0,
					"display": "none"
				});
			//			this.track = document.createElement("div");
			//			this.small.appendChild(this.track);
			//			this.track.style.cssText = "width: "+this.width/this.scale+"px;height:"+this.height/this.scale+"px;background:rgba(0,0,0,0.4);position:absolute;top:0;left: 0;display:none;";
			//			

			//创建包括大图的div，并将它添加到给定容器中，再给它添加行内样式
			$("<div></div>").appendTo(this.container)
				.css({
					"width": this.width,
					"height": this.height,
					"overflow": "hidden",
					"display": "none",
					"position": "absolute",
					//为了覆盖放大镜模块之外的界面
					"z-index": "1"
				});
			//			this.big = document.createElement("div");
			//			this.container.appendChild(this.big);
			//			this.big.style.cssText = "width: "+this.width+"px;height: "+this.height+"px;overflow:hidden;display: none;position:relative";
			//			
			//创建大图，给定其src，并将它添加到大div中，再给它添加行内样式
			$("<img src=\"" + this.src + "\" />").appendTo($("div:last", this.container))
				.css({
					"width": this.width * this.scale,
					"height": this.height * this.scale,
					"display": "block",
					"position": "absolute"
				});
			//			this.big_pic = document.createElement("img");
			//			this.big_pic.src = this.src;
			//			this.big.appendChild(this.big_pic);
			//			this.big_pic.style.cssText = "width: "+this.width*this.scale+"px;height: "+this.height*this.scale+"px;display: block;position:absolute";
			//			

		},
		//滤镜块和大图跟随鼠标移动
		"monitor": function() {
			var that = this;
			//获取容器元素中的第一个div，也就是存有小图和滤镜块的div，
			//给它注册mousemove事件和mouseleave事件
			var small = $("div:first", this.container);
			small.on("mousemove", function(e) {
				//this指的是当前的dom对象,就是小div的dom对象
				//获取滤镜块的jquery对象
				var $track = $("div", this);
				//获取大图的jquery对象
				var $big = $(this).next().find("img");
				//显示滤镜块，将其跟随鼠标移动，中心在鼠标的地方
				$track.show()
					.css({
						//offset相对于浏览器
						"left": e.pageX - $(this).offset().left - $track.width() / 2,
						"top": e.pageY - $(this).offset().top - $track.height() / 2
					});
				//显示大图外的div，大图移动的距离为滤镜块移动的距离的scale倍，且方向相反
				$big.parent().css({
						"display": "inline-block"
					})
					.end().css({
						"left": -$track.position().left * that.scale,
						"top": -$track.position().top * that.scale
					});
				//水平左边界判断
				if ($track.position().left <= 0) {
					$track.css({
						"left": 0
					});
					$big.css({
						"left": 0
					});
				}
				//水平右边界判断
				else if ($track.position().left >= $track.parent().width() - $track.width()) {
					$track.css({
						"left": $track.parent().width() - $track.width()
					});
					$big.css({
						"left": $big.parent().width() - $big.width()
					});

				}
				//垂直上边界判断
				if ($track.position().top <= 0) {
					$track.css({
						"top": 0
					});
					$big.css({
						"top": 0
					});
				}
				//垂直下边界判断
				else if ($track.position().top >= $track.parent().height() - $track.height()) {
					$track.css({
						"top": $track.parent().height() - $track.height()
					});
					$big.css({
						"top": $big.parent().height() - $big.height()
					});

				}

			}).on("mouseleave", function() {
				//获取滤镜块和大图外的div的jquery对象，并将它们隐藏
				$("div:gt(0)", that.container).hide();
			});

			/*var that = this;
			this.small.onmousemove = function(e){
				//显示大div和滤镜块
				that.track.style.display = "block";
				that.big.style.display = "inline-block";
				e = e||event;
				//滤镜块跟随鼠标移动
				that.track.style.left = e.clientX-that.track.offsetWidth/2+"px";
				that.track.style.top = e.clientY-that.track.offsetHeight/2+"px";
				//大图相应移动
				that.big_pic.style.left = -parseInt(that.track.style.left)*that.scale+"px";
				that.big_pic.style.top = -parseInt(that.track.style.top)*that.scale+"px";
				
				//水平边界判断
				if (e.clientX-that.track.offsetWidth/2<=0) {
					that.track.style.left = 0;
					that.big_pic.style.left = 0;
				}
				//水平边界判断
				else if(e.clientX-that.track.offsetWidth/2>=that.small.offsetWidth-that.track.offsetWidth){
					that.track.style.left = that.small.offsetWidth-that.track.offsetWidth+"px";
					
					that.big_pic.style.left = that.big.offsetWidth-that.big_pic.offsetWidth+"px";
				}
				//垂直边界判断
				if (e.clientY-that.track.offsetHeight/2<=0) {
					that.track.style.top = 0;
					that.big_pic.style.top = 0;
				}
				//垂直边界判断
				else if (e.clientY-that.track.offsetHeight/2>=that.small.offsetHeight-that.track.offsetHeight) {
					that.track.style.top = that.small.offsetHeight-that.track.offsetHeight+"px";
					
					that.big_pic.style.top = that.big.offsetHeight-that.big_pic.offsetHeight+"px";
				}
			}
			隐藏大div和滤镜块
			this.small.onmouseleave = function(){
				that.track.style.display = "none";
				that.big.style.display = "none";
			}*/
		}
	};

	$.fn.extend({
		"enlarge": function(width, height, scale, imgUrl) {
			new Enlarge(this[0], width, height, scale, imgUrl);
			return this;
		}
	});

})(jQuery);
/*
//将调用简单化，模仿jquery
function enarge(id,width,height,scale,imgUrl){
	new Enlarge(id,width,height,scale,imgUrl);
	return this;
}*/