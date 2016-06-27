//手风琴插件
//json数据具体为{"width":300,"height":200,"left":50,"imgSrc":[]}
;
(function($) {

	function Accordion($element, json) {
		this.$element = $element;
		this.json = json;
		//记录当前点击的是第几张图
		this.count = 0;
		this.init();
	}
	Accordion.prototype = {
		"constructor": Accordion,
		"init": function() {
			this.createHTML();
			this.startMove();
			this.autoPlay();
		},
		//创建html结构
		"createHTML": function() {

			var html = "";
			//根据imgSrc数组的长度来拼接img标签
			for (var i = 0; i < this.json.imgSrc.length; i++) {
				html += "<img style=\"width:" + (this.json.width - (this.json.imgSrc.length - 1) * this.json.left) + "px;height:" + this.json.height + "px;position:absolute;left:" + (i * this.json.left) + "px;\" src=\"" + this.json.imgSrc[i] + "\"/>";
			}
			//新建一个div作为内部容器插入到给定容器里面
			$("<div></div").appendTo(this.$element).css({
				"position": "relative",
				"width": this.json.width,
				"height": this.json.height,
				"overflow": "hidden"
			}).html(html);
		},
		"startMove": function() {
			var that = this;
			$("img", that.$element).mousedown(function() {
				//如果当前没有动画在运动
				if ($("img", that.$element).is(":animated") == false) {
					//记录点击图的序号
					that.count = $(this).index() + 1;
					//如果该图片位于左侧，(that.json.imgSrc.length-0.9)*that.json.left为最后一张图的偏移大一点的距离
					if ($(this).position().left < (that.json.imgSrc.length - 0.9) * that.json.left) {
						//将其后的位于左侧的图片，移动到右边
						$(this).nextAll().filter(function() {
							return $(this).position().left < (that.json.imgSrc.length - 0.9) * that.json.left;
						}).animate({
							"left": "+=" + ($(this).width() - that.json.left)
						}, 500);

					} else {

						//将其后的位于右侧的图片，移动到左边	
						$(this).prevAll().filter(function() {
							return $(this).position().left > (that.json.imgSrc.length - 0.9) * that.json.left;
						}).animate({
							"left": "-=" + ($(this).width() - that.json.left)
						}, 500);
						$(this).animate({
							"left": "-=" + ($(this).width() - that.json.left)
						}, 500);
					}
				} else {

				}

			});

		},
		//自动播放，其实是调用的图片自动点击
		"autoPlay": function() {
			var that = this;
			//动态生成对象的属性来做定时器的返回值，用来做独立运动
			that.timer = setInterval(function() {
				//如果已经点击最后一张图
				if (that.count == $("img", that.$element).length) {
					that.count = 0;
				} else {
					//自动点击对应的图片
					$("img", that.$element).eq(that.count).mousedown();
				}

			}, 2000);
			//进入时清除定时器，离开是新开一个定时器
			that.$element.hover(function() {

				clearInterval(that.timer);
			}, function() {
				that.timer = setInterval(function() {

					if (that.count == $("img", that.$element).length) {
						that.count = 0;
					} else {
						$("img", that.$element).eq(that.count).mousedown();
					}

				}, 2000);
			});
		}
	};

	$.fn.extend({
		"accordion": function(json) {

			new Accordion(this, json);
		}
	});
})(jQuery)