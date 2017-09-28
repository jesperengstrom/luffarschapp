import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

function TopBar({user, myPoints, signOut, showToplist, toggleMenu}){
    return (
        <TopBarContainer>
            <button style={{marginRight: 'auto'}} onClick={toggleMenu} className="ui button">Toggle Visibility</button>
            <nav>
                <UserBadge>
                    <i aria-hidden="true" className="large user icon"></i>
                    <span>{user.displayName }</span>
                </UserBadge>
            </nav>
            <nav>
                <PointsBadge>
                    <i aria-hidden="true" className="large yellow star icon"></i>
                    <span>{ myPoints !== null ? myPoints : '-' }</span>
                </PointsBadge>
            </nav>
            <nav>
                <ToplistBadge
                    title="Visa topplistan"
                    onClick={showToplist}>
                    <i aria-hidden="true" className="large yellow trophy icon"></i>
                </ToplistBadge>
            </nav>
            <nav>
                <LogoutBtn onClick={signOut}>Logga ut</LogoutBtn>
            </nav>
        </TopBarContainer>
    );

}

TopBar.propTypes = {
    user: PropTypes.object,
    myPoints: PropTypes.any, 
    signOut: PropTypes.func.isRequired,
    showToplist: PropTypes.func.isRequired, 
    toggleMenu: PropTypes.func.isRequired
};

export default TopBar;

//CSS
const TopBarContainer = styled.section`
height: 65px;
min-height: 65px;
width: 100%;
background: rgb(255, 142, 86);
display: flex;
flex-direction: row;
justify-content: flex-end;
align-items: center;
padding: 1rem 2rem;
p {
    font-size:20px;
}
`;

const UserBadge = styled.div.attrs({
    className: 'ui large green horizontal label'
})`
&&&&{
    display: flex;
    align-items: center;
    font-size:16px;
}
`;

const PointsBadge = styled.div.attrs({
    className: 'ui large blue horizontal label'
})`
&&&&{
    display: flex;
    align-items: center;
    font-size:16px;
}
`;

const ToplistBadge = styled.a.attrs({
    className: 'ui large horizontal label'
})`
&&&& {
    font-size:16px;
    background-color: #404040!important;
    i {
    margin:0 !important;
    }
}
`;

const LogoutBtn = styled.button.attrs({
   className: 'ui small inverted button' 
})`
&&&{
    font-size:16px !important;
    white-space: nowrap;
}
`;