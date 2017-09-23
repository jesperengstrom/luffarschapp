import React from 'react';
import PropTypes from 'prop-types';

function GamesList({games, removeGame, acceptGame, showGame, loadingGames}){

    function translateGameStatus(status, name){
        switch(status){
            case 'gotReq':
                return name + ' har utmanat dig';
            case 'sentReq':
                return 'Väntar på att ' + name + ' ska acceptera';
            case 'waiting':
                return name + ' spelar...';
            case 'playing':
                return 'Din tur att spela mot ' + name;
            case 'won':
                return 'Du vann mot ' + name + '!';
            case 'lost':
                return 'Du förlorade mot ' + name;
            default: 
                return 'Oklar status'; 
        }
    }

    function makeGameTable(obj){
        var emptyTable =  <tr><td style={{color: 'lightgrey'}}>Det finns inget här för tillfället</td></tr>;

        return (<div>
                    <h4>{obj.title}</h4>
                    <table>
                        <tbody>
                            {
                                loadingGames ? 
                                <tr><td style={{color: 'lightgrey'}}>Laddar...</td></tr> : 
                                
                                [inner(obj.case1),
                                inner(obj.case2), 
                                emptyTable]
                            }
                        </tbody>
                    </table>
                </div>);

        function inner(innerobj){
            let mapped = games && games.map(game => {
                if (innerobj.condition(game.status)) {
                    emptyTable = null;
                    return <tr key={'games-tr-' + game.gameId}>
                                <td>{translateGameStatus(game.status, game.opponentName)}</td>
                                <td>
                                    {innerobj.button1 && 
                                    <button onClick={() => innerobj.button1.func(game)}>
                                        {innerobj.button1.title}
                                    </button>}
                                    {innerobj.button2 && 
                                    <button onClick={() => innerobj.button2.func(game)}>
                                        {innerobj.button2.title}
                                    </button>}
                                </td>
                            </tr>;
                } return null;
            });
            return mapped;
        }
    }

    //since I have all kinds of game statuses with varying buttons & onclicks and need to sort
    //them into tables, I pass this object into map function for more flexible rendering.
    const gameTableTypes= {
        activeGames: {
            title: 'Aktiva spel',
            case1: {
                condition: (val) => val === 'playing',
                button1: {
                    func: showGame,
                    title: 'Spela'
                },
                button2: false
            },
            case2: {
                condition: (val) => val === 'waiting',
                button1: {
                    func: showGame,
                    title: 'Till spelet'
                },
                button2: false
            }
        },
        invitedGames: {
            title: 'Inbjudningar',
            case1: {
                condition: (val) => val === 'sentReq',
                button1: {
                    func: removeGame, 
                    title: 'Ta bort'
                },
                button2: false
            },
            case2: {
                condition: (val) => val === 'gotReq',
                button1: {
                    func: acceptGame,
                    title: 'Acceptera'
                },
                button2: {
                    func: removeGame, 
                    title: 'Ta bort'
                },
            }
        },
        finishedGames: {
            title: 'Avslutade spel',
            case1: {
                condition: (val) => val === 'won',
                button1: {
                    func: showGame,
                    title: 'Se spelet'
                },
                button2: false
            },
            case2: {
                condition: (val) => val === 'lost',
                button1: {
                    func: showGame,
                    title: 'Se spelet'
                },
                button2: false
            }
        }
    };

    return(        
        <section className="flex flex-column half-width">
            {makeGameTable(gameTableTypes.activeGames)}
            {makeGameTable(gameTableTypes.invitedGames)}
            {makeGameTable(gameTableTypes.finishedGames)}
        </section>
    );
}

GamesList.propTypes = {
    games: PropTypes.array, 
    removeGame: PropTypes.func.isRequired,
    acceptGame: PropTypes.func.isRequired,
    showGame: PropTypes.func.isRequired,
    loadingGames: PropTypes.bool.isRequired
};


export default GamesList;