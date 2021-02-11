import { Link } from 'react-router-dom'

const Semester = ({ semester, onDeleteProps, onCurrentProps, currentSemester }) => {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June",
        "July", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    const startDate = monthNames[(semester.startDate.getMonth())] + " " + semester.startDate.getDate() + ", " + semester.startDate.getFullYear()
    const endDate = monthNames[(semester.endDate.getMonth())] + " " + semester.endDate.getDate() + ", " + semester.endDate.getFullYear()

    const weeksBetween = (d1, d2) => {
        return Math.round((d2 - d1) / (7 * 24 * 60 * 60 * 1000));
    }
    const weekCount = weeksBetween(semester.startDate, semester.endDate)


    return (
        <tr>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                <div className="text-sm text-left leading-5 text-blue-900">{semester.name}</div>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">{weekCount}</td>
            <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">{startDate}</td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-blue-900 text-sm leading-5">{endDate}</td>
            <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
                <div className="flex justify-evenly flex-col md:flex-row">
                    <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                        <span aria-hidden className="absolute inset-0 bg-yellow-300 rounded-full"></span>
                        <button onClick={onCurrentProps} className="relative text-xs font-bold">{currentSemester === semester.id ? "Current" : "Set Current"}</button>

                    </span>
                    <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                        <span aria-hidden className="absolute inset-0 bg-red-500 opacity-90 rounded-full"></span>
                        <button onClick={onDeleteProps} className="relative text-xs font-bold">Delete</button>
                    </span>
                </div>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-500 text-sm leading-5">
                <Link to={{ pathname: `/semesters/${semester.id}`, newSemester: semester }} className="px-5 py-2 border-blue-500 border text-blue-500 rounded transition duration-300 hover:bg-blue-700 hover:text-white focus:outline-none">Details</Link>
            </td>
        </tr>
    )
}

export default Semester

