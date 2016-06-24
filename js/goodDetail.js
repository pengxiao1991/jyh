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
	
	//吸顶效果,先复制商品详情的tab切换部分，在将其添加到窗口顶部,然后设置其样式
	//再为复制品和源头部分注册点击事件
	var $origin = $(".content-b-t");
	var $clone = $origin.clone(true).appendTo("body").css({
		"position":"fixed",
		"top":0,
		"display":"none",
		"width":"100%",
		"left":$origin.offset().left
		
	});
	//原始部分的click事件
	$("span",$origin).on("click",function(){
		$(this).addClass("on").siblings("span").removeClass("on");
		$("span",$clone).eq($(this).index()).addClass("on").siblings("span").removeClass("on");
		$(".content-b-b div").eq($(this).index()).addClass("on").siblings("div").removeClass("on");
	});
	//副本部分的click事件
	$("span",$clone).click(function(){
				
				$(window).scrollTop($origin.offset().top)
				$origin.find("span").eq($(this).index()).click();
		});
		
	//滚动条滚动事件，如果到了商品详情部分，显示吸顶部分，
	$(window).on("scroll",function(){
		if ($(this).scrollTop()>$origin.offset().top) {
			$clone.show();
		} else{
			$clone.hide();
		}
	});
	$(window).scroll();
})
