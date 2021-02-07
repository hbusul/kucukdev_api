import React, { Component } from 'react'
import UserConsumer from '../Context';


class Home extends Component {

    render() {
        return (
            <UserConsumer>
                {
                    value => {
                        const { userToken } = value;
                        return (
                            <div className="flex h-full">
                                <h1 className="text-9xl mx-auto mt-48">{userToken}</h1>
                            </div>
                        )
                    }
                }
            </UserConsumer>
        )
    }

}
export default Home;