
$(function(){
	
	//二级菜单
	$(".erji").parent().hover(function(){
		$(this).find("div").show().prev().css({"background":"#DC0F50","color":"white"});
	},function(){
		$(this).find("div").hide().prev().css({"background":"#fff","color":"#333"});
	});
	//导航栏的hover事件
	$(".banner-b-l").mouseleave(function(e){
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
	
	//放大镜部分
	$(".content-t-c").enlarge(480,480,3,"../img/enlarge1.jpg");
	//放大镜左侧部分li列表项的点击事件,点击后给放大镜更换图片
	$(".content-t-l ul li").click(function(){
		$(this).addClass("on").siblings("li").removeClass("on");
		$(".content-t-c img").attr({"src":$(this).find("img")[0].src});
	});
	//商品信息部分
	//商品数量减少部分
	$(".content-t-r-b span button:first").click(function(){
		if ($(this).next().val()<=1) {
			$(this).next().val(1);
		} else{
			$(this).next().val($(this).next().val()-1);
		}
	});
	//商品数量显示部分
	//初始化数据
	//限定的最大数量
	var max = $(".content-t-r-b>span:eq(4) i").text();
	$(".content-t-r-b span button:first").next()[0].defaultValue=1;
	$(".content-t-r-b span button:first").next()[0].value=1;
	//先屏蔽非数字字符
	$(".content-t-r-b span button:first").next().keypress(function(e){
		if (!/\d/.test(String.fromCharCode(e.charCode))&&e.charCode>9&&!e.ctrlKey) {
			e.preventDefault();
		}
		
	});
	//限定输入范围
	$(".content-t-r-b span button:first").next().blur(function(){
		
		if (this.value-0>=max-0) {
			this.value=max;
		} 
		if (this.value<=1) {
			this.value=1;
		}
	});
	//商品数量增加部分
	$(".content-t-r-b span button:last").click(function(){
		
		if ($(this).prev().val()>=max) {
			$(this).prev().val(max);
		} else{
			$(this).prev().val($(this).prev().val()-0+1);
		}
	});
	
	//颜色，规格部分按钮的点击事件
	$(".content-t-r-b span span").prev().click(function(){
		
		$(this).addClass("on").siblings("i").removeClass("on").end().parent().removeClass("error");
	});
	//立即购买按钮的点击事件
	$(".content-t-r-b>a:first").click(function(e){
		if ($(".content-t-r-b span span").prev().get(0).className=="") {
			$(".content-t-r-b span span").parent().eq(0).addClass("error");
			return false;
		} 
		if($(".content-t-r-b span span").prev().get(1).className==""){
			$(".content-t-r-b span span").parent().eq(1).addClass("error");
			return false;
		}
		else{
			if ($(".header-t-r li a:eq(1)").text()=="请登录") {
				e.preventDefault();
				//需要将数据传递给结算页，暂时考虑用cookie
				location.href = "login.html";
			}
		}
	});
	//加入购物车点击事件
	
	$(".content-t-r-b>a:last").click(function(e){
		//是否有选项没有被选中，有的话就显示警告
		if ($(".content-t-r-b span span").prev().get(0).className=="") {
			$(".content-t-r-b span span").parent().eq(0).addClass("error");
			return false;
		} 
		if($(".content-t-r-b span span").prev().get(1).className==""){
			$(".content-t-r-b span span").parent().eq(1).addClass("error");
			return false;
		}
		else{
			if ($(".header-t-r li a:eq(1)").text()=="请登录") {
				e.preventDefault();
				//需要将数据传递给结算页，暂时考虑用cookie
				location.href = "login.html";
			}
			else{
				//获取当前登录用户的所有信息
				var arr = JSON.parse($.myGetCookie("user"));
				var value = arr[0];
				if (value.shopCar.length==0) {
					value.shopCar.unshift({
						"id":$(".content-t-r-b span:first i").text(),
						"src":$(".content-t-l ul li img:first").attr("src"),
						"description":$(".content-t-r-t h2").text(),
						"color":$(".content-t-r-b>span:eq(2) i").text(),
						"feature":$(".content-t-r-b>span:eq(3) i").text(),
						"price":$(".content-t-r-b p:first").text(),
						"count":$(".content-t-r-b span [type=text]").val(),
						"max":max
						
					});
					
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
								"max":max
							});
							break;
						}
					}
					
					
				}
				
				
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
