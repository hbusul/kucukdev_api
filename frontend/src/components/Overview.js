import React, { useState, useEffect } from 'react'

var Kucukdevapi = require('kucukdevapi');

const Overview = () => {
    const [semester, setSemester] = useState({})
    const [lessons, setLessons] = useState([])

    const USER_LOGIN = JSON.parse(localStorage.getItem("USER_LOGIN"))
    const CURRENT_SEMESTER = JSON.parse(localStorage.getItem("CURRENT_SEMESTER"))

    useEffect(() => {
        let defaultClient = Kucukdevapi.ApiClient.instance;
        let OAuth2PasswordBearer = defaultClient.authentications['OAuth2PasswordBearer'];
        OAuth2PasswordBearer.accessToken = USER_LOGIN.userToken;
        let uid = USER_LOGIN.userID;
        let sid = CURRENT_SEMESTER.currentSemester;

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
            }
        });


    }, [])

    let lessonNames = []
    let lessonSlots = []

    for (let i = 0; i < lessons.length; i++) {
        for (let j = 0; j < (lessons[i].slots).length; j++) {
            lessonNames.push(lessons[i].name)
            lessonSlots.push(lessons[i].slots[j])
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
            <td className="px-6 py-1 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">{hour}</td>
            <td className={`border border-gray-500 text-blue-900 text-sm leading-5 ${lessonSlots.includes(`0,${index}`) && "bg-blue-300"}`}>{lessonSlots.includes(`0,${index}`) && `${lessonNames[lessonSlots.indexOf(`0,${index}`)]}`}</td>
            <td className={`border border-gray-500 text-blue-900 text-sm leading-5 ${lessonSlots.includes(`1,${index}`) && "bg-blue-300"}`}>{lessonSlots.includes(`1,${index}`) && `${lessonNames[lessonSlots.indexOf(`1,${index}`)]}`}</td>
            <td className={`border border-gray-500 text-blue-900 text-sm leading-5 ${lessonSlots.includes(`2,${index}`) && "bg-blue-300"}`}>{lessonSlots.includes(`2,${index}`) && `${lessonNames[lessonSlots.indexOf(`2,${index}`)]}`}</td>
            <td className={`border border-gray-500 text-blue-900 text-sm leading-5 ${lessonSlots.includes(`3,${index}`) && "bg-blue-300"}`}>{lessonSlots.includes(`3,${index}`) && `${lessonNames[lessonSlots.indexOf(`3,${index}`)]}`}</td>
            <td className={`border border-gray-500 text-blue-900 text-sm leading-5 ${lessonSlots.includes(`4,${index}`) && "bg-blue-300"}`}>{lessonSlots.includes(`4,${index}`) && `${lessonNames[lessonSlots.indexOf(`4,${index}`)]}`}</td>
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
        <div className="flex flex-col my-8 xl:m-16 xl:mx-40">
            <h1 className="flex justify-start text-2xl ml-8 md:ml-4">Overview</h1>
            <div className="my-2 py-2 overflow-x-auto sm:px-6 pr-10 lg:px-8">
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
                    <div className="sm:flex-1 sm:flex sm:items-center sm:justify-end my-4 work-sans">
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
    )
}

export default Overview