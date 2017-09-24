import React from 'react';
import styled from 'styled-components';

//conponents
import SignInContainer from './SignIn/SignInContainer';
import SignUpContainer from './SignUp/SignUpContainer';

function FrontPage({refreshUser, toggleSignup, showSignup}){
    return (
        <Main>
        <FormContainer>
            <Title>LuffarshApp</Title>
            {!showSignup ?
            <span>
                <SignInContainer/>
                <FrontpageLink>
                    <a onClick={toggleSignup}>
                        Skapa ett konto 
                        <i aria-hidden="true" style={{verticalAlign:'middle'}} className="chevron right icon"></i>
                    </a>
                </FrontpageLink>
            </span> :
            <span>
                <SignUpContainer toggleSignup={toggleSignup} refreshUser={refreshUser}/>
                <FrontpageLink>
                    <a onClick={toggleSignup}>
                        <i aria-hidden="true" style={{verticalAlign:'middle'}} className="chevron left icon"></i>
                        Avbryt
                    </a>
                </FrontpageLink>
            </span>
            }
        </FormContainer>
        <Github>
            <a href="https://github.com/jesperengstrom/luffarschapp">
                <i aria-hidden="true" className="large github icon"></i>
            </a>
        </Github>
        </Main>
    );
}

//styles

//general styles for main page
const Main = styled.main`
width: 100%;
height:100%;
display:flex;
flex-direction: column;
justify-content:flex-start;
align-items:center;
background: linear-gradient(20deg,rgb(212, 89, 89),rgba(218, 163, 87, 0.73));
a,
p, 
a:visited,
a:hover {
    color:white;
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
width: 300px
`;

const Title = styled.h1`
font-size: 48px;
margin-top: 20% !important;
margin-bottom: 2rem;
color: rgb(255, 255, 255);
`; 

const FrontpageLink = styled.div`
display: flex;
justify-content: center;
cursor: pointer;
font-size: 20px;
margin: 1rem 0;
`; 

const Github = FrontpageLink.extend`
position: absolute;
bottom: 0;
a:hover {
    text-decoration:none;
}
`; 

export default FrontPage;