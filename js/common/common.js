//头部js
(function () {
	//载入头部html结构内容
	$.ajax({
		"url":"common/header.html",
		"async":false,
		"success":function(data){
			$(header).html(data);
		}
	});
	//顶部导航的二维码的hover事件
	$("li.iphone",header).hover(function(){
		$("div.iphone").toggle();
	},function(){
		$("div.iphone").toggle();
	});
	$("li.wx",header).hover(function(){
		$("div.wx").toggle();
	},function(){
		$("div.wx").toggle();
	});
	//搜索框前的搜索类别的hover和click事件
	$(".header-b-c-t ul").hover(function(){
		$(this).find("li:last-child").show();
		
	},function(){
		$(this).find("li:last-child").hide();
	});
	$(".header-b-c-t li").click(function(){
		$(this).siblings().before($(this)).hide();
	});
	//获取热搜数据,路径是相对于html文件
	$.getJSON("../data/hotSearch.json",function(data){
		$.each(data, function(index,value) {
			//$(".header-b-c-b li a").eq(index).text(value);
			$(".header-b-c-b ul").append("<li><a href=\"javascript:;\">"+value+"</a></li>");
			
		});
	});
	//显示购物车提示框
	$(".header-b-r").hover(function(){
		$(shopCarTip).toggle();
	},function(){
		$(shopCarTip).toggle();
	});
	
})();

//尾部js
(function () {
	//载入头部html结构内容
	$.ajax({
		"url":"common/footer.html",
		"async":false,
		"success":function(data){
			$(footer).html(data);
		}
	});
	//右导航按钮的前两个按钮的hover事件
	$("#footer .fix a:lt(2)").hover(function(){
		$(this).find("div").show();
	},function(){
		$(this).find("div").hide();
	});
	//右导航按钮的最后一个按钮的点击事件
	$("#footer .fix a:gt(1)").click(function(){
		$("html,body").animate({"scrollTop":0},200);
	});
	//窗口的滚动条的滚动事件
	$(window).on("scroll",function(){
		if ($(this).scrollTop()<=200) {
			$("#footer .fix a:gt(1)").css({"display":"none"}).animate({"opacity":0},100);
		}
		else{
			$("#footer .fix a:gt(1)").css({"display":"block"}).animate({"opacity":1},100);
		}
	});
	$(window).trigger("scroll");
})()















