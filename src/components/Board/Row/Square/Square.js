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
height: 3vw;
width: 3vw;
display: flex;
justify-content: center;
align-items: center;
margin: 0 1% 1% 0;
background-color: white;
box-shadow: -2px 2px 0px 0px rgb(235, 228, 168);
i {
    font-size: 3vw !important;
    margin: 0 !important;
}
i:before {
        vertical-align: -webkit-baseline-middle !important;
        vertical-align: text-bottom !important;
}

`;


export default Square;