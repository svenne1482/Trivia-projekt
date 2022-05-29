var currentQuestionIndex;
var questionsList;
var questionsLoaded = 0;
var logged_user = -1;


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

const init = (amount,category) =>{
    getLoggedUser();
    rippleTitle();
    fetchTrivia(amount,category);
}

const getLoggedUser = () =>
{
    var oReq = new XMLHttpRequest();
    oReq.onload = function () {
        logged_user = this.responseText;
    };
    oReq.open("get", "db.php?func=getLoggedUser", true);
    oReq.send();
}

const apiRequest = async (url) => {
    const response = await fetch(url);
    return await response.json(); //extract JSON from the http response
}

const fetchTrivia = async () => {
    var json = await apiRequest('https://opentdb.com/api.php?amount=10&category=18&difficulty=medium&type=multiple');
    questionsList = json.results;
    delay(200);
    assignTriviaIds(questionsList);
    currentQuestionIndex = 0;
}

const createTriviaCard = async () => {
    var q = questionsList[currentQuestionIndex];
    var correct = q.correct_answer;
    var imageUrl = await fetchImage(q.category);
    ansList = insertAtRandom(correct, q.incorrect_answers);
    var board = document.getElementById("single-player-board");
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

    if(await validateAnswer(element.innerHTML))
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
        if(correct)
        {
            answers[i].classList.add("correct");
        }
        else
        {
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
    var board = document.getElementById("single-player-board");
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

const assignTriviaIds = async () =>
{
    if(questionsLoaded < questionsList.length)
    {
        assignTrivia(questionsList[questionsLoaded]);
    }
}

const assignTrivia = (question) =>
{
    var oReq = new XMLHttpRequest();
    oReq.onload = function () {
        console.log(question.question);
        question.id = (this.responseText);
        question.user_created = 0;
        questionsLoaded++;
        if(questionsLoaded == questionsList.length)
            createTriviaCard();
        assignTriviaIds();
    };

    var q = question.question.replaceAll("&#039;", "%27");
    q = q.replaceAll("&quot;","%22")
    q = q.replaceAll("#","%23");
    oReq.open("get", "db.php?func=fetchTriviaId&question=" + q + "&category=" + question.category, true);
    oReq.send();
}

const submitStat = (correct) => 
{
    var qId = questionsList[currentQuestionIndex].id;
    var userCreated = questionsList[currentQuestionIndex].user_created;
    var uId = logged_user;

    var oReq = new XMLHttpRequest();
    var url = 'db.php';
    var params = "func=insertStat&uid=" + uId + "&uc=" + userCreated + "&tid=" + qId + "&correct="+correct;
    oReq.open('POST', url, true);
    oReq.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    oReq.onreadystatechange = function () {
    }
    oReq.send(params);
}

const delay = ms => new Promise(res => setTimeout(res, ms));