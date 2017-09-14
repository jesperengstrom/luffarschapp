import React from 'react';

//CSS
import './styles.css';

function Square(props) {
    let status = props.boardState[props.squareId] ? "checked" : "";
    return (
        <div 
            className={`square ${status}`} 
            id={'square-' + props.squareId}
            onClick={()=>props.onClick(props.squareId)}>
        </div>
    )
}

export default Square;