var currentQuestionIndex;
var questionsList;

const rippleTitle = async () =>
{
    var title = document.getElementById("title");
    var letters = title.children;
    var i = 0;
    for(let letter of letters)
    {
        i = i+1;
        letter.style = 'animation-name: enlarge; animation-duration: 200ms; animation-delay: ' + (50*i).toString() + 'ms';
    }
    await delay(100);
    for(let letter of letters)
    {
        await delay(100);
        letter.style = '';
    }
}

const apiRequest = async (url) =>
{
    const response = await fetch(url);
    return await response.json(); //extract JSON from the http response
}

const fetchTrivia = async () => 
{
    var json = await apiRequest('https://opentdb.com/api.php?amount=10&category=21&difficulty=medium&type=multiple');
        questionsList = json.results;
    currentQuestionIndex = 0;
    var currentQuestion = questionsList[currentQuestionIndex];
    var image = await fetchImage(currentQuestion.category);
    createTriviaCard(currentQuestion.question,currentQuestion.correct_answer,currentQuestion.incorrect_answers,image);

}

const createTriviaCard = async (q,correct,ansList,imageUrl) =>
{
    ansList = insertAtRandom(correct,ansList);
    var board = document.getElementById("single-player-board");
    var card = document.createElement("div");
    board.appendChild(card);
    card.classList.add("trivia-card");
    var answersCard = document.createElement("div");
    answersCard.classList.add("answers-card");
    var question = document.createElement("h2");
    question.innerHTML = q;
    var answers = document.createElement("ul");
    card.appendChild(question);
    card.appendChild(answersCard);
    answersCard.appendChild(answers);
    for (let i = 0; i < ansList.length; i++) {
        var answer = document.createElement("li");
        var text = document.createElement("p");
        text.innerHTML = ansList[i];
        answer.appendChild(text);
        answer.onclick = submitAnswer;
        answers.appendChild(answer);
    }
    var image = document.createElement("img");
    image.src = imageUrl;
    answersCard.appendChild(image);
}

const insertAtRandom = (item,array) => {
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

const fetchImage = async (category) =>
{
    return "./content/dota2.jpg"
    //var json = await apiRequest('https://api.unsplash.com/photos/random?client_id=9CBJBoPA6QIPQXRIjYELTmDXNZvYybMj-XxUmdeVPNI&query='+category);
    //return json.urls.small;
}

const submitAnswer = async (e) =>
{
    var element = e.srcElement
    while(element.children.length > 0)
        element = element.children[0];

    validateAnswer(element.innerHTML);
    createNextButton();
}

const validateAnswer = async (ans) =>
{
    if(ans == questionsList[currentQuestionIndex].correct_answer)
        console.log("hi");
}

const createNextButton = async () => {
    var button = document.getElementById("next-button")
    if(button)
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
    if(currentQuestionIndex < 9)
    {
        console.log("hi");
        currentQuestionIndex = currentQuestionIndex+1;
        var currentQuestion = questionsList[currentQuestionIndex];
        var image = await fetchImage(currentQuestion.category);
        createTriviaCard(currentQuestion.question,currentQuestion.correct_answer,currentQuestion.incorrect_answers,image);
    }
}

const removeCurrentQuestion = async (sender) => {
    var old = document.getElementsByClassName("trivia-card")[0];
    old.remove();
    sender.remove();
}

const delay = ms => new Promise(res => setTimeout(res, ms));
