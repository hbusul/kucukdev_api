
const Lesson = ({ lesson, onDeleteLesson }) => {
    return (
        <tr>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                <div className="text-sm text-left leading-5 text-blue-900">{lesson.name}</div>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">{lesson.slots}</td>
            <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5"></td>
            <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
                <div className="flex justify-evenly flex-col md:flex-row">
                    <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                        <span aria-hidden className="absolute inset-0 bg-yellow-300 rounded-full"></span>
                        <button className="relative text-xs font-bold">Edit</button>

                    </span>
                    <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                        <span aria-hidden className="absolute inset-0 bg-red-500 opacity-90 rounded-full"></span>
                        <button onClick={onDeleteLesson} className="relative text-xs font-bold">Delete</button>
                    </span>
                    <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                        <span aria-hidden className="absolute inset-0 bg-green-500 opacity-90 rounded-full"></span>
                        <button className="relative text-xs font-bold">View</button>
                    </span>
                </div>
            </td>
        </tr>
    )
}

export default Lesson
