import React from 'react';

//CSS
import './styles.css';

function Square(props) {
    //if the prop exists it's value is a color --> applying that class
    let squareColor = props.currentBoard[props.squareObj.id] ? 
        props.currentBoard[props.squareObj.id]  : 
        "";

    return (
        <div 
            className={`square ${squareColor}`} 
            id={props.squareObj.id}
            onClick={()=>props.onClick(props.squareObj)}>
        </div>
    )
}

export default Square;