import React from 'react';

function GamesList({games, removeGame}){

    function translateGameStatus(status){
        switch(status){
            case 'gotRequest':
                return 'Spelaren har utmanat dig';
            case 'sentRequest':
                return 'Väntar på att motståndaren ska acceptera';
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
                {games && Object.keys(games).map(key=>{
                    return <tr key={'games-tr-' + key}>
                                <td>{games[key].opponentName}</td>
                                <td>{translateGameStatus(games[key].myStatus)}</td>
                                <td>
                                    {
                                        games[key].myStatus === 'gotRequest' &&
                                        <button>Acceptera</button>
                                    }
                                    {
                                        games[key].myStatus === 'gotRequest' || 'sentRequest' ?
                                        <button 
                                        onClick={()=>removeGame(key, games[key].opponentUid)}>Ta bort
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


export default GamesList;