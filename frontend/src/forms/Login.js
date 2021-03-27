import { useState, useEffect, useContext } from 'react'
import { Link } from "react-router-dom";
import { UserContext } from '../Context';

var Kucukdevapi = require('kucukdevapi');

const Login = (props) => {
    const [, setLogin] = useContext(UserContext);

    const [formEmail, setEmail] = useState("")
    const [formPassword, setPassword] = useState("")
    const [validationError, setValidationError] = useState(false)
    const [isNewRegister, setIsNewRegister] = useState(false)

    useEffect(() => {
        if (props.location.isNewRegister) {
            setIsNewRegister(true)
        }
    }, [props.location.isNewRegister])

    const onLoginUser = async (e) => {
        e.preventDefault();

        var api = new Kucukdevapi.DefaultApi()
        var username = formEmail;
        var password = formPassword;
        var opts = {
            'grantType': "password",
        };

        var callback = function (error, data, response) {
            if (error) {
                console.error(error);
                if (error.response.status === 401) {
                    setValidationError(true)
                }
            } else {
                const token = data.access_token;

                let defaultClient = Kucukdevapi.ApiClient.instance;
                let OAuth2PasswordBearer = defaultClient.authentications['OAuth2PasswordBearer'];
                OAuth2PasswordBearer.accessToken = data.access_token;

                let apiInstance = new Kucukdevapi.UsersApi();
                apiInstance.getCurrentUser((error, data, response) => {
                    if (error) {
                        console.error(error);
                    } else {
                        console.log('API called successfully. Returned data: ' + response.body);
                        setLogin({ userToken: token, userID: data._id, semesterID: data.curSemesterID, universityID: data.curUniversityID })
                        props.history.push("/")
                    }
                });
            }
        };
        api.loginForAccessTokenTokenPost(username, password, opts, callback);
    }

    return (

        <div className="flex h-full">
            <div className="flex bg-white shadow-xl rounded flex-col md:w-2/3 sm:w-full mx-auto xl:mt-12 mt-4">
                <div className="w-full flex">
                    <div
                        className="w-full h-auto bg-gray-400 hidden lg:block lg:w-5/12 bg-cover rounded-l-lg"
                        style={{ backgroundImage: `url("https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80")` }}>
                    </div>
                    <div className="w-full lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none mx-auto">
                        <h3 className="pt-4 text-2xl text-center">Welcome Back!</h3>
                        <form onSubmit={onLoginUser.bind(this)} className="px-8 pt-6 pb-8 mb-4 bg-white rounded">
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
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
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
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                    <p className="text-xs italic text-red-500">Please choose a password.</p>
                                </div>
                            </div>
                            {
                                validationError &&
                                <div className="bg-red-100 border-t border-b border-red-500 text-red-700 px-4 py-3 mb-4 flex flex-row" role="alert">
                                    <p className="flex-1 font-bold">Email or password is incorrect!</p>
                                    <button onClick={() => setValidationError(false)}>X</button>
                                </div>
                            }
                            {
                                isNewRegister &&
                                <div className="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3 mb-4 flex flex-row" role="alert">
                                    <p className="flex-1 font-bold">Account created successfully!</p>
                                    <button onClick={() => setIsNewRegister(false)}>X</button>
                                </div>
                            }
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
                                <Link
                                    to="/signup"
                                    className="inline-block text-lg text-blue-500 align-baseline hover:text-blue-800"
                                >
                                    Create an Account!
                            </Link>
                            </div>
                            <div className="text-center my-4">
                                <Link
                                    to="/reset-password"
                                    className="inline-block text-lg text-blue-500 align-baseline hover:text-blue-800"
                                >
                                    Forgot Password?
                            </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div >

    )
}

export default Login