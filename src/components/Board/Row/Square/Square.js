import React from 'react';
import PropTypes from 'prop-types';

//CSS
import './Square.css';

function Square({board, onClick, squareObj, icon}) {
    //icons props are uids and board[square] values are uids. 
    //icon values are classes -> which are applied when a square is taken
    let squareIcon = icon[board[squareObj.id]] ? 
        icon[board[squareObj.id]] : 
        '';

    return (
        <div 
            className={`square ${squareIcon}`} 
            id={squareObj.id}
            onClick={()=>onClick(squareObj)}>
        </div>
    );
}

Square.propTypes = {
    board: PropTypes.object,
    onClick: PropTypes.func.isRequired,
    squareObj: PropTypes.object.isRequired,
    icon: PropTypes.object.isRequired
};

export default Square;