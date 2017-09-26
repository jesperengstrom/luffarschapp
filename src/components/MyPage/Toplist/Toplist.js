import React from 'react';
import PropTypes from 'prop-types';

//Components

import { GameListWrapper } from './../GamesList/GamesList';

//CSS
import './Toplist.css';

function Toplist ({user, users}){

    function renderToplist(){
        return Object.keys(users).sort((a, b)=>{
            return (users[a].points === users[b].points)? 0 : a? 1 : -1;
        })
        .map((key)=>{
            let match = users[key].uid === user.uid;
            return <li className={match && 'bold'} key={'toplist-item-' + users[key].uid}>
                    {users[key].displayName + ' (' + users[key].points + ' poäng)'}
                    </li>;
        });
    }

    return (
        <GameListWrapper>
            <h4>Topplistan</h4>
            <ol>
                {renderToplist()}
            </ol>
        </GameListWrapper>
    );


}

Toplist.propTypes = {
    user: PropTypes.object,
    users: PropTypes.object
};

export default Toplist;

