$(document).ready(()=> {

  $(window).scroll(function() {
    let distanceFromTop = $(window).scrollTop();
    if(distanceFromTop != 0){
      $('nav').addClass('blacked');
    }else{
      $('nav').removeClass('blacked');
    }
  });



  fetch('https://www.episcribe.be/cockpit/api/collections/get/services?token=b2aff9e33dda2ee179beb889fb0c86')
  .then(res=>res.json())
  .then(function(response) {
    printData(response);
  });

  function printData(r){
    $('[data-c]').each(function(){
      let id = $(this).data('c');
      let val = r.entries[0][id];
      $(this).text(val);
    });
  }

  let g__id = $('body').attr('id');

  if(g__id){
    console.log('g__id find!')

    fetch(`
    https://www.episcribe.be/cockpit/api/collections/get/${g__id}?token=b2aff9e33dda2ee179beb889fb0c86
    `)
    .then(res=>res.json())
    .then(function(response) {
      printPage(response);
    });
  
    function printPage(r){
      $('[data-c]').each(function(){
        let id = $(this).data('c');
        let val = r.entries[0][id];
        $(this).html(val);
      });
    }
    
  }else{
    console.log('no g__id!')
  }




});

