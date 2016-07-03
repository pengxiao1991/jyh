//nav部分js
(function() {
	//载入nav部分html结构内容
	$.ajax({
		"url": "common/nav.html",
		"async": false,
		"success": function(data) {
			$(nav).html(data);
		}
	});
	//一级菜单,进入时改变背景颜色和字体颜色，离开时还原背景颜色和字体颜色
	$(".erji").parent().hover(function() {
		$(this).find("div").show().prev().css({
			"background": "#DC0F50",
			"color": "white"
		});
	}, function() {
		$(this).find("div").hide().prev().css({
			"background": "#fff",
			"color": "#333"
		});
	});
	//离开二级菜单
	$(".banner-b-l").mouseleave(function(e) {
		$(".banner-b-l").hide();
	});
	//导航栏上方的hover事件，因为内容结构问题而让其mouseleave事件变得特别
	$(".banner-t-l").hover(function() {
		//改变背景图片
		$(this).removeClass("on");
		$(".banner-b-l").show();
	}, function(e) {
		if (e.relatedTarget != $(".banner-b-l")[0] && e.relatedTarget.nodeName != "A") {
			//改变背景图片
			$(this).addClass("on");
			$(".banner-b-l").hide();
		}
	});

})()