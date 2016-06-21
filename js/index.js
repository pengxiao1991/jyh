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
		console.log(data);
		$(".banner-b-c-t").carouselBanner({"width":714,"height":382,"srcArr":data.src,"btnWidth":30,"btnHeight":60,"srcLeftBtn":"../img/leftbtn.jpg","srcRightBtn":"../img/rightbtn.jpg","navBtnWidth":16,"navBtnHeight":16,"navBtnMargin":10,"aHref":data.href});
	});
	
});




































