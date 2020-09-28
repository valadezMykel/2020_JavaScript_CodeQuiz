
var starterBlockEl = document.getElementById("starterBlock");
var cardTextEl = document.getElementById("the-card-text");
var cardEl = document.getElementById("the-card");
let corrBlockEl = document.getElementById("correctnessBlock");

var question1 = {quest: "Who are you?", answers: ["you", "they", "me", "we"], correctAnswer: 2 };
let question2 ={quest: "How many days was JavaScript made in?", answers: ["7", "10", "18", "35"], correctAnswer: 1 };
let question3 = {quest: "Which of the variable types is hoisted?", answers: ["var", "const", "let"], correctAnswer: 0 };
var questionObjectArr = [question1, question2, question3]; 

let timerVar = 30;
var timer = timerVar;
var stopTimer = false;

var currentQuestion = 0;
let score = 0;

// listens at the start button to start the game timer
document.getElementById("startBtn").addEventListener("click", runTimer);

// starts the timer and quizGameRound, removes start button
// resets timer, currentQuestion, and start button when timer ends
function runTimer(){
    // removes the start button
    starterBlockEl.removeChild(starterBlockEl.children[1]);
    currentQuestion = 0;
    quizGameRound();
    // starts the timer
    var timerInterval = setInterval(function(){
        starterBlockEl.children[0].textContent = timer + " seconds remain";
        timer--;
        if(stopTimer){
            clearInterval(timerInterval);
            timer = timerVar;
            currentQuestion = 0;
            placeStartBtn();
        };
        if(timer < 0){
            clearInterval(timerInterval)
            placeStartBtn()
            timer = timerVar;
            currentQuestion = 0;
            starterBlockEl.children[0].textContent = "You have failed the quiz!!"

        };
        
    }, 1000)
}


cardEl.addEventListener("click", function() {
    // checks if an answer button was pressed
    if(event.target.matches("button")){
        console.log("button clicked")
        // checks the correctness of answer button
        if(event.target.getAttribute("data-correct") === "true"){
            
            corrBlockEl.style.color = "Black";
            corrBlockEl.textContent = "Correct!";
            corrBlockEl.classList.remove("invisible");
            setTimeout(() => {
                corrBlockEl.classList.add("invisible");
            }, 2000);
        }
        else{
            console.log("start")
            corrBlockEl.style.color = "red";
            corrBlockEl.textContent = "Incorrect";
            corrBlockEl.classList.remove("invisible");
            setTimeout(() => {
                corrBlockEl.classList.add("invisible");
            }, 2000);
            timer -= 10;
            
        };

        //goes to the next question in questionObjectArr
        removeQuizItems(questionObjectArr[currentQuestion]);
        currentQuestion++;
        quizGameRound();
    };
});

// one round of the game that recalls its function after each round
function quizGameRound() {
    if(currentQuestion < questionObjectArr.length){
        console.log("running quiz game round")
        console.log(currentQuestion);
        // this will output the question and answers to the card
        // each answer has a data-correct class to indicate if it is correct
        addQuizItems(questionObjectArr[currentQuestion]);
        // listens for button clicks on the card

    }
    else{
        endingSequence();
    };
    

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
    console.log(question);
    for(let i = question.answers.length - 1; i >= 0; i--){
        console.log(i);
        console.log(cardEl.children[1].children[i]);
        cardEl.children[1].children[i].remove();

    }
}

function endingSequence(){
    console.log("endingSequence started")
    stopTimer = true;

    score = timer;
    currentQuestion = 0;
    console.log(score);
    cardTextEl.textContent = "Your Score is "+score;
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