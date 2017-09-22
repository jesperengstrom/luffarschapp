import React from 'react';
import PropTypes from 'prop-types';
import firebase from './../../firebase';

//modules
import Board from './../Board/Board';
import UsersList from './UsersList/UsersList';
import GamesList from './GamesList/GamesList';

class MyPage extends React.Component{

    state = {
            users: null,
            games: null,
            error: null,
            activeGame: null,
            loadingUsers: true,
            loadingGames: true,
        };

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
        .orderByChild('online') //online first
        // .equalTo(true) //display only online?
        .limitToFirst(30) //limit userlist
        .on('value', (snapshot)=>{
            let userObj = {}
            snapshot.forEach((key)=>{
                //removing users game from userlist
                userObj[key.key] = {
                    displayName: snapshot.child(key.key + '/displayName').val(),
                    uid: snapshot.child(key.key + '/uid').val(),
                    online: snapshot.child(key.key + '/online').val()
                }
            })
            this.setState({users: userObj, loadingUsers: false});

        }, (error => {
            console.log(error);
        }));
    }

    fetchGames = () => {
        firebase.database().ref('users/' + this.props.user.uid + '/games/')
        .on('value', snapshot =>{
            let gamesArr = []; //making an array of this snapshot

            !snapshot.val() ? 
            this.setState({games: null, loadingGames: false})
            :
            snapshot.forEach(key =>{
                let obj = Object.assign({}, key.val(), {gameId: key.key})
                gamesArr.push(obj);
            })
            this.setState({games: gamesArr, loadingGames: false});

        }, (error => {console.log(error);
        }));
    }

    signOut = () => {
        firebase.auth().signOut();
    }

    challengePlayer = (opponent) => {
        firebase.database().ref('games') //push game to 'games'
        .push({ 
                active: true,
                players: {
                    [this.props.user.uid]: {
                        turn:false, icon: 'o'
                    },
                    [opponent.uid]: {
                        turn: true, icon: 'x'
                    }
                }
            }
        )
        .then(snapshot => {   //update user games
            const addGameToUser = {};
            addGameToUser['users/' + this.props.user.uid + '/games/' + snapshot.key] = {
                status: 'sentReq',
                opponentName: opponent.displayName,
                opponentUid: opponent.uid
            };
            addGameToUser['users/' + opponent.uid + '/games/' + snapshot.key] = {
                status: 'gotReq',
                opponentName: this.props.user.displayName,
                opponentUid: this.props.user.uid
            };

            firebase.database().ref().update(addGameToUser)
            .catch(error => console.log(error))
        })
        .catch(error => console.log(error))
    }

    acceptGame = (game) => {
        const acceptGame = {};
        acceptGame['users/' + this.props.user.uid + '/games/' + game.gameId + '/status/'] = 'playing';
        acceptGame['users/' + game.opponentUid + '/games/' + game.gameId + '/status/'] = 'waiting';
        firebase.database().ref().update(acceptGame)
        .then(() => this.showGame(game))
        .catch(error => console.log(error));
    }

    hideGame = () => {
        this.setState({activeGame: null})
    }

    showGame = (game) => {
        this.setState({activeGame: game})
    }

    removeGame = (game) => {
        const removeGames = {};
        removeGames['games/' + game.gameId] = null; //remove from 'games'
        removeGames['users/' + game.opponentUid + '/games/' + game.gameId] = null; //remove from opponent's games
        removeGames['users/' + this.props.user.uid + '/games/' + game.gameId] = null //remove from my games

        firebase.database().ref()
        .update(removeGames)
        .catch(error => console.log(error));
    }

    render(){
        return (
            <div className="flex flex-column full-width">
                <div className="flex flex-row">
                    <p>Välkommen {this.props.user.displayName}</p>
                    <p onClick={this.signOut} style={{cursor:'pointer'}}>Logga ut</p>
                </div>
                {this.state.activeGame ? 
                    <Board 
                        game={this.state.activeGame}
                        user={this.props.user}
                        hideGame={this.hideGame}/> 
                        :
                    <div className="flex flex-row full-width">
                        <UsersList 
                            users={this.state.users} 
                            user={this.props.user} 
                            challengePlayer={this.challengePlayer}
                            games={this.state.games}
                            loadingUsers={this.state.loadingUsers}/>
                            
                        <GamesList 
                            games={this.state.games}
                            user={this.props.user}
                            acceptGame={this.acceptGame}
                            showGame={this.showGame}
                            removeGame={this.removeGame}
                            loadingGames={this.state.loadingGames}/>
                    </div>
                }
            </div>
        )
    }
}

MyPage.propTypes = {user: PropTypes.object }

export default MyPage;