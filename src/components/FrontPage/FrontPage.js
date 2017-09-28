import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Loading } from '../MyPage/UsersList/UsersList';

//conponents
import SignInContainer from './SignIn/SignInContainer';
import SignUpContainer from './SignUp/SignUpContainer';
import ChooseUsernameContainer from './ChooseUsername/ChooseUsernameContainer';

//displaying loading, login, signup, choose username depending on state
function FrontPage({user, showSignup, hideSignup, signup, chooseUsername, showChooseUsername, checkRealtimeDb}){
    return (
        <FrontPageMain>
            {user === undefined ? 
            <FormContainer>
                <Title>Luffarsch<span style={{color: 'rgba(255, 255, 255, 0.41)'}}>app</span></Title>
                <FrontpageLoader>
                    <div className="ui active large inline text loader"></div>
                </FrontpageLoader>
            </FormContainer> : 
            <FormContainer>
                <Title>Luffarsch<span style={{color: 'rgba(255, 255, 255, 0.41)'}}>app</span></Title>
                {chooseUsername ? 
                    <ChooseUsernameContainer checkRealtimeDb={checkRealtimeDb} /> : 
                !signup ?
                <span>
                    <SignInContainer/>
                    <FrontpageLink>
                        <a onClick={showSignup}>
                            Skapa ett konto 
                            <i aria-hidden="true" style={{verticalAlign:'middle'}} className="chevron right icon"></i>
                        </a>
                    </FrontpageLink>
                </span> :
                <span>
                    <SignUpContainer showChooseUsername={showChooseUsername}/>
                    <FrontpageLink>
                        <a onClick={hideSignup}>
                            <i aria-hidden="true" style={{verticalAlign:'middle'}} className="chevron left icon"></i>
                            Avbryt
                        </a>
                    </FrontpageLink>
                </span>
                }
            </FormContainer>
            }
            <Github>
                <a href="https://github.com/jesperengstrom/luffarschapp">
                    <i aria-hidden="true" className="large github icon"></i>
                </a>
            </Github>
        </FrontPageMain>
    );
}

FrontPage.propTypes = {
    user: PropTypes.any,
    showSignup: PropTypes.func.isRequired,
    hideSignup: PropTypes.func.isRequired,
    signup: PropTypes.bool,
    chooseUsername: PropTypes.bool.isRequired, 
    showChooseUsername: PropTypes.func.isRequired, 
    checkRealtimeDb: PropTypes.func.isRequired, 
};

//CSS

const FrontPageMain = styled.main`
width: 100%;
height: 100%;
display:flex;
flex-direction: column;
justify-content: flex-start;
align-items: center;
background: rgb(212, 89, 89);
a,
p, 
a:visited,
a:hover {
    color: white;
    font-weight: 700;
}
a:hover {
    transform: scale(1.1);
}
`;

const FormContainer = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
width: 300px;
`;

const Title = styled.h1`
font-family: 'Bungee Hairline', cursive;
font-size: 48px;
margin-top: 30% !important;
margin-bottom: 3rem;
color: rgb(255, 255, 255);
@media screen and (max-width:400px) {
    font-size: 36px;
}


`; 

const FrontpageLink = styled.div`
display: flex;
justify-content: center;
cursor: pointer;
font-size: 20px;
margin: 1rem 0;
`; 

export const FrontpageText = styled.div`
display: flex;
justify-content: center;
font-size: 20px;
margin: 1rem 0;
color: white; 
`;

const Github = FrontpageLink.extend`
position: absolute;
bottom: 0;
a:hover {
    text-decoration: none;
}
`; 

const FrontpageLoader = Loading.extend`
margin-top: 25%;
.ui.loader:after {
    border-color: rgba(255, 255, 255, 0.74) transparent transparent
}
`;

export default FrontPage;