jQuery.fn.extend({
  
  createGallery : function (nav, loop) {
    
    'use strict';
    
    var $el = this;
    if ($el.length === 0) {
      return;
    }
    
    var $nav = $(nav);
    
    var childSelector = "li"; // Child selector
    var preceedingCount = 5; //
    
    var loop = typeof loop === "undefined" ? true : loop;
    
    var children = $(this).find(childSelector).map( function (e, i) { 
      return $(this).clone().data("id", i).css({
        position : "absolute",
        left : 0,
        top : 0
      }); 
    });
    
    if (children.length === 0) {
      return;
    }
    
    var currentChild = 0;
    
    if (loop) {
      // if we loop we delete all children and then recreate them in appendChildren
      // todo: change this so it doesnt remove all the kids, just append them if necessary
      $(this).find(childSelector).remove();
    }
    else {
      $(this).find(childSelector).each( function (i, c) {
        $(c).data("id", i).css({
          position : "absolute",
          left : 0,
          top : 0,
          "margin-left" : 100 * i + "%"
        }).data("margin-left", 100 * i);
      } ); 
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
        var toAppend = children[getChildID(i)].clone();
        toAppend.css({
          "margin-left" : 100 * i + "%"
        }).data("margin-left", 100 * i);
        
        $el.append(toAppend);
        
      }
    };
    
    var addMargin = function (amount) {
      $el.find(childSelector).each(function () {
        var percent = parseInt($(this).data("margin-left"), 10) + amount;
        $(this).css("margin-left", percent + "%").data("margin-left", percent);
      });
    };
    
    var checkNavigation = function () {
      if (loop) {
        return;
      }
      
      if (currentChild === children.length - 1) {
        $nav.children('.next').addClass("inactive");
      }
      else {
        $nav.children('.next').removeClass("inactive");
      }
      
      if (currentChild === 0) {
        $nav.children('.prev').addClass("inactive");
      }
      else {
        $nav.children('.prev').removeClass("inactive");
      }
      
    }
    
    var showNext = function () {
      
      if (!loop && currentChild === children.length - 1) {
        return;
      }
      
      addMargin(-100);
      currentChild = getChildID(currentChild + 1);
      
      if (loop) {
        setTimeout( function () {
            $el.find(childSelector + ":first-child").remove();
        }, 600);
      
        var id = currentChild + preceedingCount;
        var margin = 100 * preceedingCount;
        
        var toAppend = children[getChildID(id)].clone();
        toAppend.data("margin-left", margin).css("margin-left", margin + "%");
        $el.append(toAppend);
      }
      else {
        checkNavigation();
      }
      
      $el.trigger("change", currentChild);
      
    };
    
    var showPrevious = function () {
      
      if (!loop && currentChild === 0) {
        return;
      }
      
      addMargin(100);
      currentChild = getChildID(currentChild - 1);
      
      if (loop) {
        setTimeout( function () {
          $el.find(childSelector + ":last-child").remove();
        }, 600);
      
        var id = currentChild - preceedingCount;
        var margin = -100 * preceedingCount;
        
        var toPrepend = children[getChildID(id)].clone();
        toPrepend.data("margin-left", margin).css("margin-left", margin + "%");
        $el.prepend(toPrepend);
      }
      else {
        checkNavigation();
      }
      
      $el.trigger("change", currentChild);
      
    };
    
    if (loop) {
      appendChildren();
    }
    else {
      checkNavigation();
    }
    
    $nav.children('.next').on("click", function (event) {
      event.preventDefault();
      showNext();
    });
    
    $nav.children('.prev').on("click", function (event) {
      event.preventDefault();
      showPrevious();
    });
    
    $(window).on("resize", onResize);
    $(window).on("load", onResize);
    
    $el.trigger("change", currentChild);
    
    //$el.showNext = showNext();
    
    return {
      showNext : showNext
    }
    
  }
  
});
