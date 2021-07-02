import {Fragment, useState, useEffect} from 'react';
import {LIKED_QUOTES_KEY} from "./Constants";
import QuoteCard from "./QuoteCard";
import {Link} from "react-router-dom";

const customCardStyle = {
    backgroundColor: '#61dafb',
    padding: '3%',
    borderRadius: 11,
    margin: "2%"
};


function QuoteCollection() {
    const [likedQuotes, setLikedQuotes] = useState(JSON.parse(window.localStorage.getItem(LIKED_QUOTES_KEY)) || []);


    useEffect(() => {
        //update local storage with the same data .....store in local storage as well
        window.localStorage.setItem(LIKED_QUOTES_KEY, JSON.stringify(likedQuotes));
    }, [likedQuotes]);


    const toggleLikeBtn = (quote) => {
        quote.liked ? unlikeQuote(quote) : likeQuote(quote);
    };

    const unlikeQuote = (quote) => {
        quote.liked = false;
        const filteredLikedQuotes = likedQuotes.filter((obj) => quote.id !== obj.id);
        setLikedQuotes(filteredLikedQuotes);
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


    const renderLikedQuotes = () => {
        if (likedQuotes.length === 0) {
            return <h1> Empty </h1>
        } else {
            return (<div style={{display: "flex", flexDirection: "row", padding: " 2%", flexWrap: "wrap"}}>
                {
                    likedQuotes.map((quoteObj, index) => {
                        return <QuoteCard customStyles={customCardStyle} likeQuote={toggleLikeBtn} key={index}
                                          showActionButtons={true}
                                          quoteObj={quoteObj}/>
                    })
                }
            </div>);
        }
    }


    return (
        <Fragment>
            <Link to="/">Home</Link>
            {renderLikedQuotes()}
        </Fragment>
    );
    }

    export default QuoteCollection;
