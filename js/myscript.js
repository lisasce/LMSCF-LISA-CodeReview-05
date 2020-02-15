var disneyInfo = JSON.parse(disney);
var likes = [];
var dislikes = [];
var likesAverage = [];
var iArray = [];
var domElementstoSort = [];

$("#menu").hover(function () {
    $('body').toggleClass("active");
    /*fügt die klasse active hinzu beim hovering*/
});

for (let i=0; i < disneyInfo.length ; i++){
    iArray.push(i);
    likes.push(disneyInfo[i].likes);
    dislikes.push(0);
    likesAverage.push(disneyInfo[i].likes);

    var img = `
        <div id="${disneyInfo[i].id}" value="${disneyInfo[i].likes}" class="singleCard no-gutters media  col-lg-5 mt-2 mb-2 p-2">
                <img src="../img/${disneyInfo[i].img}" class= "disneyPic col-lg-5 col-4 m-2 p-2" alt="${disneyInfo[i].img}" title="${disneyInfo[i].title}">
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
//-------------------------------------------------------------------------------
$(document).ready(function(){

domElementstoSort = $(".singleCard");
console.table(domElementstoSort);

iArray.forEach((i)=>{setEvent(i)});
// i ist das element von iArray, in dem Fall die indices die in der For Schleife gepushed wurden
// setEvent, countingLikes etc bekommen somit indirekt die i der For Schleife

document.getElementById("sortBtn").addEventListener("click", sortRating);

let popup = $("#popup");
popup.hide();
document.getElementById("menuBtn").addEventListener("click", function () {
    popup.show();
    var popper = new Popper(this,popup,{
        placement: 'right'
    });
    setTimeout(function(){popup.hide()}, 2000);
});

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
    var divID = disneyInfo[i].id
    if (btn.id === "likeBtn"+ divID){
       likes[i] += 1;
       btn.innerText = likes[i];
    }
    else if (btn.id === "dislikeBtn"+divID) {
        dislikes[i] += 1;
        btn.innerText = dislikes[i];
    }
    likesAverage[i] = likes[i] - dislikes[i];
    console.table(likesAverage);
    $("#"+divID).attr("value", likesAverage[i]);
}


function sortRating() {
    domElementstoSort.sort(function (element1, element2) {
    
    })

}




});