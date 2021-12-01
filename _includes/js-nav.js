'use strict';
// Navigation Script
  // Get all Nav Items
  var globalNavItems = [].slice.call(document.querySelectorAll(".globalNav__Item"));
  // Mouse functions to control the Nav

  var navBrand = document.querySelector('.navbar-brand');
  var navLink = document.querySelector('.nav-link');

  var navImgLoaded = false;

  var lazyNavImgs = [].slice.call(document.querySelectorAll(".lzy-nav-img"));

  function lazyLoadNavImages() {
    if (!navImgLoaded) {
        lazyNavImgs.forEach(function (item) {
        item.src = item.dataset.src;
        item.srcset = item.dataset.srcset;
        item.classList.remove("lazy");
        navImgLoaded = true;
      });
    }
    
  }

  function mouseOver(e) {
    e.stopPropagation();
    lazyLoadNavImages();
    globalNavItems.forEach(function (item) {
      item.classList.remove('is-active');
    })
    this.classList.add('is-active');
  }

  function mouseLeave(e) {
    
    this.classList.remove('is-active');
  }

  function mouseClick(e) {
    lazyLoadNavImages();
    globalNavItems.forEach(function (item) {
      item.classList.remove('is-active');
    })
    this.classList.toggle('is-active');
  }

  // Function to load Nav for Mobile(click) or Desktop(in/out)
  function navSize() {

    if (window.innerWidth >= 992) {
      lazyLoadNavImages();
      // remove Event Listener
      globalNavItems.forEach(function (globalNavItem) {
        globalNavItem.removeEventListener('click', mouseClick);
      })

      // Add Event Listener
      globalNavItems.forEach(function (globalNavItem) {
        globalNavItem.addEventListener('mouseover', mouseOver);
        globalNavItem.addEventListener('mouseleave', mouseLeave);
        globalNavItem.addEventListener('focusin', mouseOver);
        // globalNavItem.addEventListener('blur', mouseLeave);
      });
    } else {
      
      //  removeEventListener mouseover
      globalNavItems.forEach(function (globalNavItem) {
        globalNavItem.removeEventListener('mouseover', mouseOver);
      });
      // removeEventListener mouseleave
      globalNavItems.forEach(function (globalNavItem) {
        globalNavItem.removeEventListener('mouseleave', mouseLeave);

        globalNavItem.removeEventListener('click', mouseClick);
      });
      // AddEventListener click
      globalNavItems.forEach(function (globalNavItem) {
        globalNavItem.addEventListener('click', mouseClick);
      });
    }
  }
  // Navbar Toggler
  document.querySelector('.navbar-toggler').addEventListener('click', function () {
    globalNavItems.forEach(function (globalNavItem) {
      globalNavItem.classList.remove('is-active');
    });
  });

  navLink.addEventListener('focusin', function(){
    globalNavItems.forEach(function (item) {
      item.classList.remove('is-active');
    })
  });

  navBrand.addEventListener('focusin', function(){
    globalNavItems.forEach(function (item) {
      item.classList.remove('is-active');
    })
  });
  navSize();

window.addEventListener('resize', navSize);

  window.addEventListener('load', navSize);
  // window.addEventListener('load', lazyLoadNavImages);