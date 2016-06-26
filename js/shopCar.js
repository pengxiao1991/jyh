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
	//根据是否登录判断应该显示的画面
	//如果没有登录
	if ($(".header-t-r li a:eq(1)").text()=="请登录"){
		var html = "<img src=\"../img/gwc_kong.png\"/>"
					+"<p>购物车内暂没有商品，<a href=\"login.html\">登录</a>后将显示您之前加入的商品，去<a href=\"index.html\">首页</a>挑选商品</p>"
					+"";
		$(".container").html(html).css({
			"textAlign":"center",
			"margin":"100px 0"
		});
	}
	else{
		//所有的用户信息
		var arr = JSON.parse($.myGetCookie("user"));
		//当前在线的用户信息
		var value = arr[0];
		//如果购物车的商品为0
		if (value.shopCar.length==0) {
			var html = "<img src=\"../img/gwc_kong.png\"/>"
						+"<p>购物车内暂没有商品，去<a href=\"index.html\">首页</a>挑选商品</p>"
						+"";
			$(".container").html(html).css({
				"textAlign":"center",
				"margin":"100px 0"
			});
		} else{
			var html = $(".content-t table tbody").html();
			for (var i = 0; i < value.shopCar.length; i++) {
				html+="<tr>"
						+"<td><input type=\"checkbox\" id=\"all_che\" checked=\"checked\" /></td>"
						+"<td class=\"clear\">"
							+"<a class=\"td-l fl clear\" href=\"goodDetail.html\">"
								+"<img class=\"td-l fl\" src=\""+value.shopCar[i].src+"\"/>"
								+"<p class=\"td-c fl\">"+value.shopCar[i].description+"</p>"
							+"</a>"
							+"<div class=\"td-r fr\">"
								+"<b>颜色:<i>"+value.shopCar[i].color+"</i></b>"	
								+"<b>规格:<i>"+value.shopCar[i].feature+"</i></b>"
							+"</div>"
						+"</td>"
						+"<td>"+value.shopCar[i].price.slice(1)+"</td>"
						+"<td>"
							+"<div>"
								+"<button>-</button><input type=\"text\" value=\""+value.shopCar[i].count+"\"/><button>+</button>"	
							+"</div>"
							+"<span>限购<i>"+value.shopCar[i].max+"</i>件</span>"
						+"</td>"
						+"<td>"+(value.shopCar[i].price.slice(1)*100*value.shopCar[i].count/100).toFixed(2)+"</td>"
						+"<td><a href=\"javascript:;\">删除</a><input type=\"hidden\" value=\""+value.shopCar[i].id+"\" /></td>"
					+"</tr>";
				
			}
			$(".content-t table tbody").html(html);
			total();
			//为购物车内的各种按钮注册事件
			
			
			//商品数量显示部分
			
			//商品数量减少部分
			$("tbody tr:not(:first) td:eq(3) button:first").click(function(){
				if ($(this).next().val()<=1) {
					$(this).next().val(1);
				} else{
					$(this).next().val($(this).next().val()-1);
				}
				subtotal($(this).parents("tr").index());
				total();
			});
			//先屏蔽非数字字符
			$("tbody tr:not(:first) td:eq(3) button:first").next().keypress(function(e){
				//屏蔽非数字键&&屏蔽键码大于9的键（就是保留上下，退格，删除键）&&保留ctrl键
				if (!/\d/.test(String.fromCharCode(e.charCode))&&e.charCode>9&&!e.ctrlKey) {
					e.preventDefault();
				}
				
			});
			//限定输入范围
			$("tbody tr:not(:first) td:eq(3) button:first").next().keyup(function(){
				
				if (this.value>=$(this).parent().next().find("i").text()) {
					this.value=$(this).parent().next().find("i").text();
				} 
				if (this.value<=1) {
					this.value=1;
				}
				subtotal($(this).parents("tr").index());
				total();
			});
			//商品数量增加部分
			$("tbody tr:not(:first) td:eq(3) button:last").click(function(){
				
				if ($(this).prev().val()>=$(this).parent().next().find("i").text()-0) {
					$(this).prev().val($(this).parent().next().find("i").text());
				} else{
					$(this).prev().val($(this).prev().val()-0+1);
				}
				subtotal($(this).parents("tr").index());
				total();
			});
			//表格中的删除按钮部分
			$("tbody tr:not(:first) td:eq(5) a").click(function(){
				//先删除cookie中的部分
				//value.shopCar.splice($(this).index(),1);
				
				//再删除表格中的数据
				$(this).parents("tr").remove();
				total();
				//如果购物车被删光，就刷新页面
				if ($("tbody tr:not(:first) td:eq(5) a").length==0) {
					location.reload();
				}
			});
			//表格外的删除按钮部分
			$(".content-b-l>a").click(function(){
				//调用表格中的删除按钮
				$("tbody tr:not(:first) td:eq(0) :checked").parents("tr").find("td:last-child a").trigger("click");
			});
			//两个全选按钮的点击事件
			$("[type=checkbox]:first,[type=checkbox]:last").click(function(){
				var index = $(this).index();
				if (this.checked) {
					$("[type=checkbox]").prop({"checked":"checked"});
					
				} else{
					$("[type=checkbox]").prop({"checked":""});
				}
				total();
			});
			//表格中按钮的点击事件
			$("tbody tr:not(:first) td:eq(0) input").click(function(){
				if (this.checked) {
					//都被选中时
					if ($("tbody tr:not(:first) td:eq(0) input:not(:checked)".length==0)) {
						$("[type=checkbox]:first,[type=checkbox]:last").prop({"checked":"checked"});
					}
				} else{
					//都不被选中时
					if ($("tbody tr:not(:first) td:eq(0) input:checked".length==0)) {
						$("[type=checkbox]:first,[type=checkbox]:last").prop({"checked":""});
					}
				}
				total();
			});
			//计算当前行商品的小计
			function subtotal(index){
				var $far = $(".content-t tbody tr:eq("+index+")");
				$far.find("td:eq(4)").text(($far.find("td:eq(2)").text()*100*$far.find("td:eq(3)").find("input").val()/100).toFixed(2));
			}
			//计算所有被选择商品的总价，并显示出选择的数量
			function total(){
//				
				var priceSum = 0;
				var numSum = 0;
				//$(".content-b-r span:first i").text($("tbody tr:not(:first) td:eq(0) :checked").length);
				//遍历取和
				$("tbody tr:not(:first) td:eq(0) :checked").parents("tr").find("td:eq(4)").each(function(index){
					priceSum = priceSum + $(this).text()*100;
					numSum = numSum + ($(this).prev().find("input").val()-0);
				})
				//改变总价和总选择的件数
				$(".content-b-r span:last b").text("￥"+(priceSum/100).toFixed(2));
				$(".content-b-r span:first i").text(numSum);
			}
			//离开页面前的事件，将所修改的数据保存到cookie中
			window.onbeforeunload = function(){
				//清空cookie中原先保存的购物车信息
				value.shopCar = [];
				$("tbody tr:not(:first)").each(function(index){
					value.shopCar.push({
						"id":$(this).find("td:eq(5) input").val(),
						"src":$(this).find("td:eq(1) a img").attr("src"),
						"description":$(this).find("td:eq(1) a p").text(),
						"color":$(this).find("td:eq(1) div b i:first").text(),
						"feature":$(this).find("td:eq(1) div b i:last").text(),
						"price":"￥"+$(this).find("td:eq(2)").text(),
						"count":$(this).find("td:eq(3) input").val(),
						"max":$(this).find("td:eq(3) span i").text()
					});
				});
				//将所获得的最后结果存入cookie
				$.mySetCookie("user",JSON.stringify(arr),70*24*3600*1000);
			}
			
		}
	}
	
});
