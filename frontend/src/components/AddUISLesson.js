import { useState, useEffect, useContext } from "react"
import { Link } from "react-router-dom"
import { UserContext } from "../Context"

import UISLesson from "./UISLesson"

var Kucukdevapi = require("kucukdevapi")

const AddUISLesson = ({ history }) => {
    const [login, setLogin] = useContext(UserContext)

    const [addLessonModal, setAddLessonModal] = useState(false)
    const [selectedUniversity, setSelectedUniversity] = useState("null")
    const [universities, setUniversities] = useState([])
    const [lessons, setLessons] = useState([])
    const [selectedLessons, setSelectedLessons] = useState([])
    const [refresh, setRefresh] = useState(0)
    const [start, setStart] = useState(0)
    const [end, setEnd] = useState(10)

    let defaultClient = Kucukdevapi.ApiClient.instance
    let OAuth2PasswordBearer =
        defaultClient.authentications["OAuth2PasswordBearer"]
    OAuth2PasswordBearer.accessToken = login.userToken

    useEffect(() => {
        if (login) {
            if (login.semesterID === "null") {
                history.push("/semesters/add-semester")
            } else {
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
                                "API called successfully. Returned data: " +
                                    data
                            )
                            setUniversities(data)
                        }
                    })
                } else {
                    let apiInstance = new Kucukdevapi.UniversitiesApi()
                    let unid = login.universityID
                    apiInstance.getCurrentUniversitySemester(
                        unid,
                        (error, data, response) => {
                            if (error) {
                                console.error(error)
                            } else {
                                console.log(
                                    "API called successfully. Returned data: " +
                                        data
                                )
                                const lessonArray = []
                                for (let i = 0; i < data.lessons.length; i++) {
                                    for (
                                        let j = 0;
                                        j < data.lessons[i].sections.length;
                                        j++
                                    ) {
                                        lessonArray.push({
                                            name: data.lessons[i].name,
                                            code: data.lessons[i].code,
                                            ects: data.lessons[i].ects,
                                            section:
                                                data.lessons[i].sections[j]
                                                    .section,
                                            instructor:
                                                data.lessons[i].sections[j]
                                                    .instructor,
                                            slots:
                                                data.lessons[i].sections[j]
                                                    .slots,
                                            absenceLimit:
                                                data.lessons[i].absenceLimit,
                                        })
                                    }
                                }
                                setLessons(lessonArray)
                            }
                        }
                    )
                }
            }
        } else {
            history.push("/signin")
        }
    }, [refresh, login, setLogin, history])

    const onSelectUuniversity = (e) => {
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

    const selectLessons = (newLesson) => {
        if (selectedLessons.includes(newLesson)) {
            setSelectedLessons(
                selectedLessons.filter((lesson) => lesson !== newLesson)
            )
        } else {
            setSelectedLessons([...selectedLessons, newLesson])
        }
    }

    const dropLesson = (newLesson) => {
        setSelectedLessons(
            selectedLessons.filter((lesson) => lesson !== newLesson)
        )
    }

    const addSelectedLessons = () => {
        if (selectedLessons.length > 0) {
            let apiInstance = new Kucukdevapi.LessonsApi()
            let uid = login.userID
            let sid = login.semesterID

            for (let i = 0; i < selectedLessons.length; i++) {
                let lessonName = `${selectedLessons[i].code}.${selectedLessons[i].section}`
                let lessonModel = new Kucukdevapi.LessonModel(
                    lessonName,
                    selectedLessons[i].instructor,
                    selectedLessons[i].absenceLimit,
                    selectedLessons[i].slots
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
                                "API called successfully. Returned data: " +
                                    data
                            )
                        }
                    }
                )
            }

            history.push("/lessons")
        }
    }

    const setPrevious = () => {
        if (start !== 0) {
            setStart(start - 10)
            setEnd(end - 10)
        }
    }

    const setNext = () => {
        if (start + 10 < lessons.length) {
            setStart(start + 10)
            setEnd(end + 10)
        }
    }

    return (
        <div>
            <div className="flex flex-col mt-4 xl:mx-40">
                <div className="flex flex-row justify-around mb-4">
                    <Link
                        to="/lessons"
                        className="text-gray-800 text-base font-semibold hover:text-purple-600 mb-1 md:hidden"
                    >
                        Show Lessons
                    </Link>
                    <Link
                        to="/lessons/add-lesson"
                        className="text-gray-800 text-base font-semibold hover:text-purple-600 mb-1 md:hidden"
                    >
                        Add Lesson
                    </Link>
                    <Link
                        to="/lessons/add-from-uis"
                        className="text-gray-800 text-base font-semibold hover:text-purple-600 mb-1 md:hidden"
                    >
                        Add from UIS
                    </Link>
                </div>
            </div>
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
                                    onSubmit={onSelectUuniversity.bind(this)}
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
                    <h1 className="flex justify-start text-2xl ml-8 md:ml-4">
                        System Lessons
                    </h1>
                    <div className="py-2 overflow-x-auto sm:px-6 lg:px-8">
                        <div className="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard px-8 pt-2 rounded-bl-lg rounded-br-lg">
                            <table className="min-w-full">
                                <thead>
                                    <tr className="">
                                        <th className="px-4 py-2 border-b-2 border-gray-300 text-sm text-left leading-4 text-blue-500 tracking-wider">
                                            Lesson Name
                                        </th>
                                        <th className="px-4 py-2 border-b-2 border-gray-300 text-sm leading-4 text-blue-500 tracking-wider">
                                            Code
                                        </th>
                                        <th className="px-4 py-2 border-b-2 border-gray-300 text-sm leading-4 text-blue-500 tracking-wider">
                                            ECTS
                                        </th>
                                        <th className="px-4 py-2 border-b-2 border-gray-300 text-sm leading-4 text-blue-500 tracking-wider">
                                            Instructor
                                        </th>
                                        <th className="px-4 py-2 border-b-2 border-gray-300 text-sm leading-4 text-blue-500 tracking-wider">
                                            Schedule
                                        </th>
                                        <th className="px-4 py-2 border-b-2 border-gray-300 text-sm leading-4 text-blue-500 tracking-wider">
                                            Absence Limit
                                        </th>
                                        <th className="px-4 py-2 border-b-2 border-gray-300 text-sm leading-4 text-blue-500 tracking-wider">
                                            Select
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white  ">
                                    {lessons.slice(start, end).map((lesson) => {
                                        return (
                                            <UISLesson
                                                key={`${lesson.code}.${lesson.section}`}
                                                lesson={lesson}
                                                selectedLessons={
                                                    selectedLessons
                                                }
                                                onSelectLesson={() =>
                                                    selectLessons(lesson)
                                                }
                                            />
                                        )
                                    })}
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
                                            {end < lessons.length
                                                ? end
                                                : lessons.length}
                                        </span>
                                        of
                                        <span className="font-medium mx-1">
                                            {lessons.length}
                                        </span>
                                        results
                                    </p>
                                </div>
                                <div>
                                    <nav className="relative z-0 inline-flex shadow-sm">
                                        <div>
                                            <button
                                                onClick={() => setPrevious()}
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
                                                onClick={() => setNext()}
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
                    <div className="flex justify-center md:justify-end text-xs md:text-base mt-4 mr-6">
                        <button
                            onClick={() => setAddLessonModal(true)}
                            className="w-1/2 md:w-1/3 lg:w-1/5 px-8 py-2 font-bold text-white whitespace-nowrap bg-green-500 rounded-full hover:bg-green-700 focus:outline-none focus:shadow-outline"
                        >
                            Add Selected Lesson(s)
                        </button>
                    </div>

                    {addLessonModal ? (
                        <div>
                            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                                    {/*content*/}
                                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                        {/*header*/}
                                        <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                                            <h3 className="pt-4 text-2xl text-center">
                                                Selected lesson(s):
                                            </h3>

                                            <button
                                                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                                onClick={() =>
                                                    setAddLessonModal(false)
                                                }
                                            >
                                                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                                    ×
                                                </span>
                                            </button>
                                        </div>
                                        {/*body*/}
                                        <div className="text-left my-4 mx-8">
                                            <p>
                                                Following lesson(s) are the ones
                                                you choose from the your
                                                university system:
                                            </p>
                                            <div className="flex flex-col mx-8">
                                                {selectedLessons.map(
                                                    (lesson, index) => {
                                                        return (
                                                            <div
                                                                key={index}
                                                                className="mt-2 bg-gray-200 py-2 px-4 mr-2 rounded flex flex-row"
                                                            >
                                                                <p className="flex-1">
                                                                    {
                                                                        lesson.name
                                                                    }
                                                                </p>
                                                                <button
                                                                    onClick={() =>
                                                                        dropLesson(
                                                                            lesson
                                                                        )
                                                                    }
                                                                >
                                                                    X
                                                                </button>
                                                            </div>
                                                        )
                                                    }
                                                )}
                                            </div>
                                            <p className="flex justify-center text-xs italic text-red-500 mt-4">
                                                You can drop unwanted lectures
                                                by clicking the X button.
                                            </p>
                                        </div>

                                        {/*footer*/}
                                        <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
                                            <button
                                                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                                                type="button"
                                                style={{
                                                    transition: "all .15s ease",
                                                }}
                                                onClick={() =>
                                                    setAddLessonModal(false)
                                                }
                                            >
                                                Close
                                            </button>
                                            <button
                                                className="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                                                type="button"
                                                style={{
                                                    transition: "all .15s ease",
                                                }}
                                                onClick={(e) => {
                                                    setAddLessonModal(false)
                                                    addSelectedLessons()
                                                }}
                                            >
                                                Add
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                        </div>
                    ) : null}
                </div>
            )}
        </div>
    )
}

export default AddUISLesson
