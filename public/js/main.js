$(document).ready(()=> {

  $(window).scroll(function() {
    let distanceFromTop = $(window).scrollTop();
    if(distanceFromTop != 0){
      $('nav').addClass('blacked');
    }else{
      $('nav').removeClass('blacked');
    }
  });

   // Configuration ==================================

   fetch(`https://www.episcribe.be/cockpit/api/collections/get/configuration?token=b2aff9e33dda2ee179beb889fb0c86`)
   .then(res=>res.json())
   .then(function(response) {
    //  console.log(response)
     printPageConfig(response);
   });
 
   function printPageConfig(r){
     $('[data-c]').each(function(){
       let id = $(this).data('c');
       let val = r.entries[0][id];
       $(this).html(val);
     });
   }

   // Content ==================================

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
  }else{
    console.log('no g__id!')
  }


  function printPage(r){
    document.title = "Episcribe - " +  r.entries[0]["name"];
    $('[data-c]').each(function(){
      let id = $(this).data('c');
      let val = r.entries[0][id];
      $(this).html(val);
    });
  }

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const gid = urlParams.get('id');
  console.log(gid);

  // Posts ==================================

    fetch(`
    https://www.episcribe.be/cockpit/api/collections/get/posts?token=b2aff9e33dda2ee179beb889fb0c86
    `)
    .then(res=>res.json())
    .then(function(response) {
      printShortPosts(response);
      printListPosts(response);
    });

  function printShortPosts(r){
    $('[data-shortPosts]').each(function(){
      let shortPosts = "";
      for (let i = 0; i < 2; i++) {
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
      $(this).after(shortPosts);
      $(this).remove();
    });
  }

  function printListPosts(r){
    if(gid){
      let pos;
      for (let i = 0; i < r.entries.length; i++) {
        if(r.entries[i]._id == gid){
          pos = i;
        }
      }

      $('#articleTitle').text(r.entries[pos].titre);
      $('[data-c="content"]').html(r.entries[pos].corp);

    }else{
      $('[data-listPosts]').each(function(){
        let listPosts = "";
        for (let i = 0; i < 2; i++) {
          if(r.entries[i].titre && r.entries[i].corp && r.entries[i].cover.path){
            let imgSrc = "https://www.episcribe.be" + r.entries[i].cover.path;
            let date = new Date(r.entries[i].date);
            let gdate = date.toLocaleString('fr-FR', { month: 'long', day: 'numeric', year: 'numeric'})
            listPosts += `
            <a href="article.html?id=${r.entries[i]._id}" class="post">
              <img class="post__cover" src="${imgSrc}" alt="Lorem ipsum dolor!">
              <h3 class="post__title">${r.entries[i].titre}</h3>
              <span class="post__time">Publié le ${gdate}</span>
            </a>
            `;
          }
        }
        $(this).after(listPosts);
        $(this).remove();
      });
    }

  }

    // Opinions
    fetch(`
    https://www.episcribe.be/cockpit/api/collections/get/temoignages?token=b2aff9e33dda2ee179beb889fb0c86
    `)
    .then(res=>res.json())
    .then(function(response) {
      printShortOpinion(response);
    });

  function printShortOpinion(r){
    $('[data-shortOps]').each(function(){
      let shortOps = "";
      for (let i = 0; i < 3; i++) {
        if(r.entries[i].name && r.entries[i].corp){
          shortOps += `
          <div class="grid__col testimony__post">
            <p>${r.entries[i].corp}</p>
            <span class="testimony__sign">${r.entries[i].name}</span>
          </div>
          `;
        }
      }
      $(this).after(shortOps);
      $(this).remove();
    });
  }

});

