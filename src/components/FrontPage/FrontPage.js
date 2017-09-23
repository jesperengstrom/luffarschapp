import React from 'react';
import styled from 'styled-components';

//conponents
import SignInContainer from './SignIn/SignInContainer';
import SignUpContainer from './SignUp/SignUpContainer';

function FrontPage({refreshUser, toggleSignup, showSignup}){
    return (
        <Main>
        <Title>LuffarshApp</Title>
        {!showSignup ?
        <span>
            <SignInContainer/>
            <Link onClick={toggleSignup}>Registrera ett konto</Link>
        </span> :
        <SignUpContainer toggleSignup={toggleSignup} refreshUser={refreshUser}/>
        }
        <Github>
            <a href="https://github.com/jesperengstrom/luffarschapp">
                <i aria-hidden="true" className="large github icon"></i>
            </a>
        </Github>
        </Main>
    );
}

//styles

const Main = styled.main`
width: 100%;
height:100%;
display:flex;
flex-direction: column;
justify-content:center;
align-items:center;
background: linear-gradient(20deg,rgb(212, 89, 89),rgba(218, 163, 87, 0.73));
a, 
a:visited,
a:hover {
    color:black;
}
`;

const Title = styled.h1`
font-size:48px;
margin-bottom:2rem;
color: rgb(255, 255, 255);
`; 

const Github = styled.div`
position:absolute;
bottom: 0;
margin-bottom:1rem;
`; 

const Link = styled.a`
cursor:pointer;
`; 

export default FrontPage;