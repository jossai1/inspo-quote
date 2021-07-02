import {Fragment, useState, useEffect} from 'react';
import axios from "axios";
import QuoteCard from "./QuoteCard";
import { LIKED_QUOTES_KEY} from "./constants";
import logo from "./logo.svg";
import {Link} from "react-router-dom";

function Home() {
    const [quotes, setQuotes] = useState([]);
    const [likedQuotes, setLikedQuotes] = useState(JSON.parse(window.localStorage.getItem(LIKED_QUOTES_KEY)) || []);
    const [dataLoaded, setDataLoaded] = useState(false);
    const [currentDisplayedQuote, setCurrentDisplayedQuote] = useState({});

    useEffect(() => {
        async function fetchQuotes() {
            let response = await axios.get('https://type.fit/api/quotes');
            let formattedQuotes = response.data.map((obj, index) => {
                return Object.assign({id: index + 1, liked: false}, obj);
            });
            setQuotes(formattedQuotes);
            // console.log(formattedQuotes)
            updateDisplayedQuote(formattedQuotes); //data fetched now we need to set the initial quote to display - manually first..else we have to wait 5 secs for timer to kick off
            setDataLoaded(true);
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
    }, []);

    const generateRandomNumber = (min, max) => {
        return Math.floor(Math.random() * (max - min) + min);
    };

    const updateDisplayedQuote = (quotes) => {
        const indexOfQuoteToDisplay = generateRandomNumber(0, quotes.length);
        // console.log(indexOfQuoteToDisplay);
        setCurrentDisplayedQuote({
            ...currentDisplayedQuote,
            ...quotes[indexOfQuoteToDisplay]
        });
    }

    useEffect(() => {
        const id = setInterval(() => {
            updateDisplayedQuote(quotes);
        }, 5000);
        return () => {
            clearInterval(id);
        }
    }, [quotes]);


    useEffect(() => {
        //update local storage with the same data .....store in local storage as well
        window.localStorage.setItem(LIKED_QUOTES_KEY, JSON.stringify(likedQuotes));
    }, [likedQuotes]);


    const changeQuote = () => {
        const indexOfQuoteToDisplay = generateRandomNumber(0, quotes.length);
        setCurrentDisplayedQuote({
            ...currentDisplayedQuote,
            ...quotes[indexOfQuoteToDisplay]
        });
    };

    const toggleLikeBtn = (quote) => {
        quote.liked ? unlikeQuote(quote) : likeQuote(quote);
    };

    const likeQuote = (quote) => {
        // takes liked quote and adds to likedquotes collection
        if (likedQuotes.find((obj) => obj.id === quote.id)) { // prevent liked items from being like more than once..which would resyutl in dupe liked quotes in the collection
            // if we find item already in list -  don't re-add - do nothing
        } else {
            quote.liked = true;
            setLikedQuotes((prevLikedQuotes) => [quote, ...prevLikedQuotes]);
        }
    };

    const unlikeQuote = (quote) => {
        quote.liked = false;
        const filteredLikedQuotes = likedQuotes.filter((obj) => quote.id !== obj.id);
        setLikedQuotes(filteredLikedQuotes);
    };

    // todo: implement share functionality
    // todo: implement copy functionality

    return (
        <div className="home">
            <header className="App-header">
                {/*<img src={logo} className="App-logo" alt="logo" />*/}
                <h1 style={{fontStyle: "italic"}}>✨ Inspo-Quote ✨</h1>
                <Fragment>
                    {
                        (dataLoaded && quotes.length !== 0) &&
                        <QuoteCard showActionButtons={true} changeQuote={changeQuote} likeQuote={toggleLikeBtn}
                                   quoteObj={currentDisplayedQuote}/>
                    }
                    <Link style={{color:"white"}} to="/quotes-collection">View Liked Quotes</Link>
                </Fragment>
            </header>
        </div>
    );
}

export default Home;
