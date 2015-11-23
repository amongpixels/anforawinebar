document.addEventListener("DOMContentLoaded", function(event) {

  if (document.querySelector(".gallery ul")) {
    var galleryNav = document.createElement("nav");
    var onGalleryChange = function(id) {
      _.each(galleryNav.querySelectorAll("a"), function(a, i) {
        a.className = ""
        if (id == i) {
          a.className = "active";
        }
      })
    }
    var g = createGallery(document.querySelector(".gallery ul"), document.querySelector(".gallery nav"), false, onGalleryChange);

    var galleryInterval = null;

    var createInterval = function () {
      galleryInterval = setInterval(function () { g.showNext(); }, 4000);
    }

    $(".gallery").on("mouseenter", function () { clearInterval(galleryInterval); console.log("enter"); });
    $(".gallery").on("mouseleave", function () { createInterval(); console.log("leave"); });


    galleryNav.className = "gallery-nav";
    for (var i = 0 ; i < g.slidesCount ; i++) {
      var navLink = document.createElement("a");
      navLink.innerHTML = "<span>" + i + "</span>";
      (function(i) {
        navLink.addEventListener("click", function(event) { g.goTo(i); });
      })(i);
      galleryNav.appendChild(navLink);
    }
    onGalleryChange(0);

    var gallery = document.querySelector(".gallery");
    gallery.parentNode.insertBefore(galleryNav, gallery.nextSibling);
    $(galleryNav).on("mouseenter", function () { clearInterval(galleryInterval); console.log("enter"); });
    $(galleryNav).on("mouseleave", function () { createInterval(); console.log("leave"); });

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
});
