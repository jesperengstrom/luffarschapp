import React from 'react';

//components
import Square from './Square';

//vars
import { boardSize } from '../index';

function Row(props){
    let squares = [];
    
    for (let i = 1; i <= boardSize.x; i++) {
        let squareObj = {
                        x: i, 
                        y: props.row, 
                        id: 'x' + i + 'y' + props.row
                        }

        squares.push(<Square 
                        onClick={props.onClick} 
                        key={squareObj.id} 
                        squareObj={squareObj}
                        currentBoard={props.currentBoard}>
                    </Square>)
    }

    return (
        <div id={'row-' + props.row} className="flex board-row">
            {squares}
        </div>
    )
}

export default Row;