import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

//Components
import { UserListPoints } from './../UsersList/User/User';

import { PageHeader } from './../GamesList/GameTable/GameTable';

//renders the highscore list
function Toplist ({user, users, closeToplist}){

    function renderToplist(){
        return users && Object.keys(users).sort((a, b)=>{
            return users[b].points - users[a].points;
        })
        .map((key)=>{
            let match = users[key].uid === user.uid;
            return <Li me={match && true} key={'toplist-item-' + users[key].uid}>
                        <ToplistName>{users[key].displayName}</ToplistName>
                        <UserListPoints>
                            <i aria-hidden="true" className="yellow star icon"></i>
                            {users[key].points}
                        </UserListPoints>
                    </Li>;
        });
    }

    return (
        <ToplistContainer>
            <PageHeader>
                <i aria-hidden="true" className="large yellow trophy icon"></i>
                Topprankade spelare
                <Close onClick={closeToplist}/>
            </PageHeader>
            <Ol>
                {renderToplist()}
            </Ol>
        </ToplistContainer>
    );
}

Toplist.propTypes = {
    user: PropTypes.object,
    users: PropTypes.object,
    closeToplist: PropTypes.func.isRequired
};


//CSS

export const Close = styled.i.attrs({
    className: 'large icon close',
})`&&&&{
    vertical-align: top;
    float:right;
    cursor: pointer;

}`;

const ToplistContainer = styled.section`
width: 100%;
display: flex;
flex-direction: column;
`;

const Ol = styled.ol.attrs({
    className: 'ui divided relaxed list',
    role: 'list'
})`
width: 30%;
`;

const Li = styled.li.attrs({
    role: 'listitem'
})`
&&&{
    font-size: 15px;
    font-weight: 700;
    margin-bottom: 1rem;
    color: ${props => props.me ? '#2185D0' : 'black' };
    display: flex;
    margin-left: 2rem;
}`;

const ToplistName = styled.span`
margin-right: 1rem;
`;

export default Toplist;

