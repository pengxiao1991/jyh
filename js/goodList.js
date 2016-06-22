$(function(){
	//二级菜单
	$(".erji").parent().hover(function(){
		$(this).find("div").show().prev().css({"background":"#DC0F50","color":"white"});
	},function(){
		$(this).find("div").hide().prev().css({"background":"#fff","color":"#333"});
	});
	//导航栏的hover事件
	$(".banner-b-l").mouseleave(function(){
				$(".banner-b-l").hide();
	});
	$(".banner-t-l").hover(function(){
		$(this).removeClass("on");
		$(".banner-b-l").show();
	},function(e){
		
		if (e.relatedTarget!=$(".banner-t")[0]) {
			$(this).addClass("on");
			$(".banner-b-l").hide();
		}
	});
	//tab切换部分
	$.getJSON("../data/tv.json",function(data){
		var count = 0;
		$.each(data, function(i,value) {
			$(".banner-b-r-b ul").eq(count).find("li a").each(function(index){
				$(this).find("img").attr({"src":value[index].src});
				$(this).find("p").text(value[index].description);
				$(this).find("i").text(value[index].price);
			});
			count++;
		});
	})
	$(".banner-b-r-t span").mouseenter(function(){
		$(this).addClass("on").siblings().removeClass("on");
		$(".banner-b-r-b ul").eq($(this).index()).addClass("on").siblings().removeClass("on");
	});
});