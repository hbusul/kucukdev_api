import React, { Component } from 'react'
import UserConsumer from "../Context"


class SemesterDetail extends Component {
    state = {
        sid: ""
    }

    componentDidMount() {
        const sid = this.props.match.params.id;
        console.log(sid)

        this.setState({
            sid: sid
        })


    }

    render() {

        return (
            <UserConsumer>
                {
                    value => {
                        // const { userToken, userID } = value;
                        const { sid } = this.state;

                        return (
                            <div className="flex w-screen" >
                                <div className="mx-auto">
                                    <div className="flex m-4">
                                        <h1>{sid}</h1>
                                    </div>

                                </div>

                            </div>
                        )


                    }
                }


            </UserConsumer>)


    }
}

export default SemesterDetail;