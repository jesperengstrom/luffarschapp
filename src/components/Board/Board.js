import React from 'react';
import firebase from '../../firebase';

//components
import Row from './Row/Row';
import BoardInfo from './BoardInfo/BoardInfo';

//CSS
import './Board.css' 

//vars
export const boardSize = {x: 10, y:10};


//class
class Board extends React.Component{
    constructor(props) {
        super(props)
        this.isActive = firebase.database().ref('games/' + this.props.game.gameId + '/active');
        this.newBoard = {};
    }
    
    state = {
        yourTurn: null,
        loading: true,
        board: {}, 
        icon: '',
        error: '',
        won: null
    };

    componentDidMount(){
        this.fetchGame()
    }

    fetchGame = () => {
        firebase.database().ref('games/' + this.props.game.gameId)
        .on('value', snapshot => {
            //double check user turn
            const yourTurn = snapshot.child('/players/' + this.props.user.uid + '/turn').val();
            //load board if it exists
            const board = snapshot.child('board').exists() ? snapshot.child('board').val() : {};
            //assign icons to users
            const gameIcons = {
                [this.props.user.uid]: snapshot.child('/players/' + this.props.user.uid + '/icon').val(),
                [this.props.game.opponentUid]: snapshot.child('/players/' + this.props.game.opponentUid + '/icon').val()
            }
            //has anyone won?
            const won = snapshot.child('won').val();

            this.setState(
                {
                    yourTurn: yourTurn, 
                    board: board,
                    loading: false,
                    icon: this.state.icon ? this.state.icon : gameIcons,
                    error: yourTurn ? '' : this.state.error,
                    won: won
                }
            )
        }, (error => {
            console.log(error)
            this.setState({error: "Spelplanen kunde inte laddas"})
        }))
    }

    /**
     * squareObj = {x: x, y: y}
     */
    handleClick = (squareObj) =>{
        //storing new board obj in constructor for the moment
        //fetching uid from auth to prevent cheating
        this.newBoard = Object.assign({}, this.state.board, {[squareObj.id]: firebase.auth().currentUser.uid})

        //already clicked square
        if (this.state.board[squareObj.id] || this.state.won) {
            return false;
        } else {
            //not your turn according to state
            if (!this.state.yourTurn) {
                this.setState({error: 'Du måste vänta på din tur!'})
            } else {
                //is game active = clickable?
                this.isActive.once('value', snapshot => {
                    if (!snapshot.val()) {
                        //no...
                        this.setState({error: 'Ett drag i taget!'})
                    }
                    if  (snapshot.val()) {
                        //yes... 
                        //rendering new board to this user before db, to prevent lagging feeling.
                        //MOVE???!
                        this.setState({board: this.newBoard})
                        //then lock game to prevent multiclicking
                        this.isActive.set(false)
                        .then(() => {
                            this.updateGame(squareObj)
                        })
                        .catch(error => console.log(error))
                    }
                }).catch(error => console.log(error));     
            } 
        }
    }

    updateGame = (squareObj) => {
        if (this.iWon(squareObj)) {
            //won -> update & close game
            const winBoard = {}
            winBoard['games/' + this.props.game.gameId + '/board'] = this.newBoard;
            //db rules only allow your own uid as value here
            winBoard['games/' + this.props.game.gameId + '/won'] = this.props.user.uid;
            //db rules only allow this ref to be incremented by 1
            winBoard['users/' + this.props.user.uid + '/points'] = this.props.myPoints + 1; 
            firebase.database().ref()
            .update(winBoard)
            .then(() => {
                this.notifyUserAfterTurn('won', 'lost')
            })
            .catch(error => console.log(error))
        } else {
            //no win -> update & set active, switch turns etc
            const updatedBoard = {};
            updatedBoard['games/' + this.props.game.gameId + '/active'] = true;
            updatedBoard['games/' + this.props.game.gameId + '/board'] = this.newBoard;
            updatedBoard['games/' + this.props.game.gameId + '/players/' + this.props.user.uid + '/turn'] = false;
            updatedBoard['games/' + this.props.game.gameId + '/players/' + this.props.game.opponentUid + '/turn'] = true;
            
            firebase.database().ref()
            .update(updatedBoard)
            .then(()=>{
                this.notifyUserAfterTurn('waiting', 'playing');
            })
            .catch(error => console.log(error));

        }
    }

