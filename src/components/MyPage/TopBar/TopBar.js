import React from 'react';
import styled from 'styled-components';

function TopBar({user, myPoints, signOut, showToplist }){
    return (
        <TopBarContainer>
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
                <LogoutBtn onClick={signOut}>
                    Logga ut
                </LogoutBtn>
            </nav>
        </TopBarContainer>
    );

}

export default TopBar;

//CSS
const TopBarContainer = styled.section`
background: rgb(255, 142, 86);
display: flex;
flex-direction: row;
justify-content: flex-end;
align-items: center;
width: 100%;
padding: 1rem 2rem;
margin-bottom: 2rem;
p {
    font-size:20px;
}
`;

const UserBadge = styled.div.attrs({
    className: 'ui large blue horizontal label'
})`
`;

const PointsBadge = styled.div.attrs({
    className: 'ui large green horizontal label'
})`
`;

const ToplistBadge = styled.a.attrs({
    className: 'ui large violet horizontal label'
})`
i {
    margin:0 !important;
}
`;

const LogoutBtn = styled.button.attrs({
   className: 'ui small inverted button' 
})`
font-size:14px !important;
`;