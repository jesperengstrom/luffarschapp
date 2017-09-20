import React from 'react';
import firebase from 'firebase';

//components
import Row from './Row/Row';

//CSS
import './Board.css' 

//vars
export const boardSize = {x: 10, y:10};


//class
class Board extends React.Component{
    constructor(props) {
        super(props)
        this.isActive = firebase.database().ref('games/' + this.props.game.gameId + '/active');
    }
    
    state = {
        yourTurn: null,
        loading: true,
        board: {}, 
        turn: 'blue',
        error: ''
    };

    componentDidMount(){
        this.fetchGame()
    }

    fetchGame = () => {
        firebase.database().ref('games/' + this.props.game.gameId)
        .on('value', snapshot => {
            //double check user turn
            let yourTurn = snapshot.child('/players/' + this.props.user.uid).val();
            //check if we have a board
            let board = snapshot.child('board').exists() ? snapshot.child('board').val() : {};
            this.setState(
                {
                    yourTurn: yourTurn, 
                    board: board,
                    loading: false
                })
        }, (error => {
            console.log(error)
            this.setState({error: "Spelplanen kunde inte laddas"})
        }))
    }

    /**
     * squareObj = {x: x, y: y}
     */
    handleClick = (squareObj) =>{ 
        //already clicked square
        if (this.state.board[squareObj.id]) {
            return false;
        } else {
            //not your turn according to state
            if (!this.state.yourTurn) {
                this.setState({error: 'Du måste vänta på din tur!'})
            } else {
                //game is active = clickable
                this.isActive.once('value', snapshot => {
                    if (!snapshot.val()) {
                        this.setState({error: 'Ett drag i taget!'})
                    }
                    if  (snapshot.val()) {
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
        //new board obj, fetching uid from auth to prevent cheating
        let newBoard = Object.assign({}, this.state.board, {[squareObj.id]: firebase.auth().currentUser.uid})

        if (this.iWon(squareObj)) {
            //won -> update & wrap up game

        } else {
            //no win -> update & switch turns
            const updateBoard = {};
            updateBoard['games/' + this.props.game.gameId + '/board'] = newBoard;
            updateBoard['games/' + this.props.game.gameId + '/players/' + this.props.user.uid] = false;
            updateBoard['games/' + this.props.game.gameId + '/players/' + this.props.game.opponentUid] = true;
            updateBoard['games/' + this.props.game.gameId + '/active'] = true;

            firebase.database().ref()
            .update(updateBoard)
            .then(()=>{
                //notify users on myPage
                const updatePlayers = {};
                updatePlayers['users/' + this.props.user.uid + '/games/' + this.props.game.gameId + '/status'] = 'waiting';
                updatePlayers['users/' + this.props.game.opponentUid + '/games/' + this.props.game.gameId + '/status'] = 'playing';

                firebase.database().ref()
                .update(updatePlayers)
                .catch(error => {console.log(error)})
            })
            .catch(error => console.log(error));

        }
    }

            // //updating board state
            // this.setState({board: boardUpdate}, ()=>this.checkWon(squareObj)) //check if we won


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
            //didn't win, switching turn
            return false
        }
    }

    //looping logic for stepping in different directions
    checkWinDirections = (firstDirection, secondDirection) =>{
        let points = 1; //if this gets up to 5 we win
        for (let i = 1; i <= 4; i++) { //so testing 4 more steps in each direction

            if (this.state.board[firstDirection(i)] === this.state.turn){
                points++;
                console.log(this.state.turn + ' first direction hit at ' + firstDirection(i) + ' totalling points ' + points )
            } else break;
        }
        for (let i = 1; i <= 4; i++) {
            if (this.state.board[secondDirection(i)] === this.state.turn) {
                points++;
                console.log(this.state.turn +  'second direction hit at ' + secondDirection(i) + ' totalling points ' + points)
            } else break;
        }
        return points > 4;
    }


    render(){
        let turn = <p>Du spelar mot {this.props.game.opponentName}.  
            {this.state.yourTurn && 
            this.state.yourTurn ? 
            ' Din tur att spela.' : 
            this.props.game.opponentName + 's tur att spela.'}</p>

        let rows = [];
            for (let i = 1; i <= boardSize.y; i++){
                rows.push(<Row 
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
                {turn}
                {this.state.loading ? 'Laddar...' : rows}
            </div>
        )
    }
}


export default Board;