import React from 'react';
import firebase from './../../../firebase';

//components
import SignUp from './SignUp';

//logic for signup form
class SignUpContainer extends React.Component{
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
                this.storeUser(user); 
            }, error => {
                this.setState({ error: error, disabledSubmit: false })
            });
        })
        .catch(error =>{
            let newErr = this.handleError(error)
            this.setState({error: newErr, disabledSubmit:false})
        })
    }

    //storing user in realtime db
    storeUser = (user) => {
        firebase.database().ref('users/' + user.uid)
        .set({
            displayName: user.displayName,
            uid: user.uid,
            online: true,
            points: 0
        })
        .then(() => {
            //displayname is added after creation, we need to update state here
            this.props.refreshUser(user); 
        })
        .catch(error => console.log(error))
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
            disabledSubmit={this.state.disabledSubmit}
            toggleSignup={this.props.toggleSignup} />
        )
    }
}


export default SignUpContainer;