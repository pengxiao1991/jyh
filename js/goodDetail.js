//加入购物车待完成
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
	//放大镜部分
	$(".content-t-c").enlarge(480,480,3,"../img/enlarge1.jpg");
	//放大镜左侧部分li列表项的点击事件,点击后给放大镜更换图片
	$(".content-t-l ul li").click(function(){
		$(this).addClass("on").siblings("li").removeClass("on");
		$(".content-t-c img").attr({"src":$(this).find("img")[0].src});
	});
})
