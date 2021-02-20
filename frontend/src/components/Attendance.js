import React, { useState, useEffect } from 'react'

var Kucukdevapi = require('kucukdevapi');

const Attendance = () => {
    const [semester, setSemester] = useState({})
    const [lessons, setLessons] = useState([])
    const [week, setWeek] = useState(1)
    const [absences, setAbsences] = useState([])
    const [presences, setPresences] = useState([])

    const USER_LOGIN = JSON.parse(localStorage.getItem("USER_LOGIN"))
    const CURRENT_SEMESTER = JSON.parse(localStorage.getItem("CURRENT_SEMESTER"))
    let defaultClient = Kucukdevapi.ApiClient.instance;
    let OAuth2PasswordBearer = defaultClient.authentications['OAuth2PasswordBearer'];
    OAuth2PasswordBearer.accessToken = USER_LOGIN.userToken;
    let uid = USER_LOGIN.userID;
    let sid = CURRENT_SEMESTER.currentSemester;

    useEffect(() => {

        let smestersApiInstance = new Kucukdevapi.SemestersApi();
        smestersApiInstance.getSingleSemester(uid, sid, (error, data, response) => {
            if (error) {
                console.error(error);
            } else {
                console.log('API called successfully. Returned data: ' + data);
                setSemester(data)
            }
        });

        let lessonsApiInstance = new Kucukdevapi.LessonsApi();
        lessonsApiInstance.listLessonsOfSemester(uid, sid, (error, data, response) => {
            if (error) {
                console.error(error);
            } else {
                console.log('API called successfully. Returned data: ' + data);
                setLessons(data)
                const absentArray = []
                for (let i = 0; i < data.length; i++) {
                    for (let j = 0; j < data[i].absences.length; j++) {
                        absentArray.push(`${data[i]._id}/${data[i].absences[j]}`)
                    }
                }
                setAbsences(absentArray)
            }
        });
    }, [uid, sid])

    const setAttendace = (type) => {
        console.log(type)
    }

    const colorArray = ["bg-gray-400", "bg-red-600", "bg-yellow-500", "bg-green-600", "bg-blue-300", "bg-indigo-300", "bg-purple-600", "bg-pink-600", "bg-gray-900", "bg-green-900", "bg-indigo-900", "bg-purple-900", "bg-pink-900"]
    let lessonNames = []
    let lessonSlots = []
    let lessonColors = []

    for (let i = 0; i < lessons.length; i++) {
        for (let j = 0; j < (lessons[i].slots).length; j++) {
            lessonNames.push(lessons[i].name)
            lessonSlots.push(lessons[i].slots[j])
            lessonColors.push(colorArray[i])
        }
    }

    let hour = String(semester.startHour)
    let resStart = hour.split(".")
    let startHour = Number(resStart[0])
    let startMin = Number(resStart[1])

    const period = semester.dLesson + semester.dBreak
    const periodHour = parseInt(period / 60)
    const periodMin = period % 60

    const scheduleRows = [];
    for (let index = 1; index <= semester.slotCount; index++) {
        scheduleRows.push(<tr key={index}>
            <td className="px-6 py-3 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">{hour}</td>
            <td className={`border border-gray-500 text-blue-900 text-sm leading-5 ${lessonColors[lessonSlots.indexOf(`0,${index}`)]}`}>{lessonSlots.includes(`0,${index}`) && <div className="flex flex-col items-center" >{lessonNames[lessonSlots.indexOf(`0,${index}`)]} <input onChange={(e) => setAttendace(e.target.checked)} type="checkbox" /></div>}</td>
            <td className={`border border-gray-500 text-blue-900 text-sm leading-5 ${lessonColors[lessonSlots.indexOf(`1,${index}`)]}`}>{lessonSlots.includes(`1,${index}`) && <div className="flex flex-col items-center" >{lessonNames[lessonSlots.indexOf(`1,${index}`)]} <input onChange={(e) => setAttendace(e.target.checked)} type="checkbox" /></div>}</td>
            <td className={`border border-gray-500 text-blue-900 text-sm leading-5 ${lessonColors[lessonSlots.indexOf(`2,${index}`)]}`}>{lessonSlots.includes(`2,${index}`) && <div className="flex flex-col items-center" >{lessonNames[lessonSlots.indexOf(`2,${index}`)]} <input onChange={(e) => setAttendace(e.target.checked)} type="checkbox" /></div>}</td>
            <td className={`border border-gray-500 text-blue-900 text-sm leading-5 ${lessonColors[lessonSlots.indexOf(`3,${index}`)]}`}>{lessonSlots.includes(`3,${index}`) && <div className="flex flex-col items-center" >{lessonNames[lessonSlots.indexOf(`3,${index}`)]} <input onChange={(e) => setAttendace(e.target.checked)} type="checkbox" /></div>}</td>
            <td className={`border-b border-gray-500 text-blue-900 text-sm leading-5 ${lessonColors[lessonSlots.indexOf(`4,${index}`)]}`}>{lessonSlots.includes(`4,${index}`) && <div className="flex flex-col items-center" >{lessonNames[lessonSlots.indexOf(`4,${index}`)]} <input onChange={(e) => setAttendace(e.target.checked)} type="checkbox" /></div>}</td>
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

    return (
        <div className="flex flex-col mt-8 xl:mx-40">
            <h1 className="flex justify-start text-2xl ml-8 md:ml-4">Attendance</h1>
            <div className="mt-2 py-2 overflow-x-auto sm:px-6 pr-10 lg:px-8">
                <div className="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard px-8 pt-3 rounded-bl-lg rounded-br-lg">
                    <table className="min-w-full">
                        <thead>
                            <tr className="">
                                <th className="px-6 py-3 border-b-2 border-gray-300 text-sm text-left leading-4 text-blue-500 tracking-wider">#</th>
                                <th className="px-6 py-3 border-b-2 border-gray-300 text-sm leading-4 text-blue-500 tracking-wider">Monday</th>
                                <th className="px-6 py-3 border-b-2 border-gray-300 text-sm leading-4 text-blue-500 tracking-wider">Tuesday</th>
                                <th className="px-6 py-3 border-b-2 border-gray-300 text-sm leading-4 text-blue-500 tracking-wider">Wednesday</th>
                                <th className="px-6 py-3 border-b-2 border-gray-300 text-sm leading-4 text-blue-500 tracking-wider">Thursday</th>
                                <th className="px-6 py-3 border-b-2 border-gray-300 text-sm leading-4 text-blue-500 tracking-wider">Friday</th>

                            </tr>
                        </thead>
                        <tbody className="bg-white  ">
                            {scheduleRows}
                        </tbody>
                    </table>
                    <div className="flex flex-row justify-between">
                        <div className="flex text-xs md:text-base my-4">
                            <button

                                className="px-8 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-green-700 focus:outline-none focus:shadow-outline"

                            >
                                Save The Week
                </button>
                        </div>

                        <div className="sm:flex-1 sm:flex sm:items-center sm:justify-end my-4 work-sans">
                            <div>
                                <nav className="relative z-0 inline-flex shadow-sm">
                                    <div>
                                        <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150" aria-label="Previous">
                                            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                    </div>
                                    <div v-if="pagination.current_page < pagination.last_page">
                                        <button className="-ml-px relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150" aria-label="Next">
                                            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                    </div>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Attendance
