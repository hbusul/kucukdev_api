import React, { Component } from 'react'

const UserContext = React.createContext();

const reducer = (state, action) => {
    console.log(action.type)
    switch (action.type) {
        case "LOGIN_USER":
            return {
                userToken: action.payload.access_token,
                isLogin: true
            }
        case "CURRENT_USER_ID":
            return {
                userID: action.payload.id,
                userEmail: action.payload.email
            }
        case "LOGOUT_USER":
            return {
                userToken: "",
                userID: "",
                userEmail: "",
                isLogin: false,
                isSemestersFound: false

            }
        default:
            return state

    }
}

export class UserProvider extends Component {
    state = {
        userToken: "",
        userID: "",
        userEmail: "",
        isLogin: false,
        isSemestersFound: false,
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