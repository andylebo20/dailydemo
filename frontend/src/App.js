import React from 'react';
import logo from './logo.svg';
import './App.css';
import {withRouter, Link} from 'react-router-dom'

class App extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      callLink: ""
    }

    this.createRoom = this.createRoom.bind(this)
  }

  createRoom(){
    fetch("/createRoom", {method: "post"}).then(function(res){
      return res.json()
    }).then(function(data){
      //   https://dailydemoapp.daily.co/InPSAzilx8qAslvN31SA
      this.setState({callLink: "/Room/" + data.name})
    }.bind(this)).catch(function(error){
      console.log(error)
    })
  }//////
  render(){ // make a different comp the home comp and then make <Switch> in here. Not in index.js. Only the router goes in index.
    return (
      <div className="App">
        <button onClick={this.createRoom}>Create and navigate to room</button>
        <Link to={this.state.callLink}>{this.state.callLink}</Link>
      </div>
    );
  }
}

export default withRouter(App);
