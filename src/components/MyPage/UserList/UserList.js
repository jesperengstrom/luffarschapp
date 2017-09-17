import React from 'react';
import firebase from './../../../firebase';

class UserList extends React.Component{
    componentDidMount(){
        firebase.database().ref('users')
        .on('value', (snapshot)=>{
            console.log(snapshot.val());
        });
    }
    render(){
        return(
            <p>UserList</p>
        );

    }
}

export default UserList;