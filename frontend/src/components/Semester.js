import React, { Component } from 'react'
import PropTypes from 'prop-types'
import UserConsumer from "../Context"
import { Link, Redirect } from 'react-router-dom'


var Kucukdevapi = require('kucukdevapi');


class Semester extends Component {

    static defaultProps = {
        name: "NA",
        startDate: "NA",
        endDate: "NA",
    }

    onDeleteUser = async (id, userID, userToken, onDeleteProps, e) => {
        e.preventDefault();


        let defaultClient = Kucukdevapi.ApiClient.instance;
        // Configure OAuth2 access token for authorization: OAuth2PasswordBearer
        let OAuth2PasswordBearer = defaultClient.authentications['OAuth2PasswordBearer'];
        OAuth2PasswordBearer.accessToken = userToken;

        let apiInstance = new Kucukdevapi.SemestersApi();
        let uid = userID; // String | 
        let sid = id; // String | 
        apiInstance.deleteSemester(uid, sid, (error, data, response) => {
            if (error) {
                console.error(error);
            } else {
                console.log('API called successfully. Returned data: ' + data);
                onDeleteProps(sid);
            }
        });

        <Redirect to="/semesters" />
    }

    render() {

        // Destructing
        const { name, id, onDeleteProps } = this.props;
        return (
            <UserConsumer>
                {
                    value => {
                        const { userToken, userID } = value;

                        return (
                            <div className="flex w-screen" >
                                <div className="mx-auto">
                                    <div className="flex m-4">
                                        <h4 >{name} </h4>
                                        <Link to={"/semesters/" + id} className="mx-4" style={{ cursor: "pointer" }}>Detail</Link>
                                        <button onClick={this.onDeleteUser.bind(this, id, userID, userToken, onDeleteProps)} className="mx-4" style={{ cursor: "pointer" }}>Delete</button>


                                    </div>

                                </div>

                            </div>
                        )


                    }
                }


            </UserConsumer>)


    }
}


Semester.propTypes = {
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    onDeleteProps: PropTypes.func
}
export default Semester;