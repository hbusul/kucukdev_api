import { useEffect, useState, useContext } from 'react';
import { UserContext } from '../Context';

var Kucukdevapi = require('kucukdevapi');


const SemesterDetail = ({ history, match }) => {
    const [login, setLogin] = useContext(UserContext);

    const [lessons, setLessons] = useState([])
    const [absences, setAbsences] = useState()
    const [semester, setSemester] = useState({})
    const [semStartDate, setSemStartDate] = useState(Date.now())

    const semesterID = match.params.id;

    let defaultClient = Kucukdevapi.ApiClient.instance;
    let OAuth2PasswordBearer = defaultClient.authentications['OAuth2PasswordBearer'];
    OAuth2PasswordBearer.accessToken = login.userToken;

    let uid = login.userID;
    let sid = semesterID;

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
                    setSemester(data)
                    setSemStartDate(data.startDate)
                }
            });

            let lessonApiInstance = new Kucukdevapi.LessonsApi();
            lessonApiInstance.listLessonsOfSemester(uid, sid, (error, data, response) => {
                if (error) {
                    console.error(error);
                    if (error.response.status === 401) {
                        setLogin(false)
                    }
                } else {
                    console.log('API called successfully. Returned data: ' + data);
                    setLessons(data)
                }
            });
        } else {
            history.push("/signin")
        }
    }, [uid, sid, login, setLogin, history])


    useEffect(() => {
        const days = ["Mon", "Tue", "Wed", "Thu", "Fri"]

        const addDays = (date, days) => {
            const copy = new Date(Number(date))
            copy.setDate(date.getDate() + days)
            return copy
        }

        const absences = []
        for (let i = 0; i < lessons.length; i++) {
            lessons[i].absences.sort()
            for (let j = 0; j < lessons[i].absences.length; j++) {
                const resAbs = lessons[i].absences[j].split(",")
                let date = addDays(semStartDate, ((Number(resAbs[0]) - 1) * 7) + (Number(resAbs[1]) + 1))
                let resDate = String(date).split(" ");
                const finalDate = resDate[1] + " " + resDate[2] + ", " + resDate[3]
                absences.push({
                    id: lessons[i]._id,
                    name: lessons[i].name,
                    week: resAbs[0],
                    day: resAbs[1],
                    slot: resAbs[2],
                    date: finalDate
                })
            }
        }

        const absenceRows = []
        for (let k = 0; k < absences.length; k++) {
            absenceRows.push(
                <tr key={k}>
                    <td className="px-1 sm:px-4 py-2 whitespace-no-wrap border-b text-blue-900 text-left border-gray-500 text-sm leading-5">{absences[k].name}</td>
                    <td className="px-4 py-2 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm text-left leading-5">{days[absences[k].day]}</td>
                    <td className="px-0 sm:px-2 whitespace-no-wrap border-b border-gray-500 text-blue-900 text-sm leading-5">{absences[k].slot}</td>
                    <td className="px-2 py-2 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">{absences[k].week}</td>
                    <td className="px-2 py-2 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">{absences[k].date}</td>
                </tr>
            )

        }

        setAbsences(absenceRows)

    }, [lessons, semStartDate])

    const scheduleHeads = [];
    for (let index = 1; index <= semester.slotCount; index++) {
        scheduleHeads.push(<th key={index} className="px-4 py-2 border-b-2 border-gray-300 text-sm leading-4 text-blue-500 tracking-wider">{index}</th>);
    }

    const colorArray = [
        "bg-gray-400",
        "bg-red-600",
        "bg-yellow-500",
        "bg-green-600",
        "bg-blue-300",
        "bg-indigo-300",
        "bg-purple-600",
        "bg-pink-600",
        "bg-gray-900",
        "bg-green-900",
        "bg-indigo-900",
        "bg-purple-900",
        "bg-pink-900",
    ];


    let lessonSlots = {
        0: {},
        1: {},
        2: {},
        3: {},
        4: {},
    };

    for (let i = 0; i < lessons.length; i++) {
        for (let j = 0; j < lessons[i].slots.length; j++) {
            const day_hour = lessons[i].slots[j].split(",");
            if (!lessonSlots[day_hour[0]][day_hour[1]])
                lessonSlots[day_hour[0]][day_hour[1]] = [];
            lessonSlots[day_hour[0]][day_hour[1]].push({
                name: lessons[i].name,
                color: colorArray[i % colorArray.length],
            });
        }
    }

    const setScheduleDays = (index) => {
        const scheduleRows = []
        for (let j = 1; j <= semester.slotCount; j++) {
            scheduleRows.push(<td
                className={`border border-gray-500 text-blue-900 text-sm leading-5`}
            >
                {lessonSlots[index][j] &&
                    lessonSlots[index][j].map((e) => (
                        <div className={`${e.color} p-2`}></div>
                    ))}
            </td>)
        }
        return scheduleRows
    }

    const scheduleMon = setScheduleDays(0);
    const scheduleTue = setScheduleDays(1);
    const scheduleWed = setScheduleDays(2);
    const scheduleThu = setScheduleDays(3);
    const scheduleFri = setScheduleDays(4);

    const weeksBetween = (d1, d2) => {
        return String(Math.round((d2 - d1) / (7 * 24 * 60 * 60 * 1000)));
    }

    const resStartDate = String(semester.startDate).split(" ");
    const startDate = resStartDate[1] + " " + resStartDate[2] + ", " + resStartDate[3]

    const resEndDate = String(semester.endDate).split(" ");
    const endDate = resEndDate[1] + " " + resEndDate[2] + ", " + resEndDate[3]

    return (
        <div className="flex flex-col">
            <div className="flex flex-col lg:flex-row mt-4 mx-0 xl:mx-32">
                <div className="m-0 md:mx-2 xl:mx-12 overflow-x-auto">
                    <h1 className="flex justify-start text-2xl ml-8 md:ml-4 my-2">Summary of {semester.name}</h1>
                    <table className="min-w-full">
                        <thead>
                            <tr className="">
                                <th className="px-6 py-3 border-b-2 border-gray-300 text-sm text-left leading-4 text-blue-500 tracking-wider">#</th>
                                <th className="px-6 py-3 border-b-2 border-gray-300 text-sm leading-4 text-blue-500 tracking-wider"></th>
                            </tr>
                        </thead>
                        <tbody className="bg-white  ">
                            <tr>
                                <td className="px-4 sm:px-8 md:px-16 py-3 border-b text-blue-900 font-bold border-gray-500 text-sm text-left leading-5">Week Count</td>
                                <td className="px-4 sm:px-8 md:px-20 py-3 border-b text-blue-900 border-gray-500 text-sm text-left leading-5">{weeksBetween(semester.startDate, semester.endDate)}</td>
                            </tr>
                            <tr>
                                <td className="px-4 sm:px-8 md:px-16 py-3 border-b text-blue-900 font-bold border-gray-500 text-sm text-left leading-5">Start Date</td>
                                <td className="px-4 sm:px-8 md:px-20 py-3 border-b text-blue-900 border-gray-500 text-sm text-left leading-5">{startDate}</td>
                            </tr>
                            <tr>
                                <td className="px-4 sm:px-8 md:px-16 py-3 border-b text-blue-900 font-bold border-gray-500 text-sm text-left leading-5">End Date</td>
                                <td className="px-4 sm:px-8 md:px-20 py-3 border-b text-blue-900 border-gray-500 text-sm text-left leading-5">{endDate}</td>
                            </tr>
                            <tr>
                                <td className="px-4 sm:px-8 md:px-16 py-3 border-b text-blue-900 font-bold border-gray-500 text-sm text-left leading-5">Lesson Count</td>
                                <td className="px-4 sm:px-8 md:px-20 py-3 border-b text-blue-900 border-gray-500 text-sm text-left leading-5">{lessons.length}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="px-2 overflow-x-auto">
                    <h1 className="flex justify-start text-2xl ml-8 md:ml-4 my-2">Schedule</h1>
                    <table className="min-w-full">
                        <thead>
                            <tr className="">
                                <th className="px-3 py-2 border-b-2 border-gray-300 text-sm text-left leading-4 text-blue-500 tracking-wider">#</th>
                                {scheduleHeads}

                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            <tr>
                                <td className="py-2 border border-gray-500 text-blue-900 font-bold text-sm leading-5">Mon</td>
                                {scheduleMon}
                            </tr>
                            <tr>
                                <td className="py-2 border border-gray-500 text-blue-900 font-bold text-sm leading-5">Tue</td>
                                {scheduleTue}
                            </tr>
                            <tr>
                                <td className="py-2 border border-gray-500 text-blue-900 font-bold text-sm leading-5">Wed</td>
                                {scheduleWed}
                            </tr>
                            <tr>
                                <td className="py-2 border border-gray-500 text-blue-900 font-bold text-sm leading-5">Thu</td>
                                {scheduleThu}
                            </tr>
                            <tr>
                                <td className="py-2 border border-gray-500 text-blue-900 font-bold text-sm leading-5">Fri</td>
                                {scheduleFri}
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row ml-0 xl:ml-32">
                <div className="m-0 md:mx-2 xl:m-10 overflow-x-auto">
                    <h1 className="flex justify-start text-2xl ml-8 md:ml-4 my-2">Lessons</h1>
                    <table className="min-w-full">
                        <thead>
                            <tr className="">
                                <th className="px-1 sm:px-4 py-3 border-b-2 border-gray-300 text-sm text-left leading-4 text-blue-500 tracking-wider">Lesson Name</th>
                                <th className="px-4 py-3 border-b-2 border-gray-300 text-sm leading-4 text-blue-500 tracking-wider">Instructor</th>
                                <th className="px-0 sm:px-2 py-3 border-b-2 border-gray-300 text-sm leading-4 text-blue-500 tracking-wider">Absence</th>
                                <th className="px-2 py-3 border-b-2 border-gray-300 text-sm leading-4 text-blue-500 tracking-wider">Absence Limit</th>
                                <th className="px-2 py-3 border-b-2 border-gray-300"></th>
                            </tr>
                        </thead>
                        <tbody className="bg-white  ">
                            {
                                lessons.map((lesson, index) => {
                                    return (
                                        <tr key={lesson._id}>
                                            <td className="px-1 sm:px-4 py-2 whitespace-no-wrap border-b text-blue-900 font-bold text-left border-gray-500 text-sm leading-5">{lesson.name}</td>
                                            <td className="px-4 py-2 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">{lesson.instructor}</td>
                                            <td className="px-0 sm:px-2 whitespace-no-wrap border-b border-gray-500 text-blue-900 text-sm leading-5">{(lesson.absences).length}</td>
                                            <td className="px-2 py-2 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">{lesson.absenceLimit}</td>
                                            <td className="px-2 py-2 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5"><div className={`${colorArray[index]} p-2`}></div></td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>

                <div className="m-0 md:mx-2 xl:my-10 overflow-x-auto">
                    <h1 className="flex justify-start text-2xl ml-8 md:ml-4 my-2">Absence</h1>
                    <table className="min-w-full">
                        <thead>
                            <tr className="">
                                <th className="px-4 py-3 border-b-2 border-gray-300 text-sm text-left leading-4 text-blue-500 tracking-wider">Lesson Name</th>
                                <th className="px-4 py-3 border-b-2 border-gray-300 text-sm leading-4 text-blue-500 tracking-wider">Day</th>
                                <th className="px-4 py-3 border-b-2 border-gray-300 text-sm leading-4 text-blue-500 tracking-wider">Slot</th>
                                <th className="px-4 py-3 border-b-2 border-gray-300 text-sm leading-4 text-blue-500 tracking-wider">Week</th>
                                <th className="px-4 py-3 border-b-2 border-gray-300 text-sm leading-4 text-blue-500 tracking-wider">Date</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white  ">
                            {absences}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )


}


export default SemesterDetail