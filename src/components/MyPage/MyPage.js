import React from 'react';
import firebase from './../../firebase';

//modules
import Board from './../Board/Board';
import UsersList from './UsersList/UsersList';
import GamesList from './GamesList/GamesList';

class MyPage extends React.Component{

    state = 
        {
            users: '',
            games: ''
        }

    componentDidMount(){
        this.fetchUsers();
        this.fetchGames();
    }

    componentWillUnmount() {
        firebase.database().ref('users').off();
        firebase.database().ref('users/' + this.props.user.uid + '/games/').off();
    }

    fetchUsers = () => {
        firebase.database().ref('users')
        .orderByChild('online')
        .equalTo(true)
        .limitToFirst(30)
        .on('value', (snapshot)=>{
            this.setState({users: snapshot.val()}); //remove player's games from state!
        });
    }

    fetchGames = () => {
        firebase.database().ref('users/' + this.props.user.uid + '/games/')
        .on('value', snapshot=>{
            this.setState({games: snapshot.val()});
        });
    }

    signOut = () =>{
        firebase.database() //setting online=false before really signing out
        .ref('users/' + this.props.user.uid + '/online')
        .set(false)
        .then(() => firebase.auth().signOut())
        .catch(error => {
            console.log(error);
        });
    }

    //kolla att inte spelare redan är utmanad!!!
    challengePlayer = (opponent) =>{
        firebase.database().ref('games') //push game to 'games'
        .push({ 
                active: false,
                players: {
                    [this.props.user.uid]: {
                        displayName: this.props.user.displayName,
                        turn: false
                    },
                    [opponent.uid]: {
                        displayName: opponent.displayName,
                        turn: true
                    }
                }
            }
        )
        .then(snapshot=>{   //update user games
            const addGameToUser = {};
            addGameToUser['users/' + this.props.user.uid + '/games/' + snapshot.key] = 
                {
                    myStatus: 'sentRequest', 
                    opponentName: opponent.displayName,
                    opponentUid: opponent.uid
                }

            addGameToUser['users/' + opponent.uid + '/games/' + snapshot.key] = 
                {
                    myStatus: 'gotRequest', 
                    opponentName: this.props.user.displayName, 
                    opponentUid: this.props.user.uid
                }

            firebase.database().ref().update(addGameToUser)
            .catch(error=>console.log(error))
        })
        .catch(error=>console.log(error))
    }

    removeGame = (game, opponent) => {
        const removeGames = {};
        removeGames['games/' + game] = null; //remove from 'games'
        removeGames['users/' + opponent + '/games/' + game] = null; //remove from opponent's games
        removeGames['users/' + this.props.user.uid + '/games/' + game] = null //remove from my games

        firebase.database().ref()
        .update(removeGames)
        .catch(error=>console.log(error))
    }

    render(){
        return (
            <div className="flex flex-column full-width">
                <p>Min sida</p>
                <p>Välkommen {this.props.user.email}</p>

                <a onClick={this.signOut} style={{cursor:'pointer'}}>Logga ut</a>
                <div className="flex flex-row full-width">
                    <UsersList 
                        users={this.state.users} 
                        user={this.props.user} 
                        challengePlayer={this.challengePlayer}
                        games={this.state.games}/>
                        
                    <GamesList 
                        games={this.state.games}
                        user={this.props.user}
                        removeGame={this.removeGame}/>
                </div>
                <Board>
                </Board>
            </div>
        )
    }
}

export default MyPage;