
var starterBlockEl = document.getElementById("starterBlock");

var timer = 5;

document.getElementById("startBtn").addEventListener("click", function(){
    // removes the start button
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

});

function quizGame {
    
}



function placeStartBtn(){
    let startBtnEl = document.createElement("button")
    startBtnEl.textContent = "start";
    startBtnEl.setAttribute("class", "bg-dark");
    startBtnEl.setAttribute("id", "startBtn");
    starterBlockEl.appendChild(startBtnEl);

}