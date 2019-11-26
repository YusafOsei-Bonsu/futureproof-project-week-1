function getData() {
  var input = $("#giphy").val();
  console.log(input);

  var xhr = $.get(
    "http://api.giphy.com/v1/gifs/search?q=" +
      input +
      "&api_key=rUL04f4RvzYBVhJdj5UbinsbiL0Bj2qd&limit=10"
  );
  xhr.done(function(response) {
    console.log("success got data", response);

    let gifs = response.data;

    for (i in gifs) {
      $(".giphycontainer").append(
        "<img src='" + gifs[i].images.original.url + "' style= height: 100px'/>"
      );
    }
  });
}
