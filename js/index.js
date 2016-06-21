//
$(function(){
	//二级菜单
	$(".erji").parent().hover(function(){
		$(this).find("div").show().prev().css({"background":"#DC0F50","color":"white"});
	},function(){
		$(this).find("div").hide().prev().css({"background":"#fff","color":"#333"});
	});
	//轮播图
	$.getJSON("../data/carouselBanner.json",function(data){
		
		$(".banner-b-c-t").carouselBanner({"width":714,"height":382,"srcArr":data.src,"btnWidth":30,"btnHeight":60,"srcLeftBtn":"../img/leftbtn.jpg","srcRightBtn":"../img/rightbtn.jpg","navBtnWidth":16,"navBtnHeight":16,"navBtnMargin":10,"aHref":data.href});
	});
	//一楼部分
	$.getJSON("../data/firstHot.json",function(data){
		$.each(data, function(index,value) {
			var $li = $(".first-floor-b-r li").eq(index);
			$li.find("img")[0].src = value.src;
			$li.find("p")[0].innerHTML = value.description;
			$li.find("span:last")[0].innerHTML = value.price;
		});
	});
	
	
	
	
	
	
	
	
	
	
	
	
	
	//楼梯部分
	var isClick = false;
	$(".stairs li").click(function(){
		isClick = true;
		$("html,body").animate({"scrollTop":$(".floor").eq($(this).index()).offset().top,},200,function(){
			isClick = false;
		});
	});
	$(window).on("scroll",function(){
		if ($(this).scrollTop()>=$(".floor:first").offset().top-$(this).outerHeight()/2&&$(this).scrollTop()<=$(".floor:last").offset().top+$(this).outerHeight()/2) {
			$(".stairs").show();
			if (!isClick) {
				$(".floor").each(function(index){
					if ($(window).scrollTop()>=$(this).offset().top-$(this).outerHeight()/2) {
						$(".stairs li").eq(index).addClass("on").siblings().removeClass("on");
					} 
				});
			}
			
		} 
		else{
			$(".stairs").hide();
			
		}
		
	});
	$(window).trigger("scroll");
	
});




































