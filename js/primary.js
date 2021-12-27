
// Project Role Marquee Animation Script
//Loop required so that the project role marquees are identified individually
let i;
let marquee = $('.role-marquee-container');
for (i = 0; i < marquee.length; i++) {


var $tickerWrapper = $(".role-marquee-container:eq("+i+")");
var $list = $tickerWrapper.find("ul.role-marquee");
var $clonedList = $list.clone();
//IMPORTANT!! Keep this at 0 so there is no additional spacing between the cloned lists
var listWidth = 5;

$list.find("li").each(function (i) {
			listWidth += $(this, i).outerWidth(true);
});

var endPos = $tickerWrapper.width() - listWidth;

$list.add($clonedList).css({
	"width" : listWidth + "px"
});

$clonedList.addClass("cloned").appendTo($tickerWrapper);

//TimelineMax - Depends on GSAP jQuery library - must be in head tag of every HTML page
var infinite = new TimelineMax({repeat: -1, paused: true});
//Change the value of this variable to adjust marquee speed
var time = 15;

infinite
  .fromTo($list, time, {rotation:0.01,x:0}, {force3D:true, x: -listWidth, ease: Linear.easeNone}, 0)
  .fromTo($clonedList, time, {rotation:0.01, x:listWidth}, {force3D:true, x:0, ease: Linear.easeNone}, 0)
  .set($list, {force3D:true, rotation:0.01, x: listWidth})
  .to($clonedList, time, {force3D:true, rotation:0.01, x: -listWidth, ease: Linear.easeNone}, time)
  .to($list, time, {force3D:true, rotation:0.01, x: 0, ease: Linear.easeNone}, time)
  .progress(1).progress(0)
  .play();
}

