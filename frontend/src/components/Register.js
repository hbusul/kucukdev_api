import React, { Component } from 'react'

class Register extends Component {

    render() {
        return (
            <div class="flex h-full">
                <div class="flex bg-white shadow-xl rounded flex-col md:w-2/3 sm:w-full mx-auto md:mt-32 mt-4">
                    <div class="w-full xl:w-3/4 lg:w-11/12 flex">
                        <div
                            class="w-full h-auto bg-gray-400 hidden lg:block lg:w-5/12 bg-cover rounded-l-lg"
                            style={{ backgroundImage: `url("https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80")` }}>
                        </div>
                        <div class="w-full lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none mx-auto">
                            <h3 class="pt-4 text-2xl text-center">Create an Account!</h3>
                            <form class="px-8 pt-6 pb-8 mb-4 bg-white rounded">
                                <div class="mb-4">
                                    <label class="block mb-2 text-lg font-bold text-gray-700" for="email">
                                        Email
								</label>
                                    <input
                                        class="w-full px-3 py-2 mb-3 text-lg leading-medium text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                        id="email"
                                        type="email"
                                        placeholder="Email"
                                    />
                                </div>
                                <div class="mb-4 md:flex md:justify-between">
                                    <div class="md:w-1/2 mb-4 md:mr-2 md:mb-0 sm:w-full">
                                        <label class="block mb-2 text-lg font-bold text-gray-700" for="password">
                                            Password
									</label>
                                        <input
                                            class="w-full px-3 py-2 mb-3 text-lg leading-medium text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                            id="password"
                                            type="password"
                                            placeholder="******************"
                                        />
                                        <p class="text-xs italic text-red-500">Please choose a password.</p>
                                    </div>
                                    <div class="md:w-1/2  md:ml-2 sm:w-full">
                                        <label class="block mb-2 text-lg font-bold text-gray-700" for="c_password">
                                            Confirm Password
									</label>
                                        <input
                                            class="w-full px-3 py-2 mb-3 text-lg leading-medium text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                            id="c_password"
                                            type="password"
                                            placeholder="******************"
                                        />
                                    </div>
                                </div>
                                <div class="mb-6 text-center">
                                    <button
                                        class="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                                        type="button"
                                    >
                                        Register Account
								</button>
                                </div>
                                <hr class="mb-6 border-t" />
                                <div class="text-center my-4">
                                    <a
                                        class="inline-block text-lg text-blue-500 align-baseline hover:text-blue-800"
                                        href="/signin"
                                    >
                                        Already have an account? Login!
								</a>
                                </div>
                                <div class="text-center my-4">
                                    <a
                                        class="inline-block text-lg text-blue-500 align-baseline hover:text-blue-800"
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
export default Register;