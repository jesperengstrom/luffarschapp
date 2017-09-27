import React from 'react';
import firebase from './../../../firebase';

//components
import SignUp from './SignUp';

//logic for signup form
class SignUpContainer extends React.Component{
    state = {
        email: '', 
        password: '',
        error: '',
        disabledSubmit: false
    }

    handleChange = (e) =>{
        this.setState({[e.target.name]: e.target.value})
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({disabledSubmit: true}, this.createUser)
    }

    createUser = () =>{
        firebase.auth()     
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(()=>{
            this.props.showChooseUsername()
        })
        .catch(error =>{
            let newErr = this.handleError(error)
            this.setState({error: newErr, disabledSubmit:false})
        })
    }


    handleError = (error) =>{
        let message = '';
        switch(error.code){
            case "auth/weak-password":
                message = "Lösenordet måste vara minst 6 tecken"
                break;
            case "auth/email-already-in-use":
                message = "Det finns redan ett konto med den mejladressen"
                break;
            case "auth/invalid-email":
                message = "Du har angett en ogiltig mejladress"
                break;
            default:
                message = "Något har gått fel, försök igen"
        }
        return message;
    }
    
    render(){
        return(
            <SignUp
            handleSubmit={this.handleSubmit}
            handleChange={this.handleChange}
            displayName={this.state.displayName}
            email={this.state.email}
            password={this.state.password}
            error={this.state.error}
            disabledSubmit={this.state.disabledSubmit}/>
        )
    }
}


export default SignUpContainer;