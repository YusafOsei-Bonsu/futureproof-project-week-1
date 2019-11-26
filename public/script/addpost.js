$(document).ready(() => {
    
    $("#searchgiphy").on("click", () => {
        const input = $("#giphy").val();
        console.log(input);

        const xhr = $.get(
            `http://api.giphy.com/v1/gifs/search?q=${input}&api_key=rUL04f4RvzYBVhJdj5UbinsbiL0Bj2qd&limit=10`
        );
        
        xhr.done(response => {
            console.log("success got data", response);

            let gifs = response.data;

            for (let gif of gifs) {
                $(".giphycontainer").append(
                    `<img src='${gif.images.original.url}' style= height: 100px'/>`
                );
            }
        });
    });
});