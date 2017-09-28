import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Table, Td } from './../../MyPage/GamesList/GameTable/GameTable';
import { ErrorMessage } from './../../FrontPage/SignIn/SignIn';


function BoardInfo({won, lost, icon, opponent, user, yourTurn, chooseFa, error}) {

    function ongoing() {
        if (won) return 'vann';
        if (lost) return 'förlorade';
        return false;
    };

    return (
        <BoardInfoContainer>
            <Table className="structured">
                <tbody>
                    <tr>
                        <Td>
                            <ExampleSquare>
                            <i aria-hidden="true" className={`${chooseFa(icon[user.uid])} icon`}></i>
                            </ExampleSquare> = Du
                        </Td>
                        <Td>            
                            <ExampleSquare>
                            <i aria-hidden="true" className={`${chooseFa(icon[opponent.uid])} icon`}></i>
                            </ExampleSquare> = {opponent.name}
                        </Td>
                    </tr>
                    <tr>
                        <Td colSpan="2">
                            {ongoing() ? `Du ${ongoing()} mot ${opponent.name}!` : 
                            yourTurn ? 'Din tur' : 'Motståndarens tur'}
                        </Td>
                    </tr>
                </tbody>
            </Table>
            {error && 
            <BoardError>
                <p>{error}</p>
            </BoardError>}

        </BoardInfoContainer>
    );
}

BoardInfo.propTypes = {
    won: PropTypes.bool.isRequired,
    lost: PropTypes.bool.isRequired,
    icon: PropTypes.object.isRequired,
    opponent: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    yourTurn: PropTypes.bool.isRequired,
    chooseFa: PropTypes.func.isRequired,
    error: PropTypes.string,
};

//CSS

const BoardInfoContainer = styled.aside`
display: flex;
flex-direction: column;
margin-left: 3.5vw;

@media (max-width: 1000px) {
    margin-left: 0;
}
`;

const BoardError = ErrorMessage.extend`
p {
    color: white;
    opacity: 1 !important;
    font-size: 16px;
    font-weight: 700;
}
`;

const ExampleSquare = styled.div`
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

export default BoardInfo;
