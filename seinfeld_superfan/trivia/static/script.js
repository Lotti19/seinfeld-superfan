//    The function evaluates the answer and displays result
function displayAnswer1() {
if (document.getElementById('option-11').checked) {
    document.getElementById('block-11').style.border = '6px solid red'
    document.getElementById('result-11').style.color = 'red'
    document.getElementById('result-11').innerHTML = 'Inorrect!'
    showCorrectAnswer1()
}
if (document.getElementById('option-12').checked) {
    document.getElementById('block-12').style.border = '6px solid limegreen'
    document.getElementById('result-12').style.color = 'red'
    document.getElementById('result-12').innerHTML = 'Correct!'
}
if (document.getElementById('option-13').checked) {
    document.getElementById('block-13').style.border = '6px solid red'
    document.getElementById('result-13').style.color = 'red'
    document.getElementById('result-13').innerHTML = 'Incorrect!'
    showCorrectAnswer1()
}
if (document.getElementById('option-14').checked) {
    document.getElementById('block-14').style.border = '6px solid red'
    document.getElementById('result-14').style.color = 'red'
    document.getElementById('result-14').innerHTML = 'Incorrect!'
    showCorrectAnswer1()
}
}
// the functon displays the link to the correct answer
function showCorrectAnswer1() {
let showAnswer1 = document.createElement('p')
showAnswer1.innerHTML = 'Show Correct Answer'
showAnswer1.style.position = 'relative'
showAnswer1.style.top = '-180px'
showAnswer1.style.fontSize = '1.75rem'
document.getElementById('showanswer1').appendChild(showAnswer1)
showAnswer1.addEventListener('click', () => {
    document.getElementById('block-12').style.border = '3px solid limegreen'
    document.getElementById('result-12').style.color = 'limegreen'
    document.getElementById('result-12').innerHTML = 'Correct!'
    document.getElementById('showanswer1').removeChild(showAnswer1)
})
}
