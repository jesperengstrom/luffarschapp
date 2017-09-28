import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

function Square({board, handleClick, squareObj, icon, chooseFa}) {
    //props 'icons' are uids and board[square] values are uids. 
    //sent to chooseFa function that retorns an icon classname
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

//CSS

const OneSquare = styled.div`
height: 3.5vw;
width: 3.5vw;
display: flex;
justify-content: center;
align-items: center;
margin: 0 1% 1% 0;
background-color: white;
border: 1px solid #f3eba7;
i {
    font-size: 3.5vw !important;
    margin: 0 !important;
}
i:before {
        vertical-align: -webkit-baseline-middle !important;
        vertical-align: text-bottom !important;
}

@media screen and (max-width: 840px) {
    height: 4.5vw;
    width: 4.5vw;
    i {
        font-size: 4.5vw !important;
    }
} 

@media screen and (max-width: 600px) {
    height: 6.5vw;
    width: 6.5vw;
    i {
        font-size: 6.5vw !important;
    }
} 
`;

export default Square;