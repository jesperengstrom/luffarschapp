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
    
    state = {
        yourTurn: true,
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
        //already clicked
        if (this.state.board[squareObj.id]) {
            return false;
        } else {
            //object copy + overwriting w new values
            let boardUpdate = Object.assign({}, this.state.board, {[squareObj.id]: this.state.turn})
            //updating board state
            this.setState({board: boardUpdate}, ()=>this.checkWon(squareObj)) //check if we won
        }
    }

    /**
     * since the calculation for checking steps/directions are similar but with minor differences 
     * i'm passing them to the looper function as anonymous functions
     */
    checkWon = (squareObj) =>{
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
            alert(this.state.turn + ' vann!')
            this.setState({board: {}, turn: 'blue'});
        } else { 
            //didn't win, switching turn
            this.setState({turn: this.state.turn === 'blue' ? 'red' : 'blue'})
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
        let turn = <p>{this.state.yourTurn ? 
            'Din tur att spela' : 
            this.props.game.opponentName + 's tur att spela'}</p>

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
                {this.state.error ? this.state.error : null}
                {turn}
                {this.state.loading ? 'Laddar...' : rows}
            </div>
        )
    }
}


export default Board;