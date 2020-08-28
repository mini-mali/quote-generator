const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');



function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}


function removeLoadingSpinnner() {
    if (!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}



// Get quote from API
async function getQuote() {
    showLoadingSpinner();
    const apiUrl = 'https://api.chucknorris.io/jokes/random';

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        // Reduce font size for long quotes
        if (data.value.length > 50) {
            quoteText.classList.add('long-quote');
        } else {
            quoteText.classList.remove('long-quote');
        }
        quoteText.innerText = data.value;
        authorText.innerText = 'Chuck Norris';

        removeLoadingSpinnner();
    } catch (error) {
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
