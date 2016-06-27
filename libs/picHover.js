//图片的hover特效
//传入形参为原图片的宽度，高度，以及变化前的颜色和变化后的颜色
//另一个思路是放两个div，一个设置top：0，left；0，有左上边框，另一个设置bottom：0，
//right：0，有右下边框
//传入数据为：width：原图片宽度，height：原图片高度，colorBefore变化前边框颜色，colorAfter：变化后边框颜色
//borderWidth：边框宽度
;
(function($) {
	$.fn.extend({

		"picHover": function(width, height, colorBefore, colorAfter, borderWidth) {
			//给图片包裹一个div，并设置它和div的css样式
			this.wrap("<div></div>").css({
				"border": borderWidth + "px solid " + colorBefore,
				"width": width - 2 * borderWidth,
				"height": height - 2 * borderWidth,
			}).parent().css({
				"position": "relative",
				"width": width,
				"height": height
			});
			//添加四个div到图片后面，用来模拟图片的四个边框，，设置他们的颜色
			$("<div></div>").insertAfter(this).css({
				"position": "absolute",
				"height": borderWidth,
				"left": 0,
				"top": 0,
				"background": colorAfter
			});
			$("<div></div>").insertAfter(this).css({
				"position": "absolute",
				"width": borderWidth,
				"right": 0,
				"bottom": 0,
				"background": colorAfter
			});
			$("<div></div>").insertAfter(this).css({
				"position": "absolute",
				"height": borderWidth,
				"right": 0,
				"bottom": 0,
				"background": colorAfter
			});
			$("<div></div>").insertAfter(this).css({
				"position": "absolute",
				"width": borderWidth,
				"top": 0,
				"left": 0,
				"background": colorAfter
			});
			//进入和离开图片是，改变"模拟div"的宽度或长度
			this.hover(function() {

				$(this).nextAll().eq(3).stop().animate({
					"width": width
				}, 500);
				$(this).nextAll().eq(2).stop().animate({
					"height": height - borderWidth
				}, 500);
				$(this).nextAll().eq(1).stop().animate({
					"width": width
				}, 500);
				$(this).nextAll().eq(0).stop().animate({
					"height": height - borderWidth
				}, 500);

			}, function() {
				$(this).nextAll().eq(3).stop().animate({
					"width": 0
				}, 500);
				$(this).nextAll().eq(2).stop().animate({
					"height": 0
				}, 500);
				$(this).nextAll().eq(1).stop().animate({
					"width": 0
				}, 500);
				$(this).nextAll().eq(0).stop().animate({
					"height": 0
				}, 500);
			});
		}
	});

})(jQuery);