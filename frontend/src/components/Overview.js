import { useState, useEffect, useContext } from "react";
import { Link } from 'react-router-dom'
import { UserContext } from "../Context";

var Kucukdevapi = require("kucukdevapi");

const Overview = ({ history }) => {
    const [login, setLogin] = useContext(UserContext);

    const [semester, setSemester] = useState({});
    const [lessons, setLessons] = useState([]);
    const [week, setWeek] = useState(1)

    let defaultClient = Kucukdevapi.ApiClient.instance;
    let OAuth2PasswordBearer =
        defaultClient.authentications["OAuth2PasswordBearer"];
    OAuth2PasswordBearer.accessToken = login.userToken;
    let uid = login.userID;
    let sid = login.semesterID;

    useEffect(() => {
        if (login) {
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
                    const weeksBetween = Math.round((data.endDate - data.startDate) / (7 * 24 * 60 * 60 * 1000))
                    let curWeek = Math.ceil((Date.now() - data.startDate) / (7 * 24 * 60 * 60 * 1000))
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
                    }
                }
            );
        } else {
            history.push("/signin")
        }
    }, [uid, sid, login, setLogin, history]);

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
                id: lessons[i]._id,
                name: lessons[i].name,
                color: colorArray[i % colorArray.length],
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

    const scheduleRows = [];
    for (let index = 1; index <= semester.slotCount; index++) {
        scheduleRows.push(
            <tr key={index}>
                <td className="px-6 pb-2 border-b text-blue-900 border-gray-500 text-sm leading-5">
                    {hour}
                </td>
                <td
                    className={`border border-gray-500 text-blue-900 text-sm leading-5`}
                >
                    {lessonSlots[0][index] &&
                        lessonSlots[0][index].map((e) => (
                            <div style={{ backgroundColor: `rgb(${e.color})` }} className="py-1 m-1"><Link className="hover:underline" to={`/lessons/${e.id}`}>{e.name}</Link></div>
                        ))}
                </td>
                <td
                    className={`border border-gray-500 text-blue-900 text-sm leading-5`}
                >
                    {lessonSlots[1][index] &&
                        lessonSlots[1][index].map((e) => (
                            <div style={{ backgroundColor: `rgb(${e.color})` }} className="py-1 m-1"><Link className="hover:underline" to={`/lessons/${e.id}`}>{e.name}</Link></div>
                        ))}
                </td>
                <td
                    className={`border border-gray-500 text-blue-900 text-sm leading-5`}
                >
                    {lessonSlots[2][index] &&
                        lessonSlots[2][index].map((e) => (
                            <div style={{ backgroundColor: `rgb(${e.color})` }} className="py-1 m-1"><Link className="hover:underline" to={`/lessons/${e.id}`}>{e.name}</Link></div>
                        ))}
                </td>
                <td
                    className={`border border-gray-500 text-blue-900 text-sm leading-5`}
                >
                    {lessonSlots[3][index] &&
                        lessonSlots[3][index].map((e) => (
                            <div style={{ backgroundColor: `rgb(${e.color})` }} className="py-1 m-1"><Link className="hover:underline" to={`/lessons/${e.id}`}>{e.name}</Link></div>
                        ))}
                </td>
                <td
                    className={`border-b border-gray-500 text-blue-900 text-sm leading-5`}
                >
                    {lessonSlots[4][index] &&
                        lessonSlots[4][index].map((e) => (
                            <div style={{ backgroundColor: `rgb(${e.color})` }} className="py-1 m-1"><Link className="hover:underline" to={`/lessons/${e.id}`}>{e.name}</Link></div>
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

    return (
        <div className="flex flex-col mt-8 xl:mx-40">
            <h1 className="flex justify-start text-2xl ml-8 md:ml-4">Your Overview <div className="font-extralight ml-2">Week {week}</div></h1>
            <div className="py-2 overflow-x-auto sm:px-6 pr-10 lg:px-8">
                <div className="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard px-8 pt-2 pb-8 rounded-bl-lg rounded-br-lg">
                    <table className="min-w-full">
                        <thead>
                            <tr className="">
                                <th className="px-6 py-3 border-b-2 border-gray-300 text-sm text-left leading-4 text-blue-500 tracking-wider">
                                    #
                </th>
                                <th className="px-6 py-3 border-b-2 border-gray-300 text-sm leading-4 text-blue-500 tracking-wider">
                                    Monday
                </th>
                                <th className="px-6 py-3 border-b-2 border-gray-300 text-sm leading-4 text-blue-500 tracking-wider">
                                    Tuesday
                </th>
                                <th className="px-6 py-3 border-b-2 border-gray-300 text-sm leading-4 text-blue-500 tracking-wider">
                                    Wednesday
                </th>
                                <th className="px-6 py-3 border-b-2 border-gray-300 text-sm leading-4 text-blue-500 tracking-wider">
                                    Thursday
                </th>
                                <th className="px-6 py-3 border-b-2 border-gray-300 text-sm leading-4 text-blue-500 tracking-wider">
                                    Friday
                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white  ">{scheduleRows}</tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Overview;
