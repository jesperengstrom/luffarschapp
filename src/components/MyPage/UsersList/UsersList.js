import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

function UsersList({user, users, challengePlayer, games, loadingUsers}){

    function aldreadyHasGame(user){
        let res = false;
        games && games.forEach(game =>{
            //you can challenge a player if they're not an active opponent
            if (game.opponentName === user && (game.status !== 'won' && game.status !== 'lost')) res = true;
        });
        return res;
    };

    function sortPlayers(){
        let sorted = users && Object.keys(users)
        .sort((a, b) =>{ //sorting online first
            return (users[a].online === users[b].online)? 0 : a? 1 : -1;
        })
        .map(key=>{
            //don't return myself
            return (users[key].uid === user.uid) ? 
            null :
            <tr key={'user-tr-' + key}>
                <td>{users[key].displayName}</td>
                <td>({users[key].points + ' poäng)'}</td>
                <td>{users[key].online ? '(Online)' : null}</td>
                <td>{aldreadyHasGame(users[key].displayName) === false ? 
                    <button onClick={() => challengePlayer(users[key])}>Utmana</button> :
                    null}
                </td>
            </tr>;
        });
        return sorted;
    }

    return(
        <UserSidebar>
            <h4>Spelare</h4>
            <table>
                <tbody>
                {loadingUsers ? 
                <tr><td style={{color: 'lightgrey'}}>Laddar...</td></tr> :
                sortPlayers()}
                </tbody>
            </table>
        </UserSidebar>
    );
}

UsersList.propTypes = {
    user: PropTypes.object.isRequired,
    users: PropTypes.object, 
    challengePlayer: PropTypes.func.isRequired, 
    games: PropTypes.array,
    loadingUsers: PropTypes.bool.isRequired
};

//CSS

const UserSidebar = styled.section`
height:100%;
width: 250px;
background: #404040;
display:flex;
flex-direction:column;
box-shadow: inset -1px 0px 14px 0px rgba(0, 0, 0, 0.27);
h4, table {
    color:white;
}
`;

export default UsersList;