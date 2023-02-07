const quoteContainer= document.getElementById('quote-container');
const quoteText= document.getElementById('quote');
const authorText= document.getElementById('author');
const twitterBtn= document.getElementById('twitter');
const newQuoteBtn= document.getElementById('new-quote');
const loader= document.getElementById('loader');


// Get Quotes from API
let apiQuotes=[];

function loading(){
    loader.hidden = false;
    quoteContainer.hidden=true;
}
function complete(){
    loader.hidden = true;
    quoteContainer.hidden=false;
}

function newQuote(){
    loading();
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
    //set quote and Hide loader

    quoteText.textContent=quote.text;
    complete();
}

async function getQuotes(){
    loading();
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
// loading();

