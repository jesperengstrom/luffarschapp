import React from 'react';
import PropTypes from 'prop-types';

function UsersList({user, users, challengePlayer, games}){

    function aldreadyHasGame(user){
        let res = false;
        games && games.forEach(game =>{
            if (game.opponentName === user) res = true;
        });
        return res;
    };

    return(
        <section className="flex flex-column half-width">
            <h4>Inloggade spelare</h4>
            <table>
                <thead>
                    <tr>
                        <th>Namn</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
            {users && 
            Object.keys(users)
            //sorting online first
            .sort((a, b) =>{
                return (users[a].online === users[b].online)? 0 : a? 1 : -1;
            })
            .map(key=>{
                //don't return myself
                return (users[key].uid === user.uid) ? 
                '' :
                <tr key={'user-tr-' + key}>
                    <td>{users[key].displayName}</td>
                    <td>{users[key].online ? '(Online)' : ''}</td>
                    <td>
                        {aldreadyHasGame(users[key].displayName) === false && 
                        <button 
                            onClick={()=>challengePlayer(users[key])}>Utmana
                        </button>}
                    </td>
                </tr>;
            })}
                </tbody>
            </table>
        </section>
    );
}

UsersList.propTypes = {
    user: PropTypes.object.isRequired,
    users: PropTypes.object, 
    challengePlayer: PropTypes.func.isRequired, 
    games: PropTypes.array
};

export default UsersList;