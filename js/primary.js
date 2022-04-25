///// GLOBABLLY SCOPED VARIABLES /////

// Scrolling behavior variables
let didScroll = false;
let lastScrollTop = 0;
const delta = 5;
const navbarHeight = $("header").outerHeight();

  // Card position variables
  let cardSectionStart;
  let cardHeight;
  let cardDelta;
  let cardMargin = $('#card-two').css('margin-top');
  let cardSpacing = parseFloat(cardMargin) / 2;
  

///// FUNCTIONS /////

function fixPosMobileMenu() {
  if ($("#mobile-menu").is(":visible")) {
    $("html").addClass("fixed-position");
  } else {
    $("html").removeClass("fixed-position");
  }
}

function headerShowHide() {
  var st = $(this).scrollTop();

  if (Math.abs(lastScrollTop - st) <= delta) return;

  // If current position > last position AND scrolled past navbar...
  if (st > lastScrollTop && st > navbarHeight) {
    // Scroll Down
    $("header").removeClass("header-down").addClass("header-up");
  } else {
    // Scroll Up
    // If did not scroll past the document (possible on mac)...
    if (st + $(window).height() < $(document).height()) {
      $("header").removeClass("header-up").addClass("header-down");
    }
  }

  lastScrollTop = st;
}

function getCardPos() {
  // Dynamically get height of all the cards
  cardHeight = document.querySelector(".project-card").offsetHeight;
  cardSectionStart = document.querySelector("#card-one").getBoundingClientRect().bottom;
  cardRaiseTrigger = cardSectionStart - cardHeight + cardSpacing;
  // console.log(cardSpacing);
  // console.log(cardOnePos);

  //find the margin and add too the raise trigger for cards two and three - 24px at current desktop
  cardLowerTrigger = cardSectionStart - cardHeight * 2 - cardSpacing;

  // Set the static positon variables based on the viewport so we can compare against them on scroll

  cardTwoPosStatic = document.querySelector("#card-two").getBoundingClientRect().bottom;
  cardTwoDelta = cardTwoPosStatic - cardHeight;

  cardThreePosStatic = document.querySelector("#card-three").getBoundingClientRect().bottom;
  cardThreeDelta = cardThreePosStatic - cardHeight;

    // Logging card position variables needed to calculate card raise behavior
    console.log(cardHeight);
    console.log(cardTwoPosStatic);
    console.log(cardRaiseTrigger);
}

// Function to dynamically raise the project card that is currently in focus - run in conjunction with other scroll triggered functions
function raiseCard() {
  let cardOnePos = document.querySelector("#card-one").getBoundingClientRect().bottom;
  let cardTwoPos = document.querySelector("#card-two").getBoundingClientRect().bottom;
  let cardThreePos = document.querySelector("#card-three").getBoundingClientRect().bottom;
  
  $(".project-card").removeClass("raised");

  //Same that all the if else statements
  switch (true) {
    case cardOnePos <= cardRaiseTrigger && cardOnePos >= cardLowerTrigger:
      $("#card-one").addClass("raised");
      console.log("raise number one!");
      break;
    case cardTwoPos <= cardRaiseTrigger && cardTwoPos >= cardLowerTrigger:
      $("#card-two").addClass("raised");
      console.log("raise number two!");
      break;
    case cardThreePos <= cardRaiseTrigger && cardThreePos >= cardLowerTrigger:
      $("#card-three").addClass("raised");
      console.log("raise number three!");
      break;
    default: //scroll<=590
      $(".project-card").removeClass("raised");
  }


}

// The debounce function receives our function as a parameter
const debounce = (fn) => {
  // This holds the requestAnimationFrame reference, so we can cancel it if we wish
  let frame;

  // The debounce function returns a new function that can receive a variable number of arguments
  return (...params) => {
    // If the frame variable has been defined, clear it now, and queue for next frame
    if (frame) {
      cancelAnimationFrame(frame);
    }

    // Queue our function call for the next frame
    frame = requestAnimationFrame(() => {
      // Call our function and pass any params we received
      fn(...params);
    });
  };
};


///// APPLICATION GO BRRRRRRR >>>>>>>

$(document).ready(function () {
  $(this).scrollTop(0);

  getCardPos();

  console.log("document loaded");

  //Allows page to load before adding the class that later triggers dynamic shadow and border styles on header
  $("header").addClass("header-down");

  // run hasScrolled() and raiseCard() and reset didScroll status
  setInterval(function () {
    if (didScroll) {
      headerShowHide();
      raiseCard();
      didScroll = false;
    }
  }, 100);

  // Project Role Marquee Animation Script
  //Loop required so that the project role marquees are identified individually
  let i;
  let marquee = $(".role-marquee-container");
  for (i = 0; i < marquee.length; i++) {
    var $tickerWrapper = $(".role-marquee-container:eq(" + i + ")");
    var $list = $tickerWrapper.find("ul.role-marquee");
    var $clonedList = $list.clone();
    //IMPORTANT!! Keep this at 0 so there is no additional spacing between the cloned lists
    var listWidth = 0;

    $list.find("li").each(function (i) {
      listWidth += $(this, i).outerWidth(true);
    });

    var endPos = $tickerWrapper.width() - listWidth;

    $list.add($clonedList).css({
      width: listWidth + "px",
    });

    $clonedList.addClass("cloned").appendTo($tickerWrapper);

    //TimelineMax - Depends on GSAP jQuery library - must be in head tag of every HTML page
    var infinite = new TimelineMax({ repeat: -1, paused: true });
    //Change the value of this variable to adjust marquee speed
    var time = 15;

    infinite
      .fromTo(
        $list,
        time,
        { rotation: 0.01, x: 0 },
        { force3D: true, x: -listWidth, ease: Linear.easeNone },
        0
      )
      .fromTo(
        $clonedList,
        time,
        { rotation: 0.01, x: listWidth },
        { force3D: true, x: 0, ease: Linear.easeNone },
        0
      )
      .set($list, { force3D: true, rotation: 0.01, x: listWidth })
      .to(
        $clonedList,
        time,
        { force3D: true, rotation: 0.01, x: -listWidth, ease: Linear.easeNone },
        time
      )
      .to(
        $list,
        time,
        { force3D: true, rotation: 0.01, x: 0, ease: Linear.easeNone },
        time
      )
      .progress(1)
      .progress(0)
      .play();
  }

  // Reads out the scroll position and stores it in the data attribute
  // so we can use it in our stylesheets
  function storeScroll() {
    document.documentElement.dataset.scroll = window.scrollY;
  }

  // Update scroll position for first time
  storeScroll();

  // Listen for new scroll events, here we debounce our `storeScroll` function
  document.addEventListener("scroll", debounce(storeScroll), { passive: true });
});

///// EVENT LISTENERS /////

//Mobile menu display/visibility controls
$("#menu-icon").on("click", function (event) {
  $("#mobile-menu").fadeIn(100, "linear");
  fixPosMobileMenu();
});

$("#close-icon").on("click", function (event) {
  $("#mobile-menu").fadeOut(100, "linear");
  fixPosMobileMenu();
});

// on scroll, let the interval function know the user has scrolled
$(document).on('scroll', function (e) {
  console.log("scrolled");
  didScroll = true;

  var posY = $(document).scrollTop();


  if (posY === 0) {
    getCardPos();
};

});
