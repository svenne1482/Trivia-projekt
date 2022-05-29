var currentQuestionIndex;
var questionsList;


const rippleTitle = async () => {
    var title = document.getElementById("title");
    var letters = title.children;
    var i = 0;
    for (let letter of letters) {
        i = i + 1;
        letter.style = 'animation-name: enlarge; animation-duration: 200ms; animation-delay: ' + (50 * i).toString() + 'ms';
    }
    await delay(100);
    for (let letter of letters) {
        await delay(100);
        letter.style = '';
    }
}

const init = (amount, category) => {
    rippleTitle();
}

const apiRequest = async (url) => {
    const response = await fetch(url);
    return await response.json(); //extract JSON from the http response
}

const fetchTrivia = async (amount, category) => {
    var json = await apiRequest('https://opentdb.com/api.php?amount=' + amount + '&category=' + await getCategoryId(category) + '&difficulty=medium&type=multiple');
    questionsList = json.results;
    currentQuestionIndex = 0;
}
const validateMulti = () => {
    var form = document.forms['multi-setup'];
    var name1 = form['player1'].value;
    var name2 = form['player2'].value;
    var category = form['category'].value;
    var rounds = form['rounds'].value;
    var r = parseInt(rounds);
    if (rounds <= 0 || rounds > 10) {
        return false;
    }
    if (name1.length < 1) {

        return false;
    }
    if (name2.length < 1) {

        return false;
    }
    return true;
}
const start = async () => {
    var form = document.forms['multi-setup'];
    form.style.display = "none";
    var rounds = form['rounds'].value;
    var category = form['category'].value;
    await fetchTrivia(rounds * 2, category);
    await delay(200);
    createTriviaCard();
}

const createTriviaCard = async () => {
    var q = questionsList[currentQuestionIndex];
    var correct = q.correct_answer;
    var imageUrl = await fetchImage(q.category);
    ansList = insertAtRandom(correct, q.incorrect_answers);
    var board = document.getElementById("multi-player-board");
    var card = document.createElement("div");
    board.appendChild(card);
    card.classList.add("trivia-card");
    var answersCard = document.createElement("div");
    answersCard.classList.add("answers-card");
    var question = document.createElement("h2");
    question.innerHTML = q.question;
    var answers = document.createElement("ul");
    card.appendChild(question);
    card.appendChild(answersCard);
    answersCard.appendChild(answers);
    for (let i = 0; i < ansList.length; i++) {
        var answer = document.createElement("li");
        var text = document.createElement("p");
        text.innerHTML = ansList[i];
        answer.appendChild(text);
        answer.classList.add("question");
        answer.onclick = submitAnswer;
        answers.appendChild(answer);
    }
    var image = document.createElement("img");
    image.src = imageUrl;
    answersCard.appendChild(image);
}

const getCategoryId = (name) => {
    switch(name)
    {
        case "Sports":
            return 21;
        case "Science: Computers":
            return 18;
    }
    return 0;
}

const insertAtRandom = (item, array) => {
    array.push(item);
    return shuffleArray(array);
}
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

const fetchImage = async (category) => {
    return "./content/dota2.jpg"
    //var json = await apiRequest('https://api.unsplash.com/photos/random?client_id=9CBJBoPA6QIPQXRIjYELTmDXNZvYybMj-XxUmdeVPNI&query='+category);
    //return json.urls.small;
}

const submitAnswer = async (e) => {
    var element = e.srcElement
    while (element.children.length > 0)
        element = element.children[0];

    if (await validateAnswer(element.innerHTML))
        submitStat(1);
    else
        submitStat(0);
    updateStyles();
    createNextButton();
}

const updateStyles = async () => {
    var answers = document.getElementsByTagName("ul")[0];
    answers = answers.children;
    for (let i = 0; i < answers.length; i++) {
        var correct = await validateAnswer(answers[i].children[0].innerHTML)
        if (correct) {
            answers[i].classList.add("correct");
        }
        else {
            answers[i].classList.add("incorrect");
        }
    }
}

const validateAnswer = async (ans) => {
    if (ans == questionsList[currentQuestionIndex].correct_answer)
        return true;
    return false;
}

const createNextButton = async () => {
    var button = document.getElementById("next-button")
    if (button)
        return;
    var board = document.getElementById("multi-player-board");
    var nxtButton = document.createElement("button");
    nxtButton.innerHTML = "Next Question";
    nxtButton.id = "next-button";
    nxtButton.onclick = nextTrivia;
    board.appendChild(nxtButton);
}

const nextTrivia = async (e) => {
    removeCurrentQuestion(e.srcElement);
    if (currentQuestionIndex < questionsList.length) {
        currentQuestionIndex = currentQuestionIndex + 1;
        var currentQuestion = questionsList[currentQuestionIndex];
        var image = await fetchImage(currentQuestion.category);
        createTriviaCard(currentQuestion.question, currentQuestion.correct_answer, currentQuestion.incorrect_answers, image);
    }
}

const removeCurrentQuestion = async (sender) => {
    var old = document.getElementsByClassName("trivia-card")[0];
    old.remove();
    sender.remove();
}


const submitStat = (correct) => {

}

const delay = ms => new Promise(res => setTimeout(res, ms));