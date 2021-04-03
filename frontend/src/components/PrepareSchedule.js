import { useState, useEffect, useContext } from "react"
import { UserContext } from "../Context"

var Kucukdevapi = require("kucukdevapi")

const PrepareSchedule = ({ history }) => {
    const [login, setLogin] = useContext(UserContext)

    const [showCurriculumModal, setShowCurriculumModal] = useState(false)
    const [department, setDepartment] = useState()
    const [year, setYear] = useState(1)
    const [semester, setSemester] = useState(1)
    const [startYear, setStartYear] = useState(new Date().getFullYear())
    const [refresh, setRefresh] = useState(0)

    const [universities, setUniversities] = useState([])
    const [departments, setDepartments] = useState([])
    const [selectedUniversity, setSelectedUniversity] = useState("null")
    const [lessons, setLessons] = useState([])
    const [selectedLessons, setSelectedLessons] = useState([])
    const [defaultLessons, setDefaultLessons] = useState([])
    const [scienceLessons, setScienceLessons] = useState([])
    const [techLessons, setTechLessons] = useState([])
    const [nonTechLessons, setNonTechLessons] = useState([])

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
                        console.log(
                            "NOTAPI called successfully. Returned data: " + data
                        )
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
                    console.log(data)
                    for (let i = 0; i < data.length; i++) {
                        if (
                            startYear >= data[i].startYear &&
                            startYear < data[i].endYear
                        ) {
                            for (let j = 0; j < data[i].semesters.length; j++) {
                                if (
                                    2 * Number(year) - 2 + Number(semester) ===
                                    data[i].semesters[j].semester
                                ) {
                                    console.log(data[i].semesters[j])
                                    setLessons(data[i].semesters[j].lessons)
                                    const selectedLessons = []
                                    const defaultLessons = []
                                    const scienceLessons = []
                                    const techLessons = []
                                    const nonTechLessons = []
                                    for (
                                        let k = 0;
                                        k < data[i].semesters[j].lessons.length;
                                        k++
                                    ) {
                                        if (
                                            data[i].semesters[j].lessons[k]
                                                .lessonType === "default"
                                        ) {
                                            defaultLessons.push(
                                                data[i].semesters[j].lessons[k]
                                            )
                                            selectedLessons.push(
                                                data[i].semesters[j].lessons[k]
                                            )
                                        } else if (
                                            data[i].semesters[j].lessons[k]
                                                .lessonType === "science"
                                        ) {
                                            if (scienceLessons.length === 0) {
                                                selectedLessons.push(
                                                    data[i].semesters[j]
                                                        .lessons[k]
                                                )
                                            }
                                            scienceLessons.push(
                                                data[i].semesters[j].lessons[k]
                                            )
                                        } else if (
                                            data[i].semesters[j].lessons[k]
                                                .lessonType === "tech-elective"
                                        ) {
                                            if (techLessons.length === 0) {
                                                selectedLessons.push(
                                                    data[i].semesters[j]
                                                        .lessons[k]
                                                )
                                            }
                                            techLessons.push(
                                                data[i].semesters[j].lessons[k]
                                            )
                                        } else {
                                            if (nonTechLessons.length === 0) {
                                                selectedLessons.push(
                                                    data[i].semesters[j]
                                                        .lessons[k]
                                                )
                                            }
                                            nonTechLessons.push(
                                                data[i].semesters[j].lessons[k]
                                            )
                                        }
                                    }
                                    setSelectedLessons(selectedLessons)
                                    setDefaultLessons(defaultLessons)
                                    setScienceLessons(scienceLessons)
                                    setTechLessons(techLessons)
                                    setNonTechLessons(nonTechLessons)
                                    setShowCurriculumModal(true)
                                }
                            }
                        }
                    }
                }
            }
        )
    }

    const currentYear = new Date().getFullYear()
    const years = []
    for (let i = 0; i < 6; i++) {
        years.push(currentYear - i)
    }

    return (
        <div className="flex flex-col mt-4">
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
                                <h3 className="text-2xl">Add From System</h3>
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
                <div className="flex flex-col xl:mx-40">
                    {!showCurriculumModal ? (
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
                                                    What is your department?
                                                </label>
                                                <select
                                                    onChange={(e) =>
                                                        setDepartment(
                                                            e.target.value
                                                        )
                                                    }
                                                    className="w-full px-3 py-2 mb-3 text-base leading-medium text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline bg-white"
                                                    id="university"
                                                >
                                                    {departments.map(
                                                        (department, index) => (
                                                            <option
                                                                key={index}
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
                                                        Which year will you
                                                        study?
                                                    </label>
                                                    <select
                                                        onChange={(e) =>
                                                            setYear(
                                                                e.target.value
                                                            )
                                                        }
                                                        className="w-full px-3 py-2 mb-3 text-base leading-medium text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline bg-white"
                                                        id="university"
                                                    >
                                                        <option value="1">
                                                            1st Year, Freshman
                                                        </option>
                                                        <option value="2">
                                                            2nd Year, Sophomore
                                                        </option>
                                                        <option value="3">
                                                            3rd Year, Junior
                                                        </option>
                                                        <option value="4">
                                                            4th Year, Senior
                                                        </option>
                                                    </select>
                                                </div>
                                                <div className="md:w-1/2  md:ml-2 sm:w-full">
                                                    <label className="block mb-2 text-md font-bold text-gray-700 text-left">
                                                        Which semester will you
                                                        study?
                                                    </label>
                                                    <select
                                                        onChange={(e) =>
                                                            setSemester(
                                                                e.target.value
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
                                                    When did you start your 1st
                                                    year?
                                                </label>
                                                <select
                                                    onChange={(e) =>
                                                        setStartYear(
                                                            e.target.value
                                                        )
                                                    }
                                                    className="w-full px-3 py-2 mb-3 text-base leading-medium text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline bg-white"
                                                    id="university"
                                                >
                                                    {years.map(
                                                        (year, index) => (
                                                            <option
                                                                key={index}
                                                                value={year}
                                                            >
                                                                {`${year}/${
                                                                    year + 1
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
                        <div>
                            <h1 className="flex justify-start text-2xl ml-8 md:ml-4">
                                {department.name} Curriculum of Semester
                                {` ${2 * Number(year) - 2 + Number(semester)}`}
                            </h1>
                            <div className="py-2 overflow-x-auto sm:px-6 lg:px-8">
                                <div className="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard px-8 pt-2 rounded-bl-lg rounded-br-lg">
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
                                            <tr className="bg-blue-400">
                                                <td className="px-6 py-3 border-b text-blue-900 border-gray-500 text-sm leading-5"></td>
                                                <td className="px-6 py-3 border-b text-blue-900 border-gray-500 text-sm leading-5">
                                                    DEFAULT LESSONS
                                                </td>
                                                <td className="px-6 py-3 border-b text-blue-900 border-gray-500 text-sm leading-5">
                                                    {`${year}st Year, ${
                                                        2 * Number(year) -
                                                        2 +
                                                        Number(semester)
                                                    }${
                                                        (2 * Number(year) -
                                                            2 +
                                                            Number(semester)) %
                                                            2 ===
                                                        0
                                                            ? "nd"
                                                            : "st"
                                                    } Semester`}
                                                </td>
                                            </tr>
                                            {defaultLessons.map((lesson) => (
                                                <tr
                                                    key={lesson.name}
                                                    onClick={() =>
                                                        selectLessons(lesson)
                                                    }
                                                    className={
                                                        selectedLessons.includes(
                                                            lesson
                                                        )
                                                            ? `bg-blue-300`
                                                            : ``
                                                    }
                                                >
                                                    <td className="px-6 py-2 border-b text-blue-900 border-gray-500 text-sm leading-5">
                                                        {lesson.name}
                                                    </td>
                                                    <td className="px-6 py-2 border-b text-blue-900 border-gray-500 text-sm leading-5">
                                                        LESSON NAME
                                                    </td>
                                                    <td className="px-6 py-2 border-b text-blue-900 border-gray-500 text-sm leading-5">
                                                        {`${year}st Year, ${
                                                            2 * Number(year) -
                                                            2 +
                                                            Number(semester)
                                                        }${
                                                            (2 * Number(year) -
                                                                2 +
                                                                Number(
                                                                    semester
                                                                )) %
                                                                2 ===
                                                            0
                                                                ? "nd"
                                                                : "st"
                                                        } Semester`}
                                                    </td>
                                                </tr>
                                            ))}
                                            <div className="mt-2"></div>
                                            {scienceLessons.length > 0 && (
                                                <tr className="bg-purple-400">
                                                    <td className="px-6 py-3 border-b text-blue-900 border-gray-500 text-sm leading-5"></td>
                                                    <td className="px-6 py-3 border-b text-blue-900 border-gray-500 text-sm leading-5">
                                                        SCIENCE ELECTIVES
                                                    </td>
                                                    <td className="px-6 py-3 border-b text-blue-900 border-gray-500 text-sm leading-5">
                                                        {`${year}st Year, ${
                                                            2 * Number(year) -
                                                            2 +
                                                            Number(semester)
                                                        }${
                                                            (2 * Number(year) -
                                                                2 +
                                                                Number(
                                                                    semester
                                                                )) %
                                                                2 ===
                                                            0
                                                                ? "nd"
                                                                : "st"
                                                        } Semester`}
                                                    </td>
                                                </tr>
                                            )}
                                            {scienceLessons.map((lesson) => (
                                                <tr
                                                    key={lesson.name}
                                                    onClick={() =>
                                                        selectLessons(lesson)
                                                    }
                                                    className={
                                                        selectedLessons.includes(
                                                            lesson
                                                        )
                                                            ? `bg-purple-300`
                                                            : ``
                                                    }
                                                >
                                                    <td className="px-6 py-2 border-b text-blue-900 border-gray-500 text-sm leading-5">
                                                        {lesson.name}
                                                    </td>
                                                    <td className="px-6 py-2 border-b text-blue-900 border-gray-500 text-sm leading-5">
                                                        LESSON NAME
                                                    </td>
                                                    <td className="px-6 py-2 border-b text-blue-900 border-gray-500 text-sm leading-5">
                                                        {`${year}st Year, ${
                                                            Number(year) *
                                                            Number(semester)
                                                        }${
                                                            (Number(year) *
                                                                Number(
                                                                    semester
                                                                )) %
                                                                2 ===
                                                            0
                                                                ? "nd"
                                                                : "st"
                                                        } Semester`}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
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
