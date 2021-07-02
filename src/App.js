import logo from './logo.svg';
import './App.css';
import Home from './Home';
import {BrowserRouter as Router, Route} from "react-router-dom";
import QuotesCollection from "./QuotesCollection";

function App() {
  return (
    <Router>
        <Route path="/" exact>
            <Home/>
        </Route>
        <Route path="/quotes-collection">
            <QuotesCollection />
        </Route>
    </Router>
  );
}

export default App;
