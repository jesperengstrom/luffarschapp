import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

//components
import Square from './Square/Square';

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
        <OneRow id={'row-' + row}>
            {squares}
        </OneRow>
    );
}

Row.propTypes = {
    onClick: PropTypes.func.isRequired,
    row: PropTypes.number.isRequired,
    board: PropTypes.object,
    icon: PropTypes.any.isRequired
};

const OneRow = styled.div`
flex: 1;
display: flex;
flex-direction: row;
width:100%;
height:100%;
`;


export default Row;