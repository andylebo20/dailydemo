import React from 'react'
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

    submitEmail(){ // email is used to identify the user in the database
        localStorage.setItem("emailID", this.state.email)
        this.props.history.push("/Dashboard/" + this.state.email)
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