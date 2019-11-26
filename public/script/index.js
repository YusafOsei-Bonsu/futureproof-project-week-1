function getData() {
  const input = $("#giphy").val();
  console.log(input);

  const xhr = $.get(
    `http://api.giphy.com/v1/gifs/search?q=${input}&api_key=rUL04f4RvzYBVhJdj5UbinsbiL0Bj2qd&limit=10`
  );
  xhr.done(response => {
    console.log("success got data", response);

    let gifs = response.data;

    for (i in gifs) {
      $(".giphycontainer").append(
        `<img src='${gifs[i].images.original.url}' width = 100 % />`
      );
    }
  });

}

//enabling a click on the giphs. orriginally had a block because addEventListener would not work. we discovered that this was because the giph images are dynamic elements, hence the the page is loaded the images are originally null untill there is a giph input. hence .on() was required in order to know that img is a dynamic element that will appear in the .giphycontainer.

$(document).ready(() => {

  
  $('.giphycontainer').on("click", 'img', function (){
    console.log(document.querySelector('img'))
    $('textarea').show();
  })
  })