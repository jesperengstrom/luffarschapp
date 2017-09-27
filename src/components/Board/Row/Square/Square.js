import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

//CSS

function Square({board, handleClick, squareObj, icon, chooseFa}) {
    //icons props are uids and board[square] values are uids. 
    //icon values are classes -> which are applied when a square is taken
    let squareIcon = icon[board[squareObj.id]] ? 
        icon[board[squareObj.id]] : 
        '';

    return (
        <OneSquare 
            id={squareObj.id}
            onClick={()=>handleClick(squareObj)}>
            <i aria-hidden="true" className={`${chooseFa(squareIcon)} icon`}></i>
        </OneSquare>
    );
}

Square.propTypes = {
    board: PropTypes.object,
    handleClick: PropTypes.func.isRequired,
    squareObj: PropTypes.object.isRequired,
    icon: PropTypes.any.isRequired,
    chooseFa: PropTypes.func.isRequired
};

const OneSquare = styled.div`
flex: 1;
display: flex;
justify-content: center;
align-items: center;
width: 100%;
height: 100%;
padding:1%;
border: 1px solid #404040;
`;


export default Square;