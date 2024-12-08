import logo from './logo.svg';
import './App.css';

import React,{useState} from 'react'
import NavBar from './components/NavBar';
import News from './components/News';

import {  BrowserRouter as Router,  Switch,Route, Routes} from "react-router-dom";


import LoadingBar from 'react-top-loading-bar';

const App = ()=> {
  const apiKey= process.env.REACT_APP_NEWS_API;



  const [progress, setProgress] = useState(0)

  
    return (  
      <div>
      <Router>
        <NavBar/>

        <LoadingBar
        height={4}
        color='#f11946'
        progress={progress}
         onLoaderFinished={() => setProgress(0)}
      />
        
        <Routes>
            <Route exact path="/" element={<News setProgress={setProgress} apiKey={apiKey} key="general" pageSize={6} country="us" category="general" />} />
            <Route exact path="/business" element={<News setProgress={setProgress} apiKey={apiKey} key="business" pageSize={6} country="us" category="business" />} />
            <Route exact path="/entertainment" element={<News setProgress={setProgress} apiKey={apiKey} key="general" pageSize={6} country="us" category="entertainment" />} />
            <Route exact path="/general" element={<News setProgress={setProgress} apiKey={apiKey} key="general" pageSize={6} country="us" category="general" />} />
            <Route exact path="/health" element={<News setProgress={setProgress} apiKey={apiKey} key="health" pageSize={6} country="us" category="health" />} />
            <Route exact path="/science" element={<News setProgress={setProgress} apiKey={apiKey} key="science" pageSize={6} country="us" category="science" />} />
            <Route exact path="/sport" element={<News setProgress={setProgress} apiKey={apiKey} key="sport" pageSize={6} country="us" category="sport" />} />
            <Route exact path="/technology" element={<News setProgress={setProgress} apiKey={apiKey} key="technology" pageSize={6} country="us" category="technology" />} />
          </Routes>
      </Router>
      </div>
    )
  
}
export default App;

