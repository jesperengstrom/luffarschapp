import React from 'react';
import styled from 'styled-components';

//components
import { SubmitButton, ErrorMessage, Form, Input } from './../SignIn/SignIn';

//render sinup UI
function SignUp({handleSubmit, handleChange, displayName, email, password, error, disabledSubmit, toggleSignup }) {
    return (
        <Form onSubmit={handleSubmit}>
            <Input>
                <i aria-hidden="true" className="user icon"></i>
                <input
                    type="text"
                    name="displayName"
                    onChange={handleChange}
                    value={displayName}
                    placeholder="Användarnamn"
                    maxLength="25"
                    required />
            </Input>
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
                <i aria-hidden="true" className="at icon"></i>
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
            <SubmitButton type="submit" disabled={disabledSubmit}>Registrera</SubmitButton>
        </Form>
    );

}

export default SignUp;