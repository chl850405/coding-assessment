var startButton = document.getElementById("start-btn");
var introContainerEl = document.getElementById("intro");
var questionContainerEl = document.getElementById("q-container");
var questionEl = document.getElementById("question");
var optionButtonEl = document.getElementById("option-btn");
var timerEl = document.getElementById("time");
var highScoreEl = document.getElementById("highScores");
var yourInitialsEl = document.getElementById("initials");
let shuffledQuestions, currentQuestion;
startButton.addEventListener("click", startGame);
var HIGH_SCORES = "HIGH_SCORES"

var timeLeft = 60;
var gameScore = 0;

function startGame() {
  console.log("intro");
  startButton.classList.add("hide");
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestion = 0;
  questionContainerEl.classList.remove("hide");
  introContainerEl.classList.add("hide");
  optionButtonEl.classList.remove("hide");
  yourInitialsEl.classList.add("hide");
  setNextQuestion();
}

//time starts when Get Started is pushed
function countdown() {

  var timeInterval = setInterval(function () {
    if (timeLeft > 1) {
      timerEl.textContent = timeLeft + "seconds remaining";
      timeLeft--;
    } else if (timeLeft === 1) {
      timerEl.textContent = timeLeft + "seconds remaining";
      timeLeft--;
    } else  if (timeLeft <= 0) {
      endGame();
    }else {
      timerEl.textContent = "";
      clearInterval(timeInterval);
    }
  }, 1000);
}

//show the next question
function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestion]);
}
//displays question
function showQuestion(question) {
  console.log(question);
  questionEl.innerText = question.question;
  question.options.forEach((option) => {
    var button = document.createElement("button");
    button.innerText = option.text;
    button.classList.add("btn");

    button.dataset.correct = option.correct;
    
    button.addEventListener("click", selectOption);
    optionButtonEl.appendChild(button);
  });
}
function resetState() {
  while (optionButtonEl.firstChild) {
    optionButtonEl.removeChild(optionButtonEl.firstChild);
  }
}


//option selection
function selectOption(e) {

  var selectedButton = e.target;
  var correct = selectedButton.dataset.correct;

  console.log(correct);
  if (correct==="true") {
    gameScore = gameScore + 1;
    alert("Score:" + gameScore);
  } else {
    timeLeft -= 5;
    alert("Oops wrong answer 5 seconds were deducted");
  }

  console.log(timeLeft)
  setStatusClass(document.body, correct);
  Array.from(optionButtonEl.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
  });

  currentQuestion++;
  if (currentQuestion === questions.length) {
    endGame();
  } else {
    setNextQuestion();
  }
}
function setStatusClass(element, correct) {
  clearStatusClass(element, correct);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}
function clearStatusClass(element, correct) {
  if (correct) {
    element.classList.remove("correct");
  
  } else {
    element.classList.remove("wrong");
    
  }
}
//array of questions
var questions = [
  {
    question: "Which declaration defines a document?",
    options: [
      { text: "<!DOCTYPE html>", correct: true },
      { text: "<header>", correct: false },
      { text: "<h1>", correct: false },
      { text: "<!doctype>", correct: false },
    ],
  },
  {
    question: "What does HTML stand for?",
    options: [
      { text: "Hyper Text Markup List", correct: false },
      { text: "Hyper Text Markup Language", correct: true },
      { text: "Hyper Touch Markup Language", correct: false },
      { text: "Hyper Text Mandate Language", correct: false },
    ],
  },
  {
    question: "How do you add a folder using the terminal?",
    options: [
      { text: "touch", correct: false },
      { text: "git add .", correct: false },
      { text: "mkdir", correct: true },
      { text: "git commit -m", correct: false },
    ],
  },
  {
    question: "What does CSS stand for?",
    options: [
      { text: "Colorful Style Sheets", correct: false },
      { text: "Cascading Style Sheets", correct: true },
      { text: "Cascading Style Snip-its", correct: false },
      { text: "Cascading Silk Sheets", correct: false },
    ],
  },
  {
    question: "What is does the box model consist of?",
    options: [
      { text: "Margins, Hieght, Padding, Content", correct: false },
      { text: "Margins, Boarders, Width, Content", correct: false },
      { text: "Background, Boarders, Padding, Content", correct: false },
      { text: "Margins, Boarders, Padding, Content", correct: true },
    ],
  },
  {
    question: "An example of a Pseudo Element is..",
    options: [
      { text: ":hover", correct: true },
      { text: "[1,2,3]", correct: false },
      { text: "@media", correct: false },
      { text: "body {}", correct: false },
    ],
  },
];



function saveHighScore() {
  var initials = prompt('You got a high score! Enter initials:');
  var newScore = {  
    score: timeLeft,
    initials: initials
  };
var highScores = [];
  if (initials !== "") {
    highScores.push(newScore);
    localStorage.setItem("highScores", JSON.stringify(highScores));
    var scores = JSON.parse(localStorage.getItem("highScores")) ?? [];
    console.log (scores)

  }
};

function endGame() {

  currentQuestion = 5;
  questionEl.classList.add("hide");
  optionButtonEl.classList.add("hide");
  // highScoreEl.classList.add("hide");
  timerEl.classList.add("hide");
  yourInitialsEl.classList.remove("hide");
saveHighScore()
}


startButton.onclick = countdown;
submitButton.onclick = saveHighscore;