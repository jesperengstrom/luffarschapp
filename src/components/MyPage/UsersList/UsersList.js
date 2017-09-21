import React from 'react';
import PropTypes from 'prop-types';

function UsersList({user, users, challengePlayer, games, loadingUsers}){

    function aldreadyHasGame(user){
        let res = false;
        games && games.forEach(game =>{
            //you can challenge a player if they're not an active opponent
            if (game.opponentName === user && (game.status !== 'won' && game.status !== 'lost')) res = true;
        });
        return res;
    };

    return(
        <section className="flex flex-column half-width">
            <h4>Inloggade spelare</h4>
            <table>
                <tbody>
                    
                {loadingUsers ? <tr><td stye={{color: 'lightgrey'}}>Laddar...</td></tr> :
                
                users && Object.keys(users)
                .sort((a, b) =>{ //sorting online first
                    return (users[a].online === users[b].online)? 0 : a? 1 : -1;
                })
                .map(key=>{
                    //don't return myself
                    return (users[key].uid === user.uid) ? 
                    '' :
                    <tr key={'user-tr-' + key}>
                        <td>{users[key].displayName}</td>
                        <td>{users[key].online ? '(Online)' : ''}</td>
                        <td>{aldreadyHasGame(users[key].displayName) === false && 
                            <button onClick={()=>challengePlayer(users[key])}>Utmana
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
    games: PropTypes.array,
    loadingUsers: PropTypes.bool.isRequired
};

export default UsersList;