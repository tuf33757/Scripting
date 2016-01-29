/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var hitCount = 0;
var missCount = 0;
var hitText = 'Hits: ';
var missText = ' Misses: ';
var width;
var height;
var groundHeight;
var ctx;

$(document).ready(function() {
	var forest = $("#forest").get(0);
	width = $(document).width();
	height = $(document).height();
	groundHeight = Math.floor(height / 5);
	forest.width = width;
	forest.height = height;
	ctx=forest.getContext("2d");
    ctx.fillStyle="#00CCFF";
    /*ctx.fillRect(0, 0, width, height);*/
    ctx.fillStyle="#006633";
   /* ctx.fillRect(0, height - groundHeight, width, groundHeight);*/
   var back = new Image();
    back.src = 'images/graveyard_resized.jpg';
		
	back.onload = function(){	
        ctx.drawImage(back, 0, 0,width,height);
	
        }
	/*var img = new Image();
    img.onload = function(){
		var imgWidth = 185;
		var imgHeight = 208;
		var imgOffset = Math.floor(groundHeight * 0.66);
        ctx.drawImage(img, 25, height - (imgHeight + imgOffset), imgWidth, imgHeight);
	}
	img.src = 'images/tree.png';*/
	ctx.font="30px Arial";
	updateHitsMisses();
    createGhosts(10);
});

function createGhosts(count) {
	var delay = 0;
	for (var i = 0; i < count; i++) {
		var Ghost = $('<div><img src="images/Ghost.gif"/></div>');
		Ghost.css({
			position: 'absolute',
			left: width,
			top: Math.floor(Math.random() * ((height - 5) - groundHeight)),
 			cursor: 'crosshair'
		});
		Ghost.disableSelection();
		Ghost.appendTo('#Ghost');
		delay = delay + Math.floor(Math.random() * 2000);
		var speed = Math.floor(Math.random() * 300) + 100;
		Ghost.hide().delay(delay).show(1).animate({"left": "0px"}, {
		duration: width / speed * 1000,
		easing: "linear", 
		step: function(now, fx) {
			var topDelta = Math.floor(Math.random() * 6) - 3;
			$(fx.elem).css({top: "+=" + topDelta});
		},
		complete: function() {
			$(this).hide();
			missCount++;
			updateHitsMisses();
			}
		});
		Ghost.click(function() {
			$(this).stop();
			$(this).hide();
			hitCount++;
			updateHitsMisses();
		});
	}
}

function updateHitsMisses() {
	ctx.fillStyle = '#006633';
	ctx.fillRect(width - 300, height - groundHeight, 300, groundHeight);
	ctx.fillStyle = 'black';
	ctx.fillText(hitText + hitCount + missText + missCount, width - 300, height - 50);
}
