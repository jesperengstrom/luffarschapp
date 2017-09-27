import React from 'react';
import styled from 'styled-components';

//sign in ui
function SignIn({email, password, handleSubmit, signInWithGoogle, handleChange, error, disabledSubmit}) {
    return(
    <Form onSubmit={handleSubmit}>
        <Input>
            <i aria-hidden="true" className="at icon"></i>
            <input 
                type="email" 
                name="email" 
                onChange={handleChange}
                value={email} 
                placeholder="E-post" 
                required />
        </Input>
        <Input>
            <i aria-hidden="true" className="lock icon"></i>
            <input 
                type="password" 
                name="password" 
                onChange={handleChange}
                value={password} 
                placeholder="Lösenord"
                required/>
        </Input>
        {error && 
        <ErrorMessage><p>{error}</p></ErrorMessage>}
        <SubmitButton type="submit" disabled={disabledSubmit}>Logga in</SubmitButton>
        <SubmitButton type="button" disabled={disabledSubmit} onClick={signInWithGoogle}>
            <i aria-hidden="true" className="google icon"></i>
            Logga in med Google</SubmitButton>
    </Form>
    );
}

//CSS for signin & signup

export const Form = styled.form.attrs({
    className: 'ui form'
})`
display: flex;
flex-direction: column;
`;

export const SubmitButton = styled.button.attrs({
    className: 'ui huge inverted button',
})`
&&& {
    margin: 0 0 1rem 0;
}`;

export const Input = styled.div.attrs({
    className: 'ui left icon huge input'
})`
margin-bottom: 1rem;
`;

export const ErrorMessage = styled.div.attrs({
    className: 'ui error message'
})`
&&&&& {
    display:flex !important;
    background-color: rgb(219, 40, 40);
    font-size:16px;
    margin: 0 0 1rem 0;
}

`;

export default SignIn;