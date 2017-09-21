import React from 'react';
import PropTypes from 'prop-types';

function GamesList({games, removeGame, acceptGame, showGame}){

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
            case 'won':
                return 'Du vann matchen!';
            case 'lost':
                return 'Du förlorade matchen';
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
                                        <button onClick={() => acceptGame(game)}>Acceptera</button>
                                    }
                                    {
                                        (game.status === 'gotReq' || game.status === 'sentReq') ?
                                        <button 
                                        onClick={() => removeGame(game.gameId, game.opponentUid)}>Ta bort
                                        </button> : ''
                                    }
                                    {
                                        game.status === 'playing' || game.status === 'waiting' ?
                                        <button onClick={() => showGame(game)}>
                                            {game.status === 'playing' ? 'Spela' : 'Till spelet'}
                                        </button> : ''
                                    }
                                    {
                                        (game.status === 'won' || game.status === 'lost') &&
                                        <button onClick={() => showGame(game)}>Se spelet</button>
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
    acceptGame: PropTypes.func.isRequired,
    showGame: PropTypes.func.isRequired
};


export default GamesList;