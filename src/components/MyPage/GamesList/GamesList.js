import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

//components
import GameTable from './GameTable/GameTable';

//Logic for sorting your games into different tables
function GamesList({games, removeGame, acceptGame, showGame, loadingGames}){

    //since I have all kinds of game statuses with varying buttons & onclicks and need to sort
    //them into tables, I pass this object into a higher order component that returns a table.
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
        <GameListWrapper>
            <GameTable 
                obj={gameTableTypes.activeGames} 
                loadingGames={loadingGames} 
                games={games}/>
            <GameTable 
                obj={gameTableTypes.invitedGames} 
                loadingGames={loadingGames} 
                games={games}/>
            <GameTable 
                obj={gameTableTypes.finishedGames} 
                loadingGames={loadingGames} 
                games={games}/>
        </GameListWrapper>
    );
}

GamesList.propTypes = {
    games: PropTypes.array, 
    removeGame: PropTypes.func.isRequired,
    acceptGame: PropTypes.func.isRequired,
    showGame: PropTypes.func.isRequired,
    loadingGames: PropTypes.bool.isRequired
};

//CSS
export const GameListWrapper = styled.div`
width: 100%;
height: 100%;
display: flex;
flex-direction: row;
flex-wrap: wrap;

@media screen and (max-width: 530px) {
    flex-direction: column;
}
`;

export default GamesList;