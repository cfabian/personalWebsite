$(document).ready(function () {
    var bgColor = '#'+ ('000000' + Math.floor(Math.random()*16777215).toString(16)).slice(-6);
    var color1 = '#'+ ('000000' + Math.floor(Math.random()*16777215).toString(16)).slice(-6);
    var color2 = '#'+ ('000000' + Math.floor(Math.random()*16777215).toString(16)).slice(-6);
    $('canvas').css({
        'background-color' : bgColor
    });
	
	// Changes the screen size to the current window size
	var $canvasId = document.getElementById('drawing');
	$canvasId.width = $(window).width();
	$canvasId.height = $(window).height();
	
	$(window).resize(function() {
		$canvasId.width = $(window).width();
		$canvasId.height = $(window).height();
	});
	
	$canvas = $('canvas');
    var context = $canvas[0].getContext("2d");
    
    var lastEvent;
    var mouseDown = false;
    
    // Handles mouse click events
    $canvas.mousedown(function(e) {
        $('.instructions').fadeOut('slow')
        lastEvent = e;
        mouseDown = true;
    
    }).mousemove(function(e) {
        if (mouseDown) {
            //Draw lines
            context.beginPath();
            context.moveTo(lastEvent.offsetX, lastEvent.offsetY);
            context.lineTo(e.offsetX, e.offsetY);
            if (e.which == 1) {
                context.strokeStyle = color1;
                context.lineWidth = 3;
            } else if (e.which == 2) {
                context.strokeStyle = bgColor;
                context.lineWidth = 10;
            } else {
                context.strokeStyle = color2;
                context.lineWidth = 3;
            }
            context.stroke();
            lastEvent = e;
        }
    }).mouseup(function() {
        mouseDown = false;
    }).mouseleave(function() {
        $canvas.mouseup();
    });
    
    // Handles touch events
    $canvas.on('touchstart', function(e) {
        $('.instructions').fadeOut('slow')
        lastEvent = e;
        mouseDown = true;
    
    }).on('touchmove', function(e) {
        if (mouseDown) {
            //Draw lines
            context.beginPath();
            context.moveTo(lastEvent.touches[0].pageX, lastEvent.touches[0].pageY);
            context.lineTo(e.touches[0].pageX, e.touches[0].pageY);
            context.strokeStyle = color1;
            context.lineWidth = 10;
            context.stroke();
            lastEvent = e;
        }
    }).on('touchend', function() {
        mouseDown = false;
    }).on('touchcancel', function() {
        $canvas.mouseup();
    });
});