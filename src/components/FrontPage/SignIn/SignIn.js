import React from 'react';
import styled from 'styled-components';

//sign in ui
function SignIn({email, password, handleSubmit, handleChange, error}) {
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
        {error && <p style={{color:'red'}}>{error}</p>}
        <SubmitButton 
            type="submit" 
            value="Logga in">Logga in
        </SubmitButton>
    </Form>
    );
}

const Form = styled.form.attrs({
    className: 'ui form'
})`
display: flex;
flex-direction: column;
`;


const SubmitButton = styled.button.attrs({
    className: 'ui huge inverted button',
})`
&&& {margin-bottom: 1rem;
}`;

const Input = styled.div.attrs({
    className: 'ui left icon huge input'
})`
margin-bottom: 1rem;
`;


export default SignIn;