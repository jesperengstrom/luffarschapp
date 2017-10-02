import React from 'react';
import firebase from '../../../firebase';

//components
import SignIn from './SignIn';

//sign in logic
class SignInContainer extends React.Component{
    state = {
        email: '',
        password: '',
        error: '',
        disabledSubmit: false
    }

    componentWillMount() {
        firebase.auth().getRedirectResult()
        .catch(error => this.handleError(error.message))
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({disabledSubmit: true}, this.signIn())
    }

    signInWithGoogle = () => {
        var provider = new firebase.auth.GoogleAuthProvider();
        this.setState({disabledSubmit: true})
        firebase.auth().signInWithRedirect(provider)
    }

    signIn = () => {
        //setting to session = logout on browser close.
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
        .then(() => {
            return firebase.auth()
            .signInWithEmailAndPassword(this.state.email, this.state.password)
            .catch(error =>{
                this.handleError(error)
            });
        })
        .catch(error => this.handleError(error))
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
        this.setState({error : message, disabledSubmit: false})
    }

    render(){
        return (
                <SignIn
                    email={this.state.email}
                    password={this.state.password}
                    handleChange={this.handleChange}
                    handleSubmit={this.handleSubmit}
                    signInWithGoogle={this.signInWithGoogle}
                    error={this.state.error}
                    disabledSubmit={this.state.disabledSubmit}/>
        )
    }
}



export default SignInContainer;