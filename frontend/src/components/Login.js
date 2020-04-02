import React from 'react'
import firebase from '../firebase'
import {withRouter} from 'react-router-dom'

class Login extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            email: ""
        }

        this.handleChange = this.handleChange.bind(this)
        this.submitEmail = this.submitEmail.bind(this)
    }

    handleChange(event){
        this.setState({email: event.target.value})
    }

    submitEmail(){ // email is used to identify the host in the database and who the host is during calls
        localStorage.setItem("emailID", this.state.email)
        firebase.firestore().collection("users").doc(this.state.email).set({
            lastLoggedIn: new Date()
        }).then(function(){
            this.props.history.push("/Dashboard/" + this.state.email)
        }.bind(this)).catch(function(error){
            console.log(error)
        })
    }

    render(){
        return(
            <div className="loginBox">
                <label className="welcomeTitle">Welcome to your Daily.co dashboard.</label>
                <label className="enterEmailTitle">Please enter your email to continue:</label>
                <input className="emailTF" name="email" type="email" placeholder="Email" onChange={this.handleChange} value={this.state.email}/>
                <button className="loginBtn" onClick={this.submitEmail}>Continue to Dashboard</button>
            </div>
        )
    }
}

export default Login