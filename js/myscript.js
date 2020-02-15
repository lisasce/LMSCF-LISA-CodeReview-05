var disneyInfo = JSON.parse(disney);
var likes = [];
var dislikes = [];
var iArray = [];

$("#menu").hover(function () {
    $('body').toggleClass("active");
    /*fügt die klasse active hinzu beim hovering*/
});

for (let i=0; i < disneyInfo.length ; i++){
    iArray.push(i);
    likes.push(disneyInfo[i].likes);
    dislikes.push(0);

    var img = `
        <div id="${disneyInfo[i].id}" class="singleCard no-gutters media  col-lg-5 mt-2 mb-2 p-2">
                <img src="../img/${disneyInfo[i].img}" class= "disneyPic col-lg-5 m-2 p-2" alt="${disneyInfo[i].img}" title="${disneyInfo[i].title}">
                <div class=" media-body col-lg-7 p-3">
                    <h4 class="card-title">${disneyInfo[i].title}</h4>
                    <p class="card-text">${disneyInfo[i].description}</p>
                    <div class="text-center">
                        <button type="button" id="likeBtn${disneyInfo[i].id}" class="myButton btn fa fa-thumbs-up"> ${disneyInfo[i].likes} </button>
                        <button type="button" id="dislikeBtn${disneyInfo[i].id}" class="btn myButton fa fa-thumbs-down">
      0 </button>
                    </div>
                </div>

        </div>
	`;
document.getElementById("cardDiv").innerHTML += img;



}

$(document).ready(function(){



iArray.forEach((i)=>{setEvent(i)});

console.table(likes);
console.table(dislikes);

function setEvent(i) {
    let selectLike = "likeBtn"+disneyInfo[i].id;
    let selectDislike = "dislikeBtn"+disneyInfo[i].id;

    document.getElementById(selectLike).addEventListener("click", function () {
        countingLikes(this, i);
    });

    document.getElementById(selectDislike).addEventListener("click", function () {
        countingLikes(this, i);
    });
}


function countingLikes (btn, i) {
    if (btn.id === "likeBtn"+disneyInfo[i].id){
       likes[i] += 1;
       btn.innerText = likes[i];
    }
    else if (btn.id === "dislikeBtn"+disneyInfo[i].id) {
        dislikes[i] += 1;
        btn.innerText = dislikes[i];
    }
}




/*function sortRating() {


}*/




});