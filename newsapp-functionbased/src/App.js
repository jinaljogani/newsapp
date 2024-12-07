import logo from './logo.svg';
import './App.css';

import React, { Component } from 'react'
import NavBar from './components/NavBar';
import News from './components/News';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Routes
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';

export default class App extends Component {
  apiKey= process.env.REACT_APP_NEWS_API
  state = {
  progress:0,
  };

  setProgress=(progress)=>{
    this.setState({progress: progress});
  } ;

   render() {
    return (  
      <div>
      <Router>
        <NavBar/>

        <LoadingBar
        height={4}
        color='#f11946'
        progress={this.state.progress}
         onLoaderFinished={() => this.setProgress(0)}
      />
        
        <Routes>
            <Route exact path="/" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="general" pageSize={6} country="us" category="general" />} />
            <Route exact path="/business" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="business" pageSize={6} country="us" category="business" />} />
            <Route exact path="/entertainment" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="general" pageSize={6} country="us" category="entertainment" />} />
            <Route exact path="/general" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="general" pageSize={6} country="us" category="general" />} />
            <Route exact path="/health" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="health" pageSize={6} country="us" category="health" />} />
            <Route exact path="/science" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="science" pageSize={6} country="us" category="science" />} />
            <Route exact path="/sport" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="sport" pageSize={6} country="us" category="sport" />} />
            <Route exact path="/technology" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="technology" pageSize={6} country="us" category="technology" />} />
          </Routes>
      </Router>
      </div>
    )
  }
}


//InfoSphere
// render method is life cycle method , jsx compile and then render html on screen