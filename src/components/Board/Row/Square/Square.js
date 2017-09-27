import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

//CSS
import './Square.css';

function Square({board, onClick, squareObj, icon}) {
    //icons props are uids and board[square] values are uids. 
    //icon values are classes -> which are applied when a square is taken
    let squareIcon = icon[board[squareObj.id]] ? 
        icon[board[squareObj.id]] : 
        '';

    return (
        <OneSquare 
            id={squareObj.id}
            onClick={()=>onClick(squareObj)}>
            <i aria-hidden="true" className="home icon"></i>
        </OneSquare>
    );
}

Square.propTypes = {
    board: PropTypes.object,
    onClick: PropTypes.func.isRequired,
    squareObj: PropTypes.object.isRequired,
    icon: PropTypes.any.isRequired
};

const OneSquare = styled.div`
width:100%;
height:100%;
flex:1;
`;


export default Square;