import React from 'react';
import PropTypes from 'prop-types';

//CSS
import './BoardInfo.css';

function BoardInfo({won, lost, icon, opponent, user, yourTurn}) {
    // var ongoing = false;

    function ongoing() {
        if (won) return 'vann';
        if (lost) return 'förlorade';
        return false;
    };

    return (
        <div className="board-info">
            <div className="flex flex-row">
                <div className={`square ${icon[user.uid]}`}></div>
                <span>= Du</span>
                <div className={`square ${icon[opponent.uid]}`}></div>
                <span>= {opponent.name}</span>
            </div>
            {ongoing() ? <p>Du {ongoing()} mot {opponent.name}!</p>  :
            <p>{yourTurn ? 'Din ' : 'Motståndarens '} tur</p>
            }
        </div>
    );
}

BoardInfo.propTypes = {
    won: PropTypes.bool.isRequired,
    lost: PropTypes.bool.isRequired,
    icon: PropTypes.object.isRequired,
    opponent: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    yourTurn: PropTypes.bool.isRequired
};

export default BoardInfo;
