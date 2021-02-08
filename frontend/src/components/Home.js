import React, { Component } from 'react'
import UserConsumer from '../Context';


class Home extends Component {

    render() {
        return (
            <UserConsumer>
                {
                    value => {
                        const { userToken, userID, isLogin } = value;

                        return (
                            <div>
                                {
                                    isLogin ?
                                        <div className="flex h-full">
                                            <h1 className="text-md mx-auto mt-48">{userToken}</h1>
                                            <h1 className="text-md mx-auto mt-48">{userID}</h1>
                                        </div > :
                                        <div>
                                            <h1 className="text-xl mx-auto mt-48">Welcome to Kucukdev.org!</h1>

                                        </div>
                                }

                            </div>

                        )
                    }
                }
            </UserConsumer >
        )
    }

}
export default Home;