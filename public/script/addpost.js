$(document).ready(() => {
    
    $("#searchgiphy").on("click", () => {
        const searchedGifTerm = $("#giphy").val();

        // Sending GET request to recieve Gifs, which includes searched term
        const xhr = $.get(`http://api.giphy.com/v1/gifs/search?q=${searchedGifTerm}&api_key=rUL04f4RvzYBVhJdj5UbinsbiL0Bj2qd&limit=10`);

        xhr.done(response => {
            console.log("success got data", response);

            let gifs = response.data;
            
            // Display 10 gifs on the page
            for (let gif of gifs) {
                $(".giphycontainer").append(
                    `<img src='${gif.images.original.url}' style= height: 100px'/>`
                );
            }
        });
    });
});