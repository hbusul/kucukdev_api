import { useState, useEffect } from "react"
import { Link } from 'react-router-dom'

import Lesson from './Lesson'

var Kucukdevapi = require('kucukdevapi');


const Lessons = () => {

    const [lessons, setLessons] = useState([])
    const [refresh, setRefresh] = useState(0);
    const USER_LOGIN = JSON.parse(localStorage.getItem("USER_LOGIN"))
    const CURRENT_SEMESTER = JSON.parse(localStorage.getItem("CURRENT_SEMESTER"))


    useEffect(() => {

        let defaultClient = Kucukdevapi.ApiClient.instance;
        let OAuth2PasswordBearer = defaultClient.authentications['OAuth2PasswordBearer'];
        OAuth2PasswordBearer.accessToken = USER_LOGIN.userToken;

        let apiInstance = new Kucukdevapi.LessonsApi();
        let uid = USER_LOGIN.userID;
        let sid = CURRENT_SEMESTER.currentSemester;
        apiInstance.listLessonsOfSemester(uid, sid, (error, data, response) => {
            if (error) {
                console.error(error);
            } else {
                console.log('API called successfully. Returned data: ' + data);
                setLessons(data)
            }
        });
    }, [refresh])

    const deleteLesson = (id) => {

        let defaultClient = Kucukdevapi.ApiClient.instance;
        let OAuth2PasswordBearer = defaultClient.authentications['OAuth2PasswordBearer'];
        OAuth2PasswordBearer.accessToken = USER_LOGIN.userToken;

        let apiInstance = new Kucukdevapi.LessonsApi();
        let uid = USER_LOGIN.userID;
        let sid = CURRENT_SEMESTER.currentSemester;
        let lid = id;
        apiInstance.deleteLesson(uid, sid, lid, (error, data, response) => {
            if (error) {
                console.error(error);
            } else {
                console.log('API called successfully. Returned data: ' + data);
            }
            setRefresh((x)=>x+1);
        });
    }


    return (
        <div>
            {
                true ?
                    <div className="flex flex-col my-8 xl:mx-40">
                        <div className="flex flex-row justify-around mb-4">
                            <a href="/lessons/show-lessons" className="text-gray-800 text-base font-semibold hover:text-purple-600 mb-1 md:hidden">Show Lessons</a>
                            <a href="/lessons/add-lesson" className="text-gray-800 text-base font-semibold hover:text-purple-600 mb-1 md:hidden">Add Lesson</a>
                            <a href="/lessons/add-from-uis" className="text-gray-800 text-base font-semibold hover:text-purple-600 mb-1 md:hidden">Add from UIS</a>
                        </div>
                        <h1 className="flex justify-start text-2xl ml-8 md:ml-4">Your Lessons</h1>
                        <div className="my-2 py-2 overflow-x-auto sm:px-6 pr-10 lg:px-8">
                            <div className="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard px-8 pt-3 rounded-bl-lg rounded-br-lg">
                                <table className="min-w-full">
                                    <thead>
                                        <tr className="">
                                            <th className="px-6 py-3 border-b-2 border-gray-300 text-sm text-left leading-4 text-blue-500 tracking-wider">Lesson Name</th>
                                            <th className="px-6 py-3 border-b-2 border-gray-300 text-sm leading-4 text-blue-500 tracking-wider">Schedule</th>
                                            <th className="px-6 py-3 border-b-2 border-gray-300 text-sm leading-4 text-blue-500 tracking-wider">Absence</th>
                                            <th className="px-6 py-3 border-b-2 border-gray-300 text-sm leading-4 text-blue-500 tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white  ">
                                        {
                                            lessons.map((lesson) => {
                                                return (
                                                    <Lesson
                                                        key={lesson._id}
                                                        lesson={lesson}
                                                        onDeleteLesson={() => deleteLesson(lesson._id)}

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
                    </div>

                    :
                    <div>
                        <h1 className="text-xl mx-auto mt-48">Not Authenticated!</h1>
                    </div>
            }
        </div >

    )
}

export default Lessons
