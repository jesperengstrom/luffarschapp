import React from 'react';

//components
import Row from './Row';

//CSS
import './styles.css' 

//vars
export const boardSize = {x: 10, y:10};
let winningArr = [];

//class
class Board extends React.Component{
    state = {currentBoard: {}};

    handleClick = (square) =>{
        if (this.state.currentBoard[square]) {
            alert(square + ' already taken!')
        } else {
            this.checkWon(square, this.checkSquare)
        }
    }

    checkWon = (sq, callback) =>{
        if (this.wonHorizontal(sq)){
            callback(sq, true);
        }
        else if (this.wonVertical(sq)){
            callback(sq, true);
        }
        else if (this.wonDiagonalBottomLeft(sq)){
            callback(sq, true);
        }
        else if (this.wonDiagonalBottomRight(sq)){
            callback(sq, true);
        }
        else callback(sq, false);
    }

    wonHorizontal(sq){
        // let points = 0;
        // for (let i = 1; i < 5; i++) {
        //     console.log(sq + i);
        //     if (this.state.currentBoard[sq + i]){
        //         points++;
        //         winningArr.push(sq + i)
        //     } else break;
        // }
        // for (let i = 1; i < 5; i++) {
        //     if (this.state.currentBoard[sq - i]) {
        //         points++;
        //         winningArr.push(sq - i)
        //     } else break;
        // }
        // return points >= 4;
        return false;
    }

    wonVertical(sq) {
        return false;
    }

    wonDiagonalBottomLeft(sq){
        return false;
    }

    wonDiagonalBottomRight(sq){
        return false;
    }

    
    checkSquare = (square, won)=> {
        let newBoardState = Object.assign({}, this.state.currentBoard, {[square]: true})
        this.setState({currentBoard: newBoardState}, function(){
            if (won){
                console.log(winningArr);
                alert('yay you won')
            } else return;
        })
    }

    render(){
        let rows = [];
            for (let i = 0; i < boardSize.y; i++){
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