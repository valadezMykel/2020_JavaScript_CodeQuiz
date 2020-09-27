
var starterBlockEl = document.getElementById("starterBlock");
var cardTextEl = document.getElementById("the-card-text");
var cardEl = document.getElementById("the-card");

var question1 = {quest: "Who are you?", answers: ["you", "they", "me", "we"], correctAnswer: 2 };
let question2 ={quest: "How many days was JavaScript made in?", answers: ["7", "10", "18", "35"], correctAnswer: 1 };
var questionObjectArr = [question1, question2]; 

var timer = 5;
let currentQuestion = 0;
let score = 0;

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
    if(currentQuestion > questionObjectArr.length){
        endingSequence();
        
    }
    // this will output the question and answers to the card
    // each answer has a data-correct class to indicate if it is correct
    addQuizItems(questionObjectArr[currentQuestion]);
    // listens for button clicks on the card
    cardEl.addEventListener("click", (event) => {
        // checks if an answer button was pressed
        if(event.target.matches("button")){
            // checks the correctness of answer button
            if(event.target.getAttribute("data-correct") === "true"){
                cardTextEl.textContent = "Correct!";
                removeQuizItems(questionObjectArr[currentQuestion]);
                // currentQuestion++;
                // quizGameRound();

            }
            else{
                cardTextEl.textContent = "Incorrect";
                removeQuizItems(questionObjectArr[currentQuestion]);
                // currentQuestion++;
                // quizGameRound();
            }

        }
    });

};

// outputs stored question and answer groups
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
};

// removes answer buttons from the card
function removeQuizItems(question){
    // removes each from last added to first
    for(let i = (question.answers.length - 1); i >= 0; i--){
        cardEl.children[1].children[i].remove();
    }
}

function endingSequence(){
    return "";
}

// makes a new start button and listener
function placeStartBtn(){
    var startBtnEl = document.createElement("button")
    startBtnEl.textContent = "re-start";
    startBtnEl.setAttribute("class", "bg-dark");
    startBtnEl.setAttribute("id", "startBtn");
    starterBlockEl.appendChild(startBtnEl);
    startBtnEl.addEventListener("click", runTimer);
};