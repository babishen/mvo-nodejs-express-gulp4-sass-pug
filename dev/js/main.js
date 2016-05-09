// check for IE browser greater than ie8
if ($('.no-js').length != 0) {
  // IE9 is the first browser to support the no-js functionality
  // So, this will support all browsers IE9 and greater
  function unsupportedBrowserRedirect (e) {
    window.location.href = '../unsupported'
  }
  unsupportedBrowserRedirect()
}

$(window).load(function () {
  'use strict'
})

$(document).ready(function () {
  // dom ready
})
