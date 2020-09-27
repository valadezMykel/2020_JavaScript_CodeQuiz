
var starterBlockEl = document.getElementById("starterBlock");
var cardTextEl = document.getElementById("the-card-text");
var cardEl = document.getElementById("the-card");

var question1 = {quest: "Who are you?", answers: ["you", "they", "me", "we"], correctAnswer: 2 }
var questionObjectArr = [question1] 

var timer = 5;
let currentQuestion = 0;

// listens at the start button to start the game timer
document.getElementById("startBtn").addEventListener("click", runTimer);


function runTimer(){
    // removes the start button
    starterBlockEl.removeChild(starterBlockEl.children[1]);
    quizGameRound();
    // starts the timer
    var timerInterval = setInterval(function(){
        starterBlockEl.children[0].textContent = timer + " seconds remain";
        timer--;
        if(timer < 0){
            clearInterval(timerInterval)
            placeStartBtn()
            timer = 5;
            starterBlockEl.children[0].textContent = "You have failed the quiz!!"

        }
        
    }, 1000)
}

function quizGameRound() {
    addQuizItems(questionObjectArr[currentQuestion]);
    cardEl.addEventListener("click", (event) => {
        if(event.target.matches("button")){
            console.log(event.target);
            console.log(event.target.getAttribute("data-correct"));
            if(event.target.getAttribute("data-correct") === "true"){
                cardTextEl.textContent = "Correct!";
            }
            else{
                console.log("inside else");
                cardTextEl.textContent = "Incorrect";
            }

        }
    });

};

function addQuizItems(question){
    // adds the question
    cardTextEl.textContent = question.quest;
    // adds question buttons
    for(let i = 0; i < question.answers.length; i++){
        
        let newBtn = document.createElement("button");
        newBtn.textContent = question.answers[i];
        newBtn.setAttribute("class", "answerBtn bg-dark");
        if(question.correctAnswer === i){

            newBtn.setAttribute("data-correct", "true");
        }
        else{
            newBtn.setAttribute("data-correct", "false");
        };
        cardEl.children[1].appendChild(newBtn);
    }
}

// makes a new start button and listener
function placeStartBtn(){
    var startBtnEl = document.createElement("button")
    startBtnEl.textContent = "re-start";
    startBtnEl.setAttribute("class", "bg-dark");
    startBtnEl.setAttribute("id", "startBtn");
    starterBlockEl.appendChild(startBtnEl);
    startBtnEl.addEventListener("click", runTimer);
}