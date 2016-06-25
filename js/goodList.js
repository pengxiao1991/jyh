//分页点击事件保留

$(function(){
	
	//二级菜单
	$(".erji").parent().hover(function(){
		$(this).find("div").show().prev().css({"background":"#DC0F50","color":"white"});
	},function(){
		$(this).find("div").hide().prev().css({"background":"#fff","color":"#333"});
	});
	//导航栏的hover事件
	$(".banner-b-l").mouseleave(function(){
		if (e.relatedTarget!=$(".banner-t")[0]) {
				$(".banner-b-l").hide();
		}
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
	//sort分类和brand品牌部分
	$(".sort-r span,.brand-r span").click(function(){
		if ($(this).text()=="更多") {
			$(this).addClass("on").text("收起").parent().css({"height":174}).parent().css({"height":174});
		} else{
			$(this).removeClass("on").text("更多").parent().css({"height":58}).parent().css({"height":58});
		}
	});
	//搜索条件切换与分页部分
	//注册搜索按钮点击切换事件
	$(".content-b-l-m span").click(function(){
		$(this).addClass("on").siblings("span").removeClass("on");
		var html = "";
		var pageHtml = "";
		var that = this;
		//动态形成分页部分
		$.getJSON("../data/zonghe"+$(this).index()+".json",function(data){
			//分页部分，5个为一页
			var pageCount = parseInt(data.length/5);
			for (var i = 0; i < pageCount; i++) {
				pageHtml+="<li class=\"fl\">"
								+"<a href=\"javascript:;\">"+(i+1)+"</a>"
							+"</li>";
			}
			//先除去上次生成的按钮
			$(".content-b-l-b li:not(:first,:last)").remove();
			$(".content-b-l-b li:first").after(pageHtml);
			$.each(data, function(index,value) {
				if (index<5) {
					html+="<li class=\"fl\">"
								+"<a href=\"goodDetail.html\">"
									+(value.abord?"<i></i>":"")
									+"<img src=\""+value.src+"\"/>"
									+"<p>"+value.description+"</p>"
									+"<div class=\"a-b clear\">"
										+"<div class=\"a-b-l fl\">"
											+"<span>"+value.price+"</span>"
											+"<p>"+value.sale+"</p>"
										+"</div>"
										+"<span class=\"fr\">"+value.oldPrice+"</span>"
									+"</div>"
								+"</a>"
							+"</li>";
				}
			});
			//先清空当前ul原先的内容，再动态添加生成的li，并显示他们，同时隐藏同辈元素
			$("div.ul ul").eq($(that).index()).empty().append(html).addClass("on").siblings().removeClass("on");
			
		});
	});
	$(".content-b-l-m span:first").click();
	//从json中获取热销数据
	function getHotData(url,className){
		$.getJSON(url,function(data){
			$.each(data, function(index,value) {
				var $li = $("."+className+" .content-b-r-b li").eq(index);
				$li.find("img")[0].src = value.src;
				$li.find("p")[0].innerHTML = value.description;
				$li.find("span:last")[0].innerHTML = value.price;
			});
		});
	}
	//获取右侧部分的热销数据
	getHotData("../data/firstHot.json","content-b-r");
	//猜你喜欢部分
	//like猜你喜欢部分
	$.getJSON("../data/timer.json",function(data){
		
		$(".like li a").each(function(index){
			
			$(this).find("img").prop({"src":data[index].src});
			$(this).find("b").text(data[index].discount);
			$(this).find("p").text(data[index].description);
			$(this).find("span").text(data[index].price);
			$(this).find("i").text(data[index].oldPrice);
		});
		//克隆第一个li放到ul的最后
		$(".like ul li:first").clone(true).appendTo($(".like ul"));
	
	});
	//给like的按钮注册事件
	startMove("like");
	//小轮播图的左右按钮注册事件
	function startMove(className){
		//左右按钮的点击事件
		var count = 0;
		$("."+className+" .leftBtn").click(function(){
			
			if (count==2) {
				$("."+className+" ul").css({"left":0});
				count = 0;
				$("."+className+" ul").stop().animate({"left":-$("."+className+"-b li").innerWidth()*(++count)},200);
			} else{
				$("."+className+" ul").stop().animate({"left":-$("."+className+"-b li").innerWidth()*(++count)},200);
			}
			
		});
		$("."+className+" .rightBtn").click(function(){
			
			if (count==0) {
				$("."+className+" ul").css({"left":-$("."+className+"-b li").innerWidth()*2});
				count = 2;
				$("."+className+" ul").stop().animate({"left":-$("."+className+"-b li").innerWidth()*(--count)},200);
			} else{
				$("."+className+" ul").stop().animate({"left":-$("."+className+"-b li").innerWidth()*(--count)},200);
			}
			
		});
	}
	//图片和文字的hover特效
	$("img",".onTimer,.onAir,.like").picHover(200,200,"#fff","#dc0f50");
	$("a",".onTimer li,.onAir li,.like li").hover(function(){
		$(this).find("p").css({"color":"#dc0f50"});
	},function(){
		$(this).find("p").css({"color":"#333"});
	});
});