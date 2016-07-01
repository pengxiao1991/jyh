//类似京东的懒加载插件，滚动事件触发时，判断如果停留时间小于50毫秒就认为用户不打算停留
//在滚轮滚到指定的元素的上方或是下方时，就执行传入的fn，其他的形参为fn的实参
//如果要执行多个函数，可用回调函数来封装之后再传入(建议都使用回调函数(特别是对象.方法名)，因为改变传入函数的作用域为window)
//不能传递函数的执行上下文，里面可能有原函数的外部函数的变量，会报错
;
(function ($) {
	//滚动到当前内容的中间部分，执行指定的函数
	$.fn.extend({
		"jdLoad":function(fn){
			
			var that = this;
			//将类数组转换成数组，没有返回第一项
			var temp = Array.prototype.slice.call(arguments,1);
			
			//开关，让fn在指定范围内只执行一次
			var flag = true;
			$(window).on("scroll",function(){
				//如果滚动到指定对象中间
				if (($(this).scrollTop()>=that.offset().top-$(this).height())&&($(this).scrollTop()<=that.offset().top+that.outerHeight())&&flag) {
					//清除之前的计时器
					clearTimeout(document.timer);
					//开启一个新的计时器，50毫秒作为一个估计值，判断用户不打算在当前页面停留
					document.timer = setTimeout(function(){
						//执行fn函数,用apply是为了方便传参,改变了原函数的作用域
						fn.apply(window,temp);
						//fn函数执行后再关闭开关
						flag = false;
						//当前对象的fn执行完后，看看页面是否还有其他符合条件的对象的fn可以执行
						$(window).scroll();
					},50);
				}
			});
			return this;
		}
	});
})(jQuery);













