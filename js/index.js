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

const delay = ms => new Promise(res => setTimeout(res, ms));
