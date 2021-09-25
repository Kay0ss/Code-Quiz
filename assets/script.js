const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const timeEl = document.getElementById('timer');
const usernames = JSON.parse(localStorage.getItem('usernames')) || [];

var secondsLeft = 12;

function instructions(){
  alert("Answer all the questions before the time runs out!");}

  instructions();

function resetTimer() {
  var timerInterval = setInterval( function() {
    secondsLeft--;
    console.log(secondsLeft)
    timeEl.textContent = secondsLeft + " Seconds Left" ;
  
    if (secondsLeft === 0) {
    clearInterval(timerInterval);
    sendMessage();
  }
  
    }, 1000);
  }


  let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion();
})

function sendMessage(){
  alert('Game Over you Suck')
}

function startGame() {
  startButton.classList.add('hide');
  shuffledQuestions = questions.sort(() => Math.random() - .5);
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide');
  setNextQuestion();
  resetTimer();
}



function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button');
    button.innerText = answer.text
    button.classList.add('btn');
    if (answer.correct) {
      button.dataset.correct = answer.correct
      // secondsLeft = 10;
    } 
    
    button.addEventListener('click', selectAnswer);
    answerButtonsElement.appendChild(button);
  })
}

function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add('hide');
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct;
  const incorrect = selectedButton.dataset.incorrect;
  console.log(correct);
  console.log(incorrect);
  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct);
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide');
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide');
    var name = window.prompt("Enter your name and score");
    usernames.push(name);
    localStorage.setItem("usernames", JSON.stringify(usernames));
    clearInterval(timerInterval);
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct');
    secondsLeft = secondsLeft + 5;

  } else {
    element.classList.add('wrong');
    secondsLeft = secondsLeft - 5;
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct');
  element.classList.remove('wrong');
}

const questions = [
  {
    question: 'What does ".getElementById" do?',
    answers: [
      { text: 'Gets and element from the html using its id', correct: true },
      { text: 'Is a type of chocolate', incorrect: false }
    ]
  },
  {
    question: 'When are you officially a web dev?',
    answers: [
      { text: 'When you spend hours debugging and it is just a missing semicolon', correct: true },
      { text: 'When you get a certificate', incorrect: false },
      { text: 'When you create a website', incorrect: false },
      { text: 'When you type "!" into your html in vscode', incorrect: false }
    ]
  },
  {
    question: 'Is web development fun?',
    answers: [
      { text: 'Kinda', incorrect: false },
      { text: 'YES!!!', correct: true },
      { text: 'Um no', incorrect: false },
      { text: 'IDK', incorrect: false }
    ]
  },
  {
    question: 'What tag do you use to link a JavaScript file to your html?',
    answers: [
      { text: '"<link"', incorrect: false },
      { text: '"<script"', correct: true }
    ]
    
  }
]


//To Do
// - setup high scores to track when all questions were correct and a prompt asking for the name
//styling regarding the timer and high scores tab