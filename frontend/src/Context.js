import React, { Component } from 'react'

const UserContext = React.createContext();

const reducer = (state, action) => {
    console.log(action.type);

    switch (action.type) {
        case "LOGIN_USER":
            return {
                userToken: action.payload.access_token
            }
        case "UPDATE_USER":
            return {
                ...state,
                users: state.users.map(user => user.id === action.payload.id ? action.payload : user)
            }
        default:
            return state

    }
}

export class UserProvider extends Component {
    state = {
        userToken: "",
        dispatch: action => {
            this.setState(state => reducer(state, action))
        }
    }
    render() {
        return (
            <UserContext.Provider value={this.state}>
                {this.props.children}
            </UserContext.Provider>
        )
    }
}

const UserConsumer = UserContext.Consumer;

export default UserConsumer;