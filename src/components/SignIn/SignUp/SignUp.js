import React from 'react';
import firebase from './../../../firebase';

class SignUp extends React.Component{
    state = 
    {
        displayName: '',
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
        this.setState({disabledSubmit: true}, this.checkDisplayNameAvailability)
    }

    checkDisplayNameAvailability = (fn) =>{
        firebase.database().ref('users')
        .orderByChild('displayName').equalTo(this.state.displayName)
        .once('value')
        .then(snapshot =>{
            if (snapshot.val()){
                this.setState({error: "Användarnamnet är upptaget", disabledSubmit: false})
            } else this.createUser(); //available --> create user
        })
    }

    createUser = () =>{
        firebase.auth()     
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(user =>{
            console.log('user created', user)
            user.updateProfile({displayName: this.state.displayName})
            .then(()=>{
                let user = firebase.auth().currentUser;
                //displayname is added after creation, do we need to update state here??
                // this.props.refreshUser(user); 
                this.storeUser(user); //storing user in realtime db
            }, error => {
                this.setState({ error: error, disabledSubmit: false })
            });
        })
        .catch(error =>{
            this.setState({error: this.handleError(error), disabledSubmit:false})
        })
    }

    storeUser = (user) => {
        firebase.database().ref('users/' + user.uid)
        .set({
            displayName: user.displayName,
            email: user.email, 
            uid: user.uid,
            online: true
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
            <form onSubmit={this.handleSubmit} className="flex flex-column quarter-width">
                <p>Registrera dig!</p>
                <label htmlFor="displayName">Användarnamn</label>
                <input
                    type="text"
                    name="displayName"
                    onChange={this.handleChange}
                    value={this.state.displayName}
                    placeholder="John_Doe"
                    maxLength="25"
                    required />
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
                {this.state.error && <p className="error">{this.state.error}</p>}
                <input type="submit" disabled={this.state.disabledSubmit} value="Registrera" />
                <input type="button" onClick={this.props.toggleSignup} value="avbryt"/>
            </form>
        )
    }
}


export default SignUp;