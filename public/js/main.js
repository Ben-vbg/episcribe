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

  // Configuration
  fetch(`
  https://www.episcribe.be/cockpit/api/collections/get/configuration?token=b2aff9e33dda2ee179beb889fb0c86
  `)
  .then(res=>res.json())
  .then(function(response) {
    printPage(response);
  });

  // Posts
  fetch(`
  https://www.episcribe.be/cockpit/api/collections/get/posts?token=b2aff9e33dda2ee179beb889fb0c86
  `)
  .then(res=>res.json())
  .then(function(response) {
    printShortPosts(response);
  });


  
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
  }else{
    console.log('no g__id!')
  }


  function printPage(r){
    $('[data-c]').each(function(){
      let id = $(this).data('c');
      let val = r.entries[0][id];
      $(this).html(val);
    });
  }

  function printShortPosts(r){
    
    $('[data-shortPosts]').each(function(){

      let shortPosts = "";

      for (let i = 0; i < r.entries.length; i++) {
        console.log(r.entries[i])
        if(r.entries[i].titre && r.entries[i].corp){

          shortPosts += `
          <div class="grid__col blog__short">
            <h3>${r.entries[i].titre}</h3>
            <p>
              ${r.entries[i].chapeau.slice(0,157)}...
            </p>
          </div>
          `;
        }

      }
      console.log(shortPosts);
      $(this).after(shortPosts);
      $(this).remove();

    });
  }


});

