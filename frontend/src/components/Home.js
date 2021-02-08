import React, { Component } from 'react'
import UserConsumer from '../Context';


class Home extends Component {

    render() {
        return (
            <UserConsumer>
                {
                    value => {
                        const { userToken, userID } = value;
                        return (
                            <div className="flex h-full">
                                <h1 className="text-md mx-auto mt-48">{userToken}</h1>
                                <h1 className="text-md mx-auto mt-48">{userID}</h1>
                            </div>
                        )
                    }
                }
            </UserConsumer>
        )
    }

}
export default Home;