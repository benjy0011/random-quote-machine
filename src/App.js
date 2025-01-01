import { useEffect, useState } from 'react';
import './App.scss';


function App() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");

  const api = "https://animechan.io/api/v1/quotes/random";

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
  
  const getQuoteAndAuthor = (quoteData) => {
    if (!quoteData) {
      return {
        quoteContent: null,
        quoteAuthor: null,
      };
    }

    const quoteContent = quoteData.content;
    const quoteAuthor = `${quoteData.character.name} (${quoteData.anime.name})`;
  
    return {
      quoteContent,
      quoteAuthor,
    };
  }
  
  const getNewQuoteAndUpdate = async () => {
    const quoteData = await getQuoteData(api);

    if (quoteData) {
      const { quoteContent, quoteAuthor } = getQuoteAndAuthor(quoteData);
  
      setQuote(quoteContent);
      setAuthor(quoteAuthor);  
    }    
  };

  // Fetch the initial quote when the component loads
  useEffect(() => {
    getNewQuoteAndUpdate();
  });
  
  return (
    <div className="App">
      <header className="App-header">
        <p>
          "{quote}"
        </p>

        <p> 
          - {author}
        </p>

        <button onClick={() => {
          getNewQuoteAndUpdate()
        }}>
          Change Quote
        </button>
      </header>
    </div>
  );
}

export default App; 
