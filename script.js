document.addEventListener('DOMContentLoaded', function () {
    const vocabulary = [
        { question: 'What is the synonym of "exquisite"?', options: ['Beautiful', 'Ugly', 'Ordinary', 'Mediocre'], correctAnswer: 'Beautiful' },
        { question: 'Which word is the antonym of "vivid"?', options: ['Dull', 'Bright', 'Colorful', 'Lively'], correctAnswer: 'Dull' },
        { question: 'What does the word "dubious" mean?', options: ['Trustworthy', 'Reliable', 'Doubtful', 'Certain'], correctAnswer: 'Doubtful' },
        { question: 'What is the correct synonym for "enormous"?', options: ['Tiny', 'Huge', 'Small', 'Little'], correctAnswer: 'Huge' },
        { question: 'Which option is the synonym of "precise"?', options: ['Accurate', 'Inaccurate', 'Vague', 'Approximate'], correctAnswer: 'Accurate' },
        { question: 'What is the opposite of "brave"?', options: ['Cowardly', 'Fearless', 'Courageous', 'Bold'], correctAnswer: 'Cowardly' },
        { question: 'What does "alleviate" mean?', options: ['Worsen', 'Aggravate', 'Relieve', 'Intensify'], correctAnswer: 'Relieve' },
        { question: 'Choose the correct synonym for "abundant"?', options: ['Scarce', 'Plentiful', 'Limited', 'Sparse'], correctAnswer: 'Plentiful' },
        { question: 'Which word is the antonym of "humble"?', options: ['Modest', 'Arrogant', 'Meek', 'Unassuming'], correctAnswer: 'Arrogant' },
        { question: 'What is the meaning of the word "perplex"?', options: ['Confuse', 'Clarify', 'Understand', 'Elucidate'], correctAnswer: 'Confuse' }
        // Add more vocabulary questions here
    ];

    const questionText = document.querySelector('.question-text');
    const optionButtons = document.querySelectorAll('.option');
    const pronunciationBtn = document.getElementById('pronunciation-btn');
    const pronunciationAudio = document.getElementById('pronunciation-audio');
    const feedbackText = document.getElementById('feedback-text');
    const checkBtn = document.getElementById('check-btn');
    const nextBtn = document.getElementById('next-btn');
    const scoreDisplay = document.getElementById('score');
    const levelDisplay = document.getElementById('level');
    const progressDisplay = document.getElementById('progress');

    let currentQuestionIndex = 0;
    let score = 0;
    let level = 1;
    let correctAnswersInARow = 0;

    // Function to initialize the game
    function initializeGame() {
        displayQuestion(currentQuestionIndex);
        displayOptions(currentQuestionIndex);
        feedbackText.textContent = '';
        pronunciationAudio.src = ''; // Reset audio source
        updateScoreDisplay();
        updateLevelDisplay();
        updateProgressDisplay();
    }

    // Function to display the current question
    function displayQuestion(index) {
        questionText.textContent = vocabulary[index].question;
    }

    // Function to display answer options for the current question
    function displayOptions(index) {
        vocabulary[index].options.forEach((option, i) => {
            optionButtons[i].textContent = option;
            optionButtons[i].classList.remove('correct', 'incorrect'); // Remove previous coloring
        });
    }

    // Function to check the user's answer
    function checkAnswer(selectedOption) {
        const correctAnswer = vocabulary[currentQuestionIndex].correctAnswer;
        if (selectedOption === correctAnswer) {
            feedbackText.textContent = 'Correct!';
            feedbackText.style.color = '#4caf50';
            score += 10; // Increase score for correct answer
            correctAnswersInARow++;
            if (correctAnswersInARow >= 3) {
                score += 5; // Bonus points for consecutive correct answers
            }
            optionButtons.forEach(button => {
                if (button.textContent === selectedOption) {
                    button.classList.add('correct'); // Add green color to correct option
                }
            });
        } else {
            feedbackText.textContent = 'Incorrect! The correct answer is: ' + correctAnswer;
            feedbackText.style.color = '#f44336';
            correctAnswersInARow = 0; // Reset streak on incorrect answer
            optionButtons.forEach(button => {
                if (button.textContent === selectedOption) {
                    button.classList.add('incorrect'); // Add red color to incorrect option
                }
            });
        }
        updateScoreDisplay();
    }

    // Function to update score display
    function updateScoreDisplay() {
        scoreDisplay.textContent = 'Score: ' + score;
    }

    // Function to update level display
    function updateLevelDisplay() {
        levelDisplay.textContent = 'Level: ' + level;
    }

    // Function to update progress display
    function updateProgressDisplay() {
        const progress = ((currentQuestionIndex + 1) / vocabulary.length) * 100;
        progressDisplay.style.width = progress + '%';
    }

    // Event listeners for option buttons
    optionButtons.forEach((button, index) => {
        button.addEventListener('click', function () {
            const selectedOption = this.textContent;
            checkAnswer(selectedOption);
        });
    });

    // Event listener for Check Answer button
    checkBtn.addEventListener('click', function () {
        const selectedOption = document.querySelector('.option:checked').value;
        if (selectedOption) {
            checkAnswer(selectedOption);
        } else {
            alert('Please select an option.');
        }
    });

    // Event listener for Next button
    nextBtn.addEventListener('click', function () {
        currentQuestionIndex++;
        if (currentQuestionIndex < vocabulary.length) {
            initializeGame();
        } else {
            level++;
            currentQuestionIndex = 0;
            alert('Congratulations! You have completed level ' + (level - 1) + '. Proceeding to level ' + level);
            initializeGame();
        }
    });

    // Event listener for Pronunciation button
    pronunciationBtn.addEventListener('click', function () {
        pronunciationAudio.src = vocabulary[currentQuestionIndex].audioSrc; // Set audio source
        pronunciationAudio.play();
    });

    // Initialize the game
    initializeGame();
});
