import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

function BottomBar({user, myPoints, signOut, showToplist, toggleMenu, menuVisible}){
    return (
        <BottomBarContainer>
            <ToggleMenuBtn onClick={toggleMenu}>
                <i aria-hidden="true" className="icon resize horizontal"></i>
            </ToggleMenuBtn>
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
        </BottomBarContainer>
    );

}

BottomBar.propTypes = {
    user: PropTypes.object,
    myPoints: PropTypes.any, 
    signOut: PropTypes.func.isRequired,
    showToplist: PropTypes.func.isRequired, 
    toggleMenu: PropTypes.func.isRequired,
    menuVisible: PropTypes.bool
};

export default BottomBar;

//CSS
const BottomBarContainer = styled.section`
position: fixed;
bottom: 0;
left: 0;
min-height: 63px;
max-height: 63px;
width: 100%;
background: rgb(255, 142, 86);
display: flex;
flex-direction: row;
justify-content: flex-end;
align-items: center;
flex-wrap: wrap-reverse;
padding: 1rem 2rem;
p {
    font-size:20px;
}

@media (max-width: 500px) {
    max-height: unset;
}
`;

const ToggleMenuBtn = styled.button.attrs({
    className: 'ui small inverted icon button'
})`
&&&{
    margin-right: auto;
    font-size:16px !important;
    white-space: nowrap;
    display: flex;

    @media screen and (min-width: 850px) {
        display: none;
    }
}`;

const UserBadge = styled.div.attrs({
    className: 'ui large green horizontal label'
})`
&&&&{    
    display: flex;
    align-items: center;
    font-size: 16px;
    white-space: nowrap;
    i {
        margin-right: 7px !important;
    }

    @media screen and (max-width: 500px) {
            display: none !important;
    
    }
}
`;

const PointsBadge = styled.div.attrs({
    className: 'ui large blue horizontal label'
})`
&&&&{
    display: flex;
    align-items: center;
    font-size:16px;
    i {
        margin-right: 5px !important;
    }

    @media screen and (max-width: 320px) {
        display: none;
    }
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

    @media screen and (max-width: 350px) {
        padding-left: 10px;
        padding-right: 10px;
    }
}
`;