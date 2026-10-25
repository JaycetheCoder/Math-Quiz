// ------------------ ELEMENTS ------------------
const startBtn = document.querySelector("#startBtn");
const homePage = document.querySelector("#homePage");
const quizSection = document.querySelector("#quizSection");

const yearSelect = document.querySelector("#yearSelect");
const levelSelect = document.querySelector("#levelSelect");

const questionText = document.querySelector("#question-text");
const optionsDiv = document.querySelector("#options");
const feedback = document.querySelector("#feedback");
const nextBtn = document.querySelector("#nextBtn");
const returnBtn = document.querySelector("#returnBtn");

// ------------------ QUIZ DATA ------------------
let questionSet = [];
let index = 0;
// ------------------ START QUIZ ------------------
startBtn.addEventListener("click", () => {
    const selectedYear = yearSelect.value;
    const selectedLevel = levelSelect.value;
    if (!selectedYear || !selectedLevel) {
        alert("Please select both a year and a level before starting the quiz.");
        return;
    }
    // Load questions
    questionSet = questions[selectedYear][selectedLevel];
    index = 0;
    // Switch pages
    homePage.style.display = "none";
    quizSection.style.display = "block";
    showQuestion();
});
// ------------------ SHOW QUESTION ------------------
function showQuestion() {
    const q = questionSet[index];
    questionText.textContent = q.q;
    optionsDiv.innerHTML = "";
    feedback.textContent = "";
    let answeredCorrectly = false;
    q.options.forEach((opt, i) => {
        const btn = document.createElement("button");
        btn.textContent = opt;
        btn.classList.add("btn");
        btn.onclick = () => {
            // If already correct, do nothing
            if (answeredCorrectly) return;
            // WRONG ANSWER
            if (i !== q.answer) {
                btn.style.backgroundColor = "red";
                feedback.textContent = "❌ Try again!";
                feedback.style.color = "red";
                // Reset other buttons
                const allButtons = optionsDiv.querySelectorAll("button");
                allButtons.forEach(b => {
                    if (b !== btn) b.style.backgroundColor = "";
                });
                return;
            }
            // CORRECT ANSWER
            answeredCorrectly = true;
            btn.style.backgroundColor = "green";
            feedback.textContent = "✔ Correct!";
            feedback.style.color = "green";
            // Disable all buttons
            const allButtons = optionsDiv.querySelectorAll("button");
            allButtons.forEach(b => {
                b.disabled = true;
                b.style.cursor = "not-allowed";
            });
        };
        optionsDiv.appendChild(btn);
    });
}
// ------------------ NEXT QUESTION ------------------
nextBtn.addEventListener("click", () => {
    index++;
    if (index < questionSet.length) {
        showQuestion();
    } else {
        questionText.textContent = "Quiz complete!";
        optionsDiv.innerHTML = "";
        feedback.textContent = "";
        nextBtn.style.display = "none";
    }
});
returnBtn.addEventListener("click", () => {
    quizSection.style.display = "none";
    homePage.style.display = "block";
    nextBtn.style.display = "inline-block";
});
