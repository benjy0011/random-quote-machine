import { useEffect, useState } from 'react';
import './App.scss';
import COLORS from './colors.js'

const api = "https://dummyjson.com/quotes/random";

function App() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [colorCode, setColorCode] = useState("#282c34");
  const [isLoading, setIsLoading] = useState(false);
  const [fade, setFade] = useState(false);

  const getQuoteData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(api);
      if (!response.ok) {
        throw new Error(`${response.status}`)
      }
      const data = await response.json();
      setIsLoading(false);
      return data;
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      return null;
    }
  }
  
  const getNewQuoteAndUpdate = async () => {
    const quoteData = await getQuoteData(api);

    if (quoteData) {
      setFade(true);
      setColorCode(COLORS[quoteData.id%20]);
      
      setTimeout(() => {
        setQuote(quoteData.quote);
        setAuthor(quoteData.author);
        setFade(false);
      }, 400) 
    }    
  };

  // Fetch the initial quote when the component loads
  useEffect(() => {
    getNewQuoteAndUpdate();
  }, []);
  
  return (
    <div className="App">
      <header 
        className="App-header" 
        style={
          {
            backgroundColor: colorCode,
            color: colorCode
          }
        }
      >
        <div id="quote-box">
          <p id="text" style={{ opacity: fade ? 0 : 1 }}><i class="ri-double-quotes-l"></i> {quote} </p>

          <p id="author" style={{ opacity: fade ? 0 : 1 }}> - {author}</p>

          {
            !isLoading 
            ? <button id="new-quote" style={{ backgroundColor: colorCode, cursor: "pointer" }} onClick={() => {
              getNewQuoteAndUpdate();
            }}>
              New Quote
            </button>
            : <button id="new-quote" style={{ backgroundColor: colorCode, cursor: "progress" }} >
              Loading
            </button> 
          }

          <a id="tweet-quote" style={{ backgroundColor: colorCode }} href={`https://www.twitter.com/intent/tweet?text=%22${quote}%22%20-%20${author}%20%0A%0A%23quotes`}><i class="ri-twitter-x-fill"></i></a>
        </div>
        <p style={{ color: "white", fontSize: "15px"}}>by Benjy</p>
      </header>
    </div>
  );
}

export default App; 
