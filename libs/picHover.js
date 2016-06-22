//图片的hover特效
//传入形参为原图片的宽度，高度，以及变化前的颜色和变化后的颜色
;
(function ($) {
	$.fn.extend({
		
		"picHover":function(width,height,colorBefor,colorAfter){
			
			this.wrap("<div></div>").css({
				"border":"1px solid "+colorBefor,
				"width":width-2,
				"height":height-2,
			}).parent().css({
				"position":"relative",
				"width":width,
				"height":height
			});
			$("<div></div>").insertAfter(this).css({
				"position":"absolute",
				"height":1,
				"left":0,
				"top":0,
				"background":colorAfter	
			});
			$("<div></div>").insertAfter(this).css({
				"position":"absolute",
				"width":1,
				"right":0,
				"bottom":0,
				"background":colorAfter	
			});
			$("<div></div>").insertAfter(this).css({
				"position":"absolute",
				"height":1,
				"right":0,
				"bottom":0,
				"background":colorAfter	
			});
			$("<div></div>").insertAfter(this).css({
				"position":"absolute",
				"width":1,
				"top":0,
				"left":0,
				"background":colorAfter	
			});
			this.hover(function(){
				
				$(this).nextAll().eq(3).stop().animate({"width":width},500);
				$(this).nextAll().eq(2).stop().animate({"height":height-1},500);
				$(this).nextAll().eq(1).stop().animate({"width":width},500);
				$(this).nextAll().eq(0).stop().animate({"height":height-1},500);
				
				
			},function(){
				$(this).nextAll().eq(3).stop().animate({"width":0},500);
				$(this).nextAll().eq(2).stop().animate({"height":0},500);
				$(this).nextAll().eq(1).stop().animate({"width":0},500);
				$(this).nextAll().eq(0).stop().animate({"height":0},500);
			});
		}
	});
	
})(jQuery);







