import React from 'react';

//CSS
import './styles.css';

function Square(props) {
    let status = props.boardState[props.squareObj.id] ? "checked" : "";
    return (
        <div 
            className={`square ${status}`} 
            id={props.squareObj.id}
            onClick={()=>props.onClick(props.squareObj)}>
        </div>
    )
}

export default Square;