;(function(window) {

  var svgSprite = '<svg>' +
    '' +
    '<symbol id="icon-bottom" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M515.4 790.1c-9.6 0-18.7-3.8-25.5-10.7L474 763.2c-0.4-0.5-0.9-0.9-1.3-1.4L40.3 322.6c-14.4-14.6-14.4-38.2 0-52.7l16.7-17c6.8-6.9 15.8-10.7 25.4-10.7s18.7 3.8 25.5 10.7l407.5 413.9L923 253c6.8-6.9 15.9-10.8 25.5-10.8 9.6 0 18.6 3.8 25.5 10.8l16.7 16.9c14.3 14.5 14.3 38.2 0 52.7L551.1 769l-10.2 10.3C534.1 786.2 525 790.1 515.4 790.1z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-left" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M703.7 1001c-11 0-21.5-4.8-29.6-13.6L293.2 571.2c-8.5-9.3-13.2-21.8-13.2-35.3 0-12.3 4.1-24.1 11.4-33.2L668.5 38.4c8.2-10.1 19.4-15.7 31.4-15.7 10.1 0 19.9 4.1 27.6 11.6 9 8.7 14.3 20.9 15 34.2 0.7 13.4-3.3 26.3-11.3 36.2L382.8 533.9l350.5 383c8.5 9.3 13.2 21.9 13.2 35.3 0 13.4-4.7 26-13.2 35.3C725.2 996.2 714.7 1001 703.7 1001z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-right" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M290.3 997c-11.4 0-22.1-4.4-30.2-12.4-8-8-12.4-18.5-12.4-29.8 0-11.2 4.4-21.8 12.4-29.8l415.6-412.9L260.1 99.3c-8-8-12.4-18.5-12.4-29.8 0-11.2 4.4-21.8 12.4-29.8 8-8 18.8-12.4 30.2-12.4s22.1 4.4 30.2 12.4l443.9 441c8.2 8.2 12.6 19.1 12.3 30.8l0 0.6 0 0.6c0.3 11.7-4.1 22.7-12.3 30.8l-443.9 441C312.4 992.6 301.7 997 290.3 997z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-top" viewBox="0 0 1025 1024">' +
    '' +
    '<path d="M948.5 790.1c-9.6 0-18.7-3.8-25.5-10.7L515.4 365.4 107.9 779.3C101 786.2 92 790 82.4 790c-9.6 0-18.6-3.8-25.5-10.8l-16.7-16.9c-14.3-14.5-14.3-38.2 0-52.7l439.5-446.4 10.2-10.3c6.8-6.9 15.9-10.8 25.5-10.8s18.7 3.8 25.5 10.7l16 16.2c0.4 0.5 0.8 0.9 1.3 1.3l432.4 439.2c14.4 14.6 14.4 38.2 0 52.7l-16.7 17C967.1 786.2 958.1 790.1 948.5 790.1z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-error" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M817.9 781 554.5 517.6l263.4-263.4c13.2-13.2 13.2-34.6 0-47.8-13.2-13.2-34.6-13.2-47.8 0L506.8 469.8 243.4 206.5c-13.2-13.2-34.6-13.2-47.8 0-13.2 13.2-13.2 34.6 0 47.8L459 517.6 195.6 781c-13.2 13.2-13.2 34.6 0 47.8 13.2 13.2 34.6 13.2 47.8 0l263.4-263.4 263.4 263.4c13.2 13.2 34.6 13.2 47.8 0C831.1 815.5 831.1 794.1 817.9 781L817.9 781z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-success" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M931.2 213.3c15 12.8 13.7 39.1-2.9 58.6L495.1 780.1c-16.7 19.5-42.4 25-57.4 12.2l0 0c-15-12.8-13.7-39.1 2.9-58.6l433.2-508.2C890.5 206 916.2 200.5 931.2 213.3L931.2 213.3zM141.6 419c14.1-12.6 39.4-7.2 56.5 11.9l273.9 304c17.1 19.2 19.5 44.9 5.5 57.4l0 0c-14.1 12.6-39.4 7.2-56.5-11.9L145.8 474.9C128.7 455.8 127.6 431.6 141.6 419L141.6 419 141.6 419z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-error-b" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M818.56 864.747c-20.373-5.973-76.907-62.507-118.4-104-44.907-44.907-210.133-200.533-211.733-202.133l-2.24-2.133-1.813 2.453c-56.213 75.093-203.627 271.36-211.307 277.867-13.227 11.2-33.707 17.387-57.813 17.387-15.147 0-31.36-2.56-46.933-7.36 7.68-28.16 63.893-103.68 113.813-170.453 19.84-26.56 42.347-56.747 65.707-88.853 18.88-23.040 37.973-45.76 56.533-67.413l19.413-22.613-22.4-19.627c-30.4-26.667-62.933-53.547-94.293-79.467-53.547-44.267-126.613-104.747-134.293-123.413-14.933-36.373-6.933-94.613 1.707-116.8 68.267 10.133 207.467 147.52 299.947 238.72l21.547 21.227 21.12-21.653c219.947-226.56 296.747-231.253 299.947-231.36h0.853c4.373-0.213 8.533-0.32 12.48-0.32 24.213 0 35.307 4.587 39.573 7.253-21.333 26.347-104.213 101.867-171.093 162.88-43.2 39.36-140.8 141.44-141.76 142.4l-1.707 1.813 14.080 15.573c44.587 49.387 93.44 99.733 136.533 144.213 52.693 54.4 118.080 121.92 124.8 138.027 12.053 29.44 10.773 71.040-12.267 87.787z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-success-b" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M110.649 551.261c-5.614-6.055-5.504-15.522 0.219-21.465l37.428-38.748c2.972-3.082 6.935-4.734 11.228-4.734 3.852 0 7.596 1.431 10.457 4.074l226.544 208.051 14.2-23.667c1.101-1.871 111.951-184.934 251.312-327.487 116.685-119.547 208.6-205.189 258.798-241.294 1.431-0.99 3.082-1.541 4.734-1.541 2.752 0 6.385 1.431 7.926 5.504l9.797 26.53c1.101 3.082 0.441 6.385-1.762 8.697-44.142 45.243-157.083 165.12-252.633 299.857-121.748 171.724-231.828 366.785-271.016 437.787l-307.234-331.561z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-menu" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M371.99 857.278c-20.962 0-37.969-17.007-37.969-37.969s17.007-37.969 37.969-37.969h494.781c20.962 0 37.969 17.007 37.969 37.969s-17.007 37.969-37.969 37.969h-494.781zM156.834 857.278c-20.962 0-37.969-17.007-37.969-37.969s17.007-37.969 37.969-37.969h64.864c20.962 0 37.969 17.007 37.969 37.969s-17.007 37.969-37.969 37.969h-64.864zM371.99 550.76c-20.962 0-37.969-17.007-37.969-37.969s17.007-37.969 37.969-37.969h494.781c20.962 0 37.969 17.007 37.969 37.969s-17.007 37.969-37.969 37.969h-494.781zM156.834 550.76c-20.962 0-37.969-17.007-37.969-37.969s17.007-37.969 37.969-37.969h64.864c20.962 0 37.969 17.007 37.969 37.969s-17.007 37.969-37.969 37.969h-64.864zM371.99 244.242c-20.962 0-37.969-17.007-37.969-37.969s17.007-37.969 37.969-37.969h494.781c20.962 0 37.969 17.007 37.969 37.969s-17.007 37.969-37.969 37.969h-494.781zM156.834 244.242c-20.962 0-37.969-17.007-37.969-37.969s17.007-38.364 37.969-38.364h64.864c20.962 0 37.969 17.007 37.969 37.969s-17.007 37.969-37.969 37.969h-64.864z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '</svg>'
  var script = function() {
    var scripts = document.getElementsByTagName('script')
    return scripts[scripts.length - 1]
  }()
  var shouldInjectCss = script.getAttribute("data-injectcss")

  /**
   * document ready
   */
  var ready = function(fn) {
    if (document.addEventListener) {
      if (~["complete", "loaded", "interactive"].indexOf(document.readyState)) {
        setTimeout(fn, 0)
      } else {
        var loadFn = function() {
          document.removeEventListener("DOMContentLoaded", loadFn, false)
          fn()
        }
        document.addEventListener("DOMContentLoaded", loadFn, false)
      }
    } else if (document.attachEvent) {
      IEContentLoaded(window, fn)
    }

    function IEContentLoaded(w, fn) {
      var d = w.document,
        done = false,
        // only fire once
        init = function() {
          if (!done) {
            done = true
            fn()
          }
        }
        // polling for no errors
      var polling = function() {
        try {
          // throws errors until after ondocumentready
          d.documentElement.doScroll('left')
        } catch (e) {
          setTimeout(polling, 50)
          return
        }
        // no errors, fire

        init()
      };

      polling()
        // trying to always fire before onload
      d.onreadystatechange = function() {
        if (d.readyState == 'complete') {
          d.onreadystatechange = null
          init()
        }
      }
    }
  }

  /**
   * Insert el before target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var before = function(el, target) {
    target.parentNode.insertBefore(el, target)
  }

  /**
   * Prepend el to target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var prepend = function(el, target) {
    if (target.firstChild) {
      before(el, target.firstChild)
    } else {
      target.appendChild(el)
    }
  }

  function appendSvg() {
    var div, svg

    div = document.createElement('div')
    div.innerHTML = svgSprite
    svgSprite = null
    svg = div.getElementsByTagName('svg')[0]
    if (svg) {
      svg.setAttribute('aria-hidden', 'true')
      svg.style.position = 'absolute'
      svg.style.width = 0
      svg.style.height = 0
      svg.style.overflow = 'hidden'
      prepend(svg, document.body)
    }
  }

  if (shouldInjectCss && !window.__iconfont__svg__cssinject__) {
    window.__iconfont__svg__cssinject__ = true
    try {
      document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>");
    } catch (e) {
      console && console.log(e)
    }
  }

  ready(appendSvg)


})(window)