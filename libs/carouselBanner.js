//封装的测试轮播图
//需要先导入jquery.js
//id为给定容器的id，width为容器和图片宽度，height为容器和图片高度，
//srcArr中顺序存储图片的src
//导航按钮的样式需要另外处理(外部容器的span的样式)
//导航按钮的修饰样式使用class="on"来进行处理(外部容器的span.on的样式)
//传入的json为{"id":"nihao","width":100,"height":100,"srcArr":["jpg","jpg"],
//"btnWidth":10,"btnHeight":10,"srcLeftBtn":"jpg","srcRightBtn":"jpg","navBtnWidth":5,"navBtnHeight":5,
//"navBtnMargin":10,"aHref":["1.html","2.html","3.html","4.html","5.html","6.html"]}
;
(function($) {
	function Carousel(element, json) {
		this.outerContainer = element;
		this.width = json.width;
		this.height = json.height;
		this.srcArr = json.srcArr;
		this.btnWidth = json.btnWidth;
		this.btnHeight = json.btnHeight;
		this.srcLeftBtn = json.srcLeftBtn;
		this.srcRightBtn = json.srcRightBtn;
		this.navBtnWidth = json.navBtnWidth;
		this.navBtnHeight = json.navBtnHeight;
		this.navBtnMargin = json.navBtnMargin;
		this.aHref = json.aHref;
		this.init();
	}
	Carousel.prototype = {
		"constructor": Carousel,
		//初始化函数
		"init": function() {
			this.createrHTML();
			this.eventHandling();
			this.autoPlay();
		},
		//创建轮播图的html结构
		"createrHTML": function() {
			var that = this;
			//创建一个轮播图的容器，用来存放轮播图的各个组件，
			this.innerContainer = document.createElement("div");
			//将轮播图容器添加到页面给定容器当中
			this.outerContainer.appendChild(this.innerContainer);
			//设置内部容器的样式
			this.innerContainer.style.cssText = "width: " + this.width + "px;height: " + this.height + "px;overflow:hidden ;position: relative;";
			//新建一个图片集合ul
			this.ul = document.createElement("ul");
			//将其添加到内部容器中
			this.innerContainer.appendChild(this.ul);
			//设置ul的样式
			this.ul.style.cssText = "margin:0;width: " + this.width * (this.srcArr.length + 2) + "px;height: " + this.height + "px;padding:0;position: absolute;";
			//为ul添加内容
			for (var i = 0; i < this.srcArr.length; i++) {
				this.ul.innerHTML += "<li style=\"display:none;float:left;position:absolute;list-style:none;\"><a href=\"" + this.aHref[i] + "\"><img style=\"display:block;width: " + this.width + "px;height: " + this.height + "px;\" src=\"" + this.srcArr[i] + "\"></a></li>"
			}
			//显示第一张图
			$("li:first", this.ul).show();

			// //添加第一张图到图集的最后，方便后续的边界判断
			// this.ul.innerHTML += "<li style=\"float:left;list-style:none;\"><img style=\"display:block;\" src=\"" + this.srcArr[0] + "\"></li>"
			// 	//清除浮动
			// this.ul.innerHTML += "<li style=\"clear:both;font-size:0;overflow:hidden;\"></li>";

			//新建左按钮，添加到文档，再给它设置样式
			this.leftBtn = document.createElement("a");
			this.innerContainer.appendChild(this.leftBtn);
			this.leftBtn.style.cssText = "display:block;width:" + this.btnWidth + "px;height:" + this.btnHeight + "px;position: absolute;background: url(" + this.srcLeftBtn + ") center center ;left: -" + this.btnWidth + "px;top: 50%;margin-top:" + this.btnHeight / 2 * (-1) + "px;opacity: 0;";
			//新建右按钮，添加到文档，再给它设置样式
			this.rightBtn = document.createElement("a");
			this.innerContainer.appendChild(this.rightBtn);
			this.rightBtn.style.cssText = "display:block;width:" + this.btnWidth + "px;height:" + this.btnHeight + "px;position: absolute;background: url(" + this.srcRightBtn + ") center center ;right: -" + this.btnWidth + "px;top: 50%;margin-top:" + this.btnHeight / 2 * (-1) + "px;opacity: 0;";
			//新建导航div，
			this.nav = document.createElement("div");
			//为导航div添加内容
			for (var i = 0; i < this.srcArr.length - 1; i++) {
				this.nav.innerHTML += "<span style=\"margin-right:" + this.navBtnMargin + "px;text-align:center;display:inline-block;width:" + this.navBtnWidth + "px;height:" + this.navBtnHeight + "px;line-height:" + this.navBtnHeight + "px;\">" + (i + 1) + "</span>";
			}
			this.nav.innerHTML += "<span style=\"text-align:center;display:inline-block;width:" + this.navBtnWidth + "px;height:" + this.navBtnHeight + "px;line-height:" + this.navBtnHeight + "px;\">" + (this.srcArr.length) + "</span>";
			this.innerContainer.appendChild(this.nav);

			//offsetWidth要想访问真正的宽度，必须元素存在文档之中，设定宽度的语句要在它
			//前面执行
			this.nav.style.cssText = "position:absolute;left:50%;";
			this.nav.style.marginLeft = -this.nav.offsetWidth / 2 + "px";
			this.nav.style.bottom = 2 * this.nav.offsetHeight + "px";
		},
		eventHandling: function() {
			//全局索引
			this.index = 0;
			this.nav.children[this.index].className = "on";
			//对象冒充
			var that = this;
			this.innerContainer.onmouseenter = function() {
				//停下自动播放
				clearInterval(that.timer);
				$(that.leftBtn).animate({
					"left": 0,
					"opacity": 1
				}, 100);
				$(that.rightBtn).animate({
					"right": 0,
					"opacity": 1
				}, 100);

			}
			this.innerContainer.onmouseleave = function() {
					//重新自动播放
					that.autoPlay();
					$(that.leftBtn).animate({
						"left": -that.btnWidth,
						"opacity": 0
					}, 100);
					$(that.rightBtn).animate({
						"right": -that.btnWidth,
						"opacity": 0
					}, 100);

				}
				//右按钮点击事件
			this.rightBtn.onmousedown = function() {

				//边界判断，当图片在最后一张时
				if (that.index == that.srcArr.length - 1) {

					//将之前的导航按钮背景还原
					that.nav.children[that.index].className = "";
					//渐隐最后一张图片
					$("li:eq(" + that.index + ")", that.ul).fadeOut();
					//改变全局索引
					that.index = 0;
					//渐显第一张图片
					$("li:eq(" + that.index + ")", that.ul).fadeIn();
					//显示下一张图
					// $(that.ul).animate({
					// 	"left": -1 * that.index * that.width
					// },100);

					//改变对应的导航按钮背景
					that.nav.children[that.index].className = "on";

				} else {

					//渐隐当前图片
					$("li:eq(" + that.index + ")", that.ul).fadeOut();
					//将之前的导航按钮背景还原
					that.nav.children[that.index++].className = "";
					//渐显下一张图片
					$("li:eq(" + that.index + ")", that.ul).fadeIn();
					//移动到下一张图
					// $(that.ul).animate({
					// 	"left": -1 * that.index * that.width
					// },100);

					that.nav.children[that.index].className = "on";

				}
			}
			this.leftBtn.onmousedown = function() {
				//如果此时位于第一张图和新添加的最后一张图
				if (that.index == 0) {
					//还原之前的背景色
					that.nav.children[0].className = "";
					//将图片流设置到最后一张新添加的图片上
					//that.ul.style.left = -1 * that.srcArr.length * that.width + "px";
					//渐隐第一张图片
					$("li:eq(" + that.index + ")", that.ul).fadeOut();
					//将索引修改为倒数第二张图片所对应的索引
					that.index = that.srcArr.length - 1;
					//渐显最后一张图片
					$("li:eq(" + that.index + ")", that.ul).fadeIn();
					//设置导航按钮的背景色
					that.nav.children[that.index].className = "on";
					//移动到倒数第二张图

					//					$(that.ul).animate({
					//						"left": -1 * that.index * that.width
					//					},100);

				} else {
					//渐隐当前图片
					$("li:eq(" + that.index + ")", that.ul).fadeOut();
					//将之前的导航按钮背景还原
					that.nav.children[that.index--].className = "";
					//渐显下一张图片
					$("li:eq(" + that.index + ")", that.ul).fadeIn();
					//移动到下一张图
					//					$(that.ul).animate({
					//						"left": -1 * that.index * that.width
					//					},100);
					//
					//设置对应的导航按钮背景色
					that.nav.children[that.index].className = "on";
				}
			}
			for (var i = 0; i < this.srcArr.length; i++) {
				this.nav.children[i].ind = i;
				this.nav.children[i].onmousedown = function() {
					//判断所点击的导航按钮对应的索引和全局索引的差值
					var dif = this.ind - that.index;

					//如果差值大于0，就自动点击左按钮dif次，否则点击右按钮dif次
					if (dif >= 0) {
						for (var j = 0; j < dif; j++) {
							that.rightBtn.onmousedown();
						}
					} else {
						for (var j = 0; j < -dif; j++) {
							that.leftBtn.onmousedown();
						}
					}
				}
			}
		},
		//自动播放，其实是不断调用左按钮的点击事件
		autoPlay: function() {
			clearInterval(this.timer);
			var that = this;
			this.timer = setInterval(function() {
				that.rightBtn.onmousedown();
			}, 2000);
		}
	};
	$.fn.extend({
		"carouselBanner": function(json) {
			new Carousel(this[0], json);
		}
	});

})(jQuery)