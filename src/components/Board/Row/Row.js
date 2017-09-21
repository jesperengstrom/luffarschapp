import React from 'react';
import PropTypes from 'prop-types';

//components
import Square from './Square/Square';

//CSS
import './Row.css';

//vars
import { boardSize } from '../Board';

function Row({board, row, onClick, icon}){
    let squares = [];
    
    for (let i = 1; i <= boardSize.x; i++) {
        let squareObj = {
                        x: i, 
                        y: row, 
                        id: 'x' + i + 'y' + row
                        };

        squares.push(<Square 
                        onClick={onClick} 
                        key={squareObj.id} 
                        squareObj={squareObj}
                        board={board}
                        icon={icon}>
                    </Square>);
    }

    return (
        <div id={'row-' + row} className="flex flex-row">
            {squares}
        </div>
    );
}

Row.propTypes = {
    onClick: PropTypes.func.isRequired,
    row: PropTypes.number.isRequired,
    board: PropTypes.object,
    icon: PropTypes.any.isRequired
};

export default Row;