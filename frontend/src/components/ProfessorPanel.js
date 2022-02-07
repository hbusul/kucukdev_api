import { useEffect, useContext, useState } from "react"
import { UserContext } from "../Context"

var Kucukdevapi = require("kucukdevapi")

const ProfessorPanel = ({ history }) => {
    const [login, setLogin] = useContext(UserContext)
    const [refresh, setRefresh] = useState(0)

    const [currentUpdate, setCurrentUpdate] = useState()
    const [curriculumAndLessonModal, setCurriculumAndLessonModal] = useState(
        false
    )
    const [updateLessonModal, setUpdateLessonModal] = useState(false)

    const [curSemDepSemUniModal, setCurSemDepSemUniModal] = useState(false)
    const [startYear, setStartYear] = useState()
    const [endYear, setEndYear] = useState()
    const [ects, setEcts] = useState()
    const [absenceLimit, setAbsenceLimit] = useState()
    const [slots, setSlots] = useState([])

    const [name, setName] = useState()
    const [code, setCode] = useState()
    const [lessonType, setLessonType] = useState()
    const [section, setSection] = useState()
    const [instructor, setInstructor] = useState()
    const [slot, setSlot] = useState("")
    const [isCurUniSem, setIscCurUniSem] = useState(false)

    const [isSemester, setIsSemester] = useState(true)
    const [selectedUniversity, setSelectedUniversity] = useState()
    const [selectedSemDep, setSelectedSemDep] = useState()
    const [selectedLesCur, setSelectedLesCur] = useState()
    const [selectedSecSem, setSelectedSecSem] = useState()
    const [selectedCurriculumLesson, setSelectedCurriculumLesson] = useState()

    const [universities, setUniversities] = useState([])
    const [semesters, setSemesters] = useState([])
    const [departments, setDepartments] = useState([])
    const [lessons, setLessons] = useState([])
    const [searhedLessons, setSearchedLessons] = useState([])
    const [sections, setSections] = useState([])
    const [searhedSections, setSearchedSections] = useState([])

    const [curriculums, setCurriculums] = useState([])
    const [searchedCurriculums, setSearchedCurriculums] = useState([])
    const [curriculumSemesters, setCurriculumSemesters] = useState([])
    const [searchedCurSems, setSearchedCurSems] = useState([])
    const [curriculumLessons, setCurriculumLessons] = useState([])
    const [searchedCurLess, setSearchedCurLess] = useState([])

    let defaultClient = Kucukdevapi.ApiClient.instance
    let OAuth2PasswordBearer =
        defaultClient.authentications["OAuth2PasswordBearer"]
    OAuth2PasswordBearer.accessToken = login.userToken

    useEffect(() => {
        if (!login || login.userGroup !== "professor") {
            history.push("/")
        } else {
            let apiInstance = new Kucukdevapi.UniversitiesApi()
            apiInstance.listUniversities((error, data, response) => {
                if (error) {
                    console.error(error)
                    if (error.response.status === 401) {
                        setLogin(false)
                    }
                } else {
                    console.log(
                        "API called successfully. Returned data: " + data
                    )
                    setUniversities(data)
                    setSelectedLesCur()
                    setSelectedSecSem()
                    setSelectedSemDep()
                    setSelectedUniversity()
                    setSemesters([])
                    setDepartments([])
                    setSearchedCurriculums([])
                    setSearchedCurSems([])
                    setSearchedCurLess([])
                    setSearchedSections([])
                    setSearchedLessons([])
                }
            })
        }
    }, [login, setLogin, history, refresh])

    const selectSlots = (newSlot) => {
        if (!Array.isArray(newSlot)) {
            let dayHour = newSlot.split(",")
            newSlot = [dayHour[0], dayHour[1], dayHour[2]]
        }
        
        if (slots.includes(newSlot)) {
            setSlots(slots.filter((slot) => slot !== newSlot))
        } else {
            setSlots([...slots, newSlot])
        }
    }

    const onSelectUniversity = (university, refresh) => {
        if (university !== selectedUniversity || refresh) {
            setSelectedUniversity(university)
            setSelectedLesCur()
            setSelectedSecSem()
            setSelectedSemDep()
            setSearchedCurriculums([])
            setSearchedCurSems([])
            setSearchedCurLess([])
            setSearchedSections([])
            setSearchedLessons([])

            let apiInstance = new Kucukdevapi.UniversitySemestersApi()
            let unid = university._id
            apiInstance.listUniversitySemesters(
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
                        setSemesters(data)
                    }
                }
            )

            let departmentApiInstance = new Kucukdevapi.DepartmentsApi()
            departmentApiInstance.listUniversityDepartments(
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
                        setDepartments(data)
                    }
                }
            )
        }
    }

    const onSelectSemester = (semester, refresh) => {
        if (semester !== selectedSemDep || refresh) {
            setSelectedSemDep(semester)
            setSelectedLesCur()
            setSelectedSecSem()
            setSections([])
            setSearchedSections([])
            setIsSemester(true)

            let apiInstance = new Kucukdevapi.UniversityLessonsApi()
            let unid = selectedUniversity._id
            let unisid = semester._id
            apiInstance.listUniversitySemesterLessons(
                unid,
                unisid,
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
                        setLessons(data)
                        setSearchedLessons(data)
                    }
                }
            )
        }
    }

    const onSelectDepartment = (department, refresh) => {
        if (department !== selectedSemDep || refresh) {
            setSelectedSemDep(department)
            setSelectedLesCur()
            setSelectedSecSem()
            setSelectedCurriculumLesson()
            setSearchedCurSems([])
            setSearchedCurLess([])
            setIsSemester(false)

            let apiInstance = new Kucukdevapi.CurriculumsApi()
            let unid = selectedUniversity._id
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
                        setCurriculums(data)
                        setSearchedCurriculums(data)
                    }
                }
            )
        }
    }

    const onSelectLesson = (lesson, refresh) => {
        if (lesson !== selectedLesCur || refresh) {
            setSelectedLesCur(lesson)

            let apiInstance = new Kucukdevapi.UniversityLessonsApi()
            let unid = selectedUniversity._id
            let unisid = selectedSemDep._id
            let unilid = lesson._id
            apiInstance.getSingleUniversitySemesterLesson(
                unid,
                unisid,
                unilid,
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
                        setSections(data.sections)
                        setSearchedSections(data.sections)
                    }
                }
            )
        }
    }

    const onSearchLesCur = (key) => {
        if (isSemester) {
            if (key !== "") {
                setSearchedLessons(
                    lessons.filter(
                        (lesson) =>
                            lesson.name
                                .toUpperCase()
                                .includes(key.toUpperCase()) ||
                            lesson.code
                                .toUpperCase()
                                .includes(key.toUpperCase())
                    )
                )
            } else {
                setSearchedLessons(lessons)
            }
        } else {
            if (key !== "") {
                setSearchedCurriculums(
                    curriculums.filter((curriculum) =>
                        curriculum.name
                            .toUpperCase()
                            .includes(key.toUpperCase())
                    )
                )
            } else {
                setSearchedCurriculums(curriculums)
            }
        }
    }

    const onSelectCurriculum = (curriculum, refresh) => {
        if (curriculum !== selectedLesCur || refresh) {
            setSelectedLesCur(curriculum)
            setSelectedSecSem()
            setSelectedCurriculumLesson()
            setSearchedCurLess([])

            let apiInstance = new Kucukdevapi.CurriculumSemestersApi()
            let unid = selectedUniversity._id
            let depid = selectedSemDep._id
            let curid = curriculum._id
            apiInstance.listCurriculumSemesters(
                unid,
                depid,
                curid,
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
                        setCurriculumSemesters(data)
                        setSearchedCurSems(data)
                    }
                }
            )
        }
    }

    const onSelectSection = (section) => {
        if (section !== selectedSecSem) {
            setSelectedSecSem(section)
        }
    }

    const onSelectCurriculumSemester = (curriculumSemester, refresh) => {
        if (curriculumSemester !== selectedSecSem || refresh) {
            setSelectedSecSem(curriculumSemester)

            let apiInstance = new Kucukdevapi.CurriculumLessonsApi()
            let unid = selectedUniversity._id
            let depid = selectedSemDep._id
            let curid = selectedLesCur._id
            let cursid = curriculumSemester._id
            apiInstance.listCurriculumLessons(
                unid,
                depid,
                curid,
                cursid,
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
                        setCurriculumLessons(data)
                        setSearchedCurLess(data)
                    }
                }
            )
        }
    }

    const onSearchSecSem = (key) => {
        if (isSemester) {
            if (key !== "") {
                setSearchedSections(
                    sections.filter(
                        (section) =>
                            section.instructor
                                .toUpperCase()
                                .includes(key.toUpperCase()) ||
                            section.section
                                .toUpperCase()
                                .includes(key.toUpperCase())
                    )
                )
            } else {
                setSearchedSections(sections)
            }
        } else {
            if (key !== "") {
                setSearchedCurSems(
                    curriculumSemesters.filter((semester) =>
                        String(semester.semester)
                            .toUpperCase()
                            .includes(key.toUpperCase())
                    )
                )
            } else {
                setSearchedCurSems(curriculumSemesters)
            }
        }
    }

    const onSelectCurriculumLesson = (curriculumLesson) => {
        if (curriculumLesson !== selectedCurriculumLesson) {
            setSelectedCurriculumLesson(curriculumLesson)
        }
    }

    const onSearchCurriculumLesson = (key) => {
        if (key !== "") {
            setSearchedCurLess(
                curriculumLessons.filter(
                    (lesson) =>
                        lesson.code.toUpperCase().includes(key.toUpperCase()) ||
                        lesson.name.toUpperCase().includes(key.toUpperCase())
                )
            )
        } else {
            setSearchedCurLess(curriculumLessons)
        }
    }

    const curriculumLessonOptions = (key) => {
        let unid = selectedUniversity._id
        let depid = selectedSemDep._id
        let curid = selectedLesCur._id
        let cursid = selectedSecSem._id

        if (key === "curriculumLesson") {
            let apiInstance = new Kucukdevapi.CurriculumLessonsApi()
            let curlid = selectedCurriculumLesson._id
            let curriculumLessonModel = new Kucukdevapi.CurriculumLessonModel(
                name,
                code,
                lessonType
            )
            apiInstance.updateCurriculumLesson(
                unid,
                depid,
                curid,
                cursid,
                curlid,
                curriculumLessonModel,
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
                        onSelectCurriculumSemester(selectedSecSem, true)
                    }
                }
            )
        } else if (key === "addCurriculumLesson") {
            let apiInstance = new Kucukdevapi.CurriculumLessonsApi()
            let curriculumLessonModel = new Kucukdevapi.CurriculumLessonModel(
                name,
                code,
                lessonType
            )
            apiInstance.createCurriculumLesson(
                unid,
                depid,
                curid,
                cursid,
                curriculumLessonModel,
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
                        onSelectCurriculumSemester(selectedSecSem, true)
                    }
                }
            )
        } else if (key === "deleteCurriculumLesson") {
            let apiInstance = new Kucukdevapi.CurriculumLessonsApi()
            let curlid = selectedCurriculumLesson._id
            apiInstance.deleteCurriculumLesson(
                unid,
                depid,
                curid,
                cursid,
                curlid,
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
                        onSelectCurriculumSemester(selectedSecSem, true)
                    }
                }
            )
        }
    }

    const curriculumSemesterOptions = (key) => {
        let unid = selectedUniversity._id
        let depid = selectedSemDep._id
        let curid = selectedLesCur._id

        if (key === "curriculumSemester") {
            let apiInstance = new Kucukdevapi.CurriculumSemestersApi()
            let cursid = selectedSecSem._id
            let curriculumSemesterModel = new Kucukdevapi.CurriculumSemesterModel(
                name
            )
            apiInstance.updateCurriculumSemester(
                unid,
                depid,
                curid,
                cursid,
                curriculumSemesterModel,
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
                        onSelectCurriculum(selectedLesCur, true)
                    }
                }
            )
        } else if (key === "addCurriculumSemester") {
            let apiInstance = new Kucukdevapi.CurriculumSemestersApi()
            let curriculumSemesterModel = new Kucukdevapi.CurriculumSemesterModel(
                name
            )
            apiInstance.createCurriculumSemester(
                unid,
                depid,
                curid,
                curriculumSemesterModel,
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
                        onSelectCurriculum(selectedLesCur, true)
                    }
                }
            )
        } else if (key === "deleteCurriculumSemester") {
            let apiInstance = new Kucukdevapi.CurriculumSemestersApi()
            let cursid = selectedSecSem._id
            apiInstance.deleteCurriculumSemester(
                unid,
                depid,
                curid,
                cursid,
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
                        onSelectCurriculum(selectedLesCur, true)
                    }
                }
            )
        }
    }

    const curriculumOptions = (key) => {
        let unid = selectedUniversity._id
        let depid = selectedSemDep._id

        if (key === "curriculum") {
            let apiInstance = new Kucukdevapi.CurriculumsApi()
            let curid = selectedLesCur._id
            let universityCurriculumModel = new Kucukdevapi.UniversityCurriculumModel(
                name,
                startYear,
                endYear
            )
            apiInstance.updateUniversityDepartmentCurriculum(
                unid,
                depid,
                curid,
                universityCurriculumModel,
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
                        onSelectDepartment(selectedSemDep, true)
                    }
                }
            )
        } else if (key === "addCurriculum") {
            let apiInstance = new Kucukdevapi.CurriculumsApi()
            let universityCurriculumModel = new Kucukdevapi.UniversityCurriculumModel(
                name,
                startYear,
                endYear
            )
            apiInstance.createUniversityDepartmentCurriculum(
                unid,
                depid,
                universityCurriculumModel,
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
                        onSelectDepartment(selectedSemDep, true)
                    }
                }
            )
        } else if (key === "deleteCurriculum") {
            let apiInstance = new Kucukdevapi.CurriculumsApi()
            let curid = selectedLesCur._id
            apiInstance.deleteUniversityDepartmentCurriculum(
                unid,
                depid,
                curid,
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
                        onSelectDepartment(selectedSemDep, true)
                    }
                }
            )
        }
    }

    const departmentOptions = (key) => {
        let unid = selectedUniversity._id

        if (key === "department") {
            let apiInstance = new Kucukdevapi.DepartmentsApi()
            let depid = selectedSemDep._id
            let universityDepartmentModel = new Kucukdevapi.UniversityDepartmentModel(
                name
            )
            apiInstance.updateUniversityDepartment(
                unid,
                depid,
                universityDepartmentModel,
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
                        onSelectUniversity(selectedUniversity, true)
                    }
                }
            )
        } else if (key === "addDepartment") {
            let apiInstance = new Kucukdevapi.DepartmentsApi()
            let universityDepartmentModel = new Kucukdevapi.UniversityDepartmentModel(
                name
            )
            apiInstance.createUniversityDepartment(
                unid,
                universityDepartmentModel,
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
                        onSelectUniversity(selectedUniversity, true)
                    }
                }
            )
        } else if (key === "deleteDepartment") {
            let apiInstance = new Kucukdevapi.DepartmentsApi()
            let depid = selectedSemDep._id
            apiInstance.deleteUniversityDepartment(
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
                        onSelectUniversity(selectedUniversity, true)
                    }
                }
            )
        }
    }

    const semesterOptions = (key) => {
        let unid = selectedUniversity._id

        if (key === "semester") {
            let unisid = selectedSemDep._id

            let apiInstance = new Kucukdevapi.UniversitySemestersApi()
            let universitySemesterModel = new Kucukdevapi.UniversitySemesterModel(
                name
            )
            apiInstance.updateUniversitySemester(
                unid,
                unisid,
                universitySemesterModel,
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
                        onSelectUniversity(selectedUniversity, true)
                    }
                }
            )

            if (isCurUniSem) {
                let apiInstance = new Kucukdevapi.UniversitiesApi()
                let updateSemesterModel = new Kucukdevapi.UpdateSemesterModel(
                    unisid
                )
                apiInstance.updateUniversityCurrentSemester(
                    unid,
                    updateSemesterModel,
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
                            onSelectUniversity(selectedUniversity, true)
                            selectedUniversity.curSemesterID = unisid
                        }
                    }
                )
            }
        } else if (key === "addSemester") {
            let apiInstance = new Kucukdevapi.UniversitySemestersApi()
            let universitySemesterModel = new Kucukdevapi.UniversitySemesterModel(
                name
            )
            apiInstance.createUniversitySemester(
                unid,
                universitySemesterModel,
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
                        onSelectUniversity(selectedUniversity, true)
                    }
                }
            )
        } else if (key === "deleteSemester") {
            let apiInstance = new Kucukdevapi.UniversitySemestersApi()
            let unisid = selectedSemDep._id
            apiInstance.deleteUniversitySemester(
                unid,
                unisid,
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
                        onSelectUniversity(selectedUniversity, true)
                    }
                }
            )
        }
    }

    const universityOptions = (key) => {
        if (key === "university") {
            let apiInstance = new Kucukdevapi.UniversitiesApi()
            let unid = selectedUniversity._id
            let updateUniversityNameModel = new Kucukdevapi.UpdateUniversityNameModel(
                name
            )
            apiInstance.updateUniversityName(
                unid,
                updateUniversityNameModel,
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
                        setRefresh((x) => x + 1)
                    }
                }
            )
        } else if (key === "addUniversity") {
            let apiInstance = new Kucukdevapi.UniversitiesApi()
            let universityModel = new Kucukdevapi.UniversityModel(name)
            apiInstance.createUniversity(
                universityModel,
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
                        setRefresh((x) => x + 1)
                    }
                }
            )
        } else if (key === "deleteUniversity") {
            let apiInstance = new Kucukdevapi.UniversitiesApi()
            let unid = selectedUniversity._id
            apiInstance.deleteUniversity(unid, (error, data, response) => {
                if (error) {
                    console.error(error)
                    if (error.response.status === 401) {
                        setLogin(false)
                    }
                } else {
                    console.log(
                        "API called successfully. Returned data: " + data
                    )
                    setRefresh((x) => x + 1)
                }
            })
        }
    }

    const lessonOptions = (key) => {
        let unid = selectedUniversity._id
        let unisid = selectedSemDep._id

        if (key === "updateLesson") {
            let unilid = selectedLesCur._id
            let apiInstance = new Kucukdevapi.UniversityLessonsApi()
            let universityAPILessonModel = new Kucukdevapi.UniversityAPILessonModel(
                name,
                code,
                ects,
                absenceLimit
            )
            apiInstance.updateUniversityLesson(
                unid,
                unisid,
                unilid,
                universityAPILessonModel,
                (error, data, response) => {
                    if (error) {
                        console.error(error)
                    } else {
                        console.log(
                            "API called successfully. Returned data: " + data
                        )
                        onSelectSemester(selectedSemDep, true)
                    }
                }
            )
        } else if (key === "deleteLesson") {
            let apiInstance = new Kucukdevapi.UniversityLessonsApi()
            let unilid = selectedLesCur._id
            apiInstance.deleteUniversityLesson(
                unid,
                unisid,
                unilid,
                (error, data, response) => {
                    if (error) {
                        console.error(error)
                    } else {
                        console.log(
                            "API called successfully. Returned data: " + data
                        )
                        onSelectSemester(selectedSemDep, true)
                    }
                }
            )
        } else if (key === "addLesson") {
            const slotArray = []
            for (let i = 0; i < slots.length; i++) {
                slotArray.push({day: slots[i][0], hour: slots[i][1], isLab: slots[i][2]})
            }
            let apiInstance = new Kucukdevapi.UniversityLessonsApi()
            let universityLessonModel = new Kucukdevapi.UniversityLessonModel(
                name,
                code,
                ects,
                absenceLimit,
                section,
                instructor,
                slotArray
            )
            apiInstance.createUniversityLesson(
                unid,
                unisid,
                universityLessonModel,
                (error, data, response) => {
                    if (error) {
                        console.error(error)
                    } else {
                        console.log(
                            "API called successfully. Returned data: " + data
                        )
                        onSelectSemester(selectedSemDep, true)
                    }
                }
            )
        }
    }

    const sectionOptions = (key) => {
        let unid = selectedUniversity._id
        let unisid = selectedSemDep._id

        if (key === "updateSection") {
            const slotArray = []
            for (let i = 0; i < slots.length; i++) {
                slotArray.push({day: slots[i][0], hour: slots[i][1], isLab: slots[i][2]})
            }
            let apiInstance = new Kucukdevapi.UniversitySectionsApi()
            let unilid = selectedLesCur._id
            let secid = selectedSecSem._id
            let universitySectionModel = new Kucukdevapi.UniversitySectionModel(
                section,
                instructor,
                slotArray
            )
            apiInstance.updateLessonSection(
                unid,
                unisid,
                unilid,
                secid,
                universitySectionModel,
                (error, data, response) => {
                    if (error) {
                        console.error(error)
                    } else {
                        console.log(
                            "API called successfully. Returned data: " + data
                        )
                        onSelectLesson(selectedLesCur, true)
                    }
                }
            )
        } else if (key === "deleteSection") {
            let apiInstance = new Kucukdevapi.UniversitySectionsApi()
            let unilid = selectedLesCur._id
            let secid = selectedSecSem._id
            apiInstance.deleteLessonSection(
                unid,
                unisid,
                unilid,
                secid,
                (error, data, response) => {
                    if (error) {
                        console.error(error)
                    } else {
                        console.log(
                            "API called successfully. Returned data: " + data
                        )
                        onSelectLesson(selectedLesCur, true)
                    }
                }
            )
        } else if (key === "addSection") {
            const slotArray = []
            for (let i = 0; i < slots.length; i++) {
                slotArray.push({day: slots[i][0], hour: slots[i][1], isLab: slots[i][2]})
            }
            let apiInstance = new Kucukdevapi.UniversityLessonsApi()
            let universityLessonModel = new Kucukdevapi.UniversityLessonModel(
                name,
                code,
                ects,
                absenceLimit,
                section,
                instructor,
                slotArray
            )
            apiInstance.createUniversityLesson(
                unid,
                unisid,
                universityLessonModel,
                (error, data, response) => {
                    if (error) {
                        console.error(error)
                    } else {
                        console.log(
                            "API called successfully. Returned data: " + data
                        )
                        onSelectLesson(selectedLesCur, true)
                    }
                }
            )
        }
    }

    return (
        <div className="mb-8">
            <div className="grid lg:grid-flow-row lg:mx-12">
                <div className="grid lg:grid-cols-3 gap-4">
                    <div className="w-full mt-8">
                        <div className="mx-8 md:mx-20 flex flex-row justify-between">
                            <h1 className="text-2xl">Universities</h1>
                            <i
                                onClick={() => {
                                    setCurSemDepSemUniModal(true)
                                    setName("")
                                    setCurrentUpdate("addUniversity")
                                }}
                                className="cursor-pointer far fa-plus-square"
                                style={{ color: "green", fontSize: "1.75rem" }}
                            ></i>
                        </div>
                        <div className="py-2 md:px-6 lg:px-8 h-64 overflow-y-auto">
                            <div className="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard md:px-8 pt-2 pb-8 rounded-bl-lg rounded-br-lg">
                                <table className="min-w-full">
                                    <thead>
                                        <tr>
                                            <th className="px-4 py-2 border-b-2 border-gray-300 text-sm leading-4 text-blue-500 tracking-wider">
                                                Name
                                            </th>
                                            <th className="px-4 py-2 border-b-2 border-gray-300 text-sm leading-4 text-blue-500 tracking-wider">
                                                Edit
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white">
                                        {universities.map((university) => (
                                            <tr
                                                key={university._id}
                                                onClick={() =>
                                                    onSelectUniversity(
                                                        university,
                                                        false
                                                    )
                                                }
                                                className={`${
                                                    selectedUniversity ===
                                                    university
                                                        ? "bg-gray-400"
                                                        : "hover:bg-gray-200"
                                                }`}
                                            >
                                                <td className="px-4 py-2 border-b text-blue-900 border-gray-500 text-sm leading-5 cursor-pointer">
                                                    {university.name}
                                                </td>
                                                <td className="px-4 py-2 border-b text-blue-900 border-gray-500 text-sm leading-5">
                                                    <i
                                                        onClick={() => {
                                                            setCurSemDepSemUniModal(
                                                                true
                                                            )
                                                            setName(
                                                                university.name
                                                            )
                                                            setCurrentUpdate(
                                                                "university"
                                                            )
                                                        }}
                                                        className="fas fa-edit cursor-pointer"
                                                    ></i>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div className="w-full mt-8">
                        <div className="mx-8 md:mx-20 flex flex-row justify-between">
                            <h1 className="text-2xl">Semesters</h1>
                            {selectedUniversity && (
                                <i
                                    onClick={() => {
                                        setCurSemDepSemUniModal(true)
                                        setName("")
                                        setCurrentUpdate("addSemester")
                                    }}
                                    className="cursor-pointer far fa-plus-square"
                                    style={{
                                        color: "green",
                                        fontSize: "1.75rem",
                                    }}
                                ></i>
                            )}
                        </div>
                        <div className="py-2 md:px-6 lg:px-8 h-64 overflow-y-auto">
                            <div className="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard md:px-8 pt-2 pb-8 rounded-bl-lg rounded-br-lg">
                                <table className="min-w-full">
                                    <thead>
                                        <tr>
                                            <th className="px-4 py-2 border-b-2 border-gray-300 text-sm leading-4 text-blue-500 tracking-wider">
                                                Name
                                            </th>
                                            <th className="px-4 py-2 border-b-2 border-gray-300 text-sm leading-4 text-blue-500 tracking-wider">
                                                Edit
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white">
                                        {semesters.map((semester) => (
                                            <tr
                                                key={semester._id}
                                                onClick={() =>
                                                    onSelectSemester(
                                                        semester,
                                                        false
                                                    )
                                                }
                                                className={`${
                                                    selectedSemDep === semester
                                                        ? "bg-gray-400"
                                                        : "hover:bg-gray-200"
                                                }`}
                                            >
                                                <td className="px-4 py-2 border-b text-blue-900 border-gray-500 text-sm leading-5 cursor-pointer">
                                                    {selectedUniversity &&
                                                    selectedUniversity.curSemesterID ===
                                                        semester._id ? (
                                                        <i
                                                            className="cursor-pointer far fa-dot-circle mr-1"
                                                            style={{
                                                                color: "green",
                                                                fontSize:
                                                                    "1rem",
                                                            }}
                                                        ></i>
                                                    ) : null}
                                                    {semester.name}
                                                </td>
                                                <td className="px-4 py-2 border-b text-blue-900 border-gray-500 text-sm leading-5">
                                                    <i
                                                        onClick={() => {
                                                            setCurSemDepSemUniModal(
                                                                true
                                                            )
                                                            setName(
                                                                semester.name
                                                            )
                                                            setCurrentUpdate(
                                                                "semester"
                                                            )
                                                        }}
                                                        className="fas fa-edit cursor-pointer"
                                                    ></i>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div className="w-full mt-8">
                        <div className="mx-8 md:mx-20 flex flex-row justify-between">
                            <h1 className="text-2xl">Departments</h1>
                            {selectedUniversity && (
                                <i
                                    onClick={() => {
                                        setCurSemDepSemUniModal(true)
                                        setName("")
                                        setCurrentUpdate("addDepartment")
                                    }}
                                    className="cursor-pointer far fa-plus-square"
                                    style={{
                                        color: "green",
                                        fontSize: "1.75rem",
                                    }}
                                ></i>
                            )}
                        </div>
                        <div className="py-2 md:px-6 lg:px-8 h-64 overflow-y-auto">
                            <div className="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard md:px-8 pt-2 pb-8 rounded-bl-lg rounded-br-lg">
                                <table className="min-w-full">
                                    <thead>
                                        <tr>
                                            <th className="px-4 py-2 border-b-2 border-gray-300 text-sm leading-4 text-blue-500 tracking-wider">
                                                Name
                                            </th>
                                            <th className="px-4 py-2 border-b-2 border-gray-300 text-sm leading-4 text-blue-500 tracking-wider">
                                                Edit
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white">
                                        {departments.map((department) => (
                                            <tr
                                                key={department._id}
                                                onClick={() =>
                                                    onSelectDepartment(
                                                        department,
                                                        false
                                                    )
                                                }
                                                className={`${
                                                    selectedSemDep ===
                                                    department
                                                        ? "bg-gray-400"
                                                        : "hover:bg-gray-200"
                                                }`}
                                            >
                                                <td className="px-4 py-2 border-b text-blue-900 border-gray-500 text-sm leading-5 cursor-pointer">
                                                    {department.name}
                                                </td>
                                                <td className="px-4 py-2 border-b text-blue-900 border-gray-500 text-sm leading-5">
                                                    <i
                                                        onClick={() => {
                                                            setCurSemDepSemUniModal(
                                                                true
                                                            )
                                                            setName(
                                                                department.name
                                                            )
                                                            setCurrentUpdate(
                                                                "department"
                                                            )
                                                        }}
                                                        className="fas fa-edit cursor-pointer"
                                                    ></i>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-4 lg:mx-12">
                <div className="w-full mt-8">
                    <div className="mx-8 md:mx-20 flex flex-row justify-between">
                        <h1 className="text-2xl">
                            {isSemester ? "Lessons" : "Curriculums"}
                        </h1>
                        {selectedSemDep && (
                            <i
                                onClick={() => {
                                    if (isSemester) {
                                        setUpdateLessonModal(true)
                                        setCurrentUpdate("addLesson")
                                        setName("")
                                        setCode("")
                                        setEcts(0)
                                        setAbsenceLimit(0)
                                        setInstructor("")
                                        setSection("")
                                        setSlots([])
                                    } else {
                                        setCurriculumAndLessonModal(true)
                                        setName("")
                                        setStartYear()
                                        setEndYear()
                                        setCurrentUpdate("addCurriculum")
                                    }
                                }}
                                className="cursor-pointer far fa-plus-square"
                                style={{ color: "green", fontSize: "1.75rem" }}
                            ></i>
                        )}
                    </div>
                    <input
                        className="w-11/12 px-3 py-2 my-1 text-sm leading-medium text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        type="text"
                        placeholder="Search"
                        onChange={(e) => onSearchLesCur(e.target.value)}
                    />
                    <div className="py-2 md:px-6 lg:px-8 h-80 overflow-y-auto">
                        <div className="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard md:px-8 pt-2 pb-8 rounded-bl-lg rounded-br-lg">
                            <table className="min-w-full">
                                <thead>
                                    <tr>
                                        <th className="px-4 py-2 border-b-2 border-gray-300 text-sm leading-4 text-blue-500 tracking-wider">
                                            Name
                                        </th>
                                        <th className="px-4 py-2 border-b-2 border-gray-300 text-sm leading-4 text-blue-500 tracking-wider">
                                            Edit
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white">
                                    {isSemester
                                        ? searhedLessons.map((lesson) => (
                                              <tr
                                                  key={lesson._id}
                                                  onClick={() =>
                                                      onSelectLesson(
                                                          lesson,
                                                          false
                                                      )
                                                  }
                                                  className={`${
                                                      selectedLesCur === lesson
                                                          ? "bg-gray-400"
                                                          : "hover:bg-gray-200"
                                                  }`}
                                              >
                                                  <td className="px-4 py-2 border-b text-blue-900 border-gray-500 text-sm leading-5 cursor-pointer">
                                                      {`${lesson.code}  |  ${lesson.name}`}
                                                  </td>
                                                  <td className="px-4 py-2 border-b text-blue-900 border-gray-500 text-sm leading-5">
                                                      <i
                                                          onClick={() => {
                                                              setUpdateLessonModal(
                                                                  true
                                                              )
                                                              setCurrentUpdate(
                                                                  "updateLesson"
                                                              )
                                                              setName(
                                                                  lesson.name
                                                              )
                                                              setCode(
                                                                  lesson.code
                                                              )
                                                              setEcts(
                                                                  lesson.ects
                                                              )
                                                              setAbsenceLimit(
                                                                  lesson.absenceLimit
                                                              )
                                                          }}
                                                          className="fas fa-edit cursor-pointer"
                                                      ></i>
                                                  </td>
                                              </tr>
                                          ))
                                        : searchedCurriculums.map(
                                              (curriculum) => (
                                                  <tr
                                                      key={curriculum._id}
                                                      onClick={() =>
                                                          onSelectCurriculum(
                                                              curriculum,
                                                              false
                                                          )
                                                      }
                                                      className={`${
                                                          selectedLesCur ===
                                                          curriculum
                                                              ? "bg-gray-400"
                                                              : "hover:bg-gray-200"
                                                      }`}
                                                  >
                                                      <td className="px-4 py-2 border-b text-blue-900 border-gray-500 text-sm leading-5 cursor-pointer">
                                                          {curriculum.name}
                                                      </td>
                                                      <td className="px-4 py-2 border-b text-blue-900 border-gray-500 text-sm leading-5">
                                                          <i
                                                              onClick={() => {
                                                                  setCurriculumAndLessonModal(
                                                                      true
                                                                  )
                                                                  setName(
                                                                      curriculum.name
                                                                  )
                                                                  setStartYear(
                                                                      curriculum.startYear
                                                                  )
                                                                  setEndYear(
                                                                      curriculum.endYear
                                                                  )
                                                                  setCurrentUpdate(
                                                                      "curriculum"
                                                                  )
                                                              }}
                                                              className="fas fa-edit cursor-pointer"
                                                          ></i>
                                                      </td>
                                                  </tr>
                                              )
                                          )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="w-full mt-8">
                    <div className="mx-8 md:mx-20 flex flex-row justify-between">
                        <h1 className="text-2xl">
                            {isSemester ? "Sections" : "Curriculum Semesters"}
                        </h1>
                        {selectedLesCur && (
                            <i
                                onClick={() => {
                                    if (isSemester) {
                                        setUpdateLessonModal(true)
                                        setCurrentUpdate("addSection")
                                        setName(selectedLesCur.name)
                                        setCode(selectedLesCur.code)
                                        setEcts(selectedLesCur.ects)
                                        setAbsenceLimit(
                                            selectedLesCur.absenceLimit
                                        )
                                        setInstructor("")
                                        setSection("")
                                        setSlots([])
                                    } else {
                                        setCurSemDepSemUniModal(true)
                                        setName()
                                        setCurrentUpdate(
                                            "addCurriculumSemester"
                                        )
                                    }
                                }}
                                className="cursor-pointer far fa-plus-square"
                                style={{ color: "green", fontSize: "1.75rem" }}
                            ></i>
                        )}
                    </div>
                    <input
                        className="w-11/12 px-3 py-2 my-1 text-sm leading-medium text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        type="text"
                        placeholder="Search"
                        onChange={(e) => onSearchSecSem(e.target.value)}
                    />
                    <div className="py-2 md:px-6 lg:px-8 h-80 overflow-y-auto">
                        <div className="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard md:px-8 pt-2 pb-8 rounded-bl-lg rounded-br-lg">
                            <table className="min-w-full">
                                <thead>
                                    <tr>
                                        <th className="px-4 py-2 border-b-2 border-gray-300 text-sm leading-4 text-blue-500 tracking-wider">
                                            Name
                                        </th>
                                        <th className="px-4 py-2 border-b-2 border-gray-300 text-sm leading-4 text-blue-500 tracking-wider">
                                            Edit
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white">
                                    {isSemester
                                        ? searhedSections.map((section) => {
                                              const resInstructor = section.instructor.split(
                                                  " "
                                              )
                                              let instructor =
                                                  resInstructor[
                                                      resInstructor.length - 1
                                                  ]
                                              return (
                                                  <tr
                                                      key={section._id}
                                                      onClick={() =>
                                                          onSelectSection(
                                                              section
                                                          )
                                                      }
                                                      className={`${
                                                          selectedSecSem ===
                                                          section
                                                              ? "bg-gray-400"
                                                              : "hover:bg-gray-200"
                                                      }`}
                                                  >
                                                      <td className="px-4 py-2 border-b text-blue-900 border-gray-500 text-sm leading-5 cursor-pointer">
                                                          {`${section.section} ${instructor}`}
                                                      </td>
                                                      <td className="px-4 py-2 border-b text-blue-900 border-gray-500 text-sm leading-5">
                                                          <i
                                                              onClick={() => {
                                                                  setUpdateLessonModal(
                                                                      true
                                                                  )
                                                                  setCurrentUpdate(
                                                                      "updateSection"
                                                                  )
                                                                  setName(
                                                                      selectedLesCur.name
                                                                  )
                                                                  setCode(
                                                                      selectedLesCur.code
                                                                  )
                                                                  setEcts(
                                                                      selectedLesCur.ects
                                                                  )
                                                                  setAbsenceLimit(
                                                                      selectedLesCur.absenceLimit
                                                                  )
                                                                  setInstructor(
                                                                      section.instructor
                                                                  )
                                                                  setSection(
                                                                      section.section
                                                                  )
                                                                  setSlots(
                                                                      section.slots
                                                                  )
                                                              }}
                                                              className="fas fa-edit cursor-pointer"
                                                          ></i>
                                                      </td>
                                                  </tr>
                                              )
                                          })
                                        : searchedCurSems.map(
                                              (curriculumSemester) => (
                                                  <tr
                                                      key={
                                                          curriculumSemester._id
                                                      }
                                                      onClick={() =>
                                                          onSelectCurriculumSemester(
                                                              curriculumSemester,
                                                              false
                                                          )
                                                      }
                                                      className={`${
                                                          selectedSecSem ===
                                                          curriculumSemester
                                                              ? "bg-gray-400"
                                                              : "hover:bg-gray-200"
                                                      }`}
                                                  >
                                                      <td className="px-4 py-2 border-b text-blue-900 border-gray-500 text-sm leading-5 cursor-pointer">
                                                          {
                                                              curriculumSemester.semester
                                                          }
                                                      </td>
                                                      <td className="px-4 py-2 border-b text-blue-900 border-gray-500 text-sm leading-5">
                                                          <i
                                                              onClick={() => {
                                                                  setCurSemDepSemUniModal(
                                                                      true
                                                                  )
                                                                  setName(
                                                                      curriculumSemester.semester
                                                                  )
                                                                  setCurrentUpdate(
                                                                      "curriculumSemester"
                                                                  )
                                                              }}
                                                              className="fas fa-edit cursor-pointer"
                                                          ></i>
                                                      </td>
                                                  </tr>
                                              )
                                          )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {!isSemester && (
                    <div className="w-full mt-8">
                        <div className="mx-8 md:mx-20 flex flex-row justify-between">
                            <h1 className="text-2xl">Curriculum Lessons</h1>
                            {selectedSecSem && (
                                <i
                                    onClick={() => {
                                        if (!isSemester) {
                                            setCurriculumAndLessonModal(true)
                                            setName("")
                                            setCode("")
                                            setLessonType("")
                                            setCurrentUpdate(
                                                "addCurriculumLesson"
                                            )
                                        }
                                    }}
                                    className="cursor-pointer far fa-plus-square"
                                    style={{
                                        color: "green",
                                        fontSize: "1.75rem",
                                    }}
                                ></i>
                            )}
                        </div>

                        <input
                            className="w-11/12 px-3 py-2 my-1 text-sm leading-medium text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                            type="text"
                            placeholder="Search"
                            onChange={(e) =>
                                onSearchCurriculumLesson(e.target.value)
                            }
                        />
                        <div className="py-2 md:px-6 lg:px-8 h-80 overflow-y-auto">
                            <div className="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard md:px-8 pt-2 pb-8 rounded-bl-lg rounded-br-lg">
                                <table className="min-w-full">
                                    <thead>
                                        <tr>
                                            <th className="px-4 py-2 border-b-2 border-gray-300 text-sm leading-4 text-blue-500 tracking-wider">
                                                Name
                                            </th>
                                            <th className="px-4 py-2 border-b-2 border-gray-300 text-sm leading-4 text-blue-500 tracking-wider">
                                                Edit
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white">
                                        {searchedCurLess.map(
                                            (curriculumLesson) => (
                                                <tr
                                                    key={curriculumLesson._id}
                                                    onClick={() =>
                                                        onSelectCurriculumLesson(
                                                            curriculumLesson
                                                        )
                                                    }
                                                    className={`${
                                                        selectedCurriculumLesson ===
                                                        curriculumLesson
                                                            ? "bg-gray-400"
                                                            : "hover:bg-gray-200"
                                                    }`}
                                                >
                                                    <td className="px-4 py-2 border-b text-blue-900 border-gray-500 text-sm leading-5 cursor-pointer">
                                                        {`${curriculumLesson.code}  |  ${curriculumLesson.name}`}
                                                    </td>
                                                    <td className="px-4 py-2 border-b text-blue-900 border-gray-500 text-sm leading-5">
                                                        <i
                                                            onClick={() => {
                                                                setCurriculumAndLessonModal(
                                                                    true
                                                                )
                                                                setName(
                                                                    curriculumLesson.name
                                                                )
                                                                setCode(
                                                                    curriculumLesson.code
                                                                )
                                                                setLessonType(
                                                                    curriculumLesson.lessonType
                                                                )
                                                                setCurrentUpdate(
                                                                    "curriculumLesson"
                                                                )
                                                            }}
                                                            className="fas fa-edit cursor-pointer"
                                                        ></i>
                                                    </td>
                                                </tr>
                                            )
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {curriculumAndLessonModal ? (
                <div>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative w-auto my-6 mx-auto w-full md:w-1/2">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                                    <h3 className="pt-4 text-2xl text-center">
                                        {`${
                                            currentUpdate === "curriculum"
                                                ? "Update Curriculum"
                                                : currentUpdate ===
                                                  "curriculumLesson"
                                                ? "Update Curriculum Lesson"
                                                : currentUpdate ===
                                                  "addCurriculum"
                                                ? "Add Curriculum"
                                                : currentUpdate ===
                                                  "addCurriculumLesson"
                                                ? "Add Curriculum Lesson"
                                                : null
                                        }`}
                                    </h3>

                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() =>
                                            setCurriculumAndLessonModal(false)
                                        }
                                    >
                                        <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                            ×
                                        </span>
                                    </button>
                                </div>
                                {/*body*/}
                                <form className="px-8 pt-6 pb-8 bg-white rounded">
                                    <div className="mb-4">
                                        <label className="block mb-2 text-base font-bold text-gray-700">
                                            {currentUpdate === "curriculum" ||
                                            currentUpdate === "addCurriculum"
                                                ? "Curriculum Name"
                                                : currentUpdate ===
                                                      "curriculumLesson" ||
                                                  currentUpdate ===
                                                      "addCurriculumLesson"
                                                ? "Curriculum Lesson Name"
                                                : null}
                                        </label>
                                        <input
                                            className="w-full px-3 py-2 mb-3 text-base leading-medium text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                            type="text"
                                            value={name}
                                            onChange={(e) =>
                                                setName(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block mb-2 text-base font-bold text-gray-700">
                                            {currentUpdate === "curriculum" ||
                                            currentUpdate === "addCurriculum"
                                                ? "Curriculum Start Year"
                                                : currentUpdate ===
                                                      "curriculumLesson" ||
                                                  currentUpdate ===
                                                      "addCurriculumLesson"
                                                ? "Curriculum Lesson Code"
                                                : null}
                                        </label>
                                        <input
                                            className="w-full px-3 py-2 mb-3 text-base leading-medium text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                            type={
                                                currentUpdate ===
                                                    "curriculum" ||
                                                currentUpdate ===
                                                    "addCurriculum"
                                                    ? "number"
                                                    : currentUpdate ===
                                                          "curriculumLesson" ||
                                                      currentUpdate ===
                                                          "addCurriculumLesson"
                                                    ? "text"
                                                    : null
                                            }
                                            value={
                                                currentUpdate ===
                                                    "curriculum" ||
                                                currentUpdate ===
                                                    "addCurriculum"
                                                    ? startYear
                                                    : currentUpdate ===
                                                          "curriculumLesson" ||
                                                      currentUpdate ===
                                                          "addCurriculumLesson"
                                                    ? code
                                                    : null
                                            }
                                            onChange={(e) =>
                                                currentUpdate ===
                                                    "curriculum" ||
                                                currentUpdate ===
                                                    "addCurriculum"
                                                    ? setStartYear(
                                                          e.target.value
                                                      )
                                                    : currentUpdate ===
                                                          "curriculumLesson" ||
                                                      currentUpdate ===
                                                          "addCurriculumLesson"
                                                    ? setCode(e.target.value)
                                                    : null
                                            }
                                        />
                                        <p className="flex justify-center text-xs italic text-red-500 my-2">
                                            {currentUpdate ===
                                            "curriculumLesson"
                                                ? "Write same as seen in the university information system and kucukdev.org database."
                                                : null}
                                        </p>
                                    </div>
                                    <div className="mb-4">
                                        <div className="w-full mb-4 md:mr-2 md:mb-0">
                                            <label className="block mb-2 text-base font-bold text-gray-700">
                                                {currentUpdate ===
                                                    "curriculum" ||
                                                currentUpdate ===
                                                    "addCurriculum"
                                                    ? "Curriculum End Year"
                                                    : currentUpdate ===
                                                          "curriculumLesson" ||
                                                      currentUpdate ===
                                                          "addCurriculumLesson"
                                                    ? "Curriculum Lesson Type"
                                                    : null}
                                            </label>
                                            <input
                                                className="w-full px-3 py-2 mb-3 text-base leading-medium text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                                type={
                                                    currentUpdate ===
                                                        "curriculum" ||
                                                    currentUpdate ===
                                                        "addCurriculum"
                                                        ? "number"
                                                        : currentUpdate ===
                                                              "curriculumLesson" ||
                                                          currentUpdate ===
                                                              "addCurriculumLesson"
                                                        ? "text"
                                                        : null
                                                }
                                                value={
                                                    currentUpdate ===
                                                        "curriculum" ||
                                                    currentUpdate ===
                                                        "addCurriculum"
                                                        ? endYear
                                                        : currentUpdate ===
                                                              "curriculumLesson" ||
                                                          currentUpdate ===
                                                              "addCurriculumLesson"
                                                        ? lessonType
                                                        : null
                                                }
                                                onChange={(e) =>
                                                    currentUpdate ===
                                                        "curriculum" ||
                                                    currentUpdate ===
                                                        "addCurriculum"
                                                        ? setEndYear(
                                                              e.target.value
                                                          )
                                                        : currentUpdate ===
                                                              "curriculumLesson" ||
                                                          currentUpdate ===
                                                              "addCurriculumLesson"
                                                        ? setLessonType(
                                                              e.target.value
                                                          )
                                                        : null
                                                }
                                            />
                                        </div>
                                        {currentUpdate === "curriculum" ||
                                        currentUpdate === "addCurriculum" ? (
                                            <p className="flex justify-center text-xs italic text-red-500 my-2">
                                                If this curriculum still in use,
                                                write 2100.
                                            </p>
                                        ) : null}
                                    </div>
                                </form>
                                {/*footer*/}
                                <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
                                    <button
                                        className="text-black background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                                        type="button"
                                        style={{ transition: "all .15s ease" }}
                                        onClick={() =>
                                            setCurriculumAndLessonModal(false)
                                        }
                                    >
                                        Close
                                    </button>
                                    {!currentUpdate.includes("add") && (
                                        <button
                                            className="bg-red-500 active:bg-red-700 text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                                            type="button"
                                            style={{
                                                transition: "all .15s ease",
                                            }}
                                            onClick={() => {
                                                setCurriculumAndLessonModal(
                                                    false
                                                )
                                                if (
                                                    currentUpdate ===
                                                    "curriculumLesson"
                                                ) {
                                                    curriculumLessonOptions(
                                                        "deleteCurriculumLesson"
                                                    )
                                                } else if (
                                                    currentUpdate ===
                                                    "curriculum"
                                                ) {
                                                    curriculumOptions(
                                                        "deleteCurriculum"
                                                    )
                                                }
                                            }}
                                        >
                                            Delete
                                        </button>
                                    )}
                                    <button
                                        className={`${
                                            currentUpdate.includes("add")
                                                ? "bg-green-500 active:bg-green-700"
                                                : "bg-yellow-500 active:bg-yellow-700"
                                        } text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1`}
                                        type="button"
                                        style={{ transition: "all .15s ease" }}
                                        onClick={() => {
                                            setCurriculumAndLessonModal(false)
                                            if (
                                                currentUpdate ===
                                                    "curriculumLesson" ||
                                                currentUpdate ===
                                                    "addCurriculumLesson"
                                            ) {
                                                curriculumLessonOptions(
                                                    currentUpdate
                                                )
                                            } else if (
                                                currentUpdate ===
                                                    "curriculum" ||
                                                currentUpdate ===
                                                    "addCurriculum"
                                            ) {
                                                curriculumOptions(currentUpdate)
                                            }
                                        }}
                                    >
                                        {currentUpdate.includes("add")
                                            ? "Add"
                                            : "Update"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </div>
            ) : null}

            {curSemDepSemUniModal ? (
                <div>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative w-auto my-6 mx-auto w-full md:w-1/2">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                                    <h3 className="pt-4 text-2xl text-center">
                                        {currentUpdate === "curriculumSemester"
                                            ? "Update Curriculum Semester"
                                            : currentUpdate === "department"
                                            ? "Update Department"
                                            : currentUpdate === "semester"
                                            ? "Update Semester"
                                            : currentUpdate === "university"
                                            ? "Update University"
                                            : currentUpdate === "addUniversity"
                                            ? "Add University"
                                            : currentUpdate === "addSemester"
                                            ? "Add Semester"
                                            : currentUpdate === "addDepartment"
                                            ? "Add Department"
                                            : currentUpdate ===
                                              "addCurriculumSemester"
                                            ? "Add Curriculum Semester"
                                            : null}
                                    </h3>

                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() =>
                                            setCurSemDepSemUniModal(false)
                                        }
                                    >
                                        <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                            ×
                                        </span>
                                    </button>
                                </div>
                                {/*body*/}
                                <form className="px-8 pt-6 pb-8 bg-white rounded">
                                    <div className="mb-4">
                                        <label className="block mb-2 text-base font-bold text-gray-700">
                                            {currentUpdate ===
                                                "curriculumSemester" ||
                                            currentUpdate ===
                                                "addCurriculumSemester"
                                                ? "Curriculum Semester Name"
                                                : currentUpdate ===
                                                      "department" ||
                                                  currentUpdate ===
                                                      "addDepartment"
                                                ? "Department Name"
                                                : currentUpdate ===
                                                      "semester" ||
                                                  currentUpdate ===
                                                      "addSemester"
                                                ? "Semester Name"
                                                : currentUpdate ===
                                                      "university" ||
                                                  currentUpdate ===
                                                      "addUniversity"
                                                ? "University Name"
                                                : null}
                                        </label>
                                        <input
                                            className="w-full px-3 py-2 mb-3 text-base leading-medium text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                            type={
                                                currentUpdate ===
                                                    "curriculumSemester" ||
                                                currentUpdate ===
                                                    "addCurriculumSemester"
                                                    ? "number"
                                                    : "text"
                                            }
                                            value={name}
                                            onChange={(e) =>
                                                setName(e.target.value)
                                            }
                                        />
                                    </div>
                                    {currentUpdate === "semester" && (
                                        <div>
                                            <label className="block mb-2 text-base font-bold text-gray-700">
                                                Make Current Semester of{" "}
                                                {selectedUniversity.name}
                                            </label>
                                            <input
                                                type="checkbox"
                                                onChange={(e) =>
                                                    setIscCurUniSem(
                                                        e.target.checked
                                                    )
                                                }
                                            />
                                        </div>
                                    )}
                                </form>
                                {/*footer*/}
                                <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
                                    <button
                                        className="text-black background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                                        type="button"
                                        style={{ transition: "all .15s ease" }}
                                        onClick={() =>
                                            setCurSemDepSemUniModal(false)
                                        }
                                    >
                                        Close
                                    </button>
                                    {!currentUpdate.includes("add") && (
                                        <button
                                            className="bg-red-500 active:bg-red-700 text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                                            type="button"
                                            style={{
                                                transition: "all .15s ease",
                                            }}
                                            onClick={() => {
                                                setCurSemDepSemUniModal(false)
                                                if (
                                                    currentUpdate ===
                                                    "curriculumSemester"
                                                ) {
                                                    curriculumSemesterOptions(
                                                        "deleteCurriculumSemester"
                                                    )
                                                } else if (
                                                    currentUpdate ===
                                                    "department"
                                                ) {
                                                    departmentOptions(
                                                        "deleteDepartment"
                                                    )
                                                } else if (
                                                    currentUpdate === "semester"
                                                ) {
                                                    semesterOptions(
                                                        "deleteSemester"
                                                    )
                                                } else if (
                                                    currentUpdate ===
                                                    "university"
                                                ) {
                                                    universityOptions(
                                                        "deleteUniversity"
                                                    )
                                                }
                                            }}
                                        >
                                            Delete
                                        </button>
                                    )}
                                    <button
                                        className={`${
                                            currentUpdate.includes("add")
                                                ? "bg-green-500 active:bg-green-700"
                                                : "bg-yellow-500 active:bg-yellow-700"
                                        } text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1`}
                                        type="button"
                                        style={{ transition: "all .15s ease" }}
                                        onClick={() => {
                                            setCurSemDepSemUniModal(false)
                                            if (
                                                currentUpdate ===
                                                    "curriculumSemester" ||
                                                currentUpdate ===
                                                    "addCurriculumSemester"
                                            ) {
                                                curriculumSemesterOptions(
                                                    currentUpdate
                                                )
                                            } else if (
                                                currentUpdate ===
                                                    "department" ||
                                                currentUpdate ===
                                                    "addDepartment"
                                            ) {
                                                departmentOptions(currentUpdate)
                                            } else if (
                                                currentUpdate === "semester" ||
                                                currentUpdate === "addSemester"
                                            ) {
                                                semesterOptions(currentUpdate)
                                            } else if (
                                                currentUpdate ===
                                                    "university" ||
                                                currentUpdate ===
                                                    "addUniversity"
                                            ) {
                                                universityOptions(currentUpdate)
                                            }
                                        }}
                                    >
                                        {currentUpdate.includes("add")
                                            ? "Add"
                                            : "Update"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </div>
            ) : null}

            {updateLessonModal ? (
                <div>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative w-auto my-6 mx-auto w-full md:w-1/2">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                                    <h3 className="pt-4 text-2xl text-center">
                                        {currentUpdate === "addLesson"
                                            ? "Add Lesson"
                                            : currentUpdate === "addSection"
                                            ? "Add Section"
                                            : currentUpdate === "updateSection"
                                            ? "Update Section"
                                            : currentUpdate === "updateLesson"
                                            ? "Update Lesson"
                                            : null}
                                    </h3>

                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() =>
                                            setUpdateLessonModal(false)
                                        }
                                    >
                                        <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                            ×
                                        </span>
                                    </button>
                                </div>
                                {/*body*/}
                                <form className="px-8 pt-6 pb-8 bg-white rounded">
                                    <div className="mb-4 md:flex md:justify-between">
                                        <div className="w-full mb-4 md:mr-2 md:mb-0">
                                            <label className="block mb-2 text-base font-bold text-gray-700">
                                                Name
                                            </label>
                                            <input
                                                className="w-full px-3 py-2 mb-3 text-base leading-medium text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                                type="text"
                                                placeholder="Art Of Computing"
                                                value={name}
                                                onChange={(e) =>
                                                    setName(e.target.value)
                                                }
                                            />
                                        </div>
                                        <div className="w-full mb-4 md:mr-2 md:mb-0">
                                            <label className="block mb-2 text-base font-bold text-gray-700">
                                                Code
                                            </label>
                                            <input
                                                className="w-full px-3 py-2 mb-3 text-base leading-medium text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                                type="text"
                                                placeholder="COMP101"
                                                value={code}
                                                onChange={(e) =>
                                                    setCode(e.target.value)
                                                }
                                            />
                                            <p className="flex justify-center text-xs italic text-red-500 my-2">
                                                Write same as seen in the
                                                university information system
                                                and kucukdev.org database.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mb-4 md:flex md:justify-between">
                                        <div className="w-full mb-4 md:mr-2 md:mb-0">
                                            <label className="block mb-2 text-base font-bold text-gray-700">
                                                ECTS
                                            </label>
                                            <input
                                                className="w-full px-3 py-2 mb-3 text-base leading-medium text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                                type="number"
                                                placeholder="6"
                                                value={ects}
                                                onChange={(e) =>
                                                    setEcts(e.target.value)
                                                }
                                            />
                                        </div>
                                        <div className="w-full mb-4 md:mr-2 md:mb-0">
                                            <label className="block mb-2 text-base font-bold text-gray-700">
                                                Absence Limit
                                            </label>
                                            <input
                                                className="w-full px-3 py-2 mb-3 text-base leading-medium text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                                type="number"
                                                placeholder="21"
                                                value={absenceLimit}
                                                onChange={(e) =>
                                                    setAbsenceLimit(
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>
                                    {currentUpdate === "addLesson" ||
                                    currentUpdate === "addSection" ||
                                    currentUpdate === "updateSection" ? (
                                        <div>
                                            <div className="mb-4 md:flex md:justify-between">
                                                <div className="w-full mb-4 md:mr-2 md:mb-0">
                                                    <label className="block mb-2 text-base font-bold text-gray-700">
                                                        Instructor
                                                    </label>
                                                    <input
                                                        className="w-full px-3 py-2 mb-3 text-base leading-medium text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                                        type="text"
                                                        placeholder="Jack Joe"
                                                        value={instructor}
                                                        onChange={(e) =>
                                                            setInstructor(
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                </div>
                                                <div className="w-full mb-4 md:mr-2 md:mb-0">
                                                    <label className="block mb-2 text-base font-bold text-gray-700">
                                                        Section
                                                    </label>
                                                    <input
                                                        className="w-full px-3 py-2 mb-3 text-base leading-medium text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                                        type="text"
                                                        placeholder="03"
                                                        value={section}
                                                        onChange={(e) =>
                                                            setSection(
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                </div>
                                            </div>
                                            <div className="mb-4">
                                                <label className="block mb-2 text-base font-bold text-gray-700">
                                                    Slot
                                                </label>
                                                <div className="flex flex-row">
                                                    <input
                                                        className="w-full px-3 py-2 text-base leading-medium text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                                        type="text"
                                                        value={slot}
                                                        placeholder="2,2,0"
                                                        onChange={(e) =>
                                                            setSlot(
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                    <button
                                                        className="bg-blue-500 active:bg-blue-700 text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none ml-2"
                                                        type="button"
                                                        style={{
                                                            transition:
                                                                "all .15s ease",
                                                        }}
                                                        onClick={() => {
                                                            selectSlots(slot)
                                                            setSlot("")
                                                        }}
                                                    >
                                                        Add
                                                    </button>
                                                </div>
                                                <div className="flex flex-row flex-wrap mx-8 mt-2">
                                                    {slots.map(
                                                        (slot, index) => (
                                                            <div
                                                                key={index}
                                                                className="mt-2 bg-gray-300 py-2 px-4 mr-2 rounded-full flex flex-row"
                                                            >
                                                                {`${slot[0]},${slot[1]},${slot[2]}`}
                                                                <div
                                                                    onClick={() =>
                                                                        selectSlots(
                                                                            slot
                                                                        )
                                                                    }
                                                                    className="cursor-pointer ml-2 font-bold"
                                                                >
                                                                    X
                                                                </div>
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ) : null}
                                </form>
                                {/*footer*/}
                                <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
                                    <button
                                        className="text-black background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                                        type="button"
                                        style={{ transition: "all .15s ease" }}
                                        onClick={() =>
                                            setUpdateLessonModal(false)
                                        }
                                    >
                                        Close
                                    </button>
                                    {!currentUpdate.includes("add") && (
                                        <button
                                            className="bg-red-500 active:bg-red-700 text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                                            type="button"
                                            style={{
                                                transition: "all .15s ease",
                                            }}
                                            onClick={() => {
                                                setUpdateLessonModal(false)
                                                if (
                                                    currentUpdate ===
                                                    "updateLesson"
                                                ) {
                                                    lessonOptions(
                                                        "deleteLesson"
                                                    )
                                                } else if (
                                                    currentUpdate ===
                                                    "updateSection"
                                                ) {
                                                    sectionOptions(
                                                        "deleteSection"
                                                    )
                                                }
                                            }}
                                        >
                                            Delete
                                        </button>
                                    )}
                                    <button
                                        className={`${
                                            currentUpdate.includes("add")
                                                ? "bg-green-500 active:bg-green-700"
                                                : "bg-yellow-500 active:bg-yellow-700"
                                        } text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1`}
                                        type="button"
                                        style={{ transition: "all .15s ease" }}
                                        onClick={() => {
                                            setUpdateLessonModal(false)
                                            if (
                                                currentUpdate === "updateLesson"
                                            ) {
                                                lessonOptions("updateLesson")
                                            } else if (
                                                currentUpdate === "addLesson"
                                            ) {
                                                lessonOptions("addLesson")
                                            } else if (
                                                currentUpdate ===
                                                "updateSection"
                                            ) {
                                                sectionOptions("updateSection")
                                            } else if (
                                                currentUpdate === "addSection"
                                            ) {
                                                sectionOptions("addSection")
                                            }
                                        }}
                                    >
                                        {currentUpdate.includes("add")
                                            ? "Add"
                                            : "Update"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </div>
            ) : null}
        </div>
    )
}

export default ProfessorPanel
