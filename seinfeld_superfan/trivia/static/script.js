(function(){
    function buildQuiz(){
      // variable to store the HTML output
    const output = [];

      // for each question...
    myQuestions.forEach(
        (currentQuestion, questionNumber) => {

          // variable to store the list of possible answers
        const answers = [];

          // and for each available answer...
        for(letter in currentQuestion.answers){

            // ...add an HTML radio button
            answers.push(
            `<label>
                <input type="radio" name="question${questionNumber}" value="${letter}">
                ${letter} :
                ${currentQuestion.answers[letter]}
            </label>`
            );
        }

          // add this question and its answers to the output
        output.push(
            `<div class="question"> ${currentQuestion.question} </div>
            <div class="answers"> ${answers.join('')} </div>`
        );
        }
    );

      // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join('');
    }

    function showResults(){

      // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll('.answers');

      // keep track of user's answers
    let numCorrect = 0;

      // for each question...
    myQuestions.forEach( (currentQuestion, questionNumber) => {

        // find selected answer
        const answerContainer = answerContainers[questionNumber];
        const selector = `input[name=question${questionNumber}]:checked`;
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;

        // if answer is correct
        if(userAnswer === currentQuestion.correctAnswer){
          // add to the number of correct answers
        numCorrect++;

          // color the answers green
        answerContainers[questionNumber].style.color = 'lightgreen';
        }
        // if answer is wrong or blank
        else{
          // color the answers red
        answerContainers[questionNumber].style.color = 'red';
        }
    });

      // show number of correct answers out of total
    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
    }

    const quizContainer = document.getElementById('quiz');
    const resultsContainer = document.getElementById('results');
    const submitButton = document.getElementById('submit');
    const myQuestions = [
        {
            question: "At what restaurant do the characters of Seinfeld typically eat?",
            answers: {
                a: "Ihop",
                b: "Monk's Cafe",
                c: "Pizza Hut",
                d: "George's"
            },
            correctAnswer: "b"
        },
        {
            question: "What is Kramer's first name?",
            answers: {
                a: "Billy",
                b: "Ned",
                c: "Xander",
                d: "Cosmo"
            },
            correctAnswer: "d"
        },
        {
            question: "What did the very real company, Vandalay Industries sell?",
            answers: {
                a: "Latex",
                b: "Gum",
                c: "Rain Coats",
                d: "Ketchup"
            },
            correctAnswer: "a"
        },
        {
            question: "Jerry's father Kalman created the beltless trench coat, what was it called?",
            answers: {
                a: "The Producer",
                b: "The Professional",
                c: "The Executive",
                d: "The Director"
            },
            correctAnswer: "c"
        },
        {
            question: "What unusual food did Mr. Pitt (Elaine's boss) eat with a fork and knife?",
            answers: {
                a: "Pizza",
                b: "Snickers",
                c: "Chocolate Chip Cookie",
                d: "Potato Chips"
            },
            correctAnswer: "b"
        },
        {
            question: "What movie were Jerry and his girlfriend Rachel making out to that upset his parents?",
            answers: {
                a: "Schindler's List",
                b: "The Silence of The Lambs",
                c: "A Few Good Men",
                d: "JFK"
            },
            correctAnswer: "a"
        },
        {
            question: "What did Jerry wear out of the movie theater lost and found?",
            answers: {
                a: "Belt",
                b: "Glasses",
                c: "Puffy Shirt",
                d: "Hat"
            },
            correctAnswer: "b"
        },
        {
            question: "What made Jerry vomit for the first time in 10 years?",
            answers: {
                a: "Chicken Salad Sandwich",
                b: "Pepperoni Pizza",
                c: "Black and White Cookie",
                d: "Marble Rye"
            },
            correctAnswer: "c"
        },
        {
            question: "What disease did Elaine fear she contracted?",
            answers: {
                a: "Scurvy",
                b: "Ebola",
                c: "Polio",
                d: "Rabies"
            },
            correctAnswer: "d"
        },
        {
            question: "What did Kalman Seinfeld think was stolen at the doctor's office?",
            answers: {
                a: "Wallet",
                b: "Shoes",
                c: "Coat",
                d: "Cash"
            },
            correctAnswer: "a"
        }
    ];

    // Kick things off
    buildQuiz();

    // Event listeners
    submitButton.addEventListener('click', showResults);
})();