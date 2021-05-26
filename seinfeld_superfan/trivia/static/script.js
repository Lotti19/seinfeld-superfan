// //    The function evaluates the answer and displays result //
// function displayAnswer1() {                                                  Answer 1 starts here
// if (document.getElementById('option-11').checked) {
//     document.getElementById('block-11').style.border = '6px solid red'
//     document.getElementById('result-11').style.color = 'red'
//     document.getElementById('result-11').innerHTML = 'Inorrect!'
//     showCorrectAnswer1()
// }
// if (document.getElementById('option-12').checked) {
//     document.getElementById('block-12').style.border = '6px solid limegreen'
//     document.getElementById('result-12').style.color = 'red'
//     document.getElementById('result-12').innerHTML = 'Correct!'
// }
// if (document.getElementById('option-13').checked) {
//     document.getElementById('block-13').style.border = '6px solid red'
//     document.getElementById('result-13').style.color = 'red'
//     document.getElementById('result-13').innerHTML = 'Incorrect!'
//     showCorrectAnswer1()
// }
// if (document.getElementById('option-14').checked) {
//     document.getElementById('block-14').style.border = '6px solid red'
//     document.getElementById('result-14').style.color = 'red'
//     document.getElementById('result-14').innerHTML = 'Incorrect!'
//     showCorrectAnswer1()
// }
// }
// // the functon displays the link to the correct answer
// function showCorrectAnswer1() {
// let showAnswer1 = document.createElement('p')
// showAnswer1.innerHTML = 'Show Correct Answer'
// showAnswer1.style.position = 'relative'
// showAnswer1.style.top = '-180px'
// showAnswer1.style.fontSize = '1.75rem'
// document.getElementById('showanswer1').appendChild(showAnswer1)
// showAnswer1.addEventListener('click', () => {
//     document.getElementById('block-12').style.border = '3px solid limegreen'
//     document.getElementById('result-12').style.color = 'limegreen'
//     document.getElementById('result-12').innerHTML = 'Correct!'
//     document.getElementById('showanswer1').removeChild(showAnswer1)
// })
// }
// //    The function evaluates the answer and displays result
// function displayAnswer2() {                                                  Answer 2 starts here
// if (document.getElementById('option-15').checked) {
//     document.getElementById('block-15').style.border = '6px solid red'
//     document.getElementById('result-15').style.color = 'red'
//     document.getElementById('result-15').innerHTML = 'Inorrect!'
//     showCorrectAnswer2()
// }
// if (document.getElementById('option-16').checked) {
//     document.getElementById('block-16').style.border = '6px solid red'
//     document.getElementById('result-16').style.color = 'red'
//     document.getElementById('result-16').innerHTML = 'Incorrect!'
//     showCorrectAnswer2()
// }
// if (document.getElementById('option-17').checked) {
//     document.getElementById('block-17').style.border = '6px solid red'
//     document.getElementById('result-17').style.color = 'red'
//     document.getElementById('result-17').innerHTML = 'Incorrect!'
//     showCorrectAnswer2()
// }
// if (document.getElementById('option-18').checked) {
//     document.getElementById('block-18').style.border = '6px solid limegreen'
//     document.getElementById('result-18').style.color = 'limegreen'
//     document.getElementById('result-18').innerHTML = 'Correct!'
// }

// }
// // the functon displays the link to the correct answer
// function showCorrectAnswer2() {
// let showAnswer2 = document.createElement('p')
// showAnswer2.innerHTML = 'Show Correct Answer'
// showAnswer2.style.position = 'relative'
// showAnswer2.style.top = '-180px'
// showAnswer2.style.fontSize = '1.75rem'
// document.getElementById('showanswer2').appendChild(showAnswer2)
// showAnswer2.addEventListener('click', () => {
//     document.getElementById('block-18').style.border = '3px solid limegreen'
//     document.getElementById('result-18').style.color = 'limegreen'
//     document.getElementById('result-18').innerHTML = 'Correct!'
//     document.getElementById('showanswer2').removeChild(showAnswer2)
// })
// }


// Creating new JS trivia script below...above script is old "backup" version that is not DRY friendly


// Functions
function buildQuiz(){
    const output = [];

    myQuestions.forEach(
        (currentQuestion, questionNumber) => {
            const answers = [];
            for(letter in currentQuestion.answers){
                answers.push(
                    // Should the below <label> be in HTML instead?
                `<label>
                <input type="radio" name="question${questionNumber}" value="${letter}">
                ${letter} :
                ${currentQuestion.answers[letter]}
                </label>`
                );
            }
            output.push(
                `<div class="question"> ${currentQuestion.question} </div>
                <div class="answers"> ${answers.join('')} </div>`
            );
        }
    );

    quizContainer.innerHTML = output.join('');
}

function showResults(){
    const answerContainers = quizContainer.querySelectorAll('.answers');
    let numCorrect = 0;
    myQuestions.forEach((currentQuestion, questionNumber) =>{
        const answerContainer = answerContainers[questionNumber];
        const selector = `input[name=question${questionNumber}]:checked`;
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;

        if(userAnswer === currentQuestion.correctAnswer){
            numCorrect++;
            answerContainers[questionNumber].getElementsByClassName.color = 'lightgreen';
        }
        else{
            answerContainers[questionNumber].style.color = 'red';
        }
    });
    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
}

// Variables
const quizContainer = document.getElementById("quiz");
const resultsContainer = document.getElementById("results");
const submitButton = document.getElementById("submit");

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

// display quiz right away
buildQuiz();

// on submit, show results
submitButton.addEventListener("click", showResults);


