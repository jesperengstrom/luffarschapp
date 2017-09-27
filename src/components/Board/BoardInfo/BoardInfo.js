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
                        <Td><i aria-hidden="true" className={`huge ${chooseFa(icon[user.uid])} icon`}></i> = Du
                        </Td>
                        <Td><i aria-hidden="true" className={`huge ${chooseFa(icon[opponent.uid])} icon`}></i> = {opponent.name}
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
margin-left:2rem;
padding: 1rem;
`;

const BoardError = ErrorMessage.extend`
p {
    color: white;
    opacity: 1 !important;
    font-size: 16px;
    font-weight: 700;
}
`;

export default BoardInfo;
