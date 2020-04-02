import React from 'react';
import './App.css';
import {Route, Redirect} from 'react-router-dom'
import Dashboard from './Dashboard'
import Room from './Room'
import Login from './Login'

class App extends React.Component {

  render(){ // using routes to setup page navigation
    return (
      <div className="App">
          <Route exact path="/" component={App}>
            <Redirect exact from="/" to="/Login" />
          </Route>
          <Route path="/Login" component={Login}/>
          <Route exact path="/Dashboard/:emailID" component={Dashboard}/>
          <Route path="/Room/:roomID" component={Room}/>
      </div>
    );
  }
}

export default App;
