import React from 'react';
import firebase from 'firebase';

//components
import SignUp from './SignUp/SignUp';

class SignIn extends React.Component{
    state = {
        email: '',
        password: '',
        showSignup: false
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log('logged in as', this.state.email, this.state.password)
    }

    toggleSignup = () => {
        this.state.showSignup ? 
        this.setState({showSignup: false}) :
        this.setState({showSignup: true})
    }

    render(){
        const signin = 
            <form onSubmit={this.handleSubmit} className="flex flex-column quarter-width">
                <p>Logga in</p>
                <label htmlFor="email">E-mail:</label>
                <input 
                    type="email" 
                    name="email" 
                    onChange={this.handleChange}
                    value={this.state.email} 
                    placeholder="john@doe.com" 
                    required />
                <label htmlFor="password">Lösenord:</label>
                <input 
                    type="password" 
                    name="password" 
                    onChange={this.handleChange}
                    value={this.state.password} 
                    placeholder="Minst 6 tecken"
                    required/>
                <input type="submit" value="Logga in"/>
                <a style={{cursor: 'pointer'}} onClick={this.toggleSignup}>Registrera dig</a>
            </form>

        return(
        <div className="flex flex-column half-width align-center">
            {!this.state.showSignup ? 
                signin :
                <SignUp toggleSignup={this.toggleSignup} />
            }
        </div>
        )
    }
}

export default SignIn;