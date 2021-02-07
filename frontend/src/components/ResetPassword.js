import React, { Component } from 'react'

class ResetPassword extends Component {
    render() {
        return (
            <div className="flex h-full">
                <div className="flex bg-white shadow-xl rounded flex-col md:w-2/3 sm:w-full mx-auto md:mt-32 mt-4">
                    <div className="w-full xl:w-3/4 lg:w-11/12 flex">
                        <div
                            className="w-full h-auto bg-gray-400 hidden lg:block lg:w-1/2 bg-cover rounded-l-lg"
                            style={{ backgroundImage: `url("https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80")` }}>
                        </div>
                        <div className="w-full lg:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none">
                            <div className="px-8 mb-4 text-center">
                                <h3 className="pt-4 mb-2 text-2xl">Forgot Your Password?</h3>
                                <p className="mb-4 text-md text-gray-700">
                                    We get it, stuff happens. Just enter your email address below and we'll send you a
                                    link to reset your password!
							</p>
                            </div>
                            <form className="px-8 pt-6 pb-8 mb-4 bg-white rounded">
                                <div className="mb-4">
                                    <label className="block mb-2 text-lg font-bold text-gray-700" htmlFor="email">
                                        Email
								</label>
                                    <input
                                        className="w-full px-3 py-2 mb-3 text-lg leading-medium text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                        id="email"
                                        type="email"
                                        placeholder="Enter Email Address..."
                                    />
                                </div>
                                <div className="mb-8 text-center">
                                    <button
                                        className="w-full px-4 py-2 font-bold text-white bg-red-500 rounded-full hover:bg-red-700 focus:outline-none focus:shadow-outline"
                                        type="button"
                                    >
                                        Reset Password
								</button>
                                </div>
                                <hr className="mb-6 border-t" />
                                <div className="text-center my-4">
                                    <a
                                        className="inline-block text-lg text-blue-500 align-baseline hover:text-blue-800"
                                        href="./register.html"
                                    >
                                        Create an Account!
								</a>
                                </div>
                                <div className="text-center my-4">
                                    <a
                                        className="inline-block text-lg text-blue-500 align-baseline hover:text-blue-800"
                                        href="./index.html"
                                    >
                                        Already have an account? Login!
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
export default ResetPassword;