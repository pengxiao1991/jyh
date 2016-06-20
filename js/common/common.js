//头部js
(function () {
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
			$(".header-b-c-b li a").eq(index).text(value);
		});
	});
	//显示购物车提示框
	$(".header-b-r").hover(function(){
		$(shopCarTip).toggle();
	},function(){
		$(shopCarTip).toggle();
	});
})();















