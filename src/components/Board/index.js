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
            //new obj w object assign
            let newBoardState = Object.assign({}, this.state.currentBoard, {[squareObj.id]: true})
            //setting state as clicked + callback ANONYMOUS so we can send params
            this.setState({currentBoard: newBoardState}, ()=>this.checkWon(squareObj))
        }
    }

    checkWon = (squareObj) =>{
        let won = false;
        if (this.wonHorizontal(squareObj)){
            console.log('testing hor')
            won = true;
        }
        else if (this.wonVertical(squareObj)){
            won = true;
        }
        else if (this.wonDiagonalBottomLeft(squareObj)){
            won = true;
        }
        else if (this.wonDiagonalBottomRight(squareObj)){
            won = true;
        }
        if (won) {alert('you won!')}
    }

    wonHorizontal(squareObj){
        let points = 1; //if this gets up to 5 we win
        for (let i = 1; i <= 4; i++) { //so testing 4 more in each direction
            if (this.state.currentBoard['x' + (squareObj.x + i) + 'y' + squareObj.y]){
                points++;
            } else break;
        }
        for (let i = 1; i <= 4; i++) {
            if (this.state.currentBoard['x' + (squareObj.x - i) + 'y' + squareObj.y]) {
                points++;
            } else break;
        }
        console.log('hor', points)
        return points > 4;
    }

    wonVertical(squareObj) {
        let points = 1;
        for (let i = 1; i <= 4; i++) {
            // console.log('testing', 'x' + squareObj.x + 'y' + (squareObj.y + i))
            // console.log('is present?', this.state.currentBoard['x' + squareObj.x + 'y' + (squareObj.y + i)])
            // console.log(this.state.currentBoard)
            if (this.state.currentBoard['x' + squareObj.x + 'y' + (squareObj.y + i)]) {
                points++;
            } else break;
        }
        for (let i = 1; i <= 5; i++) {
            if (this.state.currentBoard['x' + squareObj.x + 'y' + (squareObj.y - i)]) {
                points++;
            } else break;
        }
        console.log('ver', points);
        return points > 4;
    }

    wonDiagonalBottomLeft(sq){
        return false;
    }

    wonDiagonalBottomRight(sq){
        return false;
    }

    
    checkSquare = (squareObj, won)=> {

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