import React from 'react';
import firebase from './../../../firebase';

class UserList extends React.Component{
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
        firebase.database().ref('games') //push challenge to 'games'
        .push({ 
                active: false,
                status: "requested", 
                players: {
                    [this.props.user.uid]: {
                        displayName: this.props.user.displayName,
                        status: true
                    },
                    [opponent.uid]: {
                        displayName: opponent.displayName,
                        status: false
                    }
                },
                turn: [opponent.uid],
                board: null
            }
        )
        .then(snapshot=>{   //set challenge on users
            this.setChallengeOnUsers(snapshot.key, 'incoming', opponent, this.props.user);
            this.setChallengeOnUsers(snapshot.key, 'outgoing', this.props.user, opponent);
            }
        )
        .catch(error=>console.log(error))
    }

    setChallengeOnUsers(key, type, player, opponent) {
        firebase.database().ref('users/' + player.uid + '/games/'+ type +'/' + key)
        .set({
            opponent: {
                displayName: opponent.displayName, 
                uid: opponent.uid
                }
        })
        .catch(error=>console.log(error));
    }


    render(){
        return(
            <div>
                <h4>Starta ett spel</h4>
                <ul>
                {this.state.users && 
                Object.keys(this.state.users)
                 //sorting by online first NOT WORKING!!
                .sort((a, b) =>{
                    return (this.state.users[a].online === this.state.users[b].online)? 0 : a? -1 : 1;
                })
                .map(key=>{
                    //don't return myself
                    return (this.state.users[key].uid === this.props.user.uid) ? 
                     "" :
                    <li key={this.state.users[key].uid}>
                        {this.state.users[key].displayName}
                        {this.state.users[key].online ? ' (Online)' : ''}
                        <button onClick={()=>this.challengePlayer(this.state.users[key])}>Utmana</button>
                    </li>
                })}
                </ul>
            </div>
        );
    }
}

export default UserList;