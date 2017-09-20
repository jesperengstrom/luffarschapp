import React from 'react';
import PropTypes from 'prop-types';

//CSS
import './Square.css';

function Square({board, onClick, squareObj}) {
    //if the prop exists it's value is a color --> applying that class
    let squareColor = board[squareObj.id] ? 
        board[squareObj.id]  : 
        '';

    return (
        <div 
            className={`square ${squareColor}`} 
            id={squareObj.id}
            onClick={()=>onClick(squareObj)}>
        </div>
    );
}

Square.propTypes = {
    board: PropTypes.object,
    onClick: PropTypes.func.isRequired,
    squareObj: PropTypes.object.isRequired
};

export default Square;