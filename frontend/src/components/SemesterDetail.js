import { useEffect, useState } from 'react';

var Kucukdevapi = require('kucukdevapi');


const SemesterDetail = (props) => {
    const [lessons, setLessons] = useState([])
    const [semester, setSemester] = useState({})

    const semesterID = props.match.params.id;
    const USER_LOGIN = JSON.parse(localStorage.getItem("USER_LOGIN"))

    useEffect(() => {
        let defaultClient = Kucukdevapi.ApiClient.instance;
        let OAuth2PasswordBearer = defaultClient.authentications['OAuth2PasswordBearer'];
        OAuth2PasswordBearer.accessToken = USER_LOGIN.userToken;

        let semesterApiInstance = new Kucukdevapi.SemestersApi();
        let uid = USER_LOGIN.userID;
        let sid = semesterID;
        semesterApiInstance.getSingleSemester(uid, sid, (error, data, response) => {
            if (error) {
                console.error(error);
            } else {
                console.log('API called successfully. Returned data: ' + data);
                setSemester(data)
            }
        });

        let lessonApiInstance = new Kucukdevapi.LessonsApi();
        lessonApiInstance.listLessonsOfSemester(uid, sid, (error, data, response) => {
            if (error) {
                console.error(error);
            } else {
                console.log('API called successfully. Returned data: ' + data);
                setLessons(data)
            }
        });
    }, [])

    const final = [];
    for (let index = 1; index <= semester.slotCount; index++) {
        final.push(<th key={index} className="px-3 py-2 border-b-2 border-gray-300 text-sm leading-4 text-blue-500 tracking-wider">{index}</th>);
    }

    const weeksBetween = (d1, d2) => {
        return String(Math.round((d2 - d1) / (7 * 24 * 60 * 60 * 1000)));
    }

    const resStartDate = String(semester.startDate).split(" ");
    const startDate = resStartDate[1] + " " + resStartDate[2] + ", " + resStartDate[3]

    const resEndDate = String(semester.endDate).split(" ");
    const endDate = resEndDate[1] + " " + resEndDate[2] + ", " + resEndDate[3]

    return (
        <div className="flex flex-col">
            <div className="flex flex-col lg:flex-row my-4 xl:my-4 ml-0 lg:ml-32">
                <div className="m-0 md:mx-2 xl:mx-12 overflow-x-auto">
                    <h1 className="flex justify-start text-2xl ml-8 md:ml-4 my-2">Summary of {semester.name}</h1>
                    <table className="min-w-full">
                        <thead>
                            <tr className="">
                                <th className="px-6 py-3 border-b-2 border-gray-300 text-sm text-left leading-4 text-blue-500 tracking-wider">Week Count</th>
                                <th className="px-6 py-3 border-b-2 border-gray-300 text-sm leading-4 text-blue-500 tracking-wider">Start</th>
                                <th className="px-6 py-3 border-b-2 border-gray-300 text-sm leading-4 text-blue-500 tracking-wider">Finish</th>
                                <th className="px-6 py-3 border-b-2 border-gray-300 text-sm leading-4 text-blue-500 tracking-wider">Lesson Count</th>

                            </tr>
                        </thead>
                        <tbody className="bg-white  ">
                            <tr>
                                <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">{weeksBetween(semester.startDate, semester.endDate)}</td>
                                <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">{startDate}</td>
                                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-blue-900 text-sm leading-5">{endDate}</td>
                                <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">{lessons.length}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="m-0 md:m-2 xl:m-10 overflow-x-auto">
                    <h1 className="flex justify-start text-2xl ml-8 md:ml-4 my-2">Schedule</h1>
                    <table className="min-w-full">
                        <thead>
                            <tr className="">
                                <th className="px-3 py-2 border-b-2 border-gray-300 text-sm text-left leading-4 text-blue-500 tracking-wider">#</th>
                                {final}

                            </tr>
                        </thead>
                        <tbody className="bg-white  ">

                        </tbody>
                    </table>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row my-4 xl:my-8 ml-0 lg:ml-32">
                <div className="m-0 md:m-2 xl:m-10 overflow-x-auto">
                    <h1 className="flex justify-start text-2xl ml-8 md:ml-4 my-2">Lessons</h1>
                    <table className="min-w-full">
                        <thead>
                            <tr className="">
                                <th className="px-6 py-3 border-b-2 border-gray-300 text-sm text-left leading-4 text-blue-500 tracking-wider">Lesson Name</th>
                                <th className="px-6 py-3 border-b-2 border-gray-300 text-sm leading-4 text-blue-500 tracking-wider">Instructor</th>
                                <th className="px-6 py-3 border-b-2 border-gray-300 text-sm leading-4 text-blue-500 tracking-wider">Absence</th>
                                <th className="px-6 py-3 border-b-2 border-gray-300 text-sm leading-4 text-blue-500 tracking-wider">Absence Limit</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white  ">
                            {
                                lessons.map((lesson) => {
                                    return (
                                        <tr key={lesson._id}>
                                            <td className="px-6 py-2 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">{lesson.name}</td>
                                            <td className="px-6 py-2 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">{lesson.instructor}</td>
                                            <td className="px-6 py-2 whitespace-no-wrap border-b border-gray-500 text-blue-900 text-sm leading-5">{(lesson.absences).length}</td>
                                            <td className="px-6 py-2 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">{lesson.absenceLimit}</td>
                                        </tr>
                                    )
                                })
                            }
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
        </div>
    )


}


export default SemesterDetail