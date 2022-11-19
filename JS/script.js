// create variable that will hold questions
var questions = [
    {
      title: "Which one is a looping structure in JavaScript?",
      choices: ["All the below", "For", "While", "do-while loops"],
      answer: "All the below"
    },
    {
      title: "What are the two basic groups of data types in JavaScript?",
      choices: [
        "Primitive and attribute",
        "Primitive and reference types",
        "Reference types and attribute",
        "None of the above"
      ],
      answer: "Primitive and reference types"
    },
    {
      title: "Commonly used data types DO NOT include:",
      choices: ["strings", "booleans", "alerts", "numbers"],
      answer: "alerts"
    },
    {
      title: "Boolean operators that can be used in JavaScript include:",
      choices: [
        "'And' Operator &&",
        "'Or' Operator ||",
        "'Not' Operator !",
        "All the above"
      ],
      answer: "All the above"
    },
    {
      title:
        "Which one of these is not among the three different types of errors in JavaScript?",
      choices: [
        "Animation time errors",
        "Load time errors",
        "Run time errors",
        "Logical Errors"
      ],
      answer: "Animation time errors"
    },
    {
      title: "What is the data type of variables in JavaScript?",
      choices: [
        "Object data types",
        "Function data type",
        "None of the above",
        "All of the above"
      ],
      answer: "Object data types"
    },
    {
      title: "The condition in an if / else statement is enclosed within ____.",
      choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
      answer: "parentheses"
    },
    {
      title: "Arrays in JavaScript can be used to store ____.",
      choices: [
        "numbers and strings",
        "other arrays",
        "booleans",
        "all of the above"
      ],
      answer: "all of the above"
    },
    {
      title:
        "String values must be enclosed within ____ when being assigned to variables.",
      choices: ["commas", "curly brackets", "quotes", "parentheses"],
      answer: "quotes"
    },
    {
      title:
        "A very useful tool used during development and debugging for printing content to the debugger is:",
      choices: ["JavaScript", "terminal / bash", "for loops", "console.log"],
      answer: "console.log"
    },
    {
      title: "What is the type of Pop up boxes available in JavaScript?:",
      choices: ["Alert", "Confirm", "Prompt", "All the above"],
      answer: "All the above"
    }
  ];
// ceating DOM elements
var questionsEl = document.querySelector("#questions");
var timerEl = document.querySelector("#time");
var choicesEl = document.querySelector("#choices");
var submitBtn = document.querySelector("#submit");
var startBtn = document.querySelector("#start");
var initialsEl = document.querySelector("#initials");
var feedbackEl = document.querySelector("#feedback");

var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;
// 
function startQuiz() {
  var startScreenEl = document.getElementById("start-screen");
  startScreenEl.setAttribute("class", "hide"); // hide start screen
  questionsEl.removeAttribute("class");// un-hide questions section
  timerId = setInterval(clockTick, 1000); // start timer
  timerEl.textContent = time;// show starting time
  getQuestion();
}

function getQuestion() {
  var currentQuestion = questions[currentQuestionIndex];// get current question object from array
  var titleEl = document.getElementById("question-title"); // update title with current question
  titleEl.textContent = currentQuestion.title;
  choicesEl.innerHTML = "";  // clear out any old question choices

// loop over choices
  currentQuestion.choices.forEach(function(choice, i) {  
    var choiceNode = document.createElement("button");  // create new button for each choice
    choiceNode.setAttribute("class", "choice");
    choiceNode.setAttribute("value", choice);
    choiceNode.textContent = i + 1 + ". " + choice;
    choiceNode.onclick = questionClick; // attach click event listener to each choice
    choicesEl.appendChild(choiceNode); // display on the page
  });
}

function questionClick() {
  // check answer correct or wrong
  if (this.value !== questions[currentQuestionIndex].answer) {
    
    time -= 15;// penalize time

    if (time < 0) {
      time = 0;
    }
    // display updated time
    timerEl.textContent = time;
    feedbackEl.textContent = "Wrong!";
    feedbackEl.style.color = "red";
  } else {
    feedbackEl.textContent = "Correct!";
    feedbackEl.style.color = "green";
  }

  feedbackEl.setAttribute("class", "feedback"); // show right or wrong 
  setTimeout(function() {
    feedbackEl.setAttribute("class", "feedback hide");
  }, 1000);

  currentQuestionIndex++;  // next question
  
  // time checker
  if (currentQuestionIndex === questions.length) {
    quizEnd();
  } else {
    getQuestion();
  }
}

function quizEnd() {
  clearInterval(timerId);  // stop timer
  var endScreenEl = document.getElementById("end-screen");// show end screen
  endScreenEl.removeAttribute("class");
  var finalScoreEl = document.getElementById("final-score"); // show final score
  finalScoreEl.textContent = time;
  questionsEl.setAttribute("class", "hide");  // hide questions section
}

function clockTick() {
  // update time
  time--;
  timerEl.textContent = time;
  if (time <= 0) {
    quizEnd();
  }
}

function saveHighscore() {
  // get value of initials
  var initials = initialsEl.value.trim();

  if (initials !== "") {
    // get saved scores from localstorage
    var highscores =
      JSON.parse(window.localStorage.getItem("highscores")) || [];

    // format new score object for current user
    var newScore = {
      score: time,
      initials: initials
    };

    // save to localstorage
    highscores.push(newScore);
    window.localStorage.setItem("highscores", JSON.stringify(highscores));

    // redirect to next page
    window.location.href = "score.html";
  }
}

function checkForEnter(event) {
  // "13" represents the enter key
  if (event.key === "Enter") {
    saveHighscore();
  }
}

// submit initials
submitBtn.onclick = saveHighscore;

// start quiz
startBtn.onclick = startQuiz;

initialsEl.onkeyup = checkForEnter;