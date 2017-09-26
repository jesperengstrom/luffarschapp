import React from 'react';
import styled from 'styled-components';

function UserSearch(props){
    return (
        <UserSearchContainer>
            <TransparentSearch>
            <i aria-hidden="true" className="white search icon">
                </i>
                <input 
                    type="text" 
                    placeholder="Sök spelare..." 
                    name="search"
                    value={props.search}
                    onChange={props.handleSearch}/>
            </TransparentSearch>
        </UserSearchContainer>
    );
}

const UserSearchContainer = styled.div`
display: flex;
flex-direction: row;
width:100%;
height:65px;
min-height:65px;
padding: 1rem;
background: rgb(49, 97, 133);
`;

const TransparentSearch = styled.div.attrs({
    className: 'ui big transparent left icon input'
})`&&&&{
    input {
        font-size: 16px;
        font-weight: bold;
        color: white;
        ::-webkit-input-placeholder {
            color: white;
        }
        :-moz-placeholder {
            color: white;
        }
        ::-moz-placeholder {
            color: white;
        }
        :-ms-input-placeholder {
            color: white;
        }
    }
    i.white.icon {
        color: #ffffff!important;
}
`;

export default UserSearch;