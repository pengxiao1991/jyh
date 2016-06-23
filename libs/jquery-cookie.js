;
(function($){
	//封装一个函数，完成增加和修改cookie的功能
	function setCookie(name,value,expires,path,domain,secure){
		var dec = encodeURIComponent(name)+"="+encodeURIComponent(value)+";";
		if(expires){
			var dt = new Date();
			dt.setTime(dt.getTime()+expires);
			dec = dec+"expires="+dt+";";
		}
		if(path){
			dec = dec+"path="+path+";";
		}
		if(domain){
			dec = dec+"domain="+domain+";";
		}
		if(secure){
			dec = dec+"secure";
		}
		document.cookie = dec;
	}
	//封装一个函数，完成删除cookie的功能
	function removeCookie(name){
		setCookie(encodeURIComponent(name),"",-1);
	}

	//封装一个函数，完成获取cookie的功能,返回value值，是一个字符串，如果没有找到，返还空字符串
	function getCookie(name){
		
		var cookies = (document.cookie).split("; ");
		
		for(var i = 0;i<cookies.length;i++){
			if(cookies[i].split("=")[0]==encodeURIComponent(name)){
				return decodeURIComponent(cookies[i].split("=")[1]);
			}
		}
		return "";

	}
	$.extend({
		"mySetCookie":setCookie,
		"myRemoveCookie":removeCookie,
		"myGetCookie":getCookie
	});
})(jQuery);



























































