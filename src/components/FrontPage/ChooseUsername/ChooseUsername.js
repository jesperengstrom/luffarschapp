import React from 'react';
import PropTypes from 'prop-types';

import { Form, Input, ErrorMessage, SubmitButton } from '../SignIn/SignIn';
import { FrontpageText } from '../FrontPage';

function ChooseUsername({handleChange, displayName, submitUsername, error, disabledSubmit}) {
    return (
        <Form onSubmit={submitUsername}>
            <FrontpageText>Välj ett användarnamn</FrontpageText>
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
            <SubmitButton type="submit" disabled={disabledSubmit}>Välj</SubmitButton>
    </Form>
    );
}

ChooseUsername.propTypes = {
    handleChange: PropTypes.func.isRequired,
    displayName: PropTypes.string,
    submitUsername: PropTypes.func.isRequired,
    error: PropTypes.string,
    disabledSubmit: PropTypes.bool.isRequired
};

export default ChooseUsername;