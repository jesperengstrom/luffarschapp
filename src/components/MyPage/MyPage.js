import React from 'react';

//modules
import Board from './../Board/Board';

class MyPage extends React.Component{
    render(){
        return (
            <div className="flex flex-column full-width">
                <p>My page</p>
                <Board>
                </Board>
            </div>
        )
    }
}

export default MyPage;