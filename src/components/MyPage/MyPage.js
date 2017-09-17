import React from 'react';
import firebase from './../../firebase';

//modules
import Board from './../Board/Board';
import UserList from './UserList/UserList';

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
                <UserList user={this.props.user}/>
                <Board>
                </Board>
            </div>
        )
    }
}

export default MyPage;