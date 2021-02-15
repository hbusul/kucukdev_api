import { Link } from "react-router-dom";
import { useEffect, useState } from 'react'
import Semester from './Semester'
import UserConsumer from "../Context";
import UserContext from "../Context"

var Kucukdevapi = require('kucukdevapi');

const Semesters = (props) => {
    const [semesters, setSemesters] = useState([])
    const [refresh, setRefresh] = useState(0);
    const USER_LOGIN = JSON.parse(localStorage.getItem("USER_LOGIN"))

    useEffect(() => {
        let defaultClient = Kucukdevapi.ApiClient.instance;
        let OAuth2PasswordBearer = defaultClient.authentications['OAuth2PasswordBearer'];
        OAuth2PasswordBearer.accessToken = USER_LOGIN.userToken;

        let apiInstance = new Kucukdevapi.SemestersApi();
        let uid = USER_LOGIN.userID;
        apiInstance.listSemestersOfUser(uid, (error, data, response) => {
            if (error) {
                console.error(error);
                // const resErr = String(error).split(" ")
                // if (resErr[1] === "Unauthorized") props.history.push("/signin")
            } else {
                console.log('API called successfully. Returned data: ' + data);
                setSemesters(data)
            }
        });
    }, [refresh])

    const deleteSemester = (id) => {

        let defaultClient = Kucukdevapi.ApiClient.instance;
        let OAuth2PasswordBearer = defaultClient.authentications['OAuth2PasswordBearer'];
        OAuth2PasswordBearer.accessToken = USER_LOGIN.userToken;

        let apiInstance = new Kucukdevapi.SemestersApi();
        let uid = USER_LOGIN.userID;
        let sid = id;
        apiInstance.deleteSemester(uid, sid, (error, data, response) => {
            if (error) {
                console.error(error);
            } else {
                console.log('API called successfully. Returned data: ' + data);
            }
            setRefresh((x) => x + 1);
        });
    }

    const setCurrentSemester = (id, dispatch) => {

        let defaultClient = Kucukdevapi.ApiClient.instance;
        let OAuth2PasswordBearer = defaultClient.authentications['OAuth2PasswordBearer'];
        OAuth2PasswordBearer.accessToken = USER_LOGIN.userToken;

        let apiInstance = new Kucukdevapi.UsersApi();
        let uid = USER_LOGIN.userID;
        let updateSemesterModel = new Kucukdevapi.UpdateSemesterModel(id);
        apiInstance.updateCurrentSemester(uid, updateSemesterModel, (error, data, response) => {
            if (error) {
                console.error(error);
            } else {
                console.log('API called successfully. Returned data: ' + data);
                dispatch({
                    type: "SET_CURRENT_SEMESTER", payload: data
                });
            }
        });
    }



    return (
        <UserConsumer>
            {
                value => {
                    const { dispatch, currentSemester } = value

                    return (
                        <div>
                            {
                                USER_LOGIN.isLogin ?
                                    <div className="flex flex-col my-8 xl:m-16 xl:mx-40">
                                        <h1 className="flex justify-start text-2xl ml-8 md:ml-4">Your Semesters</h1>
                                        <div className="my-2 py-2 overflow-x-auto sm:px-6 pr-10 lg:px-8">
                                            <div className="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard px-8 pt-3 rounded-bl-lg rounded-br-lg">
                                                <table className="min-w-full">
                                                    <thead>
                                                        <tr className="">
                                                            <th className="px-6 py-3 border-b-2 border-gray-300 text-sm text-left leading-4 text-blue-500 tracking-wider">Semester Name</th>
                                                            <th className="px-6 py-3 border-b-2 border-gray-300 text-sm leading-4 text-blue-500 tracking-wider">Week Count</th>
                                                            <th className="px-6 py-3 border-b-2 border-gray-300 text-sm leading-4 text-blue-500 tracking-wider">Start</th>
                                                            <th className="px-6 py-3 border-b-2 border-gray-300 text-sm leading-4 text-blue-500 tracking-wider">Finish</th>
                                                            <th className="px-6 py-3 border-b-2 border-gray-300 text-sm leading-4 text-blue-500 tracking-wider">Actions</th>
                                                            <th className="px-6 py-3 border-b-2 border-gray-300"></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="bg-white  ">
                                                        {
                                                            semesters.map(semester => {
                                                                return (
                                                                    <Semester
                                                                        key={semester.id}
                                                                        semester={semester}
                                                                        onDeleteSemester={() => deleteSemester(semester.id)}
                                                                        onCurrentSemester={() => setCurrentSemester(semester.id, dispatch)}
                                                                        currentSemester={currentSemester}
                                                                    />
                                                                )

                                                            })
                                                        }
                                                    </tbody>
                                                </table>
                                                <div className="sm:flex-1 sm:flex sm:items-center sm:justify-between my-4 work-sans">
                                                    <div>
                                                        <p className="text-sm leading-5 text-blue-700">
                                                            Showing
                                                <span className="font-medium mx-1">1</span>
                                                to
                                                <span className="font-medium mx-1">5</span>
                                                of
                                                <span className="font-medium mx-1">9</span>
                                                results
                                            </p>
                                                    </div>
                                                    <div>
                                                        <nav className="relative z-0 inline-flex shadow-sm">
                                                            <div>
                                                                <a href="/" className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150" aria-label="Previous">
                                                                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                                                                    </svg>
                                                                </a>
                                                            </div>
                                                            <div v-if="pagination.current_page < pagination.last_page">
                                                                <a href="/" className="-ml-px relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150" aria-label="Next">
                                                                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                                                    </svg>
                                                                </a>
                                                            </div>
                                                        </nav>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex justify-center md:justify-end text-xs md:text-base my-8 mx-4">
                                            <Link
                                                to="/add-semester"
                                                className="w-1/2 md:w-1/3 lg:w-1/5 px-8 py-2 font-bold text-white bg-green-500 rounded-full hover:bg-green-700 focus:outline-none focus:shadow-outline"

                                            >
                                                Add Semester
                </Link>
                                        </div>

                                    </div>

                                    :
                                    <div>
                                        <h1 className="text-xl mx-auto mt-48">Not Authenticated!</h1>
                                    </div>
                            }
                        </div >

                    )
                }
            }
        </UserConsumer>
    )



}

export default Semesters




