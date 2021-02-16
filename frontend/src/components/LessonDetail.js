import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

var Kucukdevapi = require('kucukdevapi');

const LessonDetail = (props) => {
    const [lesson, setLesson] = useState({})
    const [absences, setAbsences] = useState([])
    const [lessonDeleteModal, setLessonDeleteModal] = useState(false);


    const currentLessonID = props.match.params.id
    const USER_LOGIN = JSON.parse(localStorage.getItem("USER_LOGIN"))
    const CURRENT_SEMESTER = JSON.parse(localStorage.getItem("CURRENT_SEMESTER"))


    useEffect(() => {
        let defaultClient = Kucukdevapi.ApiClient.instance;
        let OAuth2PasswordBearer = defaultClient.authentications['OAuth2PasswordBearer'];
        OAuth2PasswordBearer.accessToken = USER_LOGIN.userToken;

        let apiInstance = new Kucukdevapi.LessonsApi();
        let uid = USER_LOGIN.userID;
        let sid = CURRENT_SEMESTER.currentSemester;
        let lid = currentLessonID;
        apiInstance.getSingleLesson(uid, sid, lid, (error, data, response) => {
            if (error) {
                console.error(error);
            } else {
                console.log('API called successfully. Returned data: ' + data);
                setLesson(data)
                setAbsences(data.absences)
            }
        });
    }, [])

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
        });

        props.history("/lessons")
    }

    return (
        <div className="flex flex-col">
            <div className="flex flex-col xl:flex-row my-4 ml-0 xl:ml-32">
                <div className="m-0 md:m-2 xl:m-10 overflow-x-hidden">
                    <h1 className="flex justify-start text-2xl ml-8 md:ml-4 my-2">{lesson.name}</h1>
                    <table className="min-w-full">
                        <thead>
                            <tr className="">
                                <th className="px-6 py-3 border-b-2 border-gray-300 text-sm text-left leading-4 text-blue-500 tracking-wider">#</th>
                                <th className="px-6 py-3 border-b-2 border-gray-300 text-sm leading-4 text-blue-500 tracking-wider"></th>
                            </tr>
                        </thead>
                        <tbody className="bg-white  ">
                            <tr>
                                <td className="px-4 sm:px-8 md:px-20 py-4 border-b text-blue-900 border-gray-500 text-sm text-left leading-5">Name</td>
                                <td className="px-4 sm:px-8 md:px-20 py-4 border-b text-blue-900 border-gray-500 text-sm text-left leading-5">{lesson.name}</td>
                            </tr>
                            <tr>
                                <td className="px-4 sm:px-8 md:px-20 py-4 border-b text-blue-900 border-gray-500 text-sm text-left leading-5">Instructor</td>
                                <td className="px-4 sm:px-8 md:px-20 py-4 border-b text-blue-900 border-gray-500 text-sm text-left leading-5">{lesson.instructor}</td>
                            </tr>
                            <tr>
                                <td className="px-4 sm:px-8 md:px-20 py-4 border-b text-blue-900 border-gray-500 text-sm text-left leading-5">Absence Limit</td>
                                <td className="px-4 sm:px-8 md:px-20 py-4 border-b text-blue-900 border-gray-500 text-sm text-left leading-5">{lesson.absenceLimit}</td>
                            </tr>
                            <tr>
                                <td className="px-4 sm:px-8 md:px-20 py-4 border-b text-blue-900 border-gray-500 text-sm text-left leading-5">Current Absent Number</td>
                                <td className="px-4 sm:px-8 md:px-20 py-4 border-b text-blue-900 border-gray-500 text-sm text-left leading-5">{absences.length}</td>
                            </tr>
                            <tr>
                                <td className="px-4 sm:px-8 md:px-20 py-4 border-b text-blue-900 border-gray-500 text-sm text-left leading-5">Weekly Schedule</td>
                                <td className="px-4 sm:px-8 md:px-20 py-4 border-b text-blue-900 border-gray-500 text-sm text-left leading-5">{lesson.slots}</td>
                            </tr>
                            <tr>
                                <td className="px-4 sm:px-8 md:px-20 py-4 border-b text-blue-900 border-gray-500 text-sm text-left leading-5">Quick Actions</td>
                                <td className="px-4 sm:px-8 md:px-20 py-4 border-b text-blue-900 border-gray-500 text-sm leading-5">
                                    <div className="flex justify-around flex-col md:flex-row">
                                        <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                            <span aria-hidden className="absolute inset-0 bg-yellow-300 rounded-full"></span>
                                            <Link to={{ pathname: `/lessons/update-lesson/${lesson._id}` }} className="relative text-xs font-bold">Edit</Link>

                                        </span>
                                        <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                            <span aria-hidden className="absolute inset-0 bg-red-500 opacity-90 rounded-full"></span>
                                            <button onClick={() => setLessonDeleteModal(true)} type="button"
                                                style={{ transition: "all .15s ease" }} className="relative text-xs font-bold">Delete</button>
                                        </span>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="m-0 md:m-2 xl:m-10  overflow-x-auto">
                    <h1 className="flex justify-start text-2xl ml-8 md:ml-4 my-2">Absence</h1>
                    <table className="min-w-full">
                        <thead>
                            <tr className="">
                                <th className="px-6 py-3 border-b-2 border-gray-300 text-sm text-left leading-4 text-blue-500 tracking-wider">Lesson Name</th>
                                <th className="px-6 py-3 border-b-2 border-gray-300 text-sm leading-4 text-blue-500 tracking-wider">Day</th>
                                <th className="px-6 py-3 border-b-2 border-gray-300 text-sm leading-4 text-blue-500 tracking-wider">Slot</th>
                                <th className="px-6 py-3 border-b-2 border-gray-300 text-sm leading-4 text-blue-500 tracking-wider">Week</th>
                                <th className="px-6 py-3 border-b-2 border-gray-300 text-sm leading-4 text-blue-500 tracking-wider">Date</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white  ">

                        </tbody>
                    </table>
                </div>
            </div>
            {lessonDeleteModal ? (
                <div>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                                    <h3 className="pt-4 text-2xl text-center">Delete lesson: {lesson.name}</h3>

                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setLessonDeleteModal(false)}
                                    >
                                        <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                            ×
                    </span>
                                    </button>
                                </div>
                                {/*body*/}
                                <p className="flex justify-center text-base m-8">You will lose everything belongs to this lesson irreversibly!</p>
                                {/*footer*/}
                                <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
                                    <button
                                        className="background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                                        type="button"
                                        style={{ transition: "all .15s ease" }}
                                        onClick={() => setLessonDeleteModal(false)}
                                    >
                                        Close
                  </button>
                                    <button
                                        className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                                        type="button"
                                        style={{ transition: "all .15s ease" }}
                                        onClick={() => {
                                            setLessonDeleteModal(false)
                                            deleteLesson()
                                        }
                                        }
                                    >
                                        Delete Anyway
                  </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </div>
            ) : null}
        </div>
    )
}

export default LessonDetail