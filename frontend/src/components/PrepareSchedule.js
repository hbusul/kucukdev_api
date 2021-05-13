import { useState, useEffect, useContext } from "react"
import { UserContext } from "../Context"

var Kucukdevapi = require("kucukdevapi")

const PrepareSchedule = ({ history }) => {
    const [login, setLogin] = useContext(UserContext)

    const [showCurriculum, setShowCurriculum] = useState(false)
    const [showAdditionalLesson, setShowAdditionalLesson] = useState(false)
    const [showScheduleSelection, setShowScheduleSelection] = useState(false)

    const [department, setDepartment] = useState()
    const [year, setYear] = useState(1)
    const [semester, setSemester] = useState(1)
    const [startYear, setStartYear] = useState(new Date().getFullYear())
    const [nthSemester, setNthSemester] = useState(1)
    const [schedules, setSchedules] = useState([])
    const [scheduleIndex, setScheduleIndex] = useState(1)
    const [scheduleIndexList, setScheduleIndexList] = useState([])
    const [refresh, setRefresh] = useState(0)

    const [universities, setUniversities] = useState([])
    const [departments, setDepartments] = useState([])
    const [selectedUniversity, setSelectedUniversity] = useState("null")
    const [semesterLessons, setSemesterLessons] = useState([])
    const [searchedLessons, setSearchedLessons] = useState([])
    const [selectedLessons, setSelectedLessons] = useState([])
    const [scheduleLessons, setScheduleLessons] = useState([])
    const [scheduleRows, setScheduleRows] = useState([])
    const [instructorRows, setInstructorRows] = useState([])
    const [lessonGroups, setLessonGroups] = useState({})

    const [start, setStart] = useState(0)
    const [end, setEnd] = useState(10)

    useEffect(() => {
        if (login) {
            if (login.universityID === "null") {
                let apiInstance = new Kucukdevapi.UniversitiesApi()
                apiInstance.listUniversities((error, data, response) => {
                    if (error) {
                        console.error(error)
                        if (error.response.status === 401) {
                            setLogin(false)
                        }
                    } else {
                        console.log("da")
                        setUniversities(data)
                    }
                })
            } else {
                let apiInstance = new Kucukdevapi.DepartmentsApi()
                let unid = login.universityID
                apiInstance.listUniversityDepartments(
                    unid,
                    (error, data, response) => {
                        if (error) {
                            console.error(error)
                            if (error.response.status === 401) {
                                setLogin(false)
                            }
                        } else {
                            console.log(
                                "API called successfully. Returned data: " +
                                    data
                            )
                            setDepartments(data)
                            if (data.length > 0) {
                                setDepartment(data[0]._id)
                            }
                        }
                    }
                )
            }
        } else {
            history.push("/signin")
        }
    }, [history, refresh, login, setLogin])

    let strCol =
        "240,196,196x220,196,240x255,194,126x255,240,126x202,255,126x126,246,255x126,200,255x184,126,255x238,126,255x126,128,255x255,126,194x196,224,240x126,255,219x196,240,229x243,255,126x126,255,128"
    let colorArray = strCol.split("x")

    useEffect(() => {
        const scheduleIndexArray = []
        for (let i = 0; i < schedules.length; i++) {
            scheduleIndexArray.push(
                <button
                    onClick={() => setScheduleIndex(i + 1)}
                    className={`mt-2 py-2 px-4 mr-2 ${
                        scheduleIndex === i + 1 ? "bg-blue-400" : "bg-gray-300"
                    }`}
                >
                    {i + 1}
                </button>
            )
        }
        setScheduleIndexList(scheduleIndexArray)

        let lessonSlots = {
            0: {},
            1: {},
            2: {},
            3: {},
            4: {},
        }

        const instructorArray = []

        if (scheduleLessons.length > 0) {
            for (
                let i = 0;
                i < scheduleLessons[scheduleIndex - 1].length;
                i++
            ) {
                instructorArray.push(
                    <tr key={scheduleLessons[scheduleIndex - 1][i].name}>
                        <td className="px-4 py-2 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
                            {scheduleLessons[scheduleIndex - 1][i].name}
                        </td>
                        <td className="px-4 py-2 whitespace-no-wrap border-b border-gray-500 text-blue-900 text-sm leading-5">
                            {scheduleLessons[scheduleIndex - 1][i].instructor}
                        </td>
                    </tr>
                )
                for (
                    let j = 0;
                    j < scheduleLessons[scheduleIndex - 1][i].slots.length;
                    j++
                ) {
                    const day_hour =
                        scheduleLessons[scheduleIndex - 1][i].slots[j].split(
                            ","
                        )
                    const isLab = day_hour[2] === "1" ? true : false
                    if (!lessonSlots[day_hour[0]][day_hour[1]])
                        lessonSlots[day_hour[0]][day_hour[1]] = []
                    lessonSlots[day_hour[0]][day_hour[1]].push({
                        // id: scheduleLessons[scheduleIndex - 1][i]._id,
                        name: scheduleLessons[scheduleIndex - 1][i].name,
                        color: colorArray[i % colorArray.length],
                        lab: isLab,
                    })
                }
            }
        }

        setInstructorRows(instructorArray)

        const scheduleArray = []
        for (let index = 1; index <= 15; index++) {
            scheduleArray.push(
                <tr key={index}>
                    <td className="px-1 pb-2 border-b text-blue-900 border-gray-500 text-sm leading-5">
                        {index}
                    </td>
                    <td
                        className={`border border-gray-500 text-blue-900 text-sm leading-5`}
                    >
                        {lessonSlots[0][index] &&
                            lessonSlots[0][index].map((e) => (
                                <div
                                    style={{
                                        backgroundColor: `rgb(${e.color})`,
                                    }}
                                    className="py-1 m-1"
                                >
                                    <h1 to={`/lessons/${e.id}`}>{`${e.name} ${
                                        e.lab ? " LAB" : ""
                                    }`}</h1>
                                </div>
                            ))}
                    </td>
                    <td
                        className={`border border-gray-500 text-blue-900 text-sm leading-5`}
                    >
                        {lessonSlots[1][index] &&
                            lessonSlots[1][index].map((e) => (
                                <div
                                    style={{
                                        backgroundColor: `rgb(${e.color})`,
                                    }}
                                    className="py-1 m-1"
                                >
                                    <h1 to={`/lessons/${e.id}`}>{`${e.name} ${
                                        e.lab ? " LAB" : ""
                                    }`}</h1>
                                </div>
                            ))}
                    </td>
                    <td
                        className={`border border-gray-500 text-blue-900 text-sm leading-5`}
                    >
                        {lessonSlots[2][index] &&
                            lessonSlots[2][index].map((e) => (
                                <div
                                    style={{
                                        backgroundColor: `rgb(${e.color})`,
                                    }}
                                    className="py-1 m-1"
                                >
                                    <h1 to={`/lessons/${e.id}`}>{`${e.name} ${
                                        e.lab ? " LAB" : ""
                                    }`}</h1>
                                </div>
                            ))}
                    </td>
                    <td
                        className={`border border-gray-500 text-blue-900 text-sm leading-5`}
                    >
                        {lessonSlots[3][index] &&
                            lessonSlots[3][index].map((e) => (
                                <div
                                    style={{
                                        backgroundColor: `rgb(${e.color})`,
                                    }}
                                    className="py-1 m-1"
                                >
                                    <h1 to={`/lessons/${e.id}`}>{`${e.name} ${
                                        e.lab ? " LAB" : ""
                                    }`}</h1>
                                </div>
                            ))}
                    </td>
                    <td
                        className={`border-b border-gray-500 text-blue-900 text-sm leading-5`}
                    >
                        {lessonSlots[4][index] &&
                            lessonSlots[4][index].map((e) => (
                                <div
                                    style={{
                                        backgroundColor: `rgb(${e.color})`,
                                    }}
                                    className="py-1 m-1"
                                >
                                    <h1 to={`/lessons/${e.id}`}>{`${e.name} ${
                                        e.lab ? " LAB" : ""
                                    }`}</h1>
                                </div>
                            ))}
                    </td>
                </tr>
            )
        }

        setScheduleRows(scheduleArray)
    }, [scheduleIndex, schedules, scheduleLessons])

    useEffect(() => {
        setNthSemester(2 * Number(year) - 2 + Number(semester))
    }, [year, semester])

    const createSchedule = () => {
        const selectedLessonCodes = selectedLessons.map((i) => i.code)
        let apiInstance = new Kucukdevapi.SchedulerApi()
        apiInstance.createSchedule(
            login.universityID,
            selectedLessonCodes,
            (error, data, response) => {
                if (error) {
                    console.error(error)
                } else {
                    console.log(
                        "API called successfully. Returned data: " + data
                    )
                    console.log(data)
                    setSchedules(data)

                    const scheduleLessonArray = []
                    for (let i = 0; i < data.length; i++) {
                        const oneScheduleArray = []
                        for (let j = 0; j < Object.keys(data[i]).length; j++) {
                            let res = semesterLessons.find(
                                (lesson) =>
                                    lesson.code === Object.keys(data[i])[j]
                            )
                            let secCode = `${res.code}.${
                                res.sections[Object.values(data[i])[j]].section
                            }`
                            oneScheduleArray.push({
                                name: secCode,
                                instructor:
                                    res.sections[Object.values(data[i])[j]]
                                        .instructor,
                                slots: res.sections[Object.values(data[i])[j]]
                                    .slots,
                                absenceLimit: res.absenceLimit,
                            })
                        }
                        scheduleLessonArray.push(oneScheduleArray)
                    }
                    setScheduleLessons(scheduleLessonArray)
                }
            }
        )

        console.log(selectedLessonCodes)
    }

    const importProgram = () => {
        let apiInstance = new Kucukdevapi.LessonsApi()
        let uid = login.userID
        let sid = login.semesterID

        for (let i = 0; i < scheduleLessons[scheduleIndex - 1].length; i++) {
            let lessonModel = new Kucukdevapi.LessonModel(
                scheduleLessons[scheduleIndex - 1][i].name,
                scheduleLessons[scheduleIndex - 1][i].instructor,
                scheduleLessons[scheduleIndex - 1][i].absenceLimit,
                scheduleLessons[scheduleIndex - 1][i].slots
            )
            apiInstance.createLesson(
                uid,
                sid,
                lessonModel,
                (error, data, response) => {
                    if (error) {
                        console.error(error)
                    } else {
                        console.log(
                            "API called successfully. Returned data: " + data
                        )
                    }
                }
            )
        }

        history.push("/overview")
    }

    const selectLessons = (newLesson) => {
        let res = selectedLessons.find(
            (lesson) => lesson.code === newLesson.code
        )

        if (res) {
            setSelectedLessons(
                selectedLessons.filter(
                    (lesson) => lesson.code !== newLesson.code
                )
            )
        } else {
            setSelectedLessons([...selectedLessons, newLesson])
        }
    }

    const onSearchLesson = (key) => {
        if (key !== "") {
            setSearchedLessons(
                semesterLessons.filter(
                    (lesson) =>
                        lesson.code.toUpperCase().includes(key.toUpperCase()) ||
                        lesson.name.toUpperCase().includes(key.toUpperCase())
                )
            )
            setStart(0)
            setEnd(10)
        } else {
            setSearchedLessons(semesterLessons)
        }
    }

    const onSelectUniversity = (e) => {
        e.preventDefault()

        if (selectedUniversity !== "null") {
            let apiInstance = new Kucukdevapi.UsersApi()
            let uid = login.userID
            let updateUniversityModel = new Kucukdevapi.UpdateUniversityModel(
                selectedUniversity
            )
            apiInstance.updateCurrentUniversity(
                uid,
                updateUniversityModel,
                (error, data, response) => {
                    if (error) {
                        console.error(error)
                    } else {
                        console.log(
                            "API called successfully. Returned data: " + data
                        )
                        setLogin({
                            userToken: login.userToken,
                            userID: login.userID,
                            userGroup: login.userGroup,
                            semesterID: login.semesterID,
                            universityID: selectedUniversity,
                        })
                        setRefresh((x) => x + 1)
                    }
                }
            )
        }
    }

    const onSelectDepartmentInformation = (e) => {
        e.preventDefault()

        let apiInstance = new Kucukdevapi.CurriculumsApi()
        let unid = login.universityID
        let depid = department
        apiInstance.listUniversityDepartmentCurriculums(
            unid,
            depid,
            (error, data, response) => {
                if (error) {
                    console.error(error)
                    if (error.response.status === 401) {
                        setLogin(false)
                    }
                } else {
                    console.log(
                        "API called successfully. Returned data: " + data
                    )
                    for (let i = 0; i < data.length; i++) {
                        if (
                            startYear >= data[i].startYear &&
                            startYear < data[i].endYear
                        ) {
                            const localLessonGroups = {}
                            for (let j = 0; j < data[i].semesters.length; j++) {
                                if (
                                    nthSemester ===
                                    data[i].semesters[j].semester
                                ) {
                                    const selectedLessons = []
                                    for (
                                        let k = 0;
                                        k < data[i].semesters[j].lessons.length;
                                        k++
                                    ) {
                                        if (
                                            !(
                                                data[i].semesters[j].lessons[k]
                                                    .lessonType in
                                                localLessonGroups
                                            )
                                        )
                                            localLessonGroups[
                                                data[i].semesters[j].lessons[
                                                    k
                                                ].lessonType
                                            ] = []
                                        localLessonGroups[
                                            data[i].semesters[j].lessons[k]
                                                .lessonType
                                        ].push(data[i].semesters[j].lessons[k])

                                        if (
                                            data[i].semesters[j].lessons[k]
                                                .lessonType === "default"
                                        ) {
                                            selectedLessons.push(
                                                data[i].semesters[j].lessons[k]
                                            )
                                        } else {
                                            if (
                                                localLessonGroups[
                                                    data[i].semesters[j]
                                                        .lessons[k].lessonType
                                                ].length === 1
                                            ) {
                                                selectedLessons.push(
                                                    data[i].semesters[j]
                                                        .lessons[k]
                                                )
                                            }
                                        }
                                    }
                                    setLessonGroups(localLessonGroups)
                                    setSelectedLessons(selectedLessons)
                                    setShowCurriculum(true)
                                }
                            }
                        }
                    }
                }
            }
        )

        let universityApiInstance = new Kucukdevapi.UniversitiesApi()
        universityApiInstance.getCurrentUniversitySemester(
            unid,
            (error, data, response) => {
                if (error) {
                    console.error(error)
                    if (error.response.status === 401) {
                        setLogin(false)
                    }
                } else {
                    console.log(
                        "API called successfully. Returned data: " + data
                    )
                    setSemesterLessons(data.lessons)
                    setSearchedLessons(data.lessons)
                }
            }
        )
    }

    const priColors = [
        "bg-blue-400",
        "bg-purple-400",
        "bg-yellow-400",
        "bg-pink-400",
        "bg-green-400",
    ]
    const secColors = [
        "bg-blue-300",
        "bg-purple-300",
        "bg-yellow-300",
        "bg-pink-300",
        "bg-green-300",
    ]

    const suffixes = ["st", "nd", "rd", "th"]

    const currentYear = new Date().getFullYear()
    const years = []
    for (let i = 0; i < 6; i++) {
        years.push(currentYear - i)
    }

    const setPrevious = () => {
        if (start !== 0) {
            setStart(start - 10)
            setEnd(end - 10)
        }
    }

    const setNext = () => {
        if (start + 10 < searchedLessons.length) {
            setStart(start + 10)
            setEnd(end + 10)
        }
    }

    return (
        <div className="flex flex-col mt-8">
            {login.universityID === "null" ? (
                <div className="flex h-full">
                    <div className="flex bg-white shadow-xl rounded flex-col md:w-2/3 sm:w-full mx-auto mt-4">
                        <div className="w-full flex">
                            <div
                                className="w-full h-auto bg-gray-400 hidden lg:block lg:w-5/12 bg-cover rounded-l-lg"
                                style={{
                                    backgroundImage: `url("https://images.unsplash.com/photo-1560785477-d43d2b34e0df?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1267&q=80")`,
                                }}
                            ></div>
                            <div className="w-full lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none mx-auto">
                                <h3 className="text-2xl">Prepare Schedule</h3>
                                <ul className="list-disc ml-4 md:ml-12">
                                    <li>
                                        <p className="mt-4 md:mt-8 text-justify">
                                            To be able use this functionality
                                            you should select a university from
                                            options below.
                                        </p>
                                    </li>
                                    <li>
                                        <p className="my-2 md:my-5 text-justify">
                                            You can change your selection later
                                            in your profile settings.
                                        </p>
                                    </li>
                                    <li>
                                        <p className="my-2 md:my-5 text-justify">
                                            If your university is not in the
                                            list, please inform us and we will
                                            do our best.
                                        </p>
                                    </li>
                                </ul>
                                <form
                                    onSubmit={onSelectUniversity.bind(this)}
                                    className="px-8 pt-6 pb-8 mb-4 bg-white rounded"
                                >
                                    <div className="mb-4">
                                        <select
                                            onChange={(e) =>
                                                setSelectedUniversity(
                                                    e.target.value
                                                )
                                            }
                                            className="w-full px-3 py-2 mb-3 text-base leading-medium text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline bg-white"
                                            id="university"
                                        >
                                            <option value="null">NA</option>
                                            {universities.map(
                                                (university, index) => (
                                                    <option
                                                        key={index}
                                                        value={university._id}
                                                    >
                                                        {university.name}
                                                    </option>
                                                )
                                            )}
                                        </select>
                                    </div>
                                    <div className="mb-6 text-center">
                                        <button
                                            className="w-full px-4 py-2 font-bold text-white bg-yellow-400 rounded-full hover:bg-yellow-500 focus:outline-none focus:shadow-outline"
                                            type="submit"
                                        >
                                            Save
                                        </button>
                                    </div>
                                    <hr className="mb-6 border-t" />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div>
                    {!showScheduleSelection ? (
                        <div>
                            {!showAdditionalLesson ? (
                                <div className="flex flex-col">
                                    {!showCurriculum ? (
                                        <div className="flex h-full">
                                            <div className="flex bg-white shadow-xl rounded flex-col md:w-2/3 sm:w-full mx-auto mt-4">
                                                <div className="w-full flex">
                                                    <div
                                                        className="w-full h-auto bg-gray-400 hidden lg:block lg:w-5/12 bg-cover rounded-l-lg"
                                                        style={{
                                                            backgroundImage: `url("https://images.unsplash.com/photo-1560785477-d43d2b34e0df?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1267&q=80")`,
                                                        }}
                                                    ></div>
                                                    <div className="w-full lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none mx-auto">
                                                        <h3 className="text-2xl">
                                                            Prepare Your
                                                            Schedule
                                                        </h3>
                                                        <form
                                                            onSubmit={onSelectDepartmentInformation.bind(
                                                                this
                                                            )}
                                                            className="px-8 pt-6 pb-8 mb-4 bg-white rounded"
                                                        >
                                                            <div className="mb-4">
                                                                <label className="block mb-2 text-md font-bold text-gray-700 text-left">
                                                                    What is your
                                                                    department?
                                                                </label>
                                                                <select
                                                                    value={
                                                                        department
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        setDepartment(
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                    className="w-full px-3 py-2 mb-3 text-base leading-medium text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline bg-white"
                                                                    id="university"
                                                                >
                                                                    {departments.map(
                                                                        (
                                                                            department,
                                                                            index
                                                                        ) => (
                                                                            <option
                                                                                key={
                                                                                    index
                                                                                }
                                                                                value={
                                                                                    department._id
                                                                                }
                                                                            >
                                                                                {
                                                                                    department.name
                                                                                }
                                                                            </option>
                                                                        )
                                                                    )}
                                                                </select>
                                                            </div>
                                                            <div className="mb-4 md:flex md:justify-between">
                                                                <div className="md:w-1/2 mb-4 md:mr-2 md:mb-0 sm:w-full">
                                                                    <label className="block mb-2 text-md font-bold text-gray-700 text-left">
                                                                        Which
                                                                        year
                                                                        will you
                                                                        study?
                                                                    </label>
                                                                    <select
                                                                        value={
                                                                            year
                                                                        }
                                                                        onChange={(
                                                                            e
                                                                        ) =>
                                                                            setYear(
                                                                                e
                                                                                    .target
                                                                                    .value
                                                                            )
                                                                        }
                                                                        className="w-full px-3 py-2 mb-3 text-base leading-medium text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline bg-white"
                                                                        id="university"
                                                                    >
                                                                        <option value="1">
                                                                            1st
                                                                            Year,
                                                                            Freshman
                                                                        </option>
                                                                        <option value="2">
                                                                            2nd
                                                                            Year,
                                                                            Sophomore
                                                                        </option>
                                                                        <option value="3">
                                                                            3rd
                                                                            Year,
                                                                            Junior
                                                                        </option>
                                                                        <option value="4">
                                                                            4th
                                                                            Year,
                                                                            Senior
                                                                        </option>
                                                                    </select>
                                                                </div>
                                                                <div className="md:w-1/2  md:ml-2 sm:w-full">
                                                                    <label className="block mb-2 text-md font-bold text-gray-700 text-left">
                                                                        Fall or
                                                                        Spring?
                                                                    </label>
                                                                    <select
                                                                        value={
                                                                            semester
                                                                        }
                                                                        onChange={(
                                                                            e
                                                                        ) =>
                                                                            setSemester(
                                                                                e
                                                                                    .target
                                                                                    .value
                                                                            )
                                                                        }
                                                                        className="w-full px-3 py-2 mb-3 text-base leading-medium text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline bg-white"
                                                                        id="university"
                                                                    >
                                                                        <option value="1">
                                                                            Fall
                                                                        </option>
                                                                        <option value="2">
                                                                            Spring
                                                                        </option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <div className="mb-4">
                                                                <label className="block mb-2 text-md font-bold text-gray-700 text-left">
                                                                    When did you
                                                                    start your
                                                                    1st year?
                                                                </label>
                                                                <select
                                                                    value={
                                                                        startYear
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        setStartYear(
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                    className="w-full px-3 py-2 mb-3 text-base leading-medium text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline bg-white"
                                                                    id="university"
                                                                >
                                                                    {years.map(
                                                                        (
                                                                            year,
                                                                            index
                                                                        ) => (
                                                                            <option
                                                                                key={
                                                                                    index
                                                                                }
                                                                                value={
                                                                                    year
                                                                                }
                                                                            >
                                                                                {`${year}/${
                                                                                    year +
                                                                                    1
                                                                                }`}
                                                                            </option>
                                                                        )
                                                                    )}
                                                                </select>
                                                            </div>
                                                            <div className="mb-6 text-center">
                                                                <button
                                                                    className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                                                                    type="submit"
                                                                >
                                                                    Next
                                                                </button>
                                                            </div>
                                                            <hr className="mb-6 border-t" />
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="xl:mx-40">
                                            <h1 className="flex justify-start text-2xl ml-8 md:ml-4">
                                                {department.name} Curriculum
                                                <div className="font-extralight ml-2">
                                                    {` Semester ${nthSemester}`}
                                                </div>
                                            </h1>
                                            <div className="py-2 overflow-x-auto md:px-6 lg:px-8">
                                                <div className="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard md:px-8 pt-2 pb-8 rounded-bl-lg rounded-br-lg">
                                                    <table className="min-w-full">
                                                        <thead>
                                                            <tr className="">
                                                                <th className="px-4 py-2 border-b-2 border-gray-300 text-sm leading-4 text-blue-500 tracking-wider">
                                                                    Code
                                                                </th>
                                                                <th className="px-4 py-2 border-b-2 border-gray-300 text-sm leading-4 text-blue-500 tracking-wider">
                                                                    Name
                                                                </th>
                                                                <th className="px-4 py-2 border-b-2 border-gray-300 text-sm leading-4 text-blue-500 tracking-wider">
                                                                    Semester
                                                                </th>
                                                            </tr>
                                                        </thead>
                                                        <tbody className="bg-white">
                                                            {Object.keys(
                                                                lessonGroups
                                                            ).map(
                                                                (
                                                                    group,
                                                                    index
                                                                ) => (
                                                                    <>
                                                                        {index >
                                                                            0 && (
                                                                            <tr>
                                                                                <td></td>
                                                                                <td></td>
                                                                                <td>
                                                                                    .
                                                                                    .
                                                                                    .
                                                                                </td>
                                                                            </tr>
                                                                        )}
                                                                        <tr
                                                                            className={
                                                                                priColors[
                                                                                    index %
                                                                                        priColors.length
                                                                                ]
                                                                            }
                                                                        >
                                                                            <td className="px-4 py-3 border-b text-blue-900 border-gray-500 text-sm leading-5"></td>
                                                                            <td className="px-4 py-3 border-b text-blue-900 border-gray-500 text-sm leading-5">
                                                                                {`${group.toUpperCase()} LESSONS`}
                                                                            </td>
                                                                            <td className="px-4 py-3 border-b text-blue-900 border-gray-500 text-sm leading-5">
                                                                                {`${year}${
                                                                                    suffixes[
                                                                                        year -
                                                                                            1
                                                                                    ]
                                                                                } Year, ${
                                                                                    nthSemester %
                                                                                        2 ===
                                                                                    1
                                                                                        ? "1"
                                                                                        : "2"
                                                                                }${
                                                                                    suffixes[
                                                                                        nthSemester %
                                                                                            2 ===
                                                                                        1
                                                                                            ? 0
                                                                                            : 1
                                                                                    ]
                                                                                } Semester`}
                                                                            </td>
                                                                        </tr>
                                                                        {lessonGroups[
                                                                            group
                                                                        ].map(
                                                                            (
                                                                                lesson
                                                                            ) => (
                                                                                <tr
                                                                                    key={
                                                                                        lesson.code
                                                                                    }
                                                                                    onClick={() =>
                                                                                        selectLessons(
                                                                                            lesson
                                                                                        )
                                                                                    }
                                                                                    className={`cursor-pointer ${
                                                                                        selectedLessons.find(
                                                                                            (
                                                                                                o
                                                                                            ) =>
                                                                                                o.code ===
                                                                                                lesson.code
                                                                                        ) &&
                                                                                        secColors[
                                                                                            index %
                                                                                                secColors.length
                                                                                        ]
                                                                                    }`}
                                                                                >
                                                                                    <td className="px-4 py-2 border-b text-blue-900 border-gray-500 text-sm leading-5">
                                                                                        {
                                                                                            lesson.code
                                                                                        }
                                                                                    </td>
                                                                                    <td className="px-4 py-2 border-b text-blue-900 border-gray-500 text-sm leading-5">
                                                                                        {
                                                                                            lesson.name
                                                                                        }
                                                                                    </td>
                                                                                    <td className="px-4 py-2 border-b text-blue-900 border-gray-500 text-sm leading-5"></td>
                                                                                </tr>
                                                                            )
                                                                        )}
                                                                    </>
                                                                )
                                                            )}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                            <div className="flex flex-row justify-center mb-8">
                                                <button
                                                    onClick={() =>
                                                        setShowCurriculum(false)
                                                    }
                                                    className="w-4/12 md:w-5/12 lg:w-1/5 px-8 py-2 m-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                                                >
                                                    Go Back
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        setShowAdditionalLesson(
                                                            true
                                                        )
                                                    }
                                                    className="w-4/12 md:w-5/12 lg:w-1/5 px-8 py-2 m-2 font-bold text-white bg-yellow-500 rounded-full hover:bg-yellow-700 focus:outline-none focus:shadow-outline"
                                                >
                                                    Continue
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="xl:mx-36">
                                    <div className="flex flex-col lg:flex-row lg:justify-around">
                                        <div className="w-full lg:w-4/12 xl:w-1/2">
                                            <h1 className="flex justify-start text-2xl ml-8 md:ml-20">
                                                Selected Lessons
                                            </h1>
                                            <div className="py-2 md:px-6 lg:px-8">
                                                <div className="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard md:px-8 pt-2 pb-8 rounded-bl-lg rounded-br-lg">
                                                    <table className="min-w-full">
                                                        <thead>
                                                            <tr className="">
                                                                <th className="px-4 py-2 border-b-2 border-gray-300 text-sm leading-4 text-blue-500 tracking-wider">
                                                                    Code
                                                                </th>
                                                                <th className="px-4 py-2 border-b-2 border-gray-300 text-sm leading-4 text-blue-500 tracking-wider">
                                                                    Name
                                                                </th>
                                                                <th className="px-4 py-2 border-b-2 border-gray-300 text-sm leading-4 text-blue-500 tracking-wider">
                                                                    Action
                                                                </th>
                                                            </tr>
                                                        </thead>
                                                        <tbody className="bg-white">
                                                            {selectedLessons.map(
                                                                (lesson) => (
                                                                    <tr
                                                                        key={
                                                                            lesson.code
                                                                        }
                                                                    >
                                                                        <td className="px-4 py-2 border-b text-blue-900 border-gray-500 text-sm leading-5">
                                                                            {
                                                                                lesson.code
                                                                            }
                                                                        </td>
                                                                        <td className="px-4 py-2 border-b text-blue-900 border-gray-500 text-sm leading-5">
                                                                            {
                                                                                lesson.name
                                                                            }
                                                                        </td>
                                                                        <td className="px-4 py-2 border-b text-blue-900 border-gray-500 text-sm leading-5">
                                                                            <button
                                                                                onClick={(
                                                                                    e
                                                                                ) =>
                                                                                    selectLessons(
                                                                                        lesson
                                                                                    )
                                                                                }
                                                                            >
                                                                                <i className="fas fa-times"></i>
                                                                            </button>
                                                                        </td>
                                                                    </tr>
                                                                )
                                                            )}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="w-full lg:w-7/12 xl:w-9/12 mt-4 md:mt-0 ">
                                            <h1 className="flex justify-start text-2xl ml-8 md:ml-20">
                                                Add More Lessons
                                            </h1>
                                            <input
                                                className="w-11/12 px-3 py-2 my-1 text-sm leading-medium text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                                type="text"
                                                placeholder="Search (w/ Lesson Name, Lesson Code)"
                                                onChange={(e) =>
                                                    onSearchLesson(
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            <div className="py-2 overflow-x-auto sm:px-6 lg:px-8">
                                                <div className="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard md:px-8 pt-2 rounded-bl-lg rounded-br-lg">
                                                    <table className="min-w-full">
                                                        <thead>
                                                            <tr className="">
                                                                <th className="px-4 py-2 border-b-2 border-gray-300 text-sm text-left leading-4 text-blue-500 tracking-wider">
                                                                    Code
                                                                </th>
                                                                <th className="px-4 py-2 border-b-2 border-gray-300 text-sm leading-4 text-blue-500 tracking-wider">
                                                                    Name
                                                                </th>
                                                                <th className="px-4 py-2 border-b-2 border-gray-300 text-sm leading-4 text-blue-500 tracking-wider">
                                                                    Action
                                                                </th>
                                                            </tr>
                                                        </thead>
                                                        <tbody className="bg-white  ">
                                                            {searchedLessons
                                                                .slice(
                                                                    start,
                                                                    end
                                                                )
                                                                .map(
                                                                    (
                                                                        lesson
                                                                    ) => (
                                                                        <tr
                                                                            key={
                                                                                lesson.code
                                                                            }
                                                                        >
                                                                            <td className="px-4 py-2 border-b whitespace-nowrap text-blue-900 border-gray-500 text-sm leading-5">
                                                                                {
                                                                                    lesson.code
                                                                                }
                                                                            </td>
                                                                            <td className="px-4 py-2 border-b text-blue-900 border-gray-500 text-sm leading-5">
                                                                                {
                                                                                    lesson.name
                                                                                }
                                                                            </td>
                                                                            <td className="px-4 py-2 border-b text-blue-900 border-gray-500 text-sm leading-5">
                                                                                <button
                                                                                    onClick={(
                                                                                        e
                                                                                    ) =>
                                                                                        selectLessons(
                                                                                            lesson
                                                                                        )
                                                                                    }
                                                                                >
                                                                                    <i
                                                                                        className={
                                                                                            selectedLessons.find(
                                                                                                (
                                                                                                    o
                                                                                                ) =>
                                                                                                    o.code ===
                                                                                                    lesson.code
                                                                                            )
                                                                                                ? "fas fa-times"
                                                                                                : "fas fa-check"
                                                                                        }
                                                                                    ></i>
                                                                                </button>
                                                                            </td>
                                                                        </tr>
                                                                    )
                                                                )}
                                                        </tbody>
                                                    </table>
                                                    <div className="sm:flex-1 sm:flex sm:items-center sm:justify-between my-4 work-sans">
                                                        <div>
                                                            <p className="text-sm leading-5 text-blue-700">
                                                                Showing
                                                                <span className="font-medium mx-1">
                                                                    {start + 1}
                                                                </span>
                                                                to
                                                                <span className="font-medium mx-1">
                                                                    {end <
                                                                    searchedLessons.length
                                                                        ? end
                                                                        : searchedLessons.length}
                                                                </span>
                                                                of
                                                                <span className="font-medium mx-1">
                                                                    {
                                                                        searchedLessons.length
                                                                    }
                                                                </span>
                                                                results
                                                            </p>
                                                        </div>
                                                        <div>
                                                            <nav className="relative z-0 inline-flex shadow-sm">
                                                                <div>
                                                                    <button
                                                                        onClick={() =>
                                                                            setPrevious()
                                                                        }
                                                                        className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150"
                                                                        aria-label="Previous"
                                                                    >
                                                                        <svg
                                                                            className="h-5 w-5"
                                                                            viewBox="0 0 20 20"
                                                                            fill="currentColor"
                                                                        >
                                                                            <path
                                                                                fillRule="evenodd"
                                                                                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                                                                clipRule="evenodd"
                                                                            />
                                                                        </svg>
                                                                    </button>
                                                                </div>
                                                                <div v-if="pagination.current_page < pagination.last_page">
                                                                    <button
                                                                        onClick={() =>
                                                                            setNext()
                                                                        }
                                                                        className="-ml-px relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150"
                                                                        aria-label="Next"
                                                                    >
                                                                        <svg
                                                                            className="h-5 w-5"
                                                                            viewBox="0 0 20 20"
                                                                            fill="currentColor"
                                                                        >
                                                                            <path
                                                                                fillRule="evenodd"
                                                                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                                                                clipRule="evenodd"
                                                                            />
                                                                        </svg>
                                                                    </button>
                                                                </div>
                                                            </nav>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex flex-row justify-center mb-8 mt-4">
                                                <button
                                                    onClick={() =>
                                                        setShowAdditionalLesson(
                                                            false
                                                        )
                                                    }
                                                    className="w-4/12 md:w-5/12 lg:w-2/5 px-8 py-2 m-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                                                >
                                                    Go Back
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        createSchedule()
                                                        setShowScheduleSelection(
                                                            true
                                                        )
                                                    }}
                                                    className="w-4/12 md:w-5/12 lg:w-2/5 px-8 py-2 m-2 font-bold text-white bg-yellow-500 rounded-full hover:bg-yellow-700 focus:outline-none focus:shadow-outline"
                                                >
                                                    Continue
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div>
                            <div className="flex flex-col mt-8 xl:ml-32">
                                <h1 className="flex justify-start text-2xl ml-8 md:ml-4">
                                    Schedules
                                </h1>
                                <div className="flex flex-row flex-wrap ml-4 md:w-7/12">
                                    {scheduleIndexList}
                                </div>
                                <div className="flex flex-col lg:flex-row justify-start py-2 md:px-8">
                                    <div className="inline-block shadow overflow-x-auto bg-white lg:w-7/12 shadow-dashboard md:px-8 pt-2 pb-8 rounded-bl-lg rounded-br-lg">
                                        <table className="min-w-full">
                                            <thead>
                                                <tr className="">
                                                    <th className="px-4 py-3 border-b-2 border-gray-300 text-sm text-left leading-4 text-blue-500 tracking-wider">
                                                        #
                                                    </th>
                                                    <th className="px-4 py-3 border-b-2 border-gray-300 text-sm leading-4 text-blue-500 tracking-wider">
                                                        Monday
                                                    </th>
                                                    <th className="px-4 py-3 border-b-2 border-gray-300 text-sm leading-4 text-blue-500 tracking-wider">
                                                        Tuesday
                                                    </th>
                                                    <th className="px-4 py-3 border-b-2 border-gray-300 text-sm leading-4 text-blue-500 tracking-wider">
                                                        Wednesday
                                                    </th>
                                                    <th className="px-4 py-3 border-b-2 border-gray-300 text-sm leading-4 text-blue-500 tracking-wider">
                                                        Thursday
                                                    </th>
                                                    <th className="px-4 py-3 border-b-2 border-gray-300 text-sm leading-4 text-blue-500 tracking-wider">
                                                        Friday
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white  ">
                                                {scheduleRows}
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="inline-block shadow overflow-x-auto bg-white shadow-dashboard lg:ml-8 md:px-8 pt-2 pb-8 rounded-bl-lg rounded-br-lg">
                                        <table className="min-w-full">
                                            <thead>
                                                <tr className="">
                                                    <th className="px-4 py-3 border-b-2 border-gray-300 text-sm leading-4 text-blue-500 tracking-wider">
                                                        Code
                                                    </th>
                                                    <th className="px-4 py-3 border-b-2 border-gray-300 text-sm leading-4 text-blue-500 tracking-wider">
                                                        Instructor
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white  ">
                                                {instructorRows}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="flex flex-row justify-center mb-8 mt-4">
                                    <button
                                        onClick={() =>
                                            setShowScheduleSelection(false)
                                        }
                                        className="w-4/12 md:w-5/12 lg:w-1/5 px-8 py-2 m-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                                    >
                                        Go Back
                                    </button>
                                    <button
                                        onClick={() => {
                                            importProgram()
                                        }}
                                        className="w-4/12 md:w-5/12 lg:w-1/5 px-8 py-2 m-2 font-bold text-white bg-yellow-500 rounded-full hover:bg-yellow-700 focus:outline-none focus:shadow-outline"
                                    >
                                        Import
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default PrepareSchedule
