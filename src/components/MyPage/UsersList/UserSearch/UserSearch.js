import React from 'react';
import styled from 'styled-components';

class UserSearch extends React.Component{
    state = {
        search: ''
    }

    handleChange = (e) => {
        this.setState({search: e.target.value})
    }

    render() {
        return (
            <UserSearchContainer>
                <TransparentSearch>
                    <input 
                        type="text" 
                        placeholder="Sök spelare..." 
                        name="search"
                        value={this.state.search}
                        onChange={this.handleChange}/>
                    <i 
                        aria-hidden="true" 
                        className="white search circular link icon"
                        onClick={()=>this.props.handleUsersearch(this.state.search)}>
                    </i>
                </TransparentSearch>
            </UserSearchContainer>
        );
    }
}

const UserSearchContainer = styled.div`
display: flex;
flex-direction: row;
width:100%;
height:65px;
min-height:65px;
padding: 1rem;
background: rgb(188, 82, 82);
`;

const TransparentSearch = styled.div.attrs({
    className: 'ui big transparent input'
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