import React from 'react';
import styled from 'styled-components';

function GameTable({obj, games, loadingGames}){

    var emptyTable =  <tr key='emptyTable'><Td grey>Det finns inget här för tillfället</Td></tr>;

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

    function icon(title){
        switch(title){
            case 'Aktiva spel':
            return 'green game';
            case 'Inbjudningar':
            return 'blue mail';
            case 'Avslutade spel':
            return 'red check';
            default: 
            return 'game';
        }
    }

    function color(status) {
        console.log(status);
        switch (status) {
            case 'gotReq':
            case 'playing':
            case 'won':
            return 'green';
            case 'sentReq':
            case 'waiting':
            case 'lost':
            return 'red'; 
            default:
            return '';
        }
    }

    function tableBody (innerobj) {
        let mapped = games && games.map(game => {
            if (innerobj.condition(game.status)) {
                emptyTable = null;
                return <tr key={'games-tr-' + game.gameId}>
                            <Td>{translateGameStatus(game.status, game.opponentName)}</Td>
                            <Td className='right aligned"'>
                                {innerobj.button1 && 
                                <button className={'ui compact button ' + color(game.status)} onClick={() => innerobj.button1.func(game)}>
                                    {innerobj.button1.title}
                                </button>}
                                {innerobj.button2 && 
                                <button className={'ui compact button ' + color(game.status)} onClick={() => innerobj.button2.func(game)}>
                                    {innerobj.button2.title}
                                </button>}
                            </Td>
                        </tr>;
            } return null;
        });
        return mapped;
    }

    return (
    <GameTableWrapper>
        <TableHeader>
            <i aria-hidden="true" style={{marginRight: '1rem'}} className={'large icon ' + icon(obj.title)}></i>
            {obj.title}
        </TableHeader>
        <Table>
            <tbody>
                {loadingGames ? 
                <tr>
                    <Td grey >Laddar...</Td>
                </tr> : 
                [tableBody(obj.case1),
                tableBody(obj.case2), 
                emptyTable]}
            </tbody>
        </Table>
    </GameTableWrapper>
    );
}

const GameTableWrapper = styled.div`
display: flex;
flex-direction: column;
margin-bottom: 2rem;
`;

export const TableHeader = styled.h3`
font-size: 20px;
padding-bottom: 1rem;
border-bottom: 1px solid rgba(0, 0, 0, 0.21);
`;

const Table = styled.table.attrs({
    className: 'ui basic single line table'
})`
`;

const Td = styled.td`
font-size: 16px;
font-weight: 700;
color: ${props => props.grey ? 'rgba(0, 0, 0, 0.33);' : 'black'}
`;

export default GameTable;