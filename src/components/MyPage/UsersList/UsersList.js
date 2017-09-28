import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

//components
import UserSearch from './UserSearch/UserSearch';
import User from './User/User';

class UsersList extends React.Component{

    state = {
        search: ''
    }

    aldreadyHasGame = (user) => {
        let res = false;
        this.props.games && this.props.games.forEach(game =>{
            //you can challenge a player if they're not an active opponent
            if (game.opponentName === user && (game.status !== 'won' && game.status !== 'lost')) res = true;
        });
        return res;
    };

    sortOnline = () => {
        let sorted = this.props.users && Object.keys(this.props.users)
        .sort((a, b) =>{ //sorting online first
            return (this.props.users[a].online === this.props.users[b].online)? 0 : a? 1 : -1;
        })
        return sorted;
    }

    handleSearch = (e) => {
        this.setState({search: e.target.value})

    } 

    filterSearch = (sorted) => {
        return sorted.filter((key)=>{
            return this.props.users[key].displayName.toLowerCase().startsWith(this.state.search.toLowerCase())
        })
    }

    render() {
        return(
            <UserSidebar>
                <UserSearch 
                    search={this.state.search}
                    handleSearch={this.handleSearch}/>
                <Users>
                    {this.props.loadingUsers ? 
                    <Loading>
                        <div className="ui active large inverted inline text loader">Laddar användare...</div>
                    </Loading> :
                    <div className="ui celled inverted relaxed list" role="list">
                        {this.filterSearch(this.sortOnline())
                        .map(key=>{
                            //don't return myself
                            return (this.props.users[key].uid === this.props.user.uid) ? 
                            null :
                            <User
                                key={'user-tr-' + key}
                                displayName={this.props.users[key].displayName}
                                points={this.props.users[key].points}
                                online={this.props.users[key].online}
                                hasGame={this.aldreadyHasGame(this.props.users[key].displayName)}
                                challengePlayer={this.props.challengePlayer}
                                opponent={this.props.users[key]}/>;
                        })}
                    </div>}
                </Users>
            </UserSidebar>
        );
    }
}

UsersList.propTypes = {
    user: PropTypes.object.isRequired,
    users: PropTypes.object, 
    challengePlayer: PropTypes.func.isRequired, 
    games: PropTypes.array,
    loadingUsers: PropTypes.bool.isRequired,
};

//CSS

const UserSidebar = styled.section`
height:100%;
width: 300px;
display:flex;
flex-direction:column;
position: absolute;
top: 0;
left: 0;
bottom: 0;
`;

const Users = styled.div`
width:100%;
flex:1;
padding: 2rem 1rem;
background: #404040;
box-shadow: inset -1px 0px 14px 0px rgba(0, 0, 0, 0.27);
`;

export const Loading = styled.div`
width: 100%;
height: 100%;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
p {
    color:white;
    font-size:16px
}
.ui.large.loader {
    font-size:16px;
}
`;

export default UsersList;