    notifyUserAfterTurn = (notifyMe, notifyOther) => {
        //notifies users on myPage
        const updatePlayers = {};
        updatePlayers['users/' + this.props.user.uid + '/games/' + this.props.game.gameId + '/status'] = notifyMe;
        updatePlayers['users/' + this.props.game.opponentUid + '/games/' + this.props.game.gameId + '/status'] = notifyOther;

        firebase.database().ref()
        .update(updatePlayers)
        .catch(error => {console.log(error)})
    }

    /**
     * since the calculation for checking steps/directions are similar but with minor differences 
     * i'm passing them to the looper function as anonymous functions
     */
    iWon = (squareObj) =>{
        //check win horizontal
        if (this.checkWinDirections(
                ((i)=>{
                    return 'x' + (squareObj.x + i) + 'y' + squareObj.y; //check right
                }), 
                ((i)=>{
                    return 'x' + (squareObj.x - i) + 'y' + squareObj.y; //check left
                })) ||
            //check win vertical
            this.checkWinDirections(
               ((i) =>{
                   return 'x' + squareObj.x + 'y' + (squareObj.y + i); //check up
               }),
               ((i)=>{
                    return 'x' + squareObj.x + 'y' + (squareObj.y - i); //check down
               })) ||
               //check win diagonal from bottom right
            this.checkWinDirections(
                ((i)=>{
                    return 'x' + (squareObj.x - i) + 'y' + (squareObj.y + i); //left up
                }), 
                ((i)=>{
                    return 'x' + (squareObj.x + i) + 'y' + (squareObj.y - i); //right down
                })) ||
                //check win diagonal bottom left
            this.checkWinDirections(
                ((i)=>{
                    return 'x' + (squareObj.x + i) + 'y' + (squareObj.y + i); //right up
                }), 
                ((i)=>{
                    return 'x' + (squareObj.x - i) + 'y' + (squareObj.y - i); //left down
                })
            )){ 
            //if any of the above... win
            return true;
        } else { 
            //didn't win
            return false
        }
    }

    //looping logic for stepping in different directions
    checkWinDirections = (firstDirection, secondDirection) =>{
        const usersQuare = firebase.auth().currentUser.uid;
        let points = 1; //if this gets up to 5 we win
        for (let i = 1; i <= 4; i++) { //so testing 4 more steps in each direction

            if (this.state.board[firstDirection(i)] === usersQuare){
                points++;
                // console.log(usersQuare + ' first direction hit at ' + firstDirection(i) + ' totalling points ' + points )
            } else break;
        }
        for (let i = 1; i <= 4; i++) {
            if (this.state.board[secondDirection(i)] === usersQuare) {
                points++;
                // console.log(usersQuare + ' second direction hit at ' + secondDirection(i) + ' totalling points ' + points)
            } else break;
        }
        return points > 4;
    }

    render(){
        let rows = [];
            for (let i = 1; i <= boardSize.y; i++){
                rows.push(<Row 
                            icon={this.state.icon}
                            board={this.state.board} 
                            onClick={this.handleClick} 
                            key={'row' + i} 
                            row={i}>
                        </Row>)
            }
        return(
            <div className="flex flex-column align-center">
                <button onClick={this.props.hideGame}>Tillbaka till menyn</button>    
                {this.state.error ? <p style={{color:"red"}}>{this.state.error}</p> : null}
                {this.state.loading ? 
                <p>Laddar...</p> : 
                <div>
                    <BoardInfo
                        won={this.state.won === this.props.user.uid}
                        lost={this.state.won === this.props.game.opponentUid}
                        yourTurn={this.state.yourTurn}
                        user={this.props.user}
                        opponent={{uid: this.props.game.opponentUid, name: this.props.game.opponentName}}
                        icon={this.state.icon}/>
                    {rows}
                </div>
                }
            </div>
        )
    }
}

export default Board;