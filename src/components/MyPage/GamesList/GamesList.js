import React from 'react';
import PropTypes from 'prop-types';

function GamesList({games, removeGame, acceptGame}){

    function translateGameStatus(status){
        switch(status){
            case 'gotReq':
                return 'Spelaren har utmanat dig';
            case 'sentReq':
                return 'Väntar på att motståndaren ska acceptera';
            case 'waiting':
                return 'motståndaren spelar...';
            case 'playing':
                return 'Din tur att spela';
            default: 
                return 'Oklar status'; 
        }
    }

    return(
        <section className="flex flex-column half-width">
            <h4>Dina spel</h4>
            <table>
                <thead>
                    <tr>
                        <th>Motståndare</th>
                        <th>Status</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                {games && games.map(game => {
                    return <tr key={'games-tr-' + game.gameId}>
                                <td>{game.opponentName}</td>
                                <td>{translateGameStatus(game.status)}</td>
                                <td>
                                    {
                                        game.status === 'gotReq' &&
                                        <button onClick={()=>acceptGame(game)}>Acceptera</button>
                                    }
                                    {
                                        game.status === 'gotReq' || 'sentReq' ?
                                        <button 
                                        onClick={()=>removeGame(game.gameId, game.opponentUid)}>Ta bort
                                        </button> : ''
                                    }
                                </td>
                            </tr>;
                })}
                </tbody>
            </table>
        </section>
    );
}

GamesList.propTypes = {
    games: PropTypes.array, 
    removeGame: PropTypes.func.isRequired,
    acceptGame: PropTypes.func.isRequired
};


export default GamesList;