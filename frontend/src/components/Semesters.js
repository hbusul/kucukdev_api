import { Link } from "react-router-dom";
import { useEffect, useState } from 'react'
import Semester from './Semester'

var Kucukdevapi = require('kucukdevapi');

const Semesters = () => {
    const [semesters, setSemesters] = useState([])
    const USER_LOGIN = JSON.parse(localStorage.getItem("USER_LOGIN"))

    useEffect(() => {
        let defaultClient = Kucukdevapi.ApiClient.instance;
        // Configure OAuth2 access token for authorization: OAuth2PasswordBearer
        let OAuth2PasswordBearer = defaultClient.authentications['OAuth2PasswordBearer'];
        OAuth2PasswordBearer.accessToken = USER_LOGIN.userToken;

        let apiInstance = new Kucukdevapi.SemestersApi();
        let uid = USER_LOGIN.userID; // String | 
        apiInstance.listSemestersOfUser(uid, (error, data, response) => {
            if (error) {
                console.error(error);
            } else {
                console.log('API called successfully. Returned data: ' + data);
                setSemesters(data)
            }
        });
    }, [])

    const deleteSemester = (id) => {

        let defaultClient = Kucukdevapi.ApiClient.instance;
        // Configure OAuth2 access token for authorization: OAuth2PasswordBearer
        let OAuth2PasswordBearer = defaultClient.authentications['OAuth2PasswordBearer'];
        OAuth2PasswordBearer.accessToken = USER_LOGIN.userToken;

        let apiInstance = new Kucukdevapi.SemestersApi();
        let uid = USER_LOGIN.userID; // String | 
        let sid = id; // String | 
        apiInstance.deleteSemester(uid, sid, (error, data, response) => {
            if (error) {
                console.error(error);
            } else {
                console.log('API called successfully. Returned data: ' + data);
            }
        });

        window.location.reload()

    }


    return (
        <div>
            {
                USER_LOGIN.isLogin ?
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
                                            onDeleteProps={() => deleteSemester(semester.id)}
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

export default Semesters