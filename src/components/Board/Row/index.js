import React from 'react';

//components
import Square from './Square';

//vars
import { boardSize } from '../index';

function Row(props){
    let squares = [];
    let startNumber = props.row * boardSize.x;
    
    for (let i = 1; i <= boardSize.x; i++) {
        let squareNo = startNumber + i;
        squares.push(<Square 
                        onClick={props.onClick} 
                        key={'square-' + squareNo} 
                        squareId={squareNo}
                        boardState={props.boardState}>
                    </Square>
                    )
    }

    return (
        <div id={'row-' + props.row} className="flex board-row">
            {squares}
        </div>
    )
}

export default Row;