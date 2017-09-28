import React from 'react';
import PropTypes from 'prop-types';

//components
import { SubmitButton, ErrorMessage, Form, Input } from './../SignIn/SignIn';

//render sinup UI
function SignUp({handleSubmit, handleChange, displayName, email, password, error, disabledSubmit}) {
    return (
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
            <SubmitButton type="submit" disabled={disabledSubmit}>Registrera</SubmitButton>
        </Form>
    );

}

SignUp.propTypes = {
    handleSubmit: PropTypes.func.isRequired, 
    handleChange: PropTypes.func.isRequired, 
    displayName: PropTypes.string, 
    email: PropTypes.string,
    password: PropTypes.string,
    error: PropTypes.string,
    disabledSubmit: PropTypes.bool
};

export default SignUp;