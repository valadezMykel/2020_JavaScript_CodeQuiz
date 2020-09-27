var starterBlockEl = document.getElementById("starterBlock");
var cardTextEl = document.getElementById("the-card-text");
var cardEl = document.getElementById("the-card");

var question1 = {quest: "Who are you?", answers: ["you", "they", "me", "we"], correctAnswer: 2 }
var questionObjectArr = [question1] 

var timer = 5;


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
    if(questionObjectArr[i].correctAnswer === i){
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