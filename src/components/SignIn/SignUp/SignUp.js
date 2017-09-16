import React from 'react';
import firebase from 'firebase';

class SignUp extends React.Component{
    state = {email: '', password: ''}

    handleChange = (e) =>{
        this.setState({[e.target.name]: e.target.value})
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log('regestering', this.state.email, this.state.password)
    }
    
    render(){
        return(
            <form onSubmit={this.handleSubmit} className="flex flex-column quarter-width">
                <p>Registrera dig</p>
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
                <input type="submit" value="Registrera" />
                <input type="button" onClick={this.props.toggleSignup} value="avbryt"/>
            </form>
        )
    }
}

export default SignUp;