(function($){
$(function(){
	//definition
	var $slideImage = $('#slide_img > ul'),
		$slideBack = $('#slide_btn_back > a'),
		$slideNext = $('#slide_btn_next > a'),
		duration = 1000,
		easing = 'swing';
		
	//initialize

  
	$slideImage
		.css({
			positon : 'relative',
			overflow : 'hidden'
		})
		.children()
		.css({
			position : 'absolute',
			top:0,
			left:0,
			zIndex:0
		})
		.first()
		.addClass('current')
		.nextAll()
		.hide();
  $(function(){
	var $setMainId = $('#slide_img');
	var $setThumbId  = $('#flickthumb');
	var scrollSpeed  = 300;
	var delayTime  = 5000;
    
	var mainWidth = parseInt($setMainId.css('width')),mainHeight = parseInt($setMainId.css('height'));
    
	$setMainId.wrapInner('<div id="flickmask"></div>');
	var $setMaskId = $('#flickmask');
	$setMaskId.css({width:(mainWidth),height:(mainHeight),position:'relative',overflow:'hidden',cursor:'pointer'});
    
	var $setMaskUl = $setMaskId.children('ul'),
	$setThumbUl = $setThumbId.children('ul'),
	$setThumbLi = $setThumbUl.children('li'),
	$setThumbLiFirst = $setThumbUl.children('li:first'),
	$setThumbLiLast = $setThumbUl.children('li:last'),
	listWidth = parseInt($setMaskUl.children('li').css('width')),
	listCount = $setMaskUl.children('li').length,
	leftMax = -((listWidth)*((listCount)-1));
    
	$setMaskUl.each(function(){
                    $(this).css({width:(listWidth)*(listCount)});
                    });
    
	var isTouch = ('ontouchstart' in window);
	$setMaskUl.bind(
                    {'touchstart mousedown': function(e){
                    var $setMaskUlNot = $setMaskId.children('ul:not(:animated)');
                    $setMaskUlNot.each(function(){
                                       e.preventDefault();
                                       this.pageX = (isTouch ? event.changedTouches[0].pageX : e.pageX);
                                       this.leftBegin = parseInt($(this).css('left'));
                                       this.left = parseInt($(this).css('left'));
                                       this.touched = true;
                                       clearInterval(setTimer);
                                       });
                    },'touchmove mousemove': function(e){
                    if(!this.touched){
                    return;
                    }
                    e.preventDefault();
                    this.left = this.left - (this.pageX - (isTouch ? event.changedTouches[0].pageX : e.pageX) );
                    this.pageX = (isTouch ? event.changedTouches[0].pageX : e.pageX);
                    
                    if(this.left < 0 && this.left > leftMax){
                    $(this).css({left:this.left});
                    } else if(this.left >= 0) {
                    $(this).css({left:'0'});
                    } else if(this.left <= leftMax) {
                    $(this).css({left:(leftMax)});
                    }
                    },'touchend mouseup mouseout': function(e){
                    if (!this.touched) {
                    return;
                    }
                    this.touched = false;
                    
                    var $setThumbLiActive = $setThumbUl.children('li.active');
                    
                    if(this.leftBegin > this.left && (!((this.leftBegin) === (leftMax)))){
                    $(this).stop().animate({left:((this.leftBegin)-(listWidth))},scrollSpeed);
                    $setThumbLiActive.each(function(){
                                           $(this).removeClass('active');
                                           $(this).next().addClass('active');
                                           });
                    } else if(this.leftBegin < this.left && (!((this.leftBegin) === 0))) {
                    $(this).stop().animate({left:((this.leftBegin)+(listWidth))},scrollSpeed);
                    $setThumbLiActive.each(function(){
                                           $(this).removeClass('active');
                                           $(this).prev().addClass('active');
                                           });
                    } else if(this.leftBegin === 0) {
                    $(this).css({left:'0'});
                    } else if(this.leftBegin <= leftMax) {
                    $(this).css({left:(leftMax)});
                    }
                    slideTimer();
                    }
                    });
    
	$setThumbLi.click(function(){
                      clearInterval(setTimer);
                      var connectCont = $setThumbLi.index(this);
                      $setMaskUl.stop().animate({left:(-(listWidth)*(connectCont))},scrollSpeed,function(){
                                                slideTimer();
                                                });
                      $setThumbLi.removeClass('active');
                      $(this).addClass('active');
                      });
    
	$setThumbLiFirst.addClass('active');
	$setThumbLi.css({opacity:'0.5'});
    
	$setMainId.append('<div id="moveprev"></div><div id="movenext"></div>');
	var $setPrevId = $('#moveprev');
	var $setNextId = $('#movenext');
	var $setPrevNextId = $('#movenext,#moveprev');
	$setPrevNextId.css({opacity:'0.5'});
    
	$setNextId.click(function(){
                     var $setThumbLiActive = $setThumbUl.children('li.active');
                     $setThumbLiActive.each(function(){
                                            var listLengh = $setThumbLi.length;
                                            var listIndex = $setThumbLi.index(this);
                                            var listCount = listIndex+1;
                                            
                                            if(listLengh == listCount){
                                            $setThumbLiFirst.click();
                                            } else {
                                            $(this).next('li').click();
                                            }
                                            });
                     });
	$setPrevId.click(function(){
                     var $setThumbLiActive = $setThumbUl.children('li.active');
                     $setThumbLiActive.each(function(){
                                            var listLengh = $setThumbLi.length;
                                            var listIndex = $setThumbLi.index(this);
                                            var listCount = listIndex+1;
                                            
                                            if(1 == listCount){
                                            $setThumbLiLast.click();
                                            } else {
                                            $(this).prev('li').click();
                                            }
                                            });
                     });
    
	slideTimer();
    
	function slideTimer() {
    setTimer = setInterval(function(){
                           var $setThumbLiActive = $setThumbUl.children('li.active');
                           $setThumbLiActive.each(function(){
                                                  var listLengh = $setThumbLi.length;
                                                  var listIndex = $setThumbLi.index(this);
                                                  var listCount = listIndex+1;
                                                  
                                                  if(listLengh == listCount){
                                                  $setThumbLiFirst.click();
                                                  } else {
                                                  $(this).next('li').click();
                                                  }
                                                  });
                           },delayTime);
	};
    
	var agent = navigator.userAgent;
	if(!(agent.search(/iPhone/) != -1 || agent.search(/iPad/) != -1 || agent.search(/iPod/) != -1 || agent.search(/Android/) != -1)){
    $setThumbLi.hover(function(){
                      $(this).stop().animate({opacity:'1'},300);
                      },function(){
                      $(this).stop().animate({opacity:'0.5'},300);
                      });
    $setPrevNextId.hover(function(){
                         $(this).stop().animate({opacity:'1'},300);
                         },function(){
                         $(this).stop().animate({opacity:'0.5'},300);
                         });
	}
    });
  
  
  
	function slide(e, $current, $next, operater)
	{
		
		//prevent default event
		if(!e.isDefaultPrevented()) e.preventDefault();
		
		deactivateButtons();
		
		$current
			.stop(true)
			.css({
				zIndex : 0
			})
			.animate({
				left : (operater * $current.width()) + 'px'
			}, duration, easing);
		
		$next
			.addClass('next')
			.stop(true)
			.show()
			.css({
				zIndex : 10,
				left : (operater * -1 * $next.width()) + 'px'
			})
			.animate({
				left : '0px'
			}, duration, easing, function(){
				$current
					.removeClass('current')
					.hide();
				
				$next
					.removeClass('next')
					.addClass('current');
					
				activateButtons();
			});
	}
	
	function slideBack(e)
	{
		var $current = $slideImage.children('.current'),
			$next = ($current.prev().length) ? $current.prev() : $slideImage.children().last();
		
		slide(e, $current, $next, 1);
		
		return false;
	}
	
	function slideNext(e)
	{
		var $current = $slideImage.children('.current'),
			$next = ($current.next().length) ? $current.next() : $slideImage.children().first();
			
		slide(e, $current, $next, -1);
		
		return false;
	}
	
	function doNothing(e)
	{
		if(!e.isDefaultPrevented()) e.preventDefault();
		return false;
	}
	
	function activateButtons(){
		$slideNext
			.unbind('click',doNothing)
			.css('cursor','pointer')
			.click(slideNext);
		
		$slideBack
			.unbind('click',doNothing)
			.css('cursor','pointer')
			.click(slideBack);
	}
	
	function deactivateButtons(){
		$slideNext
			.css('cursor','arrow')
			.click(doNothing)
			.unbind('click',slideNext);
		
		$slideBack
			.css('cursor','arrow')
			.click(doNothing)
			.unbind('click',slideBack);
	}
	
	//bind clicks
	activateButtons();
});
})(jQuery);