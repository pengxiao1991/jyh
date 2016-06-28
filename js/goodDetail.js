//加载商品信息部分
//获取url传递过来的参数，fisrtIndex为访问json的索引，secondIndex为该商品在json文件中的索引
var jsonObj = JSON.parse(decodeURI(location.search.slice(1)));
$(function(){
	
	//向网页结构中传入数据
	$.ajax({
		type:"get",
		url:"../data/zonghe" + jsonObj.firstIndex + ".json",
		async:false,
		"success":function(data){
			//取回来的商品信息
			var goodInf = data[jsonObj.secondIndex]
			//动态加载商品图片列表
			var html = "";
			for (var i = 0; i < goodInf.brandImg.length; i++) {
				
				html+="<li><img src=\""+goodInf.brandImg[i]+"\" /></li>";
			}
			$(".content-t-l ul").html(html);
			$(".content-t-l ul li:first").addClass("on");
			//加载商品标题信息
			//如果非海购
			if (goodInf.abord==false) {
				$(".content-t-r-t h2").text(goodInf.description);
			}
			else{
				
				$(".content-t-r-t h2")[0].lastChild.nodeValue = goodInf.description;
			}
			//加载价格信息
			$(".content-t-r-b>p:first").text(goodInf.price+".00");
			$(".content-t-r-b>p:last").text(goodInf.oldPrice+".00");
			//加载id
			$(".content-t-r-b>span:first i").text(goodInf.id);
			//加载销量
			$(".content-t-r-b>span:eq(1) i").text(goodInf.sale);
			//加载颜色和规格
			html = "";
			for (var i = 0; i < goodInf.color.length; i++) {
				html+="<i>"+goodInf.color[i]+"</i>";
			}
			$(".content-t-r-b>span:eq(2) span").before(html);
			html = "";
			for (var i = 0; i < goodInf.feature.length; i++) {
				html+="<i>"+goodInf.feature[i]+"</i>";
			}
			$(".content-t-r-b>span:eq(3) span").before(html);
			//加载数量限制
			if (goodInf.max=="") {
				$(".content-t-r-b>span:eq(4) i").remove();
				$(".content-t-r-b>span:eq(4)")[0].childNodes[4].nodeValue="";
			} else{
				$(".content-t-r-b>span:eq(4) i").text(goodInf.max);
			}
			
			//加载商品服务信息
			if (goodInf.abord==false) {
				$(".content-t-r-b b:eq(0)").addClass("no-abord").text("正品保证");
				$(".content-t-r-b b:eq(1)").addClass("no-abord").text("全场包邮");
				$(".content-t-r-b b:eq(2)").addClass("no-abord").text("7天包退换（生鲜除外）");
			}
			//加载商品详情的图片
			html = "";
			for (var i = 0; i < goodInf.detailImg.length; i++) {
				html+="<li><img src=\""+goodInf.detailImg[i]+"\" /></li>";
				
			}
			$(".detail ul").html(html);
			//加载规格参数的信息
			html = "";
			for (var i = 0; i < goodInf.paramName.length; i++) {
				html+="<li class=\"clear\">"
									+"<span class=\"fl\">"+goodInf.paramName[i]+"</span>"
									+"<i class=\"fl\">"+goodInf.paramValue[i]+"</i>"
								+"</li>";
			}
			$(".argument ul").html(html);
			//常见问题信息加载
			if (goodInf.abord==false) {
				$(".content-b-t span:last").remove();
			}
		}
	});
})
//注册事件部分
$(function(){

	//放大镜部分
	$(".content-t-c").enlarge(480,480,3,$(".content-t-l ul li img:first").attr("src"));
	//放大镜左侧部分li列表项的点击事件,点击后给放大镜更换图片
	$(".content-t-l ul li").click(function(){
		$(this).addClass("on").siblings("li").removeClass("on");
		$(".content-t-c img").attr({"src":$(this).find("img")[0].src});
	});
	//商品信息部分
	//商品数量减少部分
	$(".content-t-r-b span button:first").click(function(){
		if ($(this).next().val()-0<=1) {
			$(this).next().val(1);
		} else{
			$(this).next().val($(this).next().val()-1);
		}
	});
	
	//限定的最大数量
	var max = $(".content-t-r-b>span:eq(4) i").text();
	
	//商品数量显示部分
	//初始化数据
	$(".content-t-r-b span button:first").next()[0].defaultValue=1;
	$(".content-t-r-b span button:first").next()[0].value=1;
	//先屏蔽非数字字符
	$(".content-t-r-b span button:first").next().keypress(function(e){
		//屏蔽非数字键&&屏蔽键码大于9的键（就是保留上下，退格，删除键）&&保留ctrl键
		if (!/\d/.test(String.fromCharCode(e.charCode))&&e.charCode>9&&!e.ctrlKey) {
			e.preventDefault();
		}
		
	});
	//限定输入范围
	$(".content-t-r-b span button:first").next().blur(function(){
		if (max!="") {
			if (this.value-0>=max-0) {
				this.value=max;
			}	
		}
		 
		if (this.value-0<=1) {
			this.value=1;
		}
	});
	//商品数量增加部分
	$(".content-t-r-b span button:last").click(function(){
		if (max!="") {
			if ($(this).prev().val()-0>=max-0) {
				$(this).prev().val(max);
				return;
			} 
				
			
		}
		$(this).prev().val($(this).prev().val()-0+1);
		
	});
	
	//颜色，规格部分按钮的点击事件
	$(".content-t-r-b span span").prevAll().click(function(){
		
		$(this).addClass("on").siblings("i").removeClass("on").end().parent().removeClass("error");
	});
	//立即购买按钮的点击事件
	$(".content-t-r-b>a:first").click(function(e){
		//如果颜色部分没有选中
		if (!$(".content-t-r-b span span:first").prevAll("i").hasClass("on")) {
			$(".content-t-r-b span span:first").parent().addClass("error");
			return false;
		} 
		//如果规格部分没有选中
		if(!$(".content-t-r-b span span:last").prevAll("i").hasClass("on")) {
			$(".content-t-r-b span span:last").parent().addClass("error");
			return false;
		}
		else{
			//如果没有登录
			if ($(".header-t-r li a:eq(1)").text()=="请登录") {
				e.preventDefault();
				
				location.href = "login.html";
			}
			else{
				//需要将数据传递给结算页，暂时考虑用cookie
			}
		}
	});
	//加入购物车点击事件
	
	$(".content-t-r-b>a:last").click(function(e){
		//是否有选项没有被选中，有的话就显示警告
		//如果颜色部分没有选中
		if (!$(".content-t-r-b span span:first").prevAll("i").hasClass("on")) {
			$(".content-t-r-b span span:first").parent().addClass("error");
			return false;
		} 
		//如果规格部分没有选中
		if(!$(".content-t-r-b span span:last").prevAll("i").hasClass("on")) {
			$(".content-t-r-b span span:last").parent().addClass("error");
			return false;
		}		
		else{
			//如果没有登录
			if ($(".header-t-r li a:eq(1)").text()=="请登录") {
				e.preventDefault();
				
				location.href = "login.html";
			}
			else{
				//获取所有用户的所有信息
				var arr = JSON.parse($.myGetCookie("user"));
				//获取所有用户的所有信息
				var value = arr[0];
				//如果购物车为空
				if (value.shopCar.length==0) {
					//将当前商品存入到购物车数组的头部
					value.shopCar.unshift({
						"id":$(".content-t-r-b span:first i").text(),
						"src":$(".content-t-l ul li img:first").attr("src"),
						"description":$(".content-t-r-t h2").text(),
						"color":$(".content-t-r-b>span:eq(2) i").text(),
						"feature":$(".content-t-r-b>span:eq(3) i").text(),
						"price":$(".content-t-r-b p:first").text(),
						"count":$(".content-t-r-b span [type=text]").val(),
						"max":max,
						"site":JSON.stringify(jsonObj)
						
					});
					//如果购物车不为空
				} else{
					for (var i = 0; i < value.shopCar.length; i++) {
						//如果存在id相同的
						if (value.shopCar[i].id==$(".content-t-r-b span:first i").text()) {
							value.shopCar[i].count=value.shopCar[i].count-0+($(".content-t-r-b span [type=text]").val()-0);
							break;
						}
						//如果不存在id相同的
						if (i==value.shopCar.length-1) {
							value.shopCar.unshift({
								"id":$(".content-t-r-b span:first i").text(),
								"src":$(".content-t-l ul li img:first").attr("src"),
								"description":$(".content-t-r-t h2").text(),
								"color":$(".content-t-r-b>span:eq(2) i").text(),
								"feature":$(".content-t-r-b>span:eq(3) i").text(),
								"price":$(".content-t-r-b p:first").text(),
								"count":$(".content-t-r-b span [type=text]").val(),
								"max":max,
								"site":JSON.stringify(jsonObj)
							});
							break;
						}
					}
					
					
				}
				
				//页面卸载（刷新，跳转，关闭）前
				window.onbeforeunload = function(){
					//将所获得的最后结果存入cookie
					$.mySetCookie("user",JSON.stringify(arr),70*24*3600*1000);
				}
				location.href = "shopCar.html";
			}
		}
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
		//点击既要改变当前的选项卡的样式，也要改变隐藏的吸顶部分对应的的选项卡的样式
		$(this).addClass("on").siblings("span").removeClass("on");
		$("span",$clone).eq($(this).index()).addClass("on").siblings("span").removeClass("on");
		//显示每个选项卡下对应的选项
		$(".content-b-b div").eq($(this).index()).addClass("on").siblings("div").removeClass("on");
	});
	//副本部分的click事件
	$("span",$clone).click(function(){
		//屏幕滚动到页面上存在的选项卡	
		$(window).scrollTop($origin.offset().top)
		//调用源头部分对应选项卡的点击事件
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
	//先触发一次滚动事件
	$(window).scroll();
})
