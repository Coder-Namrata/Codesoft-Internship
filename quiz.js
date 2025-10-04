 const questions = [
    {
        question: "Which nutrient is the main source of energy for the body?",
        answers: [
            { text: "Protein", correct: false },
            { text: "Carbohydrates", correct: true },
            { text: "Vitamins", correct: false },
            { text: "Minerals", correct: false },
        ]
    },
    {
        question: "How many minutes of moderate physical activity is recommended per week for adults?",
        answers: [
            { text: "60 minutes", correct: false },
            { text: "150 minutes", correct: true },
            { text: "300 minutes", correct: false },
            { text: "90 minutes", correct: false },
        ]
    },
    {
        question: "Which vitamin is mainly obtained from sunlight?",
        answers: [
            { text: "Vitamin A", correct: false },
            { text: "Vitamin D", correct: true },
            { text: "Vitamin C", correct: false },
            { text: "Vitamin B12", correct: false },
        ]
    },
    {
        question: "Which exercise is best for strengthening the heart and lungs?",
        answers: [
            { text: "Weight lifting", correct: false },
            { text: "Jogging", correct: true },
            { text: "Stretching", correct: false },
            { text: "Yoga", correct: false },
        ]
    },
    {
        question: "Which mineral is most important for healthy bones and teeth?",
        answers: [
            { text: "Iron", correct: false },
            { text: "Calcium", correct: true },
            { text: "Potassium", correct: false },
            { text: "Zinc", correct: false },
        ]
    },
    {
        question: "What is the recommended daily water intake for an average adult?",
        answers: [
            { text: "2–3 liters", correct: true },
            { text: "1 liter", correct: false },
            { text: "4–5 liters", correct: false },
            { text: "500 ml", correct: false },
        ]
    },
    {
        question: "Which type of fat is considered healthy?",
        answers: [
            { text: "Trans fat", correct: false },
            { text: "Saturated fat", correct: false },
            { text: "Unsaturated fat", correct: true },
            { text: "Hydrogenated fat", correct: false },
        ]
    },
    {
        question: "What is the main benefit of strength training?",
        answers: [
            { text: "Improves flexibility", correct: false },
            { text: "Builds muscle strength", correct: true },
            { text: "Improves eyesight", correct: false },
            { text: "Boosts memory", correct: false },
        ]
    },
    {
        question: "Which food is rich in protein?",
        answers: [
            { text: "Rice", correct: false },
            { text: "Chicken", correct: true },
            { text: "Apple", correct: false },
            { text: "Spinach", correct: false },
        ]
    },
    {
        question: "What is Body Mass Index (BMI) used for?",
        answers: [
            { text: "Measuring blood pressure", correct: false },
            { text: "Measuring body fat based on height and weight", correct: true },
            { text: "Measuring lung capacity", correct: false },
            { text: "Measuring muscle strength", correct: false },
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);

        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }

        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });

    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();
