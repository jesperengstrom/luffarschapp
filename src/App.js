import React, { Component } from 'react';

//Modules
import SignIn from './components/SignIn/SignIn';
import FrontPage from './components/FrontPage/FrontPage';
import MyPage from './components/MyPage/MyPage';

//CSS
import './App.css';

class App extends Component {
  state = ({user: ''})

  render() {
    const firstPage = this.state.user ? 
      <MyPage/> : 
      <div className="flex flex-row">
        <FrontPage/>
        <SignIn/>
      </div>;

    return (
      <div className="App flex flex-column">
        {firstPage}
      </div>
    );
  }
}

export default App;
