import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

//components
import UserSearch from './UserSearch/UserSearch';
import User from './User/User';

function UsersList({user, users, challengePlayer, games, loadingUsers, handleUsersearch}){

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
            <User
                key={'user-tr-' + key}
                displayName={users[key].displayName}
                points={users[key].points}
                online={users[key].online}
                hasGame={aldreadyHasGame(users[key].displayName)}
                challengePlayer={challengePlayer}
                opponent={users[key]}/>;
            // <tr key={'user-tr-' + key}>
            //     <td>{users[key].displayName}</td>
            //     <td>({users[key].points + ' poäng)'}</td>
            //     <td>{users[key].online ? '(Online)' : null}</td>
            //     <td>{aldreadyHasGame(users[key].displayName) === false ? 
            //         <button onClick={() => challengePlayer(users[key])}>Utmana</button> :
            //         null}
            //     </td>
            // </tr>;
        });
        return sorted;
    }

    return(
        <UserSidebar>
            <UserSearch handleUsersearch={handleUsersearch}/>
            <Users>
                {loadingUsers ? 
                <Loading>
                            <div className="ui active large inverted inline text loader">Laddar användare...</div>
                </Loading> :
                <div className="ui celled inverted relaxed list" role="list">
                    {sortPlayers()}
                </div>}
            </Users>
        </UserSidebar>
    );
}

UsersList.propTypes = {
    user: PropTypes.object.isRequired,
    users: PropTypes.object, 
    challengePlayer: PropTypes.func.isRequired, 
    games: PropTypes.array,
    loadingUsers: PropTypes.bool.isRequired,
    handleUsersearch: PropTypes.func.isRequired
};

//CSS

const UserSidebar = styled.section`
height:100%;
width: 300px;
display:flex;
flex-direction:column;
`;

const Users = styled.div`
width:100%;
flex:1;
padding: 2rem 1rem;
background: #404040;
box-shadow: inset -1px 0px 14px 0px rgba(0, 0, 0, 0.27);
`;

const Loading = styled.div`
width: 100%;
height: 100%;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
p {
    color:white;
    font-size:16px
}
.ui.large.loader {
    font-weight:700;
}
`;

export default UsersList;