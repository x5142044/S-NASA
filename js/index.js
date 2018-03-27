var Flickr = {};

// Fetch the Data as JSON
Flickr.GetData = function (per_page) {
    var api_key = "a5e95177da353f58113fd60296e1d250",
        user_id = "24662369@N07";
    var flickr_url =
        "https://api.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&api_key=" + api_key + "&user_id=" + user_id + "&per_page=" + per_page + "&format=json&nojsoncallback=1";
    var xhr = new XMLHttpRequest();

    xhr.open("GET", flickr_url);
    xhr.send();
    xhr.addEventListener('load', function (e) {
        var data = e.target.response;
        Flickr.pushToDOM(data);
    });
}

Flickr.pushToDOM = function (input) {
    var data = JSON.parse(input);
    var output = data.photos.photo.map(function (post) {
        return {
            id: post.id,
            title: post.title,
            secret: post.secret,
            server: post.server,
            farm: post.farm,
            title: post.title,
        }
    });

    var results = document.querySelector("#NASA_photo");
    output.forEach(function (item) {

        var div = document.createElement('div');
        div.className = "Nasa_div";

        var htmlImage = "<a target='_blank' href='https://www.flickr.com/photos/24662369@N07/'>";
        htmlImage += "<img src='https://farm";
        htmlImage += item.farm;
        htmlImage += ".staticflickr.com/";
        htmlImage += item.server;
        htmlImage += "/";
        htmlImage += item.id;
        htmlImage += "_";
        htmlImage += item.secret;
        htmlImage += ".jpg' ></a><div> ";
        htmlImage += item.title;
        htmlImage += "</div>";

        div.innerHTML = htmlImage;
        results.appendChild(div);
    });
    

};

Flickr.GetData(10);

//load more photos
function addTenItems() {
    var loadMore = 0;
    loadMore += 10;
    Flickr.GetData(10 + loadMore);
};

//search filter
function imageFilter() {
    var input, filter, filtedDiv, innerDiv;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    filtedDiv = document.getElementsByClassName("Nasa_div");


    for (i = 0; i < filtedDiv.length; i++) {
        innerDiv = filtedDiv[i].getElementsByTagName("div")[0];
        if (innerDiv.innerHTML.toUpperCase().indexOf(filter) > -1) {
            filtedDiv[i].style.display = "";
        } else {
            filtedDiv[i].style.display = "none";
        }
    }
}

//sort reverse
function sortDivs(){
    var elem = document.getElementById("NASA_photo");
        for (var i=0;i<elem.childNodes.length;i++) 
            elem.insertBefore(elem.childNodes[i], elem.firstChild);
}

