window.onload = function() {

  // проверка на наличие сенсорного экрана
  if ("ontouchstart" in window || navigator.msMaxTouchPoints) { isTouch = true; } else { isTouch = false; } 


  // 
  // 
  // header
  // 
  // 

  var userControlBtn = document.querySelector(".page-header__user-control.enter");

  if (userControlBtn) {
    userControlBtn.addEventListener("click", function() {
      userControlBtn.classList.toggle("active");
    });
  }

  var phoneBtn = document.querySelector(".page-header__phone-salons-btn");
  var phoneList = document.querySelector(".page-header__phone-salons");

  phoneBtn.addEventListener("click", function() {
    phoneList.classList.toggle("active");
  });

  var searchBtn = document.querySelector(".page-header__search button");
  var searchForm = document.querySelector(".page-header__search");

  searchBtn.addEventListener("click", function(evt) {
    if (document.documentElement.clientWidth <= 750) {
      evt.preventDefault();
      searchForm.classList.toggle("active");
      var inputSearch = searchForm.querySelector("input");
      if (inputSearch.value) {
        searchForm.submit();
      }
    }
  });

  var btnNav = document.querySelector(".nav__nav-btn");
  var navList = document.querySelector(".nav__list");

  var listItem = document.querySelectorAll(".nav__link");
  var btnInnerNav = document.querySelectorAll(".nav__inner-btn");

  btnNav.addEventListener("click", function() {
    btnNav.classList.toggle("active");
    navList.classList.toggle("active");

    if (navList.classList.contains("active")) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "";
    }
    

    function closeSubMenu(elem) {
      if (elem) {
        elem.style.height = elem.scrollHeight + "px";
        elem.offsetWidth = elem.offsetWidth;
        elem.style.height = 0;
        elem.classList.remove("active");
      }
    }

    // close inner nav
    if (!btnNav.classList.contains("active")) {
      for (var i = 0; i < btnInnerNav.length; i++) {
        closeSubMenu(btnInnerNav[i].nextElementSibling);
      }
      for (var i = 0; i < listItem.length; i++) {
        closeSubMenu(listItem[i].nextElementSibling);
      }
    }

  });

  for (var i = 0; i < listItem.length; i++) {
    listItem[i].style.transitionDelay = i * 0.05 + "s";
  }

  // открывает подразделы навигации (разрешение по умолчанию 5000)
  function opening(elem, resolution = 5000) {
    for (var i = 0; i < elem.length; i++) {

      elem[i].addEventListener("click", function(evt) {

        if (document.documentElement.clientWidth <= resolution) {

          if (this.nextElementSibling) {

            var el = this.nextElementSibling;

            if (el.classList.contains("active")) {
              el.style.height = el.scrollHeight + "px";
              el.offsetWidth = el.offsetWidth; 
              el.style.height = 0;
            } else {
              el.style.height = el.scrollHeight + "px";
              setTimeout(function() {
                el.style.height = "auto";
              }, 400);
            }
            
            evt.preventDefault();
            el.classList.toggle("active");
          }

        }

      });
    }
  }

  opening(listItem, 1280);
  opening(btnInnerNav);


  // sticky menu
  var stickyContainer = document.querySelector(".page-header");
  var stickyMenu = document.querySelector(".nav");

  function getTopCoord(elem) {
    return stickyMenu.getBoundingClientRect().top;
  }

  var initialPos = getTopCoord(stickyMenu) + pageYOffset;

  //изначальная высота хедера, чтобы во время перемещения элемнтов высота не прыгала
  var initialHeight = stickyContainer.offsetHeight;

  function sticky() {
    if (document.body.offsetWidth < 1280) {
      if (getTopCoord(stickyMenu) < 0 && !stickyContainer.classList.contains("sticky")) {
        stickyContainer.classList.add("sticky");
        stickyContainer.style.minHeight = initialHeight + "px";
      } else if (pageYOffset <= initialPos && stickyContainer.classList.contains("sticky")) {
        stickyContainer.classList.remove("sticky");
      }
    } else if (stickyContainer.classList.contains("sticky")) {
      stickyContainer.classList.remove("sticky");
      stickyContainer.style.minHeight = '';
    }
  }

  sticky();

  window.onresize = function () {
    // перерасчет изначально позиции и высоты
    stickyContainer.classList.remove("sticky");
    stickyContainer.style.minHeight = '';
    initialPos = getTopCoord(stickyMenu) + pageYOffset;
    initialHeight = stickyContainer.offsetHeight;
    sticky();
  }

  window.onscroll = function () {
    sticky();
  }
  // 
  // 
  // End header
  // 
  // 


  var card = document.querySelectorAll(".card");

  if (isTouch) {
    for (var i = 0; i < card.length; i++) {
      card[i].addEventListener("click", function() {
        this.classList.add("active");
      });
    }
  }

  function removeActivity(elem, evt) {
    if (elem) {
      var tar = evt.target;
      var bool = false;
      while (tar != document.body) {
        if (tar == elem && elem.classList.contains("active")) {
          bool = true;
        }
        var tar = tar.parentElement;
      }
      if (!bool) {
        elem.classList.remove("active");
      }
    }
  }



  document.body.addEventListener("click", function(evt) {
    removeActivity(userControlBtn, evt);
    removeActivity(phoneList, evt);
    removeActivity(searchForm, evt);
    for (var i = 0; i < card.length; i++) {
      removeActivity(card[i], evt);
    }
  });  
}







//
//
// Slicky slider
//
//

$(document).ready(function(){
  $('.slider__container').slick({
    arrows: false,
    dots: true,
    infinite: true,
    speed: 1000,
    fade: true,
    autoplay: true,
    autoplaySpeed: 4000,
    appendDots:$(".slider__control"),
  });
});