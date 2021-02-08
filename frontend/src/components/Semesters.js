import React, { Component } from 'react'
import { Link } from "react-router-dom";
import Semester from './Semester'
import UserConsumer from '../Context';

var Kucukdevapi = require('kucukdevapi');


class Semesters extends Component {
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

    deleteSemester = (e) => {
        var newState = { ...this.state };
        newState.semesters = newState.semesters.filter(semester => semester.id !== e);
        this.changeInput(newState.semesters)
    }

    render() {
        return (
            <UserConsumer>
                {
                    value => {
                        const { userToken, userID, isLogin } = value;
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
                            <div>
                                {
                                    isLogin ?
                                        <div className="flex w-screen flex-col">
                                            <div className="flex justify-end">
                                                <Link
                                                    to="/add-semester"
                                                    className="w-1/6 mx-auto px-4 py-2 my-4 text-md font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"

                                                >
                                                    Add Semester
                    </Link>
                                            </div>

                                            <div >

                                                {
                                                    semesters.map(semester => {
                                                        return (
                                                            <Semester
                                                                key={semester.id}
                                                                id={semester.id}
                                                                name={semester.name}
                                                                onDeleteProps={this.deleteSemester}

                                                            />
                                                        )

                                                    })
                                                }
                                            </div>

                                        </div>

                                        :
                                        <div>
                                            <h1 className="text-xl mx-auto mt-48">Not Authenticated!</h1>
                                        </div>
                                }
                            </div>

                        )
                    }
                }
            </UserConsumer>
        )
    }

}
export default Semesters;