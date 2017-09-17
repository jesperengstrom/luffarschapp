import React from 'react';
import firebase from './../../firebase';
//modules
import Board from './../Board/Board';

class MyPage extends React.Component{
    signOut = () =>{
        firebase.auth()
        .signOut();
    }

    render(){
        return (
            <div className="flex flex-column full-width">
                <p>Min sida</p>
                <p>Välkommen {this.props.user.displayName}</p>

                <a onClick={this.signOut} style={{cursor:'pointer'}}>Logga ut</a>
                <Board>
                </Board>
            </div>
        )
    }
}

export default MyPage;