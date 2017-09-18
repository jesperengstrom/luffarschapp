import React, { Component } from 'react';
import firebase from './firebase';

//Modules
import SignIn from './components/SignIn/SignIn';
import FrontPage from './components/FrontPage/FrontPage';
import MyPage from './components/MyPage/MyPage';

//CSS
import './App.css';

class App extends Component {
  state = ({user: ''})

  componentDidMount(){
    this.userAuthListener();
  }

  userAuthListener = () =>{
    firebase.auth()
    .onAuthStateChanged(user =>{
      this.setState({user: this.createSmallerUserObject(user)})
    })
  }

  // refreshUser = (user) =>{
  //   this.setState({user : this.createSmallerUserObject(user)})
  // }

  createSmallerUserObject = (user) =>{
    return !user ? null : 
    {
      displayName: user.displayName, 
      email: user.email, 
      uid: user.uid
    };
  }

  render(){
    const firstPage = this.state.user ? 
      <MyPage user={this.state.user}/> : 
      <div className="flex flex-row">
        <FrontPage/>
        <SignIn refreshUser={this.refreshUser}/>
      </div>;

    return (
      <div className="App flex flex-column">
        {firstPage}
      </div>
    );
  }
}

export default App;


// Finns sätt att se användaren som precis loggade ut?
// måste det man ska spara i databasen reflekteras i state?
//Hur blir man utloggad automatiskt?