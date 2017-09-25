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
    signup: false
  }

  componentDidMount(){
    this.userAuthListener();
  }

  userAuthListener = () => {
    firebase.auth()
    .onAuthStateChanged(user => {
      if (user) {
        //logged in, set state & user online
        let loggedInUser = this.createSmallerUserObject(user);
        this.setState({user: loggedInUser}, () => {
            firebase.database().ref('users/' + this.state.user.uid + '/online')
            .set(true)
            .catch(error => console.log(error));
        });
      } else {
        //logged off, set state & online = false
        if (this.state.user) {
          firebase.database().ref('users/' + this.state.user.uid + '/online')
          .set(false)
          .then(() => {
            this.setState({user: null})
          })
          .catch(error => {
              console.log(error);
          });
        }
      }
    }, (error => {
      console.log(error);
    }))
  }

  //needed when we submit username after user is created
  refreshUser = (user) =>{
    let newUser = this.createSmallerUserObject(user);
    this.setState({user : newUser})
  }

  createSmallerUserObject = (user) =>{
    return !user ? null : 
    {
      displayName: user.displayName, 
      email: user.email, 
      uid: user.uid
    };
  }

  // toggleSignup = () => {
  //   this.state.showSignup ? 
  //   this.setState({showSignup: false}) :
  //   this.setState({showSignup: true})
  // }

  hideSignup = () => {
    this.setState({signup: false});
  }

  showSignup = () => {
    this.setState({signup: true})
  }

  render(){
    return (
      !this.state.user ? 
      <FrontPage 
        refreshUser={this.refreshUser}
        signup={this.state.signup}
        hideSignup={this.hideSignup}
        showSignup={this.showSignup} /> :
      <MyPage 
        user={this.state.user}
        hideSignup={this.hideSignup}/>
    );
  }
}

export default App;
