import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

//components
import Square from './Square/Square';

//vars
import { boardSize } from '../Board';

function Row({board, row, handleClick, icon, chooseFa}){
    let squares = [];
    
    for (let i = 1; i <= boardSize.x; i++) {
        let squareObj = {
                        x: i, 
                        y: row, 
                        id: 'x' + i + 'y' + row
                        };

        squares.push(<Square 
                        handleClick={handleClick} 
                        key={squareObj.id} 
                        squareObj={squareObj}
                        board={board}
                        icon={icon}
                        chooseFa={chooseFa}>
                    </Square>);
    }

    return (
        <OneRow id={'row-' + row}>
            {squares}
        </OneRow>
    );
}

Row.propTypes = {
    handleClick: PropTypes.func.isRequired,
    row: PropTypes.number.isRequired,
    board: PropTypes.object,
    icon: PropTypes.any.isRequired,
    chooseFa: PropTypes.func.isRequired
};

const OneRow = styled.div`
display: flex;
flex-direction: row;
justify-content: flex-start;
`;

export default Row;