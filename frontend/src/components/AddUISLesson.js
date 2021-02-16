import { Link } from "react-router-dom";

const AddUISLesson = () => {

    return (
        <div className="flex flex-col my-8 xl:mx-40">
            <div className="flex flex-row justify-around mb-4">
                <Link to="/lessons/show-lessons" className="text-gray-800 text-base font-semibold hover:text-purple-600 mb-1 md:hidden">Show Lessons</Link>
                <Link to="/lessons/add-lesson" className="text-gray-800 text-base font-semibold hover:text-purple-600 mb-1 md:hidden">Add Lesson</Link>
                <Link to="/lessons/add-from-uis" className="text-gray-800 text-base font-semibold hover:text-purple-600 mb-1 md:hidden">Add from UIS</Link>
            </div>
            AddUISLesson
        </div >
    )
}

export default AddUISLesson
