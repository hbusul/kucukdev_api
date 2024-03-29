import { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../Context';

var Kucukdevapi = require('kucukdevapi');

const Attendance = ({ history }) => {
    const [login, setLogin] = useContext(UserContext);

    const [semester, setSemester] = useState({});
    const [lessons, setLessons] = useState([]);
    const [week, setWeek] = useState(1)
    const [scheduleRows, setScheduleRows] = useState([])
    const [semStartDate, setSemStartDate] = useState(new Date())
    const [dates, setDates] = useState([])

    const [oldAbsences, setOldAbsences] = useState([])
    const [oldAbsenceIDs, setOldAbsenceIDs] = useState([])
    const [absenceIDs, setAbsenceIDs] = useState([])
    const [absences, setAbsences] = useState([])
    const [presenceIDs, setPresenceIDs] = useState([])
    const [presences, setPresences] = useState([])

    let defaultClient = Kucukdevapi.ApiClient.instance;
    let OAuth2PasswordBearer = defaultClient.authentications["OAuth2PasswordBearer"];
    OAuth2PasswordBearer.accessToken = login.userToken;
    let uid = login.userID;
    let sid = login.semesterID;

    const weeksBetween = Math.round((semester.endDate - semester.startDate) / (7 * 24 * 60 * 60 * 1000))

    useEffect(() => {
        if (login) {
            if (login.semesterID === "null") {
                history.push("/semesters/add-semester")
            } else {
                let smestersApiInstance = new Kucukdevapi.SemestersApi();
                smestersApiInstance.getSingleSemester(uid, sid, (error, data, response) => {
                    if (error) {
                        console.error(error);
                        if (error.response.status === 401) {
                            setLogin(false)
                        }
                    } else {
                        console.log("API called successfully. Returned data: " + data);
                        setSemester(data);
                        setSemStartDate(data.startDate)
                        const abvDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
                        let startDay = abvDays.indexOf((String(data.startDate).split(" "))[0])

                        let curWeek = Math.ceil((Date.now() - data.startDate) / (7 * 24 * 60 * 60 * 1000) + (startDay * 0.15))
                        if (curWeek < 0) {
                            curWeek = String(1)
                        } else if (curWeek > weeksBetween) {
                            curWeek = String(weeksBetween)
                        } else {
                            curWeek = String(curWeek)
                        }
                        setWeek(curWeek)
                    }
                });

                let lessonsApiInstance = new Kucukdevapi.LessonsApi();
                lessonsApiInstance.listLessonsOfSemester(
                    uid,
                    sid,
                    (error, data, response) => {
                        if (error) {
                            console.error(error);
                            if (error.response.status === 401) {
                                setLogin(false)
                            }
                        } else {
                            console.log("API called successfully. Returned data: " + data);
                            setLessons(data);

                            const absenceArray = []
                            const absenceIDArray = []
                            for (let i = 0; i < data.length; i++) {
                                for (let j = 0; j < data[i].absences.length; j++) {
                                    let absenceStr = `${data[i].absences[j][0]},${data[i].absences[j][1]},${data[i].absences[j][2]},${data[i].absences[j][3]}` 
                                    absenceArray.push(absenceStr)
                                    absenceIDArray.push(data[i]._id)
                                }
                            }

                            setOldAbsences(absenceArray)
                            setOldAbsenceIDs(absenceIDArray)
                            setAbsences(absenceArray)
                            setAbsenceIDs(absenceIDArray)
                        }
                    }
                );
            }
        } else {
            history.push("/signin")
        }

    }, [uid, sid, login, setLogin, history, weeksBetween]);

    let strCol = "240,196,196x220,196,240x255,194,126x255,240,126x202,255,126x126,246,255x126,200,255x184,126,255x238,126,255x126,128,255x255,126,194x196,224,240x126,255,219x196,240,229x243,255,126x126,255,128"
    let colorArray = strCol.split("x")

    // const colorArray = [
    //     "bg-gray-400",
    //     "bg-red-600",
    //     "bg-yellow-500",
    //     "bg-green-600",
    //     "bg-blue-300",
    //     "bg-indigo-300",
    //     "bg-purple-600",
    //     "bg-pink-600",
    //     "bg-gray-900",
    //     "bg-green-900",
    //     "bg-indigo-900",
    //     "bg-purple-900",
    //     "bg-pink-900",
    // ];


    useEffect(() => {
        const abvDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        let curDay = abvDays.indexOf((String(new Date()).split(" "))[0])
        let startDay = abvDays.indexOf((String(semStartDate).split(" "))[0])

        const addDays = (date, days) => {
            const copy = new Date(Number(date))
            copy.setDate(date.getDate() + days - startDay)
            let resDate = String(copy).split(" ")
            return `${resDate[1]} ${resDate[2]}`
        }
        const dateArray = []
        for (let i = 0; i < 5; i++) {
            dateArray.push(addDays(semStartDate, ((Number(week) - 1) * 7) + i))
        }
        setDates(dateArray)

        let lessonSlots = {
            0: {},
            1: {},
            2: {},
            3: {},
            4: {},
        };

        for (let i = 0; i < lessons.length; i++) {
            for (let j = 0; j < lessons[i].slots.length; j++) {
                const day_hour = lessons[i].slots[j]
                if (!lessonSlots[day_hour[0]][day_hour[1]])
                    lessonSlots[day_hour[0]][day_hour[1]] = [];
                const arr = absences.filter((absence, index) => absence === `${week},${day_hour[0]},${day_hour[1]},${day_hour[2]}` && absenceIDs[index] === lessons[i]._id)
                const flag = arr.length > 0
                lessonSlots[day_hour[0]][day_hour[1]].push({
                    id: lessons[i]._id,
                    name: lessons[i].name,
                    color: colorArray[i % colorArray.length],
                    flag: !flag,
                    lab: day_hour[2]
                });
            }
        }

        let hour = String(semester.startHour);
        let resStart = hour.split(".");
        let startHour = Number(resStart[0]);
        let startMin = Number(resStart[1]);

        const period = semester.dLesson + semester.dBreak;
        const periodHour = parseInt(period / 60);
        const periodMin = period % 60;

        const scheduleArray = [];
        for (let index = 1; index <= semester.slotCount; index++) {
            scheduleArray.push(
                <tr key={index}>
                    <td className="px-6 pb-2 border-b text-blue-900 border-gray-500 text-sm leading-5">
                        {hour}
                    </td>
                    <td
                        className={`border border-gray-500 text-blue-900 text-sm leading-5 ${(curDay === 0 || curDay > 4) && "bg-gray-200"}`}
                    >
                        {lessonSlots[0][index] &&
                            lessonSlots[0][index].map((l) => (
                                <div style={{ backgroundColor: `rgb(${l.color})` }} className="py-1 m-1"><Link className="hover:underline" to={`/lessons/${l.id}`}>{`${l.name} ${l.lab ? " LAB" : ""}`}</Link> <input className="ml-2" onChange={(e) => selectAbsences(e, `${week},0,${index},${l.lab ? "1" : "0"}`, l)} checked={l.flag} type="checkbox" /></div>
                            ))}
                    </td>
                    <td
                        className={`border border-gray-500 text-blue-900 text-sm leading-5 ${curDay === 1 && "bg-gray-200"}`}
                    >
                        {lessonSlots[1][index] &&
                            lessonSlots[1][index].map((l) => (
                                <div style={{ backgroundColor: `rgb(${l.color})` }} className="py-1 m-1"><Link className="hover:underline" to={`/lessons/${l.id}`}>{`${l.name} ${l.lab ? " LAB" : ""}`}</Link> <input className="ml-2" onChange={(e) => selectAbsences(e, `${week},1,${index},${l.lab ? "1" : "0"}`, l)} checked={l.flag} type="checkbox" /></div>
                            ))}
                    </td>
                    <td
                        className={`border border-gray-500 text-blue-900 text-sm leading-5 ${curDay === 2 && "bg-gray-200"}`}
                    >
                        {lessonSlots[2][index] &&
                            lessonSlots[2][index].map((l) => (
                                <div style={{ backgroundColor: `rgb(${l.color})` }} className="py-1 m-1"><Link className="hover:underline" to={`/lessons/${l.id}`}>{`${l.name} ${l.lab ? " LAB" : ""}`}</Link> <input className="ml-2" onChange={(e) => selectAbsences(e, `${week},2,${index},${l.lab ? "1" : "0"}`, l)} checked={l.flag} type="checkbox" /></div>
                            ))}
                    </td>
                    <td
                        className={`border border-gray-500 text-blue-900 text-sm leading-5 ${curDay === 3 && "bg-gray-200"}`}
                    >
                        {lessonSlots[3][index] &&
                            lessonSlots[3][index].map((l) => (
                                <div style={{ backgroundColor: `rgb(${l.color})` }} className="py-1 m-1"><Link className="hover:underline" to={`/lessons/${l.id}`}>{`${l.name} ${l.lab ? " LAB" : ""}`}</Link> <input className="ml-2" onChange={(e) => selectAbsences(e, `${week},3,${index},${l.lab ? "1" : "0"}`, l)} checked={l.flag} type="checkbox" /></div>
                            ))}
                    </td>
                    <td
                        className={`border-b border-gray-500 text-blue-900 text-sm leading-5 ${curDay === 4 && "bg-gray-200"}`}
                    >
                        {lessonSlots[4][index] &&
                            lessonSlots[4][index].map((l) => (
                                <div style={{ backgroundColor: `rgb(${l.color})` }} className="py-1 m-1"><Link className="hover:underline" to={`/lessons/${l.id}`}>{`${l.name} ${l.lab ? " LAB" : ""}`}</Link> <input className="ml-2" onChange={(e) => selectAbsences(e, `${week},4,${index},${l.lab ? "1" : "0"}`, l)} checked={l.flag} type="checkbox" /></div>
                            ))}
                    </td>
                </tr>
            );

            startHour += periodHour;
            startMin += periodMin;

            if (startMin >= 60) {
                startHour += 1;
                startMin = startMin % 60;
            }

            if (startMin < 10) {
                hour = startHour + ".0" + startMin;
            } else {
                hour = startHour + "." + startMin;
            }
        }

        setScheduleRows(scheduleArray)

    }, [semester, lessons, absenceIDs, week, absences, presences, semStartDate])


    const selectAbsences = (e, newAbs, l) => {
        if (e.target.checked) {
            let place;
            for (let i = 0; i < absences.length; i++) {
                if (absences[i] === newAbs && absenceIDs[i] === l.id) {
                    place = i
                }
            }
            setAbsenceIDs(absenceIDs.filter((id, index) => index !== place))
            setAbsences(absences.filter((absence, index) => index !== place))
            setPresenceIDs([...presenceIDs, l.id])
            setPresences([...presences, newAbs])
        } else {
            let place;
            for (let i = 0; i < presences.length; i++) {
                if (presences[i] === newAbs && presenceIDs[i] === l.id) {
                    place = i
                }
            }
            setAbsenceIDs([...absenceIDs, l.id])
            setAbsences([...absences, newAbs])
            setPresenceIDs(presenceIDs.filter((id, index) => index !== place))
            setPresences(presences.filter((presence, index) => index !== place))
        }
    }

    const setNext = () => {
        if (Number(week) + 1 <= weeksBetween) {
            let cWeek = Number(week) + 1
            setWeek(String(cWeek))
        }
    }

    const setPrevious = () => {
        if (Number(week) - 1 > 0) {
            let cWeek = Number(week) - 1
            setWeek(String(cWeek))
        }
    }

    const saveWeek = () => {
        const indexes = []
        for (let i = 0; i < absences.length; i++) {
            for (let j = 0; j < oldAbsences.length; j++) {
                if (absences[i] === oldAbsences[j] && absenceIDs[i] === oldAbsenceIDs[j]) {
                    indexes.push(i)
                }
            }
        }

        let indexAbsence = [...absences]
        let indexID = [...absenceIDs]

        indexAbsence = indexAbsence.filter((absence, index) => -1 === indexes.indexOf((index)))
        indexID = indexID.filter((id, index) => -1 === indexes.indexOf((index)))

        let apiInstance = new Kucukdevapi.LessonsApi();

        for (let k = 0; k < indexAbsence.length; k++) {
            let absence = indexAbsence[k].split(",");
            let lid = indexID[k];
            let absenceModel = new Kucukdevapi.LessonAbsenceModel({   
                    week: parseInt(absence[0]), 
                    day: parseInt(absence[1]), 
                    hour: parseInt(absence[2]), 
                    isLab: parseInt(absence[3])
            });
            apiInstance.createAbsence(uid, sid, lid, absenceModel, (error, data, response) => {
                if (error) {
                    console.error(error);
                } else {
                    console.log('API called successfully. Returned data: ' + data);
                }
            });
        }

        for (let l = 0; l < presences.length; l++) {
            let presence = presences[l].split(",");
            let lid = presenceIDs[l];
            let absenceModel = new Kucukdevapi.LessonAbsenceModel({
                week: parseInt(presence[0]), 
                day: parseInt(presence[1]), 
                hour: parseInt(presence[2]), 
                isLab: parseInt(presence[3])
            });
            apiInstance.deleteAbsence(uid, sid, lid, absenceModel, (error, data, response) => {
                if (error) {
                    console.error(error);
                } else {
                    console.log('API called successfully. Returned data: ' + data);
                }
            });
        }

    }


    return (
        <div className="flex flex-col mt-8 xl:mx-40">
            <h1 className="flex justify-start text-2xl ml-8 md:ml-4">Your Attendance <div className="font-extralight ml-2">Week {week}</div></h1>
            <div className="py-2 overflow-x-auto sm:px-6 pr-10 lg:px-8">
                <div className="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard px-8 pt-2 rounded-bl-lg rounded-br-lg">
                    <table className="min-w-full">
                        <thead>
                            <tr className="">
                                <th className="px-6 py-3 border-b-2 border-gray-300 text-sm text-left leading-4 text-blue-500 tracking-wider">#</th>
                                <th className="px-6 py-3 border-b-2 border-gray-300 text-sm leading-4 text-blue-500 tracking-wider"><div className="text-gray-600">{dates[0]}</div> Monday</th>
                                <th className="px-6 py-3 border-b-2 border-gray-300 text-sm leading-4 text-blue-500 tracking-wider"><div className="text-gray-600">{dates[1]}</div> Tuesday</th>
                                <th className="px-6 py-3 border-b-2 border-gray-300 text-sm leading-4 text-blue-500 tracking-wider"><div className="text-gray-600">{dates[2]}</div> Wednesday</th>
                                <th className="px-6 py-3 border-b-2 border-gray-300 text-sm leading-4 text-blue-500 tracking-wider"><div className="text-gray-600">{dates[3]}</div> Thursday</th>
                                <th className="px-6 py-3 border-b-2 border-gray-300 text-sm leading-4 text-blue-500 tracking-wider"><div className="text-gray-600">{dates[4]}</div> Friday</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white  ">
                            {scheduleRows}
                        </tbody>
                    </table>
                    <div className="flex flex-row justify-between">
                        <div className="flex text-xs md:text-base my-4">
                            <button onClick={() => saveWeek()}

                                className="px-8 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"

                            >
                                Save All Changes
                </button>
                        </div>

                        <div className="sm:flex-1 sm:flex sm:items-center sm:justify-end my-4 work-sans">
                            <div>
                                <nav className="relative z-0 inline-flex shadow-sm">
                                    <div>
                                        <button onClick={() => setPrevious()} className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150" aria-label="Previous">
                                            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                    </div>
                                    <div v-if="pagination.current_page < pagination.last_page">
                                        <button onClick={() => setNext()} className="-ml-px relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150" aria-label="Next">
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
