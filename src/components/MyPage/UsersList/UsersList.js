import React from 'react';
import firebase from './../../../firebase';

class UsersList extends React.Component{
    state = {users: ''};

    componentDidMount(){
        firebase.database().ref('users')
        .orderByChild('online')
        .limitToFirst(30)
        .on('value', (snapshot)=>{
            this.setState({users: snapshot.val()});
        });
    }

    componentWillUnmount() {
        firebase.database().ref('users').off();
    }

    //kolla att inte spelare redan är utmanad!!!
    challengePlayer = (opponent) =>{
        firebase.database().ref('games') //push game to 'games'
        .push({ 
                active: false,
                players: {
                    [this.props.user.uid]: {
                        displayName: this.props.user.displayName,
                        status: 'sentRequest'
                    },
                    [opponent.uid]: {
                        displayName: opponent.displayName,
                        status: 'gotRequest'
                    }
                },
                turn: [opponent.uid],
            }
        )
        .then(snapshot=>{   //update user games
            const addGameToUser = {};
            addGameToUser['users/' + this.props.user.uid + '/games/' + snapshot.key] = 
                {myStatus: 'sentRequest', opponentName: opponent.displayName}

            addGameToUser['users/' + opponent.uid + '/games/' + snapshot.key] = 
                {myStatus: 'gotRequest', opponentName: this.props.user.displayName}

            firebase.database().ref().update(addGameToUser);
        })
        .catch(error=>console.log(error))
    }

    render(){
        return(
            <section className="flex flex-column half-width">
                <h4>Andra spelare</h4>
                <table>
                    <thead>
                        <tr>
                            <th>Namn</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                {this.state.users && 
                Object.keys(this.state.users)
                //sorting online first
                .sort((a, b) =>{
                    return (this.state.users[a].online === this.state.users[b].online)? 0 : a? 1 : -1;
                })
                .map(key=>{
                    //don't return myself
                    return (this.state.users[key].uid === this.props.user.uid) ? 
                     "" :
                    <tr key={'user-tr-' + key}>
                        <td>{this.state.users[key].displayName}</td>
                        <td>{this.state.users[key].online ? '(Online)' : ''}</td>
                        <td>
                            <button 
                                onClick={()=>this.challengePlayer(this.state.users[key])}>Utmana
                            </button>
                        </td>
                    </tr>
                })}
                    </tbody>
                </table>
            </section>
        );
    }
}

export default UsersList;