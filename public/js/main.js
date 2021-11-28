$(document).ready(()=> {

  $(window).scroll(function() {
    let distanceFromTop = $(window).scrollTop();
    if(distanceFromTop != 0){
      $('nav').addClass('blacked');
    }else{
      $('nav').removeClass('blacked');
    }
  })

});
