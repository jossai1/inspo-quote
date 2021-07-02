import {Fragment, useState, useEffect} from 'react';
import axios from "axios";

const cardStyles = {
    backgroundColor: '#61dafb',
    padding: '3%',
    borderRadius: 11
};

function Login() {
    const [quotes, setQuotes] = useState([]);
    const [currentDisplayedQuote, setCurrentDisplayedQuote] = useState({});

    useEffect(() => {
        async function fetchQuotes() {
            let response = await axios.get('https://type.fit/api/quotes');
            setQuotes(response.data);
            console.log(currentDisplayedQuote);

            // setCurrentDisplayedQuote({...currentDisplayedQuote, text: quotes[0].text, author: quotes[0].author});
        }
        fetchQuotes();
        // setCurrentDisplayedQuote({
        //     ...currentDisplayedQuote,
        //     ...quotes[0]
        // });
        // setCurrentDisplayedQuote(response.data[0]);
        // console.log(currentDisplayedQuote);
        // const indexOfQuoteToDisplay = Math.floor(Math.random() * (quotes.length-1)) + 1;
        // console.log(indexOfQuoteToDisplay);
        // console.log(quotes);
    },[]);

    const generateRandomNumber = (min, max) =>  {
        return Math.floor(Math.random() * (max - min) + min);
    };

    useEffect(() => {
        const id = setInterval(() => {
            const indexOfQuoteToDisplay = generateRandomNumber(0, quotes.length);
            console.log(indexOfQuoteToDisplay);
            setCurrentDisplayedQuote({
                ...currentDisplayedQuote,
                ...quotes[indexOfQuoteToDisplay]
            });
        }, 5000);
       return () => {
           clearInterval(id);
       }
    },[quotes]);

    const changeQuote = () => {
        const indexOfQuoteToDisplay = generateRandomNumber(0, quotes.length);
        setCurrentDisplayedQuote({
            ...currentDisplayedQuote,
            ...quotes[indexOfQuoteToDisplay]
        });
    };

    return (

        <Fragment>

            { quotes.length !== 0 &&
            <div style={cardStyles}>
                 <h1>{currentDisplayedQuote.text}</h1>

                <cite>- {currentDisplayedQuote.author}</cite>
                <br/>
                <button>Like</button>
                <button>Share</button>
                <button onClick={changeQuote}>New Quote</button>
            </div>}

        </Fragment>
    );
}

export default Login;
