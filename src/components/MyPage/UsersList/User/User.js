import React from 'react';
import styled from 'styled-components';

//renders a single user in user list
function User({displayName, points, online, hasGame, challengePlayer, opponent}){
    return(
        <ListItem>
            <OnlineDot online={online} title={online ? 'Spelaren är online' : 'Spelaren är offline'}/>
            <UserName>{displayName}</UserName>
            <UserListPoints title="Spelarens poäng">
                <i aria-hidden="true" className="yellow star icon"></i>
                {points}
            </UserListPoints>
            {!hasGame ? 
            <ChallengeBtn onClick={() => challengePlayer(opponent)}>
                <i aria-hidden="true" className="arrow right icon"></i>
                Utmana 
            </ChallengeBtn> :
            <ChallengeBtn style={{visibility:'hidden'}} onClick={() => alert('this button is hidden!')}>
                <i aria-hidden="true" className="arrow right icon"></i>
                Utmana 
            </ChallengeBtn>
            }
        </ListItem>
    );
}

export default User;

//CSS

const ListItem = styled.div.attrs({
    className: 'item',
    role: 'listitem'
})`
&&&& {
    min-height: 35px !important;
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    }
`;

const OnlineDot = styled.div.attrs({
    className: 'ui horizontal circular empty label middle aligned content'
})`
background-color: ${props => props.online ? '#21BA45' : '#DB2828' } !important;
margin-right: 1rem !important;
`; 

const UserName = styled.span.attrs({
    className: 'middle aligned content'
})`
margin-right:1rem;
color: white;
font-size: 16px;
font-weight: 700;
`;

export const UserListPoints = styled.div.attrs({
    className: 'ui blue horizontal label'
})` &&&& {
    background-color: rgb(49,97,133)!important;
    display: flex;
    font-size: 12px;
    margin-left: auto !important;
    i {
        margin-right: 3px;
    }
}`;

const ChallengeBtn = styled.a.attrs({
    className: 'ui red horizontal label'
})` 
&&& {
    display: flex;
}
`;