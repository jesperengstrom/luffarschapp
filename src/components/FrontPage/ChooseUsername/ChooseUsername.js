import React from 'react';
import { Form, Input, ErrorMessage, SubmitButton } from '../SignIn/SignIn';

function ChooseUsername({handleChange, displayName, submitUsername, error, disabledSubmit}) {
    return (
        <Form onSubmit={submitUsername}>
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
        {error && 
            <ErrorMessage><p>{error}</p></ErrorMessage>}
            <SubmitButton type="submit" disabled={disabledSubmit}>Välj ett användarnamn</SubmitButton>
    </Form>
    );
}

export default ChooseUsername;