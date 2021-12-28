$(document).ready(function() {

    console.log('document loaded');

    //forces window back to top on reload - preferred for header disappearance/reappearance feature
    $(window).on('beforeunload', function() {
      $(window).scrollTop(0);
    });

//General JS Interactions

//Mobile menu visibility controls 
$('#menu-icon').on('click', function(event) {
    $('#mobile-menu').fadeIn(100, 'linear');
  });

$('#close-icon').on('click', function(event) {
    $('#mobile-menu').fadeOut(100, 'linear');
  });

  $( "#mobile-menu:visible" ).click(function() {
    $( this ).css( "background", "yellow" );
  });


  //Disabling scroll if mobile menu is visible
  if($("#mobile-menu").is(":visible")){

    $('html, body').css({
        overflow: 'hidden',
        height: '100%'
    });
} else {
    $('html, body').css({
        overflow: 'scroll',
        height: '100%'
    });
}

//Hides and Displays header based on scroll
var didScroll;
var lastScrollTop = 0;
var delta = 5;
var headerHeight = $('#primary-header').outerHeight();

// on scroll, let the interval function know the user has scrolled
$(window).scroll(function(event){
  didScroll = true;
});
// run hasScrolled() and reset didScroll status
setInterval(function() {
  if (didScroll) {
    hasScrolled();
    didScroll = false;
  }
}, 100);

function hasScrolled() {
  var st = $(this).scrollTop();

  if (Math.abs(lastScrollTop - st) <= delta)
    return;

  // If current position > last position AND scrolled past header...
  if (st > lastScrollTop && st > headerHeight){
    // Scroll Down
    $('#primary-header').addClass('header-up').removeClass('header-down');
  } else {
    // Scroll Up
    // If did not scroll past the document (possible on mac)...
    if(st + $(window).height() < $(document).height()) {
      $('#primary-header').removeClass('header-up').addClass('header-down');
    }
  }

  lastScrollTop = st;
}


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
});
