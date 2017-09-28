import React from 'react';
import PropTypes from 'prop-types';
import firebase from './../../firebase';
import styled from 'styled-components';

//components
import Board from './../Board/Board';
import UsersList from './UsersList/UsersList';
import GamesList from './GamesList/GamesList';
import Toplist from './Toplist/Toplist';
import BottomBar from './BottomBar/BottomBar';

//logic for main screen when logged in
class MyPage extends React.Component{

    state = {
            myPoints: null,
            users: null,
            games: null,
            activeGame: null,
            loadingUsers: true,
            loadingGames: true,
            toplist: false,
            menuVisible: true
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
                //removing users games from userlist
                userObj[key.key] = {
                    displayName: snapshot.child(key.key + '/displayName').val(),
                    uid: snapshot.child(key.key + '/uid').val(),
                    online: snapshot.child(key.key + '/online').val(),
                    points: snapshot.child(key.key + '/points').val()
                }
            })
            let myPoints = userObj[this.props.user.uid] ?
            userObj[this.props.user.uid].points : 0; //if we just registered our id is maybe not present in 'users' yet
            this.setState({users: userObj, myPoints: myPoints, loadingUsers: false});

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
        this.props.hideSignup(); //if we came from signup
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

    closeToplist = () => {
        this.state.toplist && this.setState({toplist:false})
    }

    showToplist = () => {
        !this.state.toplist && this.setState({toplist:true})
    }

    toggleMenu = () => {
        let newValue = this.state.menuVisible !== true
        this.setState({menuVisible: newValue})
    }


    render(){
        return (
            <MyPageMain>
                <UsersList 
                    users={this.state.users} 
                    user={this.props.user} 
                    challengePlayer={this.challengePlayer}
                    games={this.state.games}
                    loadingUsers={this.state.loadingUsers}/>
                <GameSection menuVisible={this.state.menuVisible}>
                    <GameSectionWrapper>
                        {this.state.toplist ? 
                        <Toplist 
                            closeToplist={this.closeToplist}
                            users={this.state.users}
                            user={this.props.user}/>
                        :
                        this.state.activeGame ? 
                        <Board 
                            game={this.state.activeGame}
                            user={this.props.user}
                            hideGame={this.hideGame}
                            myPoints={this.state.myPoints}/> 
                            :
                        <GamesList 
                            games={this.state.games}
                            user={this.props.user}
                            acceptGame={this.acceptGame}
                            showGame={this.showGame}
                            removeGame={this.removeGame}
                            loadingGames={this.state.loadingGames}/>
                    }   
                    </GameSectionWrapper>
                    <BottomBar 
                        user={this.props.user}
                        myPoints={this.state.myPoints}
                        signOut={this.signOut}
                        showToplist={this.showToplist}
                        toggleMenu={this.toggleMenu}
                        menuVisible={this.state.menuVisible}/>
                </GameSection>
            </MyPageMain>
        )
    }
}

MyPage.propTypes = {user: PropTypes.object }

//CSS

const MyPageMain = styled.main`
width:100%;
height:100%;
display:flex;
flex-direction: row;
`;

const GameSection = styled.section`
height:100%;
display:flex;
flex-direction:column;
flex: 1;
position: absolute;
top: 0;
right: 0;
bottom: 0;
left: ${props => props.menuVisible ? '300px' : 0 };
transition: left 0.5s ease;

@media screen and (max-width: 850px) {
}
`;

const GameSectionWrapper = styled.section`
background-color: #fff6ae;
height: 100%;
display: flex;
justify-content: center;
padding: 0 2rem;
`;

export default MyPage;

