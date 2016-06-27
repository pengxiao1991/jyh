$(function() {

	//tab切换部分
	$.getJSON("../data/tv.json", function(data) {
		//用来确定当前的选项卡数
		var count = 0;
		//遍历返回的json对象
		$.each(data, function(i, value) {
			//将每个对象存储的数据都放到对应ul中的元素中
			$(".banner-b-r-b ul").eq(count).find("li a").each(function(index) {
				$(this).find("img").attr({
					"src": value[index].src
				});
				$(this).find("p").text(value[index].description);
				$(this).find("i").text(value[index].price);
			});
			count++;
		});
	});
	//选项卡的mouseenter事件也可用hover事件，显示对应的ul，改变选项卡的样式
	$(".banner-b-r-t span").mouseenter(function() {
		$(this).addClass("on").siblings().removeClass("on");
		$(".banner-b-r-b ul").eq($(this).index()).addClass("on").siblings().removeClass("on");
	});
	//sort分类和brand品牌部分，按钮点击事件，改变按钮文本已经对应部分的高度
	$(".sort-r span,.brand-r span").click(function() {
		if ($(this).text() == "更多") {
			$(this).addClass("on").text("收起").parent().css({
				"height": 174
			}).parent().css({
				"height": 174
			});
		} else {
			$(this).removeClass("on").text("更多").parent().css({
				"height": 58
			}).parent().css({
				"height": 58
			});
		}
	});
	//搜索条件切换与分页部分
	//搜索条件选项卡点击切换事件
	$(".content-b-l-m span").click(function() {
		//改变相应选项卡的样式
		$(this).addClass("on").siblings("span").removeClass("on");
		//用于拼接商品信息元素字符串
		var html = "";
		//用于拼接切换按钮元素字符串
		var pageHtml = "";
		var that = this;

		//从相应选项卡的json文件中获取数据
		$.getJSON("../data/zonghe" + $(this).index() + ".json", function(data) {
			//分页部分，5个为一页,pageCount为总页数
			var pageCount = Math.ceil(data.length / 5);
			//动态生成分页按钮
			for (var i = 0; i < pageCount; i++) {
				pageHtml += "<li class=\"fl\">" + "<a href=\"javascript:;\">" + (i + 1) + "</a>" + "</li>";
			}
			//先除去上次生成的按钮
			$(".content-b-l-b li:not(:first,:last)").remove();
			$(".content-b-l-b li:first").after(pageHtml);

			//当前要加载的页码
			var current = 1;
			loadContent(current);
			//给分页按钮注册点击事件
			//上一页
			$(".content-b-l-b li:first a").click(function() {
				if (current == 1) {
					current = 1;
				} else {
					current--;
				}
				loadContent(current);
			});
			//下一页
			$(".content-b-l-b li:last a").click(function() {
				if (current == pageCount) {
					current = pageCount;
				} else {
					current++;
				}
				loadContent(current);
			});
			//中间的按钮
			$(".content-b-l-b li a").slice(1, -1).click(function() {
				current = $(this).text();
				loadContent(current);
			});
			//跳页按钮的点击事件
			$(".content-b-l-b>span a").click(function() {
				current = $(this).prev().val();
				loadContent(current);
			});
			//动态加载指定页的内容部分
			function loadContent(current) {
				//改变跳转框内的数字
				$(".content-b-l-b>span input").val(current);
				//改变所选择按钮的样式
				$(".content-b-l-b li a").eq(current).addClass("on").parent().siblings().find("a").removeClass("on");
				//清空上次动态加载存在html中的内容
				html = "";
				$.each(data, function(index, value) {
					//加载指定页数中的5个内容
					if (index < 5 * current && index >= (current - 1) * 5) {
						html += "<li class=\"fl\">" + "<a href=\"goodDetail.html\">" + (value.abord ? "<i></i>" : "") + "<img src=\"" + value.src + "\"/>" + "<p>" + value.description + "</p>" + "<div class=\"a-b clear\">" + "<div class=\"a-b-l fl\">" + "<span>" + value.price + "</span>" + "<p>" + value.sale + "</p>" + "</div>" + "<span class=\"fr\">" + value.oldPrice + "</span>" + "</div>" + "</a>" + "</li>";
					}
				});
				//先清空当前ul原先的内容，再动态添加生成的li，并显示他们，同时隐藏同辈元素
				$("div.ul ul").eq($(that).index()).empty().append(html).addClass("on").siblings().removeClass("on");

			}

		});
	});
	//页面加载时自动点击第一个选项，加载数据
	$(".content-b-l-m span:first").click();
	//从json中获取热销数据
	function getHotData(url, className) {
		$.getJSON(url, function(data) {
			$.each(data, function(index, value) {
				var $li = $("." + className + " .content-b-r-b li").eq(index);
				$li.find("img")[0].src = value.src;
				$li.find("p")[0].innerHTML = value.description;
				$li.find("span:last")[0].innerHTML = value.price;
			});
		});
	}
	//获取右侧部分的热销数据
	getHotData("../data/firstHot.json", "content-b-r");
	//猜你喜欢部分
	//like猜你喜欢部分
	$.getJSON("../data/timer.json", function(data) {
		//将动态获取的数据放到页面上存在的第一个li中
		$(".like li a").each(function(index) {

			$(this).find("img").prop({
				"src": data[index].src
			});
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
	function startMove(className) {
		//左右按钮的点击事件
		var count = 0;
		$("." + className + " .leftBtn").click(function() {

			if (count == 2) {
				$("." + className + " ul").css({
					"left": 0
				});
				count = 0;
				$("." + className + " ul").stop().animate({
					"left": -$("." + className + "-b li").innerWidth() * (++count)
				}, 200);
			} else {
				$("." + className + " ul").stop().animate({
					"left": -$("." + className + "-b li").innerWidth() * (++count)
				}, 200);
			}

		});
		$("." + className + " .rightBtn").click(function() {

			if (count == 0) {
				$("." + className + " ul").css({
					"left": -$("." + className + "-b li").innerWidth() * 2
				});
				count = 2;
				$("." + className + " ul").stop().animate({
					"left": -$("." + className + "-b li").innerWidth() * (--count)
				}, 200);
			} else {
				$("." + className + " ul").stop().animate({
					"left": -$("." + className + "-b li").innerWidth() * (--count)
				}, 200);
			}

		});
	}
	//图片的hover特效
	$("img", ".onTimer,.onAir,.like").picHover(200, 200, "#fff", "#dc0f50", 2);
	//文字的hover特效
	$("a", ".onTimer li,.onAir li,.like li").hover(function() {
		$(this).find("p").css({
			"color": "#dc0f50"
		});
	}, function() {
		$(this).find("p").css({
			"color": "#333"
		});
	});
});