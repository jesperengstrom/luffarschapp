import React from 'react';
import PropTypes from 'prop-types';

//CSS
import './BoardInfo.css';

function BoardInfo(props) {
    // var ongoing = false;

    function ongoing() {
        if (props.won) return 'vann';
        if (props.lost) return 'förlorade';
        return false;
    };

    return (
        <div className="board-info">
            <div className="flex flex-row">
                <div className={`square ${props.icon[props.user.uid]}`}></div>
                <span>= Du</span>
                <div className={`square ${props.icon[props.opponent.uid]}`}></div>
                <span>= {props.opponent.name}</span>
            </div>
            {ongoing() ? <p>Du {ongoing()} mot {props.opponent.name}!</p>  :
            <p>{props.yourTurn ? 'Din ' : 'Motståndarens '} tur</p>
            }
        </div>
    );
}

BoardInfo.propTypes = {};
export default BoardInfo;
