import React from 'react';

//components
import Square from './Square/Square';

//CSS
import './Row.css';

//vars
import { boardSize } from '../Board';

function Row(props){
    let squares = [];
    
    for (let i = 1; i <= boardSize.x; i++) {
        let squareObj = {
                        x: i, 
                        y: props.row, 
                        id: 'x' + i + 'y' + props.row
                        };

        squares.push(<Square 
                        onClick={props.onClick} 
                        key={squareObj.id} 
                        squareObj={squareObj}
                        board={props.board}>
                    </Square>)
    }

    return (
        <div id={'row-' + props.row} className="flex flex-row">
            {squares}
        </div>
    )
}

export default Row;