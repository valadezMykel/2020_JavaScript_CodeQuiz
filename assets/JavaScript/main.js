
// elements from the DOM
var starterBlockEl = document.getElementById("starterBlock");
var cardTextEl = document.getElementById("the-card-text");
var cardEl = document.getElementById("the-card");
let corrBlockEl = document.getElementById("correctnessBlock");

// question variables
// max 4 answer options, min 2
var question1 = {quest: "When using JavaScript what method should you use instead of spaces?", answers: ["camel case", "hyphenating", "underscore", "periods"], correctAnswer: 0 };
let question2 = {quest: "How many days was JavaScript made in?", answers: ["7", "10", "18", "35"], correctAnswer: 1 };
let question3 = {quest: "Which of the variable types is hoisted?", answers: ["var", "const", "let"], correctAnswer: 0 };
let question4 = {quest: "What method can convert objects into strings?", answers: ["toSting", "slice", "substring", "stringify"], correctAnswer: 3 };
let question5 = {quest: "What data types can be stored in an object?", answers: ["integers", "strings", "arrays", "all three"], correctAnswer: 3};

var questionObjectArr = [question1, question2, question3, question4, question5]; 

// variables used in multiple functions
let timerVar = 30;
var timer = timerVar;
var stopTimer = false;
let storageScoresArr = [];
var currentQuestion = 0;

// listens at the start button to start the game timer
document.getElementById("startBtn").addEventListener("click", runTimer);

// Puts in the previous scores
showOldScores();

// starts the timer and quizGameRound, removes start button
// resets timer, currentQuestion, and start button when timer ends
function runTimer(){
    // removes the start button
    starterBlockEl.removeChild(starterBlockEl.children[1]);
    quizGameRound();
    // starts the timer
    var timerInterval = setInterval(function(){
        starterBlockEl.children[0].textContent = timer + " seconds remain";
        timer--;
        // if the game ends by all questions being answered
        if(stopTimer){
            clearInterval(timerInterval);
            timer = timerVar;
            currentQuestion = 0;
            starterBlockEl.children[0].textContent = "Would you like to try again?";
            placeStartBtn();
            stopTimer = false;
        };
        // if the game ends by the timer running out
        if(timer < 0){
            clearInterval(timerInterval)
            removeQuizItems(questionObjectArr[currentQuestion]);
            timer = timerVar;
            currentQuestion = 0;
            starterBlockEl.children[0].textContent = "You have run out of time!"
            placeStartBtn()

        };
        
    }, 1000)
}

// makes a new start button and listener
function placeStartBtn(){
    var startBtnEl = document.createElement("button")
    startBtnEl.textContent = "re-start";
    startBtnEl.setAttribute("class", "bg-dark");
    // startBtnEl.setAttribute("id", "startBtn");
    starterBlockEl.appendChild(startBtnEl);
    startBtnEl.addEventListener("click", runTimer);
};

// listens for button presses on the card
cardEl.addEventListener("click", function() {
    // checks if an answer button was pressed
    if(event.target.matches("button")){
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

// one round of the game if ran when no more questions are left ends game
// stores an array of arrays of [initials, scores] to local storage
function quizGameRound() {
    if(currentQuestion < questionObjectArr.length){
        // this will output the question and answers to the card
        // each answer has a data-correct class to indicate if it is correct
        addQuizItems(questionObjectArr[currentQuestion]);
    }
    else{
        stopTimer = true;
        let score = timer;
        currentQuestion = 0;
        cardTextEl.textContent = "Your Score is "+score;
        if(confirm("would you like to save your score of "+score+"?")){

            // gets the users initials
           let initials = prompt("Please enter your 2 letter initials:");
           while(initials.length > 2){
               initials = prompt("invalid initial length, please re-enter your 2 letter initials")
           };
           //gets new score and old scores into storageScoresArr
           let scoreArr = [initials, score];
           // pulls down old scores
           let oldScores = localStorage.getItem("storedScores");
           if(oldScores != null){
               oldScores = JSON.parse(oldScores);
               storageScoresArr = oldScores;
           }
           storageScoresArr.push(scoreArr);
           //puts the new array into storage
           storageScoresArr = JSON.stringify(storageScoresArr);
           localStorage.setItem("storedScores", storageScoresArr);

           //update scores with new score
           let liEl = document.createElement("li");
            liEl.textContent = initials+" score of "+score;
            document.getElementById("high-score-list").appendChild(liEl);

           
        }
    };

};
// creates li elements for all previous high scores in local storage
function showOldScores(){
    let storedScoresPairsArr = localStorage.getItem("storedScores");
    if(storedScoresPairsArr != null){
        storedScoresPairsArr = JSON.parse(storedScoresPairsArr);
        sortScores(storedScoresPairsArr);
        for(let i = 0; i < storedScoresPairsArr.length; i++){
            let liEl = document.createElement("li");
            liEl.textContent = storedScoresPairsArr[i][0]+" score of "+storedScoresPairsArr[i][1];
            document.getElementById("high-score-list").appendChild(liEl);
        };
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
    for(let i = question.answers.length - 1; i >= 0; i--){
        cardEl.children[1].children[i].remove();
    }
};

// first draft sorter
function sortScores(arrArr){
    // checks each score against remaining unsorted scores
    // sorts so the highest is at the 0 index
    for(let i = 0; i < arrArr.length; i++){
        for(let j = i+1 ; j < arrArr.length; j++){
            if(arrArr[i][1] < arrArr[j][1]){
                let temp = arrArr[i][1];
                arrArr[i][1] = arrArr[j][1];
                arrArr[j][1] = temp;
            };
        };        
    };
};

// to do list:
// have the question appear in a random order
// have the high scores appear from highest to lowest score