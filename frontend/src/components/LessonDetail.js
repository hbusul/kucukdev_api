import { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../Context';

var Kucukdevapi = require('kucukdevapi');

const LessonDetail = ({ history, match }) => {
    const [login, setLogin] = useContext(UserContext);

    const [lesson, setLesson] = useState({})
    const [absences, setAbsences] = useState([])
    const [absenceStr, setAbsenceStr] = useState([])
    const [slots, setSlots] = useState([])
    const [fixedSlots, setFixedSlots] = useState([])
    const [semStartDate, setSemStartDate] = useState(Date.now())
    const [lessonDeleteModal, setLessonDeleteModal] = useState(false)


    const lessonID = match.params.id

    let defaultClient = Kucukdevapi.ApiClient.instance;
    let OAuth2PasswordBearer = defaultClient.authentications['OAuth2PasswordBearer'];
    OAuth2PasswordBearer.accessToken = login.userToken;

    let uid = login.userID;
    let sid = login.semesterID;

    useEffect(() => {
        if (login) {

            let semesterApiInstance = new Kucukdevapi.SemestersApi();
            semesterApiInstance.getSingleSemester(uid, sid, (error, data, response) => {
                if (error) {
                    console.error(error);
                    if (error.response.status === 401) {
                        setLogin(false)
                    }
                } else {
                    console.log('API called successfully. Returned data: ' + data);
                    setSemStartDate(data.startDate)
                }
            });

            let apiInstance = new Kucukdevapi.LessonsApi();
            let lid = lessonID;
            apiInstance.getSingleLesson(uid, sid, lid, (error, data, response) => {
                if (error) {
                    console.error(error);
                    if (error.response.status === 401) {
                        setLogin(false)
                    }
                } else {
                    console.log('API called successfully. Returned data: ' + data);
                    setLesson(data)
                    setAbsences(data.absences)
                    setSlots(data.slots)
                }
            });
        } else {
            history.push("/signin")
        }

    }, [lessonID, uid, sid, login, setLogin, history])

    useEffect(() => {
        const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]

        const addDays = (date, days) => {
            const copy = new Date(Number(date))
            copy.setDate(date.getDate() + days)
            return copy
        }

        const absenceStructs = []
        absences.sort()
        for (let j = 0; j < absences.length; j++) {
            const resAbs = lesson.absences[j].split(",")
            let date = addDays(semStartDate, ((Number(resAbs[0]) - 1) * 7) + (Number(resAbs[1]) + 1))
            let resDate = String(date).split(" ");
            const finalDate = resDate[1] + " " + resDate[2] + ", " + resDate[3]
            absenceStructs.push({
                id: lesson._id,
                name: lesson.name,
                week: resAbs[0],
                day: resAbs[1],
                slot: resAbs[2],
                date: finalDate
            })
        }

        const absenceRows = []
        for (let k = 0; k < absenceStructs.length; k++) {
            absenceRows.push(
                <tr key={k}>
                    <td className="px-1 sm:px-4 py-2 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">{absenceStructs[k].name}</td>
                    <td className="px-4 py-2 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm text-left leading-5">{days[absenceStructs[k].day]}</td>
                    <td className="px-0 sm:px-2 whitespace-no-wrap border-b border-gray-500 text-blue-900 text-sm leading-5">{absenceStructs[k].slot}</td>
                    <td className="px-2 py-2 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">{absenceStructs[k].week}</td>
                    <td className="px-2 py-2 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">{absenceStructs[k].date}</td>
                </tr>
            )

        }

        setAbsenceStr(absenceRows)

        let daySlot = [[], [], [], [], []]

        for (let i = 0; i < slots.length; i++) {
            const resSlot = slots[i].split(",")
            daySlot[resSlot[0]].push(resSlot[1])
        }

        let day;
        const fixedSlot = []
        for (let j = 0; j < daySlot.length; j++) {
            daySlot[j].length > 0 ? day = `${days[j]} ` : day = "null"
            for (let k = 0; k < daySlot[j].length; k++) {
                day += `${daySlot[j][k]}`
                if (k < daySlot[j].length - 1) day += ","
            }
            day !== "null" && fixedSlot.push(day)
        }

        setFixedSlots(fixedSlot)

    }, [absences, lesson, slots, semStartDate])

    const deleteLesson = (id) => {

        let apiInstance = new Kucukdevapi.LessonsApi();
        let lid = id;
        apiInstance.deleteLesson(uid, sid, lid, (error, data, response) => {
            if (error) {
                console.error(error);
                if (error.response.status === 401) {
                    setLogin(false)
                }
            } else {
                console.log('API called successfully. Returned data: ' + data);
                history.push("/lessons")
            }
        });
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
                                <td className="px-4 sm:px-8 md:px-20 py-4 border-b text-blue-900 border-gray-500 text-sm text-left font-bold leading-5">Name</td>
                                <td className="px-4 sm:px-8 md:px-20 py-4 border-b text-blue-900 border-gray-500 text-sm text-left leading-5">{lesson.name}</td>
                            </tr>
                            <tr>
                                <td className="px-4 sm:px-8 md:px-20 py-4 border-b text-blue-900 border-gray-500 text-sm text-left font-bold leading-5">Instructor</td>
                                <td className="px-4 sm:px-8 md:px-20 py-4 border-b text-blue-900 border-gray-500 text-sm text-left leading-5">{lesson.instructor}</td>
                            </tr>
                            <tr>
                                <td className="px-4 sm:px-8 md:px-20 py-4 border-b text-blue-900 border-gray-500 text-sm text-left font-bold leading-5">Absence Limit</td>
                                <td className="px-4 sm:px-8 md:px-20 py-4 border-b text-blue-900 border-gray-500 text-sm text-left leading-5">{lesson.absenceLimit}</td>
                            </tr>
                            <tr>
                                <td className="px-4 sm:px-8 md:px-20 py-4 border-b text-blue-900 border-gray-500 text-sm text-left font-bold leading-5">Current Absent Number</td>
                                <td className="px-4 sm:px-8 md:px-20 py-4 border-b text-blue-900 border-gray-500 text-sm text-left leading-5">{absences.length}</td>
                            </tr>
                            <tr>
                                <td className="px-4 sm:px-8 md:px-20 py-4 border-b text-blue-900 border-gray-500 text-sm text-left font-bold leading-5">Weekly Schedule</td>
                                <td className="px-4 sm:px-8 md:px-20 py-4 border-b text-blue-900 border-gray-500 text-sm text-left leading-5">{fixedSlots.map((slot, index) => <p key={index}>{slot}</p>)}</td>
                            </tr>
                            <tr>
                                <td className="px-4 sm:px-8 md:px-20 py-4 border-b text-blue-900 border-gray-500 text-sm text-left font-bold leading-5">Quick Actions</td>
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
                            {absenceStr}
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
                                            deleteLesson(lesson._id)
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
