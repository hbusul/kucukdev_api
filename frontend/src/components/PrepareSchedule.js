import { useState, useEffect, useContext } from "react"
import { UserContext } from "../Context"

var Kucukdevapi = require("kucukdevapi")

const PrepareSchedule = ({ history }) => {
    const [login, setLogin] = useContext(UserContext)

    const [showCurriculum, setShowCurriculum] = useState(false)
    const [showAdditionalLesson, setShowAdditionalLesson] = useState(false)

    const [department, setDepartment] = useState()
    const [year, setYear] = useState(1)
    const [semester, setSemester] = useState(1)
    const [startYear, setStartYear] = useState(new Date().getFullYear())
    const [nthSemester, setNthSemester] = useState(1)
    const [refresh, setRefresh] = useState(0)

    const [universities, setUniversities] = useState([])
    const [departments, setDepartments] = useState([])
    const [selectedUniversity, setSelectedUniversity] = useState("null")
    const [semesterLessons, setSemesterLessons] = useState([])
    const [selectedLessons, setSelectedLessons] = useState([])
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
                                setDepartment(data[0])
                            }
                        }
                    }
                )
            }
        } else {
            history.push("/signin")
        }
    }, [history, refresh, login, setLogin])

    useEffect(() => {
        setNthSemester(2 * Number(year) - 2 + Number(semester))
    }, [year, semester])

    const selectLessons = (newLesson) => {
        if (selectedLessons.includes(newLesson)) {
            setSelectedLessons(
                selectedLessons.filter((lesson) => lesson !== newLesson)
            )
        } else {
            setSelectedLessons([...selectedLessons, newLesson])
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
        let depid = department._id
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
        if (start + 10 < semesterLessons.length) {
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
                                                    Prepare Your Schedule
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
                                                            onChange={(e) =>
                                                                setDepartment(
                                                                    e.target
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
                                                                            department
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
                                                                Which year will
                                                                you study?
                                                            </label>
                                                            <select
                                                                onChange={(e) =>
                                                                    setYear(
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                                className="w-full px-3 py-2 mb-3 text-base leading-medium text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline bg-white"
                                                                id="university"
                                                            >
                                                                <option value="1">
                                                                    1st Year,
                                                                    Freshman
                                                                </option>
                                                                <option value="2">
                                                                    2nd Year,
                                                                    Sophomore
                                                                </option>
                                                                <option value="3">
                                                                    3rd Year,
                                                                    Junior
                                                                </option>
                                                                <option value="4">
                                                                    4th Year,
                                                                    Senior
                                                                </option>
                                                            </select>
                                                        </div>
                                                        <div className="md:w-1/2  md:ml-2 sm:w-full">
                                                            <label className="block mb-2 text-md font-bold text-gray-700 text-left">
                                                                Which semester
                                                                will you study?
                                                            </label>
                                                            <select
                                                                onChange={(e) =>
                                                                    setSemester(
                                                                        e.target
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
                                                            When did you start
                                                            your 1st year?
                                                        </label>
                                                        <select
                                                            onChange={(e) =>
                                                                setStartYear(
                                                                    e.target
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
                                                    ).map((group, index) => (
                                                        <>
                                                            {index > 0 && (
                                                                <tr>
                                                                    <td></td>
                                                                    <td></td>
                                                                    <td>
                                                                        . . .
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
                                                            ].map((lesson) => (
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
                                                                        selectedLessons.includes(
                                                                            lesson
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
                                                            ))}
                                                        </>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div className="flex flex-row justify-center lg:justify-end lg:mr-4 mb-8">
                                        <button
                                            onClick={() =>
                                                setShowCurriculum(false)
                                            }
                                            className="w-4/12 md:w-5/12 lg:w-2/12 px-8 py-2 m-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                                        >
                                            Go Back
                                        </button>
                                        <button
                                            onClick={() =>
                                                setShowAdditionalLesson(true)
                                            }
                                            className="w-4/12 md:w-5/12 lg:w-2/12 px-8 py-2 m-2 font-bold text-white bg-yellow-500 rounded-full hover:bg-yellow-700 focus:outline-none focus:shadow-outline"
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
                                                    {semesterLessons
                                                        .slice(start, end)
                                                        .map((lesson) => (
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
                                                                        <i className="fas fa-check"></i>
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        ))}
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
                                                            semesterLessons.length
                                                                ? end
                                                                : semesterLessons.length}
                                                        </span>
                                                        of
                                                        <span className="font-medium mx-1">
                                                            {
                                                                semesterLessons.length
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
                                    <div className="flex flex-row justify-center lg:justify-end lg:mr-12 mb-8 mt-4">
                                        <button
                                            onClick={() =>
                                                setShowAdditionalLesson(false)
                                            }
                                            className="w-4/12 md:w-5/12 lg:w-5/12 px-8 py-2 m-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                                        >
                                            Go Back
                                        </button>
                                        <button className="w-4/12 md:w-5/12 lg:w-5/12 px-8 py-2 m-2 font-bold text-white bg-yellow-500 rounded-full hover:bg-yellow-700 focus:outline-none focus:shadow-outline">
                                            Continue
                                        </button>
                                    </div>
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
