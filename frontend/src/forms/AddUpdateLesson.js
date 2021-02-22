import { useState, useEffect, useContext } from 'react'
import { Link } from "react-router-dom";
import { UserContext } from '../Context';

var Kucukdevapi = require('kucukdevapi');


const AddLesson = (props) => {
    const [login] = useContext(UserContext);

    const [semester, setSemester] = useState({})
    const [calculateModal, setCalculateModal] = useState(false);

    const [slots, setSlots] = useState([])
    const [lessonName, setLessonName] = useState("")
    const [instrutcorName, setInstructorName] = useState("")
    const [absenceLimit, setAbsenceLimit] = useState(0)
    const [numOfWeeks, setNumOfWeeks] = useState(14)
    const [lessonPerWeek, setLessonPerWeek] = useState(5)
    const [maxPercentage, setMaxPercentage] = useState(30)
    const [scheduleRows, setScheduleRows] = useState([])

    const lessonID = props.match.params.id

    let defaultClient = Kucukdevapi.ApiClient.instance;
    let OAuth2PasswordBearer = defaultClient.authentications['OAuth2PasswordBearer'];
    OAuth2PasswordBearer.accessToken = login.userToken;
    let uid = login.userID;
    let sid = login.semesterID;

    useEffect(() => {
        if (lessonID) {
            let apiInstance = new Kucukdevapi.LessonsApi();
            let lid = lessonID;
            apiInstance.getSingleLesson(uid, sid, lid, (error, data, response) => {
                if (error) {
                    console.error(error);
                } else {
                    console.log('API called successfully. Returned data: ' + data);
                    setAbsenceLimit(data.absenceLimit)
                    setLessonName(data.name)
                    setInstructorName(data.instructor)
                    setSlots(data.slots)
                }
            });
        } else {
            setSlots([])
            setAbsenceLimit(0)
        }

        let apiInstance = new Kucukdevapi.SemestersApi();
        apiInstance.getSingleSemester(uid, sid, (error, data, response) => {
            if (error) {
                console.error(error);
            } else {
                console.log('API called successfully. Returned data: ' + data);
                setSemester(data)
            }
        });

    }, [lessonID, uid, sid])


    useEffect(() => {
        let hour = String(semester.startHour)
        let resStart = hour.split(".")
        let startHour = Number(resStart[0])
        let startMin = Number(resStart[1])

        const period = semester.dLesson + semester.dBreak
        const periodHour = parseInt(period / 60)
        const periodMin = period % 60

        const scheduleArray = []
        if (!lessonID || slots.length !== 0 || (slots.length === 0 && lessonID)) {
            for (let index = 1; index <= semester.slotCount; index++) {
                scheduleArray.push(<tr key={index}>
                    <td className="px-6 py-1 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">{hour}</td>
                    <td className="border border-gray-500 text-blue-900 text-sm leading-5"><input onChange={() => selectSlots(`0,${index}`)} checked={slots.includes(`0,${index}`)} type="checkbox" /></td>
                    <td className="border border-gray-500 text-blue-900 text-sm leading-5"><input onChange={() => selectSlots(`1,${index}`)} checked={slots.includes(`1,${index}`)} type="checkbox" /></td>
                    <td className="border text-blue-900 border-gray-500 text-sm leading-5"><input onChange={() => selectSlots(`2,${index}`)} checked={slots.includes(`2,${index}`)} type="checkbox" /></td>
                    <td className="border text-blue-900 border-gray-500 text-sm leading-5"><input onChange={() => selectSlots(`3,${index}`)} checked={slots.includes(`3,${index}`)} type="checkbox" /></td>
                    <td className="border-b border-gray-500 text-blue-900 text-sm leading-5"><input onChange={() => selectSlots(`4,${index}`)} checked={slots.includes(`4,${index}`)} type="checkbox" /></td>
                </tr >);

                startHour += periodHour
                startMin += periodMin

                if (startMin >= 60) {
                    startHour += 1
                    startMin = startMin % 60
                }

                if (startMin < 10) {
                    hour = startHour + ".0" + startMin
                } else {
                    hour = startHour + "." + startMin
                }
            }
        }

        setScheduleRows(scheduleArray)

    }, [slots, semester, lessonID])

    const selectSlots = (newSlot) => {
        if (slots.includes(newSlot)) {
            setSlots(slots.filter((slot) => slot !== newSlot))
        } else {
            setSlots([...slots, newSlot])
        }
    }

    const addLesson = (e) => {
        e.preventDefault()

        slots.sort()

        let apiInstance = new Kucukdevapi.LessonsApi();
        let lessonModel = new Kucukdevapi.LessonModel(lessonName, instrutcorName, absenceLimit, slots);
        apiInstance.createLesson(uid, sid, lessonModel, (error, data, response) => {
            if (error) {
                console.error(error);
            } else {
                console.log('API called successfully. Returned data: ' + data);
            }
        });

        props.history.push("/lessons")
    }

    const updateLesson = (e) => {
        e.preventDefault()

        slots.sort()

        let apiInstance = new Kucukdevapi.LessonsApi();
        let lid = lessonID;
        let updateLessonModel = new Kucukdevapi.UpdateLessonModel(lessonName, instrutcorName, absenceLimit, slots);
        apiInstance.updateLesson(uid, sid, lid, updateLessonModel, (error, data, response) => {
            if (error) {
                console.error(error);
            } else {
                console.log('API called successfully. Returned data: ' + data);
            }
        });

        props.history.push("/lessons")
    }


    return (
        <div className="flex flex-col mt-4 xl:mx-40">
            <div className="flex flex-row justify-around mb-4">
                <Link to="/lessons" className="text-gray-800 text-base font-semibold hover:text-purple-600 mb-1 md:hidden">Show Lessons</Link>
                <Link to="/lessons/add-lesson" className="text-gray-800 text-base font-semibold hover:text-purple-600 mb-1 md:hidden">Add Lesson</Link>
                <Link to="/lessons/add-from-uis" className="text-gray-800 text-base font-semibold hover:text-purple-600 mb-1 md:hidden">Add from UIS</Link>
            </div>
            <div className="flex h-full">
                <div className="flex bg-white shadow-xl rounded flex-col w-full mx-auto mt-2">
                    <div className="w-full flex flex-col md:flex-row">
                        <div
                            className="w-full h-auto lg:block lg:w-7/12 bg-cover rounded-l-lg">
                            <h1 className="flex justify-center md:justify-start text-2xl ml-4 my-2">{lessonID ? "Select Updated Hours" : "Select Hours"}</h1>
                            <table className="min-w-full">
                                <thead>
                                    <tr className="">
                                        <th className="px-6 py-2 border-b-2 border-gray-300 text-sm leading-4 text-blue-500 tracking-wider">#</th>
                                        <th className="px-3 py-2 border-b-2 border-gray-300 text-sm leading-4 text-blue-500 tracking-wider">Mon</th>
                                        <th className="px-3 py-2 border-b-2 border-gray-300 text-sm leading-4 text-blue-500 tracking-wider">Tue</th>
                                        <th className="px-3 py-2 border-b-2 border-gray-300 text-sm leading-4 text-blue-500 tracking-wider">Wed</th>
                                        <th className="px-3 py-2 border-b-2 border-gray-300 text-sm leading-4 text-blue-500 tracking-wider">Thu</th>
                                        <th className="px-3 py-2 border-b-2 border-gray-300 text-sm leading-4 text-blue-500 tracking-wider">Fri</th>

                                    </tr>
                                </thead>
                                <tbody className="bg-white">
                                    {scheduleRows}
                                </tbody>
                            </table>
                            <p className="flex justify-center md:justify-end text-xs italic text-red-500 ml-4 my-2">*You can select slots of the lesson from the table.</p>

                        </div>
                        <div className="w-full lg:w-5/12 bg-white p-5 rounded-lg lg:rounded-l-none mx-auto">
                            <h3 className="pt-4 text-2xl text-center">{lessonID ? "Update Lesson" : "Add Lesson!"}</h3>
                            <form onSubmit={lessonID ? (e) => updateLesson(e) : (e) => addLesson(e)} className="px-8 pt-6 pb-8 mb-4 bg-white rounded">
                                <div className="mb-4">
                                    <label className="block mb-2 text-base font-bold text-gray-700">
                                        Lesson Name
                                    </label>
                                    <input
                                        className="w-full px-3 py-2 mb-3 text-base leading-medium text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                        id="lessonName"
                                        type="text"
                                        placeholder="EE213"
                                        defaultValue={lessonID && lessonName}
                                        name="lessonName"
                                        onChange={(e) => setLessonName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block mb-2 text-base font-bold text-gray-700">
                                        Instructor Name
            </label>
                                    <input
                                        className="w-full px-3 py-2 mb-3 text-base leading-medium text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                        id="instructorName"
                                        type="text"
                                        placeholder="John Doe"
                                        defaultValue={lessonID && instrutcorName}
                                        name="instructorName"
                                        onChange={(e) => setInstructorName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <div className="w-full mb-4 md:mr-2 md:mb-0">
                                        <label className="block mb-2 text-base font-bold text-gray-700">
                                            Absence Limit
                </label>
                                        <input
                                            className="w-full px-3 py-2 mb-3 text-base leading-medium text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                            id="absenceLimit"
                                            type="number"
                                            placeholder="20"
                                            value={absenceLimit}
                                            name="absenceLimit"
                                            min="0"
                                            onChange={(e) => setAbsenceLimit(e.target.value)}
                                            required
                                        />
                                        <div className="text-right">
                                            <button
                                                type="button"
                                                style={{ transition: "all .15s ease" }}
                                                onClick={() => setCalculateModal(true)}
                                                className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                                            >
                                                Calculate!
            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-6 text-center">
                                    <button
                                        className={`w-full px-4 py-2 font-bold text-white ${lessonID ? "bg-yellow-400 hover:bg-yellow-500" : "bg-blue-500 hover:bg-blue-700"} rounded-full  focus:outline-none focus:shadow-outline`}
                                        type="submit"
                                    >
                                        {lessonID ? "Update The Lesson" : "Add The Lesson"}
                                    </button>
                                </div>
                                <hr className="mb-6 border-t" />


                            </form>
                        </div>

                    </div>
                </div>
            </div >
            {calculateModal ? (
                <div>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                                    <h3 className="pt-4 text-2xl text-center">Calculate Absence Limit!</h3>

                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setCalculateModal(false)}
                                    >
                                        <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                            ×
                    </span>
                                    </button>
                                </div>
                                {/*body*/}
                                <form className="px-8 pt-6 pb-8 bg-white rounded">
                                    <div className="mb-4">
                                        <label className="block mb-2 text-base font-bold text-gray-700">
                                            Number of Weeks
            </label>
                                        <input
                                            className="w-full px-3 py-2 mb-3 text-base leading-medium text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                            id="numOfWeeks"
                                            type="number"
                                            name="numOfWeeks"
                                            value={numOfWeeks}
                                            onChange={(e) => setNumOfWeeks(e.target.value)}
                                        />
                                        <p className="flex justify-center text-xs italic text-red-500 my-2">It is always safer to choose week number less than what you think, so you will not have an unpleasent surprise.</p>

                                    </div>
                                    <div className="mb-4">
                                        <label className="block mb-2 text-base font-bold text-gray-700">
                                            Lesson Count Per Week
            </label>
                                        <input
                                            className="w-full px-3 py-2 mb-3 text-base leading-medium text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                            id="lessonPerWeek"
                                            type="number"
                                            name="lessonPerWeek"
                                            value={lessonPerWeek}
                                            onChange={(e) => setLessonPerWeek(e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <div className="w-full mb-4 md:mr-2 md:mb-0">
                                            <label className="block mb-2 text-base font-bold text-gray-700">
                                                Max Absence Percentage
                </label>
                                            <input
                                                className="w-full px-3 py-2 mb-3 text-base leading-medium text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                                id="maxPercentage"
                                                type="number"
                                                placeholder="20"
                                                name="maxPercentage"
                                                value={maxPercentage}
                                                onChange={(e) => setMaxPercentage(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <h1 className="flex justify-center text-2xl">{Math.round((((numOfWeeks * lessonPerWeek) / 100) * maxPercentage) * 100) / 100} Hours</h1>
                                </form>
                                {/*footer*/}
                                <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
                                    <button
                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                                        type="button"
                                        style={{ transition: "all .15s ease" }}
                                        onClick={() => setCalculateModal(false)}
                                    >
                                        Close
                  </button>
                                    <button
                                        className="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                                        type="button"
                                        style={{ transition: "all .15s ease" }}
                                        onClick={() => {
                                            setAbsenceLimit(parseInt((((numOfWeeks * lessonPerWeek) / 100) * maxPercentage)))
                                            setCalculateModal(false)
                                        }
                                        }
                                    >
                                        Use This Value
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

export default AddLesson
