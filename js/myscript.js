var disneyInfo = JSON.parse(disney);
var likes = [];
var dislikes = [];
var likesAverage = [];
var iArray = [];
// array um die i der for loop wieder zu verwenden
var domElementstoSort = [];

$("#menu").hover(function () {
    $('body').toggleClass("active");
    /*fügt die klasse active hinzu beim hovering*/
});

// creation of the DOM Element incl animation class from wowJS + storing infos in infos in the several arrays

for (let i=0; i < disneyInfo.length ; i++){
    iArray.push(i);
    likes.push(disneyInfo[i].likes);
    dislikes.push(0);
    likesAverage.push(disneyInfo[i].likes);

    var img = `
        <div id="${disneyInfo[i].id}" value="${disneyInfo[i].likes}" class="wow jackInTheBox singleCard no-gutters media  col-lg-5 mt-2 mb-3 p-2" data-wow-duration="2s" data-wow-delay="1s">
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
//--------------------------------from now on we will handle with DOM Element ----------------------------------
$(document).ready(function(){

domElementstoSort = $(".singleCard");

// speichert die divs als ganze objekte im Array und werden selektiert durch die klasse

iArray.forEach((i)=>{setEvent(i)});
// =>  ist eine mini funktion, die heißt arrow function und kreiert selbst eine funktion ohne dass man function(){} schreibt (lambda in python)
// i ist das element von iArray, in dem Fall die indices die in der For Schleife gepushed wurden
// setEvent, countingLikes etc bekommen somit indirekt die i der For Schleife

document.getElementById("sortBtn").addEventListener("click", sortRating);


    let popup = $("#popup");
// wir deklarieren die variable  damit wir nicht mit der id arbeiten müssen
popup.hide();
document.getElementById("menuBtn").addEventListener("click", function () {
    popup.show();
    // creation of a sort of  alert window with TOOLTIP & POPOVER POSITIONING ENGINE
    var popper = new Popper(this,popup,{
        placement: 'right'
    });
    setTimeout(function(){popup.hide()}, 2000);
    // verstecken nach 2 sec
});

function setEvent(i) {
    let selectLike = "likeBtn"+disneyInfo[i].id;
    let selectDislike = "dislikeBtn"+disneyInfo[i].id;
// variable deklarieren mit der id. i wird als parameter übergeben iArray durch die forEach schleife (oben)
    document.getElementById(selectLike).addEventListener("click", function () {
        countingLikes(this, i);
    });
    document.getElementById(selectDislike).addEventListener("click", function () {
        countingLikes(this, i);
    });
}

// bekommt den i wie oben von iArray
function countingLikes (btn, i) {
    var divID = disneyInfo[i].id;
    if (btn.id === "likeBtn"+ divID){
       likes[i] += 1;
       // disneyInfo[i].likes++; changes temporarly the json info in the browser
       // console.table(disneyInfo);
       btn.innerText = likes[i];
    }
    else if (btn.id === "dislikeBtn"+divID) {
        dislikes[i] += 1;
        btn.innerText = dislikes[i];
    }
    likesAverage[i] = likes[i] - dislikes[i];
    $("#"+divID).attr("value", likesAverage[i]);
    // hier setzt man den likesAverage als value der propertie value von den automatisch generierten divs damit man das dann später benützt zum sortieren
}


function sortRating() {
    console.log(domElementstoSort);
    tinysort(domElementstoSort, {order:"desc", attr:"value"});
    console.log(domElementstoSort);
    // disneyInfo.sort(function(a,b){ return b.likes - a.likes })
}
// tinySort war teil vom JS ist aber jz eine library, man viele möglichkeiten zum sortieren , hier sortiert man absteigend durch die oben gesetzte value - die div wurden in dem array domElementstoSort als ganze objekte gespeichert sonst könnte man nicht auf dem attribut value zurückgreifen. die divs gehen kurz raus aus dem dom, organisieren sich neu und kommen wieder rein, deswegen kommt die animation wieder

});