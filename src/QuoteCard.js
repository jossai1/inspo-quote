import {Fragment} from 'react';

const cardStyles = {
    backgroundColor: '#61dafb',
    padding: '3%',
    borderRadius: 11
};


function QuoteCard(props) {

    const test = (quote) =>{
        props.likeQuote(quote);
    }

    return (
        <Fragment>
            <div style={props.customStyles || cardStyles}>
                <h1>#{props.quoteObj.id}</h1>
                <h2>{props.quoteObj.text}</h2>
                {props.quoteObj.author && <cite>- {props.quoteObj.author}</cite>}
                <br/>
                {
                    props.showActionButtons &&
                   <Fragment>
                       <button onClick={() => test(props.quoteObj)}>{ props.quoteObj.liked ? "Unlike" : "Like"}</button>
                       <button>Share</button>
                       <button onClick={props.changeQuote}>New Quote</button>
                   </Fragment>
                }
            </div>

        </Fragment>
    );
}
QuoteCard.defaultProps = { text: 'Sample tweet', showActionButtons: true };
export default QuoteCard;
