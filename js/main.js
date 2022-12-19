// slider init
const swiper = new Swiper('.js-epitaphs-slider', {
  loop: true,
  autoHeight: true,
  fadeEffect: {
    crossFade: true 
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.slider-btn--prev',
    prevEl: '.slider-btn--next',
  },
  effect: 'fade'
});

// load moore gallery
var loadBtn = document.querySelector('.js-btn-moore');

loadBtn.addEventListener('click', function() {
  loadBtn.classList.toggle('is-active');
});

// modal share init
var modalBtn = document.querySelector('.js-btn-modal-share');
var modalBtnClose = document.querySelector('.js-btn-modal-share-close');
var modalBlock = document.querySelector('.modal-share');

modalBtn.addEventListener('click', function() {
  document.querySelector('body').classList.toggle('is-modal-opened');
  modalBlock.classList.toggle('is-show');
});

modalBtnClose.addEventListener('click', function() {
  document.querySelector('body').classList.remove('is-modal-opened');
  modalBlock.classList.remove('is-show');
});

// scroll to link
(function() {
  let d = document;

  function init() {
    //Links 
    let anchor1Link  = d.getElementById('scroll-link-1');
    let anchor2Link  = d.getElementById('scroll-link-2');
    let anchor3Link  = d.getElementById('scroll-link-3');
    let anchor4Link  = d.getElementById('scroll-link-4');
    //Anchors
    let anchor1      = d.getElementById('screen-gallery');
    let anchor2      = d.getElementById('screen-info');
    let anchor3      = d.getElementById('screen-epitaphs');
    let anchor4      = d.getElementById('screne-share');
    
    anchor1Link.addEventListener('click', (e) => { scrollTo(anchor1, e) }, false);
    anchor2Link.addEventListener('click', (e) => { scrollTo(anchor2, e) }, false);
    anchor3Link.addEventListener('click', (e) => { scrollTo(anchor3, e) }, false);
    anchor4Link.addEventListener('click', (e) => { scrollTo(anchor4.offsetTop, e) }, false);
  }
  
  function scrollTopValue(domElement) {
    return 'scrollTopValue:', domElement.scrollTop;
  }
  function offsetTopValue(domElement) {
    return 'offsetTopValue:', domElement.offsetTop;
  }

  var requestAnimFrame = (function() {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(callback) {
      window.setTimeout(callback, 1000 / 60);
    };
  })();

  function scrollTo(to, callback, duration = 1500) {
    if (isDomElement(to)) {
      to = to.offsetTop;
    }

    function move(amount) {
      document.documentElement.scrollTop = amount;
      document.body.parentNode.scrollTop = amount;
      document.body.scrollTop = amount;
    }

    function position() {
      return document.documentElement.offsetTop || document.body.parentNode.offsetTop || document.body.offsetTop;
    }
    
    var start = position(),
      change = to - start,
      currentTime = 0,
      increment = 20;
    
    var animateScroll = function() {
      currentTime += increment;
      var val = Math.easeInOutQuad(currentTime, start, change, duration);
      move(val);
      if (currentTime < duration) {
        requestAnimFrame(animateScroll);
      }
      else {
        if (callback && typeof(callback) === 'function') {
          callback();
        }
      }
    };
    
    animateScroll();
  }

  init();
})();

Math.easeInOutQuad = function(t, b, c, d) {
  t /= d / 2;
  if (t < 1) {
    return c / 2 * t * t + b
  }
  t--;
  return -c / 2 * (t * (t - 2) - 1) + b;
};

Math.easeInCubic = function(t, b, c, d) {
  var tc = (t /= d) * t * t;
  return b + c * (tc);
};

Math.inOutQuintic = function(t, b, c, d) {
  var ts = (t /= d) * t,
    tc = ts * t;
  return b + c * (6 * tc * ts + -15 * ts * ts + 10 * tc);
};

function isDomElement(obj) {
    return obj instanceof Element;
}

function isMouseEvent(obj) {
    return obj instanceof MouseEvent;
}

function findScrollingElement(element) {
  do {
    if (element.clientHeight < element.scrollHeight || element.clientWidth < element.scrollWidth) {
      return element;
    }
  } while (element = element.parentNode);
}
