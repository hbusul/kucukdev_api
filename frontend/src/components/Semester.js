import React, { Component } from 'react'
import UserConsumer from '../Context';

var Kucukdevapi = require('kucukdevapi');


class Semester extends Component {
    state = {
        isFound: false,
        semesters: []
    }

    changeInput = (e) => {
        this.setState({
            isFound: true,
            semesters: e
        })
    }

    render() {
        return (
            <UserConsumer>
                {
                    value => {
                        const { userToken, userID } = value;
                        const { semesters, isFound } = this.state;

                        if (!isFound) {
                            let defaultClient = Kucukdevapi.ApiClient.instance;
                            // Configure OAuth2 access token for authorization: OAuth2PasswordBearer
                            let OAuth2PasswordBearer = defaultClient.authentications['OAuth2PasswordBearer'];
                            OAuth2PasswordBearer.accessToken = userToken;

                            let apiInstance = new Kucukdevapi.SemestersApi();
                            let uid = userID; // String | 
                            apiInstance.listSemestersOfUser(uid, (error, data, response) => {
                                if (error) {
                                    console.error(error);
                                } else {
                                    console.log('API called successfully. Returned data: ' + data);
                                    this.changeInput(data)
                                }
                            });
                        }

                        return (
                            <div className="flex w-screen">
                                <ul className="mx-auto text-xl my-4" >
                                    {semesters.map(function (item) {
                                        return <li className="my-4" key={item.id}>{item.name}</li>;
                                    })}
                                </ul>
                            </div>
                        )
                    }
                }
            </UserConsumer>
        )
    }

}
export default Semester;