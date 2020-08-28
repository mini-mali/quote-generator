const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');





// Get quote from API
async function getQuote() {
    //const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    //const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en';
    const apiUrl = 'https://api.chucknorris.io/jokes/random';

    try {
        //const response = await fetch(proxyUrl + apiUrl);
        const response = await fetch(apiUrl);
        const data = await response.json();
        //console.log(data);
        //authorText.innerText = data.quoteAuthor;

        // Chuck Norris API doesn't have quoteAuthor key
        if (data.quoteAuthor === undefined) {
            authorText.innerText = 'Chuck Norris';
        } else {
            authorText.innerText = data.quoteAuthor;
        }

        // Reduce font size for long quotes
        if (data.value.length > 50) {
            quoteText.classList.add('long-quote');
        } else {
            quoteText.classList.remove('long-quote');
        }
        quoteText.innerText = data.value;
    } catch (error) {
        //getQuote();
        console.log('whoops, no quote', error);
    }
}


// Tweet quote
function tweetQuote() {
    const quote = quoteText.innerText;
    const author = 'Chuck Norris';
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} – ${author}`;

    window.open(twitterUrl, '_blank');
}


// Event listeners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);


// On load
getQuote();
