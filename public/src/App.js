import './App.css';
import User from './Components/User';
import Admin from './Components/Admin';
import React from 'react';
import {Route, Switch } from 'react-router-dom';

function App() {
  return (
    <div style={{background: "black", height: "100vh"}}>
      <Switch>
        <Route path="/" component = {User} exact/>
        <Route path="/admin" component = {Admin} />

      </Switch>
    </div>
    );
  }
  
  export default App;
  