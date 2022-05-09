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
    var questions = json.results;
    var image = await fetchImage(questions[0].category);
    createTriviaCard(questions[0].question,questions[0].correct_answer,questions[0].incorrect_answers,image);

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
    var json = await apiRequest('https://api.unsplash.com/photos/random?client_id=9CBJBoPA6QIPQXRIjYELTmDXNZvYybMj-XxUmdeVPNI&query='+category);
    return json.urls.small;
}

const delay = ms => new Promise(res => setTimeout(res, ms));
