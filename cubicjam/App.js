import logo from './logo.svg';
import React, {Component} from 'react'; 
import './App.css';
import Navbar from './components/navbar';

import * as THREE from "three";
import Home from './pages/Home.js';
import About from './pages/About.js';
import Polls from './pages/Polls.js';

import CreatePoll from './pages/CreatePoll.js';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'; 
import MyPolls from './pages/MyPolls.js';

const App = () => {

 
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/about" exact component={About} />
        <Route path="/polls" exact component={Polls} />
        <Route path="/createPoll" exact component={CreatePoll} />
        <Route path="/myPolls" exact component={MyPolls} />

      </Switch>
    </Router>
  )

 
}

export default App;