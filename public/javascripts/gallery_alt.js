function createGallery (el, nav, loop, onChange) {

  'use strict';

  var childSelector = "li"; // Child selector
  var preceedingCount = 5; //

  var loop = typeof loop === "undefined" ? true : loop;

  var children = _.map(el.querySelectorAll(childSelector), function (e, i) {
    var clone = e.cloneNode(true);
    clone.setAttribute("data-id", i);
    clone.style.position = "absolute";
    clone.style.left = 0;
    clone.style.top = 0;

    return clone;
  });

  if (children.length === 0) {
    return;
  }

  var currentChild = 0;

  if (loop) {
    // if we loop we delete all children and then recreate them in appendChildren
    // todo: change this so it doesnt remove all the kids, just append them if necessary
    _.each(el.querySelectorAll(childSelector), function (e) {
      e.parentNode.removeChild(e);
    });
  }
  else {
    _.each(el.querySelectorAll(childSelector), function (e, i) {
      e.setAttribute("data-id", i);
      e.setAttribute("data-margin-left", 100 * i);
      e.style.position = "absolute";
      e.style.left = 0;
      e.style.top = 0;
      e.style.marginLeft = 100 * i + "%";

      setTimeout(function() { e.className = "animated-slide"; }, 100);
    });
  }

  var getChildID = function (number) {
    var n = (number + children.length);
    return ((n % children.length) + children.length) % children.length;
  };

  var onResize = function () {
    //$el.parent().css("height", $el.find(childSelector).first().height() + "px");
  };

  var appendChildren = function () {
    for (var i = currentChild - preceedingCount ; i <= currentChild + preceedingCount ; i++) {
      var toAppend = children[getChildID(i)].cloneNode(true);
      toAppend.style.marginLeft = 100 * i + "%";
      toAppend.setAttribute("data-margin-left", 100 * i);

      el.appendChild(toAppend);

    }
  };

  var addMargin = function (amount) {
    _.each(el.querySelectorAll(childSelector), function (e) {
      var percent = parseInt(e.getAttribute("data-margin-left"), 10) + amount;

      e.style.marginLeft = percent + "%";

      e.setAttribute("data-margin-left", percent);
    });
  };

  var checkNavigation = function () {
    if (loop || _.isNull(nav)) {
      return;
    }

    if (currentChild === children.length - 1) {
      nav.querySelector(".next").className = nav.querySelector(".next").className + " inactive";
    }
    else {
      nav.querySelector(".next").className =  nav.querySelector(".next").className.replace(" inactive", "");
    }

    if (currentChild === 0) {
      nav.querySelector(".prev").className = nav.querySelector(".prev").className + " inactive";
    }
    else {
      nav.querySelector(".prev").className =  nav.querySelector(".prev").className.replace(" inactive", "");
    }

  }

  var goTo = function (id) {
    if (id < 0 || id > children.length -1) {
      return;
    }

    onChange(id)

    currentChild = getChildID(id);

    _.each(el.querySelectorAll(childSelector), function (e, i) {
      var percent = (i - id) * 100//parseInt((currentChild - id), 10);

      e.style.marginLeft = percent + "%";

      e.setAttribute("data-margin-left", percent);
    });

    //addMargin(-100 * change);
  };

  var showNext = function () {

    if (!loop && currentChild === children.length - 1) {
      goTo(0);
      return;
    }

    addMargin(-100);
    currentChild = getChildID(currentChild + 1);

    onChange(currentChild)

    if (loop) {
      setTimeout( function () {
        var first = el.querySelector(childSelector + ":first-child");
        first.parentNode.removeChild(first);
      }, 600);

      var id = currentChild + preceedingCount;
      var margin = 100 * preceedingCount;

      var toAppend = children[getChildID(id)].cloneNode(true);
      toAppend.setAttribute("data-margin-left", margin);
      toAppend.style.marginLeft = margin + "%";
      el.appendChild(toAppend);
    }
    else {
      checkNavigation();
    }

    //$el.trigger("change", currentChild);

  };

  var showPrevious = function () {

    if (!loop && currentChild === 0) {
      return;
    }

    addMargin(100);
    currentChild = getChildID(currentChild - 1);

    if (loop) {
      setTimeout( function () {
        var last = el.querySelector(childSelector + ":last-child");
        last.parentNode.removeChild(first);
      }, 600);

      var id = currentChild - preceedingCount;
      var margin = -100 * preceedingCount;

      var toPrepend = children[getChildID(id)].cloneNode(true);
      toPrepend.setAttribute("data-margin-left", margin);
      toPrepend.style.marginLeft = margin + "%";
      el.insertBefore(toPrepend, el.firstChild);
    }
    else {
      checkNavigation();
    }

    //$el.trigger("change", currentChild);

  };

  if (loop) {
    appendChildren();
  }
  else {
    checkNavigation();
  }

  if (!_.isNull(nav)) {
    nav.querySelector(".next").addEventListener("click", function (event) {
      event.preventDefault();
      showNext();
    });

    nav.querySelector(".prev").addEventListener("click", function (event) {
      event.preventDefault();
      showPrevious();
    });
  }

  window.addEventListener("resize", onResize);
  window.addEventListener("load", onResize);

  //$el.trigger("change", currentChild);

  //$el.showNext = showNext();

  return {
    showNext : showNext,
    goTo : goTo,
    slidesCount : children.length
  }

}
