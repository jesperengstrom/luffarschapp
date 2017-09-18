import React from 'react';
import firebase from 'firebase';

//components
import SignUp from './SignUp/SignUp';

class SignIn extends React.Component{
    state = {
        email: '',
        password: '',
        error: '',
        showSignup: false
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.signIn();

    }

    signIn = () => {
        firebase.auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(user=>{
            console.log('signed in!', user)
            this.setUserOnline(user.uid)
        })
        .catch(error =>{
            this.handleError(error)
        })
    }

    setUserOnline = (uid) => {
        firebase.database()
        .ref('users/' + uid + '/online')
        .set(true)
        .catch(error=>{
            console.log(error);
        });
    }

    handleError = (error) => {
        let message = '';
        switch(error.code) {
            case "auth/wrong-password":
                message = "Du har angett fel lösenord";
                break;
            case "auth/invalid-email":
                message = "Du har angett en felaktig mejladress";
                break;
            case "auth/user-not-found":
                message = "Det finns ingen användare med den mejladressen";
                break;
            case "auth/user-disabled":
                message = "kontot är avstängt";
                break;
            default: 
                message = "Något gick fel, försök igen"
        }
        this.setState({error : message})
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
                {this.state.error && <p style={{color:'red'}}>{this.state.error}</p>}
                <input type="submit" value="Logga in"/>
                <a style={{cursor: 'pointer'}} onClick={this.toggleSignup}>Registrera ett konto</a>
            </form>

        return(
        <div className="flex flex-column half-width align-center">
            {!this.state.showSignup ? 
                signin :
                <SignUp refreshUser={this.props.refreshUser} toggleSignup={this.toggleSignup} />
            }
        </div>
        )
    }
}


export default SignIn;