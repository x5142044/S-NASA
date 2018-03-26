var Flickr = {};

// Fetch the Data as JSON
Flickr.GetData = function (user_id) {
    var api_key = "a5e95177da353f58113fd60296e1d250",
        per_page = 40;
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
//    var image = document.createElement('img');
//    image.src = "https://farm" + item.farm + ".staticflickr.com/" + item.server + "/" + item.id + "_" + item.secret + ".jpg";
//    results.appendChild(image);
////        
    var div = document.createElement('div');
        div.className="Nasa_div";
//    div.textContent="<div> hello world </div>";
        
    var htmlImage = "<a target='_blank' href=''>";
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

       
//
//        
        
        
        });
    
    
        
        //        document.getElementById("#NASA_photo").innerHTML = image;
//        document.getElementById("#NASA_photo").appendChild(div);
   
};


Flickr.GetData("24662369@N07");

function imageFilter(){
    var input, filter, filtedDiv, innerDiv, outerDiv;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    outerDiv = document.getElementById("NASA_photo");
    filtedDiv = document.getElementsByClassName("Nasa_div");
    
    for(i=0;i<filtedDiv.length;i++){
        innerDiv = filtedDiv[i].getElementsByTagName("div")[0];
        if(innerDiv.innerHTML.toUpperCase().indexOf(filter)>-1){
            filtedDiv[i].style.display = "";
        }
        else{
             filtedDiv[i].style.display = "none";
        }
        
    }
    
    
    
}
