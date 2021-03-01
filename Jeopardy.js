let points;

window.onload = () => {
    points = 0;
    getQuestion();
    document.getElementById("A-btn").addEventListener("click", showAnswer);
    document.getElementById("NQ-btn").addEventListener("click", getQuestion);
    document.getElementById("NQ-btn").addEventListener("click", remarkReset);
    document.getElementById('point-amount').innerHTML = points;
}

const getQuestion = () => {

    document.getElementById("answer").style.display="none";
    fetch('http://jservice.io/api/random')
    .then((response) => response.json())
    .then((data)=> {

        console.log(data);
        setCategory(data[0].category.title)
        setQuestion(data[0].question)
        setAnswer(data[0].answer)
        setQuestionValue(data[0].value);

    }, (err) => {
        console.log(`error: ${err}`);
    });
    
}

const setCategory = (category) => {
    document.getElementById("category").innerHTML = category;
}
const setQuestion = (question) => {
    document.getElementById("question").innerHTML = question;
}
const setAnswer = (answer) => {
    document.getElementById("answer").innerHTML = answer;
}
const showAnswer = () => {
    document.getElementById("answer").style.display="block";
    let answer = document.getElementById("answer").innerHTML;
    let userGuess = getUserGuess();

    if (userGuess == answer){
        document.getElementById('remarks').innerHTML = "Correct";
        points = addPoints();
        document.getElementById('point-amount').innerHTML = points;
    } else {
        document.getElementById('remarks').innerHTML = "Incorrect";  
        points = subtractPoints();
        document.getElementById('point-amount').innerHTML = points;
    }
}

const getUserGuess = () => {
    let userAnswer = document.getElementById('userAnswer').value;
    console.log(userAnswer);
    return userAnswer;
}

const remarkReset = () => {
    document.getElementById('remarks').innerHTML = "";
}

const setQuestionValue = (questionValue) => {
    document.getElementById('questionValue').innerHTML = questionValue;
}

const addPoints = () => {
    let questionValue = document.getElementById('questionValue').innerHTML;
    let sum = points + parseInt(questionValue);
    return sum;
}

const subtractPoints = () => {
    let questionValue = document.getElementById('questionValue').innerHTML;
    let difference = points - parseInt(questionValue);
    return difference;
}

