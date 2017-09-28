import React from 'react';
import firebase from './../../../firebase';

import ChooseUsername from './ChooseUsername';

//logic for choose username screen
class ChooseUsernameContainer extends React.Component {

    state = {
        displayName: '',
        error: '',
        disabledSubmit: true
    }

    handleChange = (e) => {
        this.setState({displayName: e.target.value});
    }

    submitUsername = (e) => {
        e.preventDefault();
        if (this.state.displayName.length > 10) {
            this.setState({error: 'Användarnamnet får vara max 10 tecken!'})
        } else {
            this.checkDisplayNameAvailability()
            this.setState({disabledSubmit: true})
        }
    }

    checkDisplayNameAvailability = () => {
        firebase.database().ref('users')
        .orderByChild('displayName').equalTo(this.state.displayName)
        .once('value')
        .then(snapshot =>{
            if (snapshot.val()){
                this.setState({error: "Användarnamnet är upptaget", disabledSubmit: false})
            } else this.updateProfile(); //available --> update profile
        })
    }

    //update with displayName in db auth
    updateProfile = () => {
        var user = firebase.auth().currentUser;
        user.updateProfile({displayName: this.state.displayName})
        .then(()=>{
            this.storeUser(user); 
        }, error => {
            this.setState({ error: error, disabledSubmit: false })
        });
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
            this.props.checkRealtimeDb(user)
        })
        .catch(error => console.log(error))
    }

    render() {
        return (
            <ChooseUsername 
                handleChange={this.handleChange}
                displayName={this.state.displayName}
                submitUsername={this.submitUsername}
                error={this.state.error}/>
        );
    }
}

export default ChooseUsernameContainer;