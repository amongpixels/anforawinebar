document.addEventListener("DOMContentLoaded", function(event) { 
  
  var g = createGallery(document.querySelector(".gallery ul"), document.querySelector(".gallery nav"), true);
  
  var galleryInterval = null;
  
  var createInterval = function () {
    galleryInterval = setInterval(function () { g.showNext(); }, 4000);
  }
  
  createInterval();
  createAnimatedScroll();
  
  //$(".gallery nav a").on("mouseenter", function () { clearInterval(galleryInterval); });
  //$(".gallery nav a").on("mouseleave", function () { createInterval(); });
  
});
