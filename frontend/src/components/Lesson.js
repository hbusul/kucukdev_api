import { useState } from 'react'
import { Link } from 'react-router-dom'

const Lesson = ({ lesson, onDeleteLesson }) => {
    const [lessonDeleteModal, setLessonDeleteModal] = useState(false);

    // const days = ["M", "Tu", "W", "Th", "F"]

    return (
        <tr>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                <div className="text-sm text-left leading-5 text-blue-900">{lesson.name}</div>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">{lesson.slots}</td>
            <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">{(lesson.absences).length}</td>
            <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
                <div className="flex justify-evenly flex-col md:flex-row">
                    <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                        <span aria-hidden className="absolute inset-0 bg-yellow-300 rounded-full"></span>
                        <Link to={{ pathname: `/lessons/update-lesson/${lesson._id}` }} className="relative text-xs font-bold">Edit</Link>

                    </span>
                    <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                        <span aria-hidden className="absolute inset-0 bg-red-500 opacity-90 rounded-full"></span>
                        <button onClick={() => setLessonDeleteModal(true)} type="button"
                            style={{ transition: "all .15s ease" }} className="relative text-xs font-bold">Delete</button>
                    </span>
                    <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                        <span aria-hidden className="absolute inset-0 bg-green-500 opacity-90 rounded-full"></span>
                        <Link to={`/lessons/${lesson._id}`} className="relative text-xs font-bold">View</Link>
                    </span>
                    {lessonDeleteModal ? (
                        <div>
                            <div
                                className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                            >
                                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                                    {/*content*/}
                                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                        {/*header*/}
                                        <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                                            <h3 className="pt-4 text-2xl text-center">Delete lesson: {lesson.name}</h3>

                                            <button
                                                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                                onClick={() => setLessonDeleteModal(false)}
                                            >
                                                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                                    ×
                    </span>
                                            </button>
                                        </div>
                                        {/*body*/}
                                        <p className="flex justify-center text-base m-8">You will lose everything belongs to this lesson irreversibly!</p>
                                        {/*footer*/}
                                        <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
                                            <button
                                                className="background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                                                type="button"
                                                style={{ transition: "all .15s ease" }}
                                                onClick={() => setLessonDeleteModal(false)}
                                            >
                                                Close
                  </button>
                                            <button
                                                className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                                                type="button"
                                                style={{ transition: "all .15s ease" }}
                                                onClick={() => {
                                                    setLessonDeleteModal(false)
                                                    onDeleteLesson()
                                                }
                                                }
                                            >
                                                Delete Anyway
                  </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                        </div>
                    ) : null}
                </div>
            </td>
        </tr>
    )
}

export default Lesson