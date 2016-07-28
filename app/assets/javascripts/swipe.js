
$('document').ready(function() {
  $button = document.getElementById('swipe-in')
  $closeButton = document.getElementById('swipe-out')
  $("#swipeable").swipe( {
    swipeRight:function() {
      $button.click();
    },
    threshold: 75
  });
  $("#swipeable").swipe( {
    swipeLeft:function() {
      $closeButton.click();
    },
    threshold: 75
  });

});
