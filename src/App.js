import { useEffect, useState } from 'react';
import './App.scss';
import COLORS from './colors.js'

const api = "https://dummyjson.com/quotes/random";

function App() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [colorCode, setColorCode] = useState("#282c34");

  const getQuoteData = async () => {
    try {
      const response = await fetch(api);
      if (!response.ok) {
        throw new Error(`${response.status}`)
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
  
  const getNewQuoteAndUpdate = async () => {
    const quoteData = await getQuoteData(api);

    if (quoteData) {
      setQuote(quoteData.quote);
      setAuthor(quoteData.author);
      setColorCode(COLORS[quoteData.id%20])  
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
          <p id="text">"{quote}"</p>

          <p id="author"> - {author}</p>

          <button id="new-quote" onClick={() => {
            getNewQuoteAndUpdate()
          }}>
            Change Quote
          </button>

          <a id="tweet-quote" href={`https://www.twitter.com/intent/tweet?text=%22${quote}%22%20-%20${author}%20%0A%0A%23quotes`}>Tweet</a>
        </div>
      </header>
    </div>
  );
}

export default App; 
