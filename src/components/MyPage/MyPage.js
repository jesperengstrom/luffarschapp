import React from 'react';
import firebase from './../../firebase';

//modules
import Board from './../Board/Board';
import UsersList from './UsersList/UsersList';
import GamesList from './GamesList/GamesList';

class MyPage extends React.Component{

    signOut = () =>{
        firebase.database() //setting online=false before really signing out
        .ref('users/' + this.props.user.uid + '/online')
        .set(false)
        .then(() => firebase.auth().signOut())
        .catch(error => {
            console.log(error);
        });
    }

    render(){
        return (
            <div className="flex flex-column full-width">
                <p>Min sida</p>
                <p>Välkommen {this.props.user.email}</p>

                <a onClick={this.signOut} style={{cursor:'pointer'}}>Logga ut</a>
                <div className="flex flex-row full-width">
                    <UsersList user={this.props.user}/>
                    <GamesList user={this.props.user}/>
                </div>
                <Board>
                </Board>
            </div>
        )
    }
}

export default MyPage;