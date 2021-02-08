import React, { Component } from 'react'
import UserConsumer from '../Context';


var Kucukdevapi = require('kucukdevapi');


class Login extends Component {
    state = {
        formEmail: "",
        formPassword: "",
    }

    changeInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onLoginUser = async (dispatch, e) => {
        e.preventDefault();

        const { formEmail, formPassword } = this.state;

        var api = new Kucukdevapi.DefaultApi()
        var username = formEmail; // {String} 
        var password = formPassword; // {String} 
        var opts = {
            'grantType': "password", // {String} 
        };

        var callback = function (error, data, response) {
            if (error) {
                console.error(error);

            } else {
                console.log('API called successfully. Returned data: ' + data);
                dispatch({ type: "LOGIN_USER", payload: data });

                let defaultClient = Kucukdevapi.ApiClient.instance;
                let OAuth2PasswordBearer = defaultClient.authentications['OAuth2PasswordBearer'];
                OAuth2PasswordBearer.accessToken = data.access_token;

                let apiInstance = new Kucukdevapi.UsersApi();
                apiInstance.getCurrentUser((error, data, response) => {
                    console.log('API called successfully. Returned data: ' + response.body);
                    dispatch({ type: "CURRENT_USER_ID", payload: response.body });
                });


            }
        };
        api.loginForAccessTokenTokenPost(username, password, opts, callback);


        // Redirect
        this.props.history.push("/");

    }

    render() {
        return (
            <UserConsumer>
                {
                    value => {
                        const { dispatch } = value;

                        return (
                            <div className="flex h-full">
                                <div className="flex bg-white shadow-xl rounded flex-col md:w-2/3 sm:w-full mx-auto xl:mt-16 mt-4">
                                    <div className="w-full flex">
                                        <div
                                            className="w-full h-auto bg-gray-400 hidden lg:block lg:w-5/12 bg-cover rounded-l-lg"
                                            style={{ backgroundImage: `url("https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80")` }}>
                                        </div>
                                        <div className="w-full lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none mx-auto">
                                            <h3 className="pt-4 text-2xl text-center">Welcome Back!</h3>
                                            <form onSubmit={this.onLoginUser.bind(this, dispatch)} className="px-8 pt-6 pb-8 mb-4 bg-white rounded">
                                                <div className="mb-4">
                                                    <label className="block mb-2 text-lg font-bold text-gray-700" htmlFor="email">
                                                        Email
                                </label>
                                                    <input
                                                        className="w-full px-3 py-2 mb-3 text-lg leading-medium text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                                        id="formEmail"
                                                        type="email"
                                                        placeholder="Email"
                                                        name="formEmail"
                                                        onChange={this.changeInput}
                                                    />
                                                </div>
                                                <div className="mb-4 md:flex md:justify-between">
                                                    <div className="w-full mb-4 md:mr-2 md:mb-0">
                                                        <label className="block mb-2 text-lg font-bold text-gray-700" htmlFor="password">
                                                            Password
                                    </label>
                                                        <input
                                                            className="w-full px-3 py-2 mb-3 text-lg leading-medium text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                                            id="formPassword"
                                                            type="password"
                                                            placeholder="******************"
                                                            name="formPassword"
                                                            onChange={this.changeInput}
                                                        />
                                                        <p className="text-xs italic text-red-500">Please choose a password.</p>
                                                    </div>
                                                </div>
                                                <div className="mb-6 text-center">
                                                    <button
                                                        className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                                                        type="submit"
                                                    >
                                                        Login Account
                                </button>
                                                </div>
                                                <hr className="mb-6 border-t" />
                                                <div className="text-center my-4">
                                                    <a
                                                        className="inline-block text-lg text-blue-500 align-baseline hover:text-blue-800"
                                                        href="/signup"
                                                    >
                                                        Create an Account!
                                </a>
                                                </div>
                                                <div className="text-center my-4">
                                                    <a
                                                        className="inline-block text-lg text-blue-500 align-baseline hover:text-blue-800"
                                                        href="/reset-password"
                                                    >
                                                        Forgot Password?
                                </a>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div >
                        )
                    }
                }
            </UserConsumer>
        )
    }

}
export default Login;