import React from 'react';
import firebase from './../../../firebase';

class GamesList extends React.Component{
    state = {games: ''};

    componentDidMount(){
        firebase.database().ref('users/' + this.props.user.uid + '/games/')
        .on('value', snapshot=>{
            this.setState({games: snapshot.val()})
        })
    }

    componentWillUnmount(){
        firebase.database().ref('users/' + this.props.user.uid + '/games/').off();
    }

    translateGameStatus(status){
        switch(status){
            case 'gotRequest':
                return 'Spelaren har utmanat dig';
            case 'sentRequest':
                return 'Väntar på att motståndaren ska acceptera';
            default: 
                return "Oklar status"; 
        }
    }

    render(){
        return(
            <section className="flex flex-column half-width">
                <h4>Dina spel</h4>
                <table>
                    <thead>
                        <tr>
                            <th>Motståndare</th>
                            <th>Status</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.games && Object.keys(this.state.games).map(key=>{
                            return <tr key={'games-tr-' + key}>
                                        <td>{this.state.games[key].opponentName}</td>
                                        <td>{this.translateGameStatus(this.state.games[key].myStatus)}</td>
                                        <td>{this.state.games[key].myStatus === 'gotRequest' &&
                                            <div key={'btns' + key}>
                                                <button key={'btn' + key}>Acceptera</button>
                                                <button>Tacka nej</button>
                                            </div>
                                            }
                                        </td>
                                    </tr>
                            })
                        }
                    </tbody>
                </table>
            </section>
        );
    }

}

export default GamesList;