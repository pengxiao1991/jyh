//手风琴插件
//json数据具体为{"width":300,"height":200,"left":50,"imgSrc":[]}
;
(function ($) {
	
		function Accordion($element,json){
			this.$element = $element;
			this.json = json;
			this.count = 0;
			this.init();
		}
		Accordion.prototype = {
			"constructor":Accordion,
			"init":function(){
				this.createHTML();
				this.startMove();
				this.autoPlay();
			},
			"createHTML":function(){
				
				var html = "";
				//根据imgSrc数组的长度来拼接img标签
				for (var i = 0; i < this.json.imgSrc.length; i++) {
					html+="<img style=\"width:"+(this.json.width-(this.json.imgSrc.length-1)*this.json.left)+"px;height:"+this.json.height+"px;position:absolute;left:"+(i*this.json.left)+"px;\" src=\""+this.json.imgSrc[i]+"\"/>";
				}
				//新建一个div作为内部容器插入到给定容器里面
				$("<div></div").appendTo(this.$element).css({
					"position":"relative",
					"width":this.json.width,
					"height":this.json.height,
					"overflow":"hidden"
				}).html(html);
			},
			"startMove":function(){
				var that = this;
				$("img",that.$element).mousedown(function(){
					if ($("img",that.$element).is(":animated")==false) {
						that.count =$(this).index()+1;
						if ($(this).position().left<(that.json.imgSrc.length-0.9)*that.json.left) {
							
								$(this).nextAll().filter(function(){
									return $(this).position().left<(that.json.imgSrc.length-0.9)*that.json.left;
								}).animate({"left":"+="+($(this).width()-that.json.left)},500);
							
						}
							
			
						else{
							
							
								$(this).prevAll().filter(function(){
									return $(this).position().left>(that.json.imgSrc.length-0.9)*that.json.left;
								}).animate({"left":"-="+($(this).width()-that.json.left)},500);
								$(this).animate({"left":"-="+($(this).width()-that.json.left)},500);
							
							
						}
					}
					else{
						
					}
			
				});
				
			},
			"autoPlay":function(){
				var that = this;
				that.timer = setInterval(function(){
					
					if (that.count==$("img",that.$element).length) {
						that.count = 0;
					} 
					else{
						$("img",that.$element).eq(that.count).mousedown();
					}
					
				},3000);
				
				that.$element.hover(function(){
					console.log("1");
					clearInterval(that.timer);
				},function(){
					that.timer = setInterval(function(){
						
						if (that.count==$("img",that.$element).length) {
							that.count = 0;
						} 
						else{
							$("img",that.$element).eq(that.count).mousedown();
						}
						
					},3000);
				});
			}
		};
		
		
		
	
	$.fn.extend({
		"accordion":function(json){
			
			new Accordion(this,json);
		}
	});
})(jQuery)














