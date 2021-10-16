import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import reportWebVitals from './reportWebVitals';

import Navbar from './Navbar';
import App from './App';
import Home from './Home';
import Tracker from './Tracker';
import Article from './Article';
import Cards from './Cards';
import Journal from './Journal';
import Goal from './Goal';
import Letter from './Letter';

const ReactRouter = () => {
  return(<Router>
    <Navbar/>
    <Switch>
      <Route exact path="/" component={Home}/>
      <Route exact path="/article" component={Article}/>
      <Route exact path="/tracker" component={Tracker}/>
      <Route exact path="/cards" component={Cards}/>
      <Route exact path="/journal" component={Journal}/>
      <Route exact path="/goal" component={Goal}/>
      <Route exact path="/letter" component={Letter}/>
      <Route exact path="/app" component={App}/>

    </Switch>
  
  </Router>)
}

ReactDOM.render(<ReactRouter/>, document.getElementById('root'));
reportWebVitals();
