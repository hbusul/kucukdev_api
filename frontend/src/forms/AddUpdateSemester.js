import { useState, useContext, useEffect } from 'react'
import { UserContext } from '../Context';

var Kucukdevapi = require('kucukdevapi');

const AddSemester = ({ history, match }) => {
    const [login, setLogin] = useContext(UserContext);

    const [semesterName, setSemesterName] = useState("")
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [startHour, setStartHour] = useState()
    const [startMin, setStartMin] = useState()
    const [dLesson, setDLesson] = useState()
    const [dBreak, setDBreak] = useState()
    const [slotCount, setSlotCount] = useState()

    const [start, setStart] = useState()
    const [end, setEnd] = useState()

    const semesterID = match.params.id

    let defaultClient = Kucukdevapi.ApiClient.instance;
    let OAuth2PasswordBearer = defaultClient.authentications['OAuth2PasswordBearer'];
    OAuth2PasswordBearer.accessToken = login.userToken;
    let uid = login.userID;

    useEffect(() => {
        if (login) {
            if (semesterID) {
                let apiInstance = new Kucukdevapi.SemestersApi();
                let sid = semesterID;
                apiInstance.getSingleSemester(uid, sid, (error, data, response) => {
                    if (error) {
                        console.error(error);
                        if (error.response.status === 401) {
                            setLogin(false)
                        }
                    } else {
                        console.log('API called successfully. Returned data: ' + data);
                        setSemesterName(data.name)
                        const inputStart = `${data.startDate.getFullYear()}-${((data.startDate.getMonth() + 1) > 9 ? (data.startDate.getMonth() + 1) : `0${(data.startDate.getMonth() + 1)}`)}-${(data.startDate.getDate() > 9 ? data.startDate.getDate() : `0${data.startDate.getDate()}`)}`
                        const inputEnd = `${data.endDate.getFullYear()}-${((data.endDate.getMonth() + 1) > 9 ? (data.endDate.getMonth() + 1) : `0${(data.endDate.getMonth() + 1)}`)}-${(data.endDate.getDate() > 9 ? data.endDate.getDate() : `0${data.endDate.getDate()}`)}`
                        setStart(inputStart)
                        setEnd(inputEnd)

                        setStartDate(inputStart)
                        setEndDate(inputEnd)

                        const resHour = data.startHour.split(".")
                        setStartHour(resHour[0])
                        setStartMin(resHour[1])

                        setDLesson(data.dLesson)
                        setDBreak(data.dBreak)
                        setSlotCount(data.slotCount)
                    }
                });
            }
        } else {
            history.push("/signin")
        }
    }, [semesterID, history, login, setLogin, uid])

    const addSemester = (e) => {
        e.preventDefault();
        if (login) {
            const hour = `${startHour}.${startMin}`

            const newStart = `${String(startDate)}T00:00:00+00:00`
            const newEnd = `${String(endDate)}T00:00:00+00:00`

            console.log(startDate)
            console.log(newStart)

            let apiInstance = new Kucukdevapi.SemestersApi();
            let userSemesterModel = new Kucukdevapi.UserSemesterModel(semesterName, newStart, newEnd, hour, dLesson, dBreak, slotCount);
            apiInstance.createSemester(uid, userSemesterModel, (error, data, response) => {
                if (error) {
                    console.error(error);
                    if (error.response.status === 401) {
                        setLogin(false)
                    }
                } else {
                    console.log('API called successfully. Returned data: ' + data);
                    if (data.length === 1) {
                        setLogin({ userToken: login.userToken, userID: login.userID, semesterID: data[0]._id })

                        let updateSemesterModel = new Kucukdevapi.UpdateSemesterModel(data[0]._id);
                        let apiInstance = new Kucukdevapi.UsersApi();
                        apiInstance.updateCurrentSemester(uid, updateSemesterModel, (error, data, response) => {
                            if (error) {
                                console.error(error);
                            } else {
                                console.log('API called successfully. Returned data: ' + data);
                            }
                        });
                    }
                    history.push("/semesters")
                }
            });
        } else {
            history.push("/signin")
        }
    }

    const updateSemester = (e) => {
        e.preventDefault();

        if (login) {
            const hour = `${startHour}.${startMin}`

            const newStart = `${String(startDate)}T00:00:00+00:00`
            const newEnd = `${String(endDate)}T00:00:00+00:00`

            console.log(startDate)
            console.log(newStart)

            let apiInstance = new Kucukdevapi.SemestersApi();
            let sid = semesterID;
            let updateUserSemesterModel = new Kucukdevapi.UpdateUserSemesterModel(semesterName, newStart, newEnd, hour, dLesson, dBreak, slotCount);
            apiInstance.updateSemester(uid, sid, updateUserSemesterModel, (error, data, response) => {
                if (error) {
                    console.error(error);
                } else {
                    console.log('API called successfully. Returned data: ' + data);
                    history.push("/semesters")
                }
            });
        } else {
            history.push("/signin")
        }
    }

    return (
        <div>
            <div className="flex h-full">
                <div className="flex bg-white shadow-xl rounded flex-col md:w-2/3 sm:w-full mx-auto mt-4">
                    <div className="w-full flex">
                        <div
                            className="w-full h-auto bg-gray-400 hidden lg:block lg:w-5/12 bg-cover rounded-l-lg"
                            style={{ backgroundImage: `url("https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1950&q=80")` }}>
                        </div>
                        <div className="w-full lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none mx-auto">
                            <h3 className="pt-4 text-xl text-center">{semesterID ? "Update Semester" : "Add Semester"}</h3>
                            <form onSubmit={semesterID ? updateSemester.bind(this) : addSemester.bind(this)} className="px-8 pt-6 pb-8 mb-4 bg-white rounded">
                                <div className="mb-4">
                                    <label className="block mb-2 text-md font-bold text-gray-700" htmlFor="email">
                                        Semester Name
                            </label>
                                    <input
                                        className="w-full px-3 py-2 mb-3 text-md leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                        id="name"
                                        type="text"
                                        placeholder="2020-2021 Spring"
                                        name="name"
                                        defaultValue={semesterID && semesterName}
                                        onChange={(e) => setSemesterName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-4 md:flex md:justify-between">
                                    <div className="md:w-1/2 mb-4 md:mr-2 md:mb-0 sm:w-full">
                                        <label className="block mb-2 text-md font-bold text-gray-700" htmlFor="password">
                                            Start Date
                                </label>
                                        <input
                                            className="w-full px-3 py-2 mb-3 text-md leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                            id="startDate"
                                            type="date"
                                            placeholder="2018-05-18"
                                            name="startDate"
                                            defaultValue={semesterID && start}
                                            onChange={(e) => setStartDate(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="md:w-1/2  md:ml-2 sm:w-full">
                                        <label className="block mb-2 text-md font-bold text-gray-700" htmlFor="c_password">
                                            End Date
                                </label>
                                        <input
                                            className="w-full px-3 py-2 mb-3 text-md leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                            id="endDate"
                                            type="date"
                                            placeholder="2018-02-05"
                                            name="endDate"
                                            defaultValue={semesterID && end}
                                            onChange={(e) => setEndDate(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="mb-4 md:flex md:justify-between">
                                    <div className="md:w-1/2 mb-4 md:mr-2 md:mb-0 sm:w-full">
                                        <label className="block mb-2 text-md font-bold text-gray-700" htmlFor="password">
                                            Start Hour
                                </label>
                                        <div className="flex flex-row">
                                            <input
                                                className="w-full px-3 py-2 mb-3 text-md leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                                id="startHour"
                                                type="number"
                                                placeholder="8"
                                                name="startHour"
                                                defaultValue={semesterID && startHour}
                                                min="1"
                                                max="24"
                                                onChange={(e) => setStartHour(e.target.value)}
                                                required
                                            />
                                            <input
                                                className="w-full px-3 py-2 mb-3 text-md leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                                id="startMin"
                                                type="number"
                                                placeholder="30"
                                                name="startMin"
                                                defaultValue={semesterID && startMin}
                                                min="1"
                                                max="59"
                                                onChange={(e) => setStartMin(e.target.value)}
                                                required
                                            /></div>
                                    </div>
                                    <div className="md:w-1/2  md:ml-2 sm:w-full">
                                        <label className="block mb-2 text-md font-bold text-gray-700" htmlFor="c_password">
                                            Slot Count
                                </label>
                                        <input
                                            className="w-full px-3 py-2 mb-3 text-md leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                            id="slotCount"
                                            type="number"
                                            placeholder="14"
                                            name="slotCount"
                                            defaultValue={semesterID && slotCount}
                                            min="3"
                                            max="15"
                                            onChange={(e) => setSlotCount(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="mb-4 md:flex md:justify-between">
                                    <div className="md:w-1/2 mb-4 md:mr-2 md:mb-0 sm:w-full">
                                        <label className="block mb-2 text-md font-bold text-gray-700" htmlFor="password">
                                            Duration of a Lesson
                                </label>
                                        <input
                                            className="w-full px-3 py-2 mb-3 text-md leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                            id="dLesson"
                                            type="number"
                                            placeholder="50"
                                            name="dLesson"
                                            defaultValue={semesterID && dLesson}
                                            min="1"
                                            onChange={(e) => setDLesson(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="md:w-1/2  md:ml-2 sm:w-full">
                                        <label className="block mb-2 text-md font-bold text-gray-700" htmlFor="c_password">
                                            Duration of a Break
                                </label>
                                        <input
                                            className="w-full px-3 py-2 mb-3 text-md leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                            id="dBreak"
                                            type="number"
                                            placeholder="10"
                                            name="dBreak"
                                            defaultValue={semesterID && dBreak}
                                            min="1"
                                            onChange={(e) => setDBreak(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>



                                <div className="mb-6 text-center">
                                    <button
                                        className={`w-full px-4 py-2 font-bold text-white ${semesterID ? "bg-yellow-400 hover:bg-yellow-500" : "bg-blue-500 hover:bg-blue-700"} rounded-full focus:outline-none focus:shadow-outline`}
                                        type="submit"
                                    >
                                        {semesterID ? "Update The Semester" : "Add The Semester"}
                                    </button>
                                </div>
                                <hr className="mb-6 border-t" />
                            </form>
                        </div>
                    </div>
                </div>
            </div >
        </div>
    )
}

export default AddSemester