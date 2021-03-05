import { useState } from 'react'
import { Link } from "react-router-dom";


var Kucukdevapi = require('kucukdevapi');

const Register = ({ history }) => {
    const [validationError, setValidationError] = useState(false)
    const [conflictError, setConflictError] = useState(false)
    const [formEmail, setEmail] = useState("")
    const [formPassword, setPassword] = useState("")
    const [formValidatePassword, setValidatePassword] = useState("")

    const onRegisterUser = async (e) => {
        e.preventDefault();

        if (formPassword === formValidatePassword) {
            let apiInstance = new Kucukdevapi.UsersApi();
            let userModel = new Kucukdevapi.UserModel(formEmail, formPassword);
            apiInstance.createUser(userModel, (error, data, response) => {
                if (error) {
                    console.error(error);
                    if (error.response.status === 409) {
                        setConflictError(true)
                    }
                } else {
                    console.log('API called successfully. Returned data: ' + data);
                    history.push({
                        pathname: "/signin",
                        isNewRegister: true
                    })
                }
            });
        } else {
            setValidationError(true)
        }

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
                        <h3 className="pt-4 text-2xl text-center">Create an Account!</h3>
                        <form onSubmit={onRegisterUser.bind(this)} className="px-8 pt-6 pb-8 mb-4 bg-white rounded">
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
                                <div className="md:w-1/2 mb-4 md:mr-2 md:mb-0 sm:w-full">
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
                                <div className="md:w-1/2  md:ml-2 sm:w-full">
                                    <label className="block mb-2 text-lg font-bold text-gray-700" htmlFor="c_password">
                                        Confirm Password
                                </label>
                                    <input
                                        className="w-full px-3 py-2 mb-3 text-lg leading-medium text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                        id="formValidatePassword"
                                        type="password"
                                        placeholder="******************"
                                        name="formValidatePassword"
                                        onChange={(e) => setValidatePassword(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            {
                                validationError &&
                                <div className="bg-red-100 border-t border-b border-red-500 text-red-700 px-4 py-3 mb-4 flex flex-row" role="alert">
                                    <p className="flex-1 font-bold">Passwords do not match!</p>
                                    <button onClick={() => setValidationError(false)}>X</button>
                                </div>
                            }
                            {
                                conflictError &&
                                <div className="bg-yellow-200 border-t border-b border-yellow-500 text-yellow-700 px-4 py-3 mb-4 flex flex-row" role="alert">
                                    <p className="flex-1 font-bold">
                                        Email address is already exists!</p>
                                    <button onClick={() => setConflictError(false)}>X</button>
                                </div>
                            }
                            <div className="mb-6 text-center">
                                <button
                                    className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                                    type="submit"
                                >
                                    Register Account
                            </button>
                            </div>
                            <hr className="mb-6 border-t" />
                            <div className="text-center my-4">
                                <Link
                                    to="signin"
                                    className="inline-block text-lg text-blue-500 align-baseline hover:text-blue-800"
                                >
                                    Already have an account? Login!
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

export default Register