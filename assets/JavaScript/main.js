
var starterBlockEl = document.getElementById("starterBlock");
var cardTextEl = document.getElementById("the-card-text");
var cardEl = document.getElementById("the-card");

var question = {quest: "Who are you?", answers: ["you", "they", "me", "we"], correctAnswer: 2 }
var questionObjectArr = [question] 

var timer = 5;


// listens at the start button to start the game timer
document.getElementById("startBtn").addEventListener("click", runTimer);


function runTimer(){
    // removes the start button
    starterBlockEl.removeChild(starterBlockEl.children[1]);
    quizGame();
    // starts the timer
    var timerInterval = setInterval(function(){
        starterBlockEl.children[0].textContent = timer + " seconds remain";
        timer--;
        console.log(timer);
        if(timer < 0){
            clearInterval(timerInterval)
            placeStartBtn()
            timer = 5;
            starterBlockEl.children[0].textContent = "You have failed the quiz!!"

        }
        
    }, 1000)
}

function quizGame() {
    for(let i = 0; i < questionObjectArr.length; i++){
        addQuizItems(questionObjectArr[i]);
    }

};
// var question = {question: "Who are you?", answers: ["you", "they", "me", "we"], correctAnswer: "me" }

function addQuizItems(question){
    // adds the question
    cardTextEl.textContent = question.quest;
    // adds question buttons
    for(let i = 0; i < question.answers.length; i++){
        
        let newBtn = document.createElement("button");
        newBtn.textContent = question.answers[i];
        newBtn.setAttribute("class", "answerBtn")
        cardEl.children[1].appendChild(newBtn);
        // will assign event handlers that assign pass or fail function
        checkAnswer(i);
    }
}
function checkAnswer(i){
    if(question.correctAnswer === i){
        console.log("I shouldn't be in here");
        cardEl.children[1].children[i].addEventListener("click", pass);
    }
    else{
        cardEl.children[1].children[i].addEventListener("click", fail);
    }
}

function pass(){
    console.log("you go it right");
}

function fail(){
    console.log("you got it wrong");
}
// makes a new start button and listener
function placeStartBtn(){
    var startBtnEl = document.createElement("button")
    startBtnEl.textContent = "start";
    startBtnEl.setAttribute("class", "bg-dark");
    startBtnEl.setAttribute("id", "startBtn");
    starterBlockEl.appendChild(startBtnEl);
    startBtnEl.addEventListener("click", runTimer);
}