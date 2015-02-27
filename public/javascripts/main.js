//function createRotatingBg () {
//  var bg = document.querySelector(".bg");
//  
//  bg.className = "bg rotating";
//  
//  var adjust = function () {
//    var width = Math.ceil(Math.sqrt(Math.pow(bg.parentNode.clientWidth, 2) + Math.pow(bg.parentNode.clientHeight, 2)));
//    
//    bg.style.width = width * 2 + "px";
//    bg.style.height = width * 2 + "px";
//    
//    var shiftX = width;
//    var shiftY = width - bg.parentNode.clientHeight * 0.5;
//    
//    bg.style.left = -shiftX + "px";
//    bg.style.top = -shiftY + "px";
//  }
//  
//  window.addEventListener("resize", adjust);
//  
//  adjust();
//  
//}
//
//function createGallery () {
//  
//  var currentIndex = 0;
//  var gallery = document.querySelector(".gallery");
//  
//  _.each(gallery.querySelectorAll("img"), function (img, index) {
//    img.setAttribute("data-index", index);
//  });
//  
//  var goTo = function (index) {
//    
//  }
//  
//}

document.addEventListener("DOMContentLoaded", function(event) { 
  
  //createRotatingBg();
  //createGallery();
  
  $(".gallery ul").createGallery($(".gallery nav"), true);
  
  var galleryInterval = null;
  
  var createInterval = function () {
    galleryInterval = setInterval(function () { $(".gallery nav a.next").trigger("click"); }, 4000);
  }
  
  createInterval();
  
  $(".gallery nav a").on("mouseenter", function () { clearInterval(galleryInterval); });
  $(".gallery nav a").on("mouseleave", function () { createInterval(); });
                                    
                                    
  
});
