import React, { useState, useEffect } from 'react'

var Kucukdevapi = require('kucukdevapi');

const Overview = () => {
    const [semester, setSemester] = useState({})
    const [lessons, setLessons] = useState([])

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
            }
        });


    }, [uid, sid])

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
            <td className="px-6 py-1 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">{hour}</td>
            <td className={`border border-gray-500 text-blue-900 text-sm leading-5 ${lessonSlots.includes(`0,${index}`) && `${lessonColors[lessonSlots.indexOf(`0,${index}`)]}`}`}>{lessonSlots.includes(`0,${index}`) && `${lessonNames[lessonSlots.indexOf(`0,${index}`)]}`}</td>
            <td className={`border border-gray-500 text-blue-900 text-sm leading-5 ${lessonSlots.includes(`1,${index}`) && `${lessonColors[lessonSlots.indexOf(`1,${index}`)]}`}`}>{lessonSlots.includes(`1,${index}`) && `${lessonNames[lessonSlots.indexOf(`1,${index}`)]}`}</td>
            <td className={`border border-gray-500 text-blue-900 text-sm leading-5 ${lessonSlots.includes(`2,${index}`) && `${lessonColors[lessonSlots.indexOf(`2,${index}`)]}`}`}>{lessonSlots.includes(`2,${index}`) && `${lessonNames[lessonSlots.indexOf(`2,${index}`)]}`}</td>
            <td className={`border border-gray-500 text-blue-900 text-sm leading-5 ${lessonSlots.includes(`3,${index}`) && `${lessonColors[lessonSlots.indexOf(`3,${index}`)]}`}`}>{lessonSlots.includes(`3,${index}`) && `${lessonNames[lessonSlots.indexOf(`3,${index}`)]}`}</td>
            <td className={`border border-gray-500 text-blue-900 text-sm leading-5 ${lessonSlots.includes(`4,${index}`) && `${lessonColors[lessonSlots.indexOf(`4,${index}`)]}`}`}>{lessonSlots.includes(`4,${index}`) && `${lessonNames[lessonSlots.indexOf(`4,${index}`)]}`}</td>
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
            <h1 className="flex justify-start text-2xl ml-8 md:ml-4">Overview</h1>
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
                </div>
            </div>
        </div>
    )
}

export default Overview
