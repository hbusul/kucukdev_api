import { useState, useContext, useEffect } from "react"
import { Link } from "react-router-dom"
import { UserContext } from "../Context"
import { useAuth } from 'react-oauth2-pkce'
import jwtDecode from 'jwt-decode'

var Kucukdevapi = require("kucukdevapi")

const Navbar = () => {
    const [login, setLogin] = useContext(UserContext)

    const [isVisible, setIsVisible] = useState(false)
    const { authService } = useAuth();

    const authLogin = async () => authService.authorize();
    const authLogout = async () => authService.logout(true);
    //const jwtPayload = jwtDecode(authService.getAuthTokens().id_token);

    useEffect(() => {
        if (login && authService.isAuthenticated()) {
            console.log('case 1')
            //OK
        } else if (login && !authService.isAuthenticated()) {
            //We need to set login to false
            setLogin(false);
            console.log('case 2')
        } else if (!login && authService.isAuthenticated()) {
            //We need to set login
            console.log('case 3')
            const token = authService.getAuthTokens().access_token

            let defaultClient = Kucukdevapi.ApiClient.instance
            let OAuth2PasswordBearer =
                defaultClient.authentications["OAuth2PasswordBearer"]
            OAuth2PasswordBearer.accessToken = token

            let apiInstance = new Kucukdevapi.UsersApi()
            apiInstance.getCurrentUser((error, data, response) => {
                if (error) {
                    console.error(error)
                } else {
                    console.log(
                        "API called successfully. Returned data: " +
                        response.body
                    )
                    setLogin({
                        userToken: token,
                        userID: data._id,
                        userGroup: data.userGroup,
                        semesterID: data.curSemesterID,
                        universityID: data.curUniversityID,
                    })
                }
            })
        } else { // !login && !authService.isAuthenticated()
            console.log('case 4')

            //OK
        }
    }, [authService, login, setLogin]);


    return (
        <nav className="bg-white md:h-28 shadow">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between py-4">
                    <Link to="/">
                        <img
                            className="w-20 h-20"
                            alt="logo"
                            src="kucukdev.png"
                        />
                    </Link>
                    {login && (
                        <div className="hidden md:flex md:items-center">
                            <Link
                                to="/overview"
                                className="text-gray-800 text-md font-semibold hover:text-blue-600 mr-3 lg:mr-6"
                            >
                                Overview
                            </Link>
                            <Link
                                to="/semesters"
                                className="text-gray-800 text-md font-semibold hover:text-blue-600 mr-3 lg:mr-6"
                            >
                                Semesters
                            </Link>

                            <div className="dropdown inline-block relative">
                                <button className="text-gray-800 text-md font-semibold hover:text-blue-600 mr-3 lg:mr-6 inline-flex items-center">
                                    <span className="mr-1">Lessons</span>
                                    <svg
                                        className="fill-current h-4 w-4"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />{" "}
                                    </svg>
                                </button>

                                <ul className="dropdown-menu absolute hidden text-gray-700 pt-1 whitespace-nowrap">
                                    <Link
                                        to="/lessons"
                                        className="bg-gray-100 hover:bg-gray-200 py-2 px-8 block text-gray-800 text-sm font-semibold hover:text-blue-600 mb-1"
                                    >
                                        Show Lessons
                                    </Link>
                                    <Link
                                        to="/lessons/add-lesson"
                                        className="bg-gray-100 hover:bg-gray-200 py-2 px-8 block text-gray-800 text-sm font-semibold hover:text-blue-600 mb-1"
                                    >
                                        Add Lesson
                                    </Link>
                                    <Link
                                        to="/lessons/add-from-uis"
                                        className="bg-gray-100 hover:bg-gray-200 py-2 px-8 block text-gray-800 text-sm font-semibold hover:text-blue-600 mb-1"
                                    >
                                        Add from UIS
                                    </Link>
                                </ul>
                            </div>

                            <Link
                                to="/attendance"
                                className="text-gray-800 text-md font-semibold hover:text-blue-600 mr-3 lg:mr-6"
                            >
                                Attendance
                            </Link>
                            <Link
                                to="/prepare-schedule"
                                className="text-gray-800 text-md font-semibold hover:text-blue-600 mr-3 lg:mr-6"
                            >
                                Prepare
                            </Link>
                            <Link
                                to="/professor-panel"
                                className={`text-gray-800 text-md font-semibold hover:text-blue-600 mr-3 lg:mr-6 ${"professor!" !== "professor" && "hidden"
                                    }`}
                            >
                                Panel
                            </Link>
                        </div>
                    )}

                    {!login ? (
                        <div className="hidden md:flex md:items-center">
                            <button onClick={authLogin} className="text-gray-800 text-md font-semibold hover:text-blue-600 mr-4">Sign in</button>
                            <a
                                className="text-gray-800 text-md font-semibold border px-4 py-2 rounded-md hover:text-blue-600 hover:border-blue-600"
                                href="http://localhost:8090/realms/kucukdev/protocol/openid-connect/registrations?client_id=web-ui&response_type=code&scope=openid email&redirect_uri=http%3A%2F%2Flocalhost%3A3000/signin">Sign up</a>
                        </div>
                    ) : (
                        <div className="hidden md:flex md:items-center">
                            <Link
                                to="/"
                                className="text-gray-800 text-md font-semibold hover:text-blue-600 mr-4"
                            >
                                Profile
                            </Link>
                            <Link
                                to="/"
                                onClick={authLogout}
                                className="text-gray-800 text-md font-semibold border px-4 py-2 rounded-lg hover:text-blue-600 hover:border-blue-600"
                            >
                                Logout
                            </Link>
                        </div>
                    )}

                    <div
                        className="md:hidden cursor-pointer"
                        onClick={() => setIsVisible(!isVisible)}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-12 h-12 text-blue-600"
                            viewBox="0 0 24 24"
                        >
                            <path
                                fill="currentColor"
                                d="M12.9499909,17 C12.7183558,18.1411202 11.709479,19 10.5,19 C9.29052104,19 8.28164422,18.1411202 8.05000906,17 L3.5,17 C3.22385763,17 3,16.7761424 3,16.5 C3,16.2238576 3.22385763,16 3.5,16 L8.05000906,16 C8.28164422,14.8588798 9.29052104,14 10.5,14 C11.709479,14 12.7183558,14.8588798 12.9499909,16 L20.5,16 C20.7761424,16 21,16.2238576 21,16.5 C21,16.7761424 20.7761424,17 20.5,17 L12.9499909,17 Z M18.9499909,12 C18.7183558,13.1411202 17.709479,14 16.5,14 C15.290521,14 14.2816442,13.1411202 14.0500091,12 L3.5,12 C3.22385763,12 3,11.7761424 3,11.5 C3,11.2238576 3.22385763,11 3.5,11 L14.0500091,11 C14.2816442,9.85887984 15.290521,9 16.5,9 C17.709479,9 18.7183558,9.85887984 18.9499909,11 L20.5,11 C20.7761424,11 21,11.2238576 21,11.5 C21,11.7761424 20.7761424,12 20.5,12 L18.9499909,12 Z M9.94999094,7 C9.71835578,8.14112016 8.70947896,9 7.5,9 C6.29052104,9 5.28164422,8.14112016 5.05000906,7 L3.5,7 C3.22385763,7 3,6.77614237 3,6.5 C3,6.22385763 3.22385763,6 3.5,6 L5.05000906,6 C5.28164422,4.85887984 6.29052104,4 7.5,4 C8.70947896,4 9.71835578,4.85887984 9.94999094,6 L20.5,6 C20.7761424,6 21,6.22385763 21,6.5 C21,6.77614237 20.7761424,7 20.5,7 L9.94999094,7 Z M7.5,8 C8.32842712,8 9,7.32842712 9,6.5 C9,5.67157288 8.32842712,5 7.5,5 C6.67157288,5 6,5.67157288 6,6.5 C6,7.32842712 6.67157288,8 7.5,8 Z M16.5,13 C17.3284271,13 18,12.3284271 18,11.5 C18,10.6715729 17.3284271,10 16.5,10 C15.6715729,10 15,10.6715729 15,11.5 C15,12.3284271 15.6715729,13 16.5,13 Z M10.5,18 C11.3284271,18 12,17.3284271 12,16.5 C12,15.6715729 11.3284271,15 10.5,15 C9.67157288,15 9,15.6715729 9,16.5 C9,17.3284271 9.67157288,18 10.5,18 Z"
                            />
                        </svg>
                    </div>
                </div>

                <div className="block md:hidden bg-white border-t-2 py-2">
                    <div className="flex flex-col">
                        {isVisible && login ? (
                            <div className="grid grid-cols-3 justify-items-center">
                                <Link
                                    to="/overview"
                                    className="text-gray-800 text-sm font-semibold hover:text-blue-600 mb-1"
                                >
                                    Overview
                                </Link>
                                <Link
                                    to="/semesters"
                                    className="text-gray-800 text-sm font-semibold hover:text-blue-600 mb-1"
                                >
                                    Semesters
                                </Link>
                                <Link
                                    to="/lessons"
                                    className="text-gray-800 text-sm font-semibold hover:text-blue-600 mb-1"
                                >
                                    Lessons
                                </Link>
                                <Link
                                    to="/attendance"
                                    className="text-gray-800 text-sm font-semibold hover:text-blue-600 mb-1"
                                >
                                    Attendance
                                </Link>
                                <Link
                                    to="/prepare-schedule"
                                    className="text-gray-800 text-sm font-semibold hover:text-blue-600 mb-1"
                                >
                                    Prepare
                                </Link>
                                <Link
                                    to="/professor-panel"
                                    className={`text-gray-800 text-sm font-semibold hover:text-blue-600 mb-1 ${"professor!" !== "professor" &&
                                        "hidden"
                                        }`}
                                >
                                    Panel
                                </Link>
                            </div>
                        ) : null}
                        {!login ? (
                            <div className="flex justify-between items-center border-t-2 pt-2 mx-4">
                                <button onClick={authLogin} className="text-gray-800 text-md font-semibold hover:text-blue-600 mr-4">Sign in</button>
                                <a href="http://localhost:8090/auth/realms/kucukdev/protocol/openid-connect/registrations?client_id=web-ui&response_type=code&scope=openid email&redirect_uri=http://localhost:3000/">Sign up</a>
                                <Link
                                    to="/signup"
                                    className="text-gray-800 text-sm font-semibold border px-4 py-1 rounded-lg hover:text-blue-600 hover:border-blue-600"
                                >
                                    Sign up
                                </Link>
                            </div>
                        ) : (
                            <div>
                                <Link
                                    to="/"
                                    className="text-gray-800 text-sm font-semibold hover:text-blue-600 mr-4"
                                >
                                    Profile
                                </Link>
                                <Link
                                    to="/"
                                    onClick={authLogout}
                                    className="text-gray-800 text-sm font-semibold border px-4 py-1 rounded-lg hover:text-blue-600 hover:border-blue-600"
                                >
                                    Logout
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
