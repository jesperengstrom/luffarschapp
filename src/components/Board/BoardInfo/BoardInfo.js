import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Table, Td } from './../../MyPage/GamesList/GameTable/GameTable';

//CSS
import './BoardInfo.css';

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

const BoardInfoContainer = styled.aside`
display: flex;
flex-direction: column;
margin-left:2rem;
padding: 1rem;
`;


export default BoardInfo;
