const quoteContainer= document.getElementById('quote-container');
const quoteText= document.getElementById('quote');
const authorText= document.getElementById('author');
const twitterBtn= document.getElementById('twitter');
const newQuoteBtn= document.getElementById('new-quote');
// Get Quotes from API
let apiQuotes=[];
function newQuote(){
    //Pick random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random()*apiQuotes.length)];
    // console.log(quote);
    //check if Author field is blank and replace it with 'unknown'
    if(!quote.author){
        authorText.textContent='Unknown';
    }else{
        authorText.textContent= quote.author; 
    }
    // authorText.textContent=quote.author;
    if(quote.text.length>50){
        quoteText.classList.add('long-quote');
    } else{
        quoteText.classList.remove('long-quote');
    }
    quoteText.textContent=quote.text;
}

async function getQuotes(){
    const apiUrl='https://type.fit/api/quotes'
    try {
        const response= await fetch(apiUrl);
        apiQuotes= await response.json();
        newQuote();
        
        // console.log(apiQuotes[12]);

    }catch (error){
        //Catch error here

    }

}

//Tweet Quote
function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl,'_blank');

}

//Event Listeners

newQuoteBtn.addEventListener('click',newQuote);
twitterBtn.addEventListener('click',tweetQuote);

//On load
getQuotes();

