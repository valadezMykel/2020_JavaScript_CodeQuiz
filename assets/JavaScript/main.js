
var starterBlockEl = document.getElementById("starterBlock");
var cardText = document.getElementById("the-card-text")

var questionObjectArr = [] 

var timer = 5;

starterBlockEl.onclick = function(event) {console.log(event.target)}

starterBlockEl.children[1].addEventListener("click", function(){
    // removes the start button
    console.log(document.getElementById("startBtn"));
    starterBlockEl.removeChild(starterBlockEl.children[1]);
    // starts the timer
    var timerInterval = setInterval(function(){
        starterBlockEl.children[0].textContent = timer + " seconds remain";
        timer--;

        if(timer <= 0){
            clearInterval(timerInterval)
            placeStartBtn()
            timer = 5;
            starterBlockEl.children[0].textContent = "You have failed the quiz!!"

        }

        
    }, 1000)
    console.log(timer);
    
});

function quizGame() {


}



function placeStartBtn(){
    var startBtnEl = document.createElement("button")
    startBtnEl.textContent = "start";
    startBtnEl.setAttribute("class", "bg-dark");
    startBtnEl.setAttribute("id", "startBtn");
    starterBlockEl.appendChild(startBtnEl);
    console.log(startBtnEl);
    console.log(document.getElementById("startBtn"));
    console.log(starterBlockEl);
}