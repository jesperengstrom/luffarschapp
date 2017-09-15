import React from 'react';

//components
import Row from './Row';

//CSS
import './styles.css' 

//vars
export const boardSize = {x: 10, y:10};

//class
class Board extends React.Component{
    state = {currentBoard: {}};

    /**
     * squareObj = {x: x, y: y}
     */
    handleClick = (squareObj) =>{ 
        //already clicked
        if (this.state.currentBoard[squareObj.id]) {
            alert(squareObj.id + ' already taken!')
        } else {
            //object copy + overwriting w new values
            let newBoardState = Object.assign({}, this.state.currentBoard, {[squareObj.id]: true})
            //setting state as clicked + callback ANONYMOUS so we can send params
            this.setState({currentBoard: newBoardState}, ()=>this.checkWon(squareObj))
        }
    }

    /**
     * since the calculation for checking directions are similar but with minor differences i'm passing
     * them to the looper function as anonymous functions
     */
    checkWon = (squareObj) =>{
        let won = false;
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
            won = true;
        }
        if (won) {alert('you won!')}
    }

    //looping function for trying out my directions
    checkWinDirections = (firstDirection, secondDirection) =>{
        let points = 1; //if this gets up to 5 we win
        for (let i = 1; i <= 4; i++) { //so testing 4 more steps in each direction
            if (this.state.currentBoard[firstDirection(i)]){
                points++;
            } else break;
        }
        for (let i = 1; i <= 4; i++) {
            if (this.state.currentBoard[secondDirection(i)]) {
                points++;
            } else break;
        }
        return points > 4;
    }


    render(){
        let rows = [];
            for (let i = 1; i <= boardSize.y; i++){
                rows.push(<Row 
                            boardState={this.state.currentBoard} 
                            onClick={this.handleClick} 
                            key={'row' + i} 
                            row={i}>
                        </Row>)
            }
        return(
            <div className="board flex">
                {rows}
            </div>
        )
    }
}


export default Board;