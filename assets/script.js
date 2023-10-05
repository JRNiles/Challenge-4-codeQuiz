const questions = [
    {
        question: "What does HTML stand for?",
        options: ["Hyper Text Markup Language", "High-Level Text Markup Language", "Hyperlink and Text Markup Language", "Hyper Transfer Markup Language"],
        correctOption: 0,
        timeToAdd: 5, // Time to add for a correct answer in seconds
        timeToDeduct: 10, // Time to deduct for a wrong answer in seconds
    },
    {
        question: "In JavaScript how do you declare a variable?",
        options: ["var varName", "variable varName", "v varName", "let varName"],
        correctOption: 3,
        timeToAdd: 5,
        timeToDeduct: 10, 
    },
];

let currentQuestionIndex = 0;
let score = 0;
let timeRemaining = 30; // Initial time in seconds
let timer;

function displayQuestion() {
    const questionElement = document.getElementById("question");
    const optionsElement = document.getElementById("options");
    const currentQuestion = questions[currentQuestionIndex];

    questionElement.textContent = currentQuestion.question;
    optionsElement.innerHTML = "";

    currentQuestion.options.forEach((option, index) => {
        const li = document.createElement("li");
        li.textContent = option;
        li.addEventListener("click", () => checkAnswer(index));
        optionsElement.appendChild(li);
    });
}

function checkAnswer(selectedIndex) {
    const currentQuestion = questions[currentQuestionIndex];
    if (selectedIndex === currentQuestion.correctOption) {
        score++;
        timeRemaining += currentQuestion.timeToAdd;
    } else {
        timeRemaining -= currentQuestion.timeToDeduct;
    }

    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        displayQuestion();
    } else {
        endQuiz();
    }
}

function updateTimer() {
    const timeElement = document.getElementById("time");
    timeElement.textContent = timeRemaining;

    if (timeRemaining <= 0) {
        endQuiz();
    } else {
        timeRemaining--;
        timer = setTimeout(updateTimer, 1000);
    }
}

function endQuiz() {
    clearTimeout(timer);
    const quizContainer = document.getElementById("quiz-container");
    quizContainer.innerHTML = `
    <h1>Quiz Completed!</h1>
    <p>Your score: ${score}/${questions.length}</p>
`;
}

// Starts the quiz
document.getElementById("start-button").addEventListener("click", () => {
    document.getElementById("start-button").style.display = "none";
    document.getElementById("question-container").style.display = "block";
    document.getElementById("timer").style.display = "block";
displayQuestion();
updateTimer();
});