import React, { Component } from 'react';
import firebase from './firebase';

//Modules
import FrontPage from './components/FrontPage/FrontPage';
import MyPage from './components/MyPage/MyPage';

//CSS
import './App.css';

class App extends Component {
  state = {
    user: null,
    signup: false,
    chooseUsername: false
  }

  componentDidMount(){
    this.userAuthListener();
  }

  userAuthListener = () => {
    firebase.auth()
    .onAuthStateChanged(user => {
      if (user) { //if a user is logged in...
        this.checkRealtimeDb(user) //check if she's in realtime db
      } else {
        // user == null, logged off
        if (this.state.user) {
          this.setOffline();
        }
      }
    }, (error => {
      console.log(error);
    }))
  }

  checkRealtimeDb = (user) => {
    firebase.database().ref('users/' + user.uid)
    .once('value', (snapshot)=>{
      if (!snapshot.exists()) { //signed in for the first time - choose username
        this.setState({chooseUsername: true, signup: false})
      } else { //present - set state & user online
        this.setOnline(user);
      }
    })

  } 

  setOnline = (user) => {
    let loggedInUser = this.createSmallerUserObject(user);
    this.setState({user: loggedInUser, chooseUsername: false}, () =>{
      firebase.database().ref('users/' + this.state.user.uid + '/online')
      .set(true)
      .catch(error => console.log(error));
    });
  }

  setOffline = () => {
    firebase.database().ref('users/' + this.state.user.uid + '/online')
    .set(false)
    .then(() => {
      this.setState({user: null})
    })
    .catch(error => {
        console.log(error);
    });
  }

  createSmallerUserObject = (user) =>{
    return !user ? null : 
    {
      displayName: user.displayName, 
      email: user.email, 
      uid: user.uid
    };
  }


  hideSignup = () => {
    this.setState({signup: false});
  }

  showSignup = () => {
    this.setState({signup: true})
  }

  showChooseUsername = () => {
    this.setState({chooseUsername: true})
  }

  render(){
    return (
      !this.state.user ? 
      <FrontPage 
        signup={this.state.signup}
        chooseUsername={this.state.chooseUsername}
        hideSignup={this.hideSignup}
        showSignup={this.showSignup} 
        showChooseUsername={this.showChooseUsername}
        checkRealtimeDb={this.checkRealtimeDb}/> :
      <MyPage 
        user={this.state.user}
        hideSignup={this.hideSignup}/>
    );
  }
}

export default App;
