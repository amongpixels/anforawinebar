document.addEventListener("DOMContentLoaded", function(event) {

  if (document.querySelector(".gallery ul")) {
    var g = createGallery(document.querySelector(".gallery ul"), document.querySelector(".gallery nav"), true);

    var galleryInterval = null;

    var createInterval = function () {
      galleryInterval = setInterval(function () { g.showNext(); }, 4000);
    }

    createInterval();
  }

  $('a[href^="#"]').on('click', function(event) {
    var target = $(this.href.substr(this.href.indexOf("#")));
    if( target.length ) {
        event.preventDefault();
        $('html, body').animate({
            scrollTop: target.offset().top
        }, 500);
    }
  });

  //$(".gallery nav a").on("mouseenter", function () { clearInterval(galleryInterval); });
  //$(".gallery nav a").on("mouseleave", function () { createInterval(); });

});
