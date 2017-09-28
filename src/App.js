import React, { Component } from 'react';
import firebase from './firebase';

//Modules
import FrontPage from './components/FrontPage/FrontPage';
import MyPage from './components/MyPage/MyPage';

//CSS
import './App.css';

class App extends Component {
  state = {
    user: undefined,
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
        //if no user...
        if (this.state.user) { //...but we still have a user in state...
          this.setOffline(); //...set ofline
        } else this.setState({user: user}) //else null = login
      }
    }, (error => {
      console.log(error);
    }))
  }

  checkRealtimeDb = (user) => {
    firebase.database().ref('users/' + user.uid)
    .once('value', (snapshot)=>{
      if (!snapshot.exists()) { //signed in for the first time - choose username
        //set user user to null here even though its not, just to display choose username screen
        this.setState({chooseUsername: true, signup: false, user: null}) 
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
        user={this.state.user}
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
