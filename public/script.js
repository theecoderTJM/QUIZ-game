document.addEventListener("DOMContentLoaded", function () {
    const categorySelect = document.getElementById("category-select");
    const quizContainer = document.getElementById("quiz-container");
    const nextButton = document.getElementById("next-btn");
    let currentCategory = categorySelect.value;
    let currentQuestionIndex = 0;
    let questionsData;

    // Load questions from server
    fetch('/questions')
        .then(response => response.json())
        .then(data => {
            questionsData = data; // Store loaded JSON data in variable
            loadNextQuestion(); // Load the first question once data is loaded
        })
        .catch(error => console.error('Error loading JSON file:', error));

    categorySelect.addEventListener("change", function () {
        currentCategory = categorySelect.value;
        currentQuestionIndex = 0;
        loadNextQuestion();
    });

    nextButton.addEventListener("click", function () {
        currentQuestionIndex++;
        loadNextQuestion();
    });

    function loadNextQuestion() {
        const categoryQuestions = getCategoryQuestions(currentCategory);
        if (currentQuestionIndex < categoryQuestions.length) {
            const currentQuestion = categoryQuestions[currentQuestionIndex];
            displayQuestion(currentQuestion);
        } else {
            quizContainer.innerHTML = "<p>No more questions in this category.</p>";
        }
    }

    function getCategoryQuestions(category) {
        // Ensure questionsData is defined before accessing it
        return questionsData ? questionsData[category] || [] : [];
    }

    function displayQuestion(questionObj) {
        quizContainer.innerHTML = `<div class="card">${questionObj.question}</div>`;
    }
});
