
var starterBlockEl = document.getElementById("starterBlock");

var timer = 30;

starterBlockEl.children[1].addEventListener("click", function(){
    // removes the start button
    starterBlockEl.removeChild(starterBlockEl.children[1]);
    // starts the timer
    var timerInterval = setInterval(function(){
        starterBlockEl.children[0].textContent = timer + "seconds remain";
        timer--;

        if(timer < 0){
            clearInterval(timerInterval)
            starterBlockerEl.textContent = "You have failed the quiz!!"
        }

        
    }, 1000)

});