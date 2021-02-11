
var Kucukdevapi = require('kucukdevapi');


const SemesterDetail = (props) => {
    const sid = props.match.params.id;
    const semester = props.location.newSemester

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June",
        "July", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];


    const weeksBetween = (d1, d2) => {
        return Math.round((d2 - d1) / (7 * 24 * 60 * 60 * 1000));
    }
    const weekCount = weeksBetween(semester.startDate, semester.endDate)

    const startDate = monthNames[(semester.startDate.getMonth())] + " " + semester.startDate.getDate() + ", " + semester.startDate.getFullYear()
    const endDate = monthNames[(semester.endDate.getMonth())] + " " + semester.endDate.getDate() + ", " + semester.endDate.getFullYear()


    return (
        <div>
            <div className="flex flex-col">
                <div className="flex flex-col lg:flex-row my-4 xl:my-4 ml-0 lg:ml-32">
                    <div className="m-0 md:m-2 xl:m-10 overflow-x-auto">
                        <h1 className="flex justify-start text-2xl ml-8 md:ml-4 my-2">Summary of {semester.name}</h1>
                        <table className="min-w-full">
                            <thead>
                                <tr className="">
                                    <th className="px-6 py-3 border-b-2 border-gray-300 text-sm text-left leading-4 text-blue-500 tracking-wider">Week Count</th>
                                    <th className="px-6 py-3 border-b-2 border-gray-300 text-sm leading-4 text-blue-500 tracking-wider">Start</th>
                                    <th className="px-6 py-3 border-b-2 border-gray-300 text-sm leading-4 text-blue-500 tracking-wider">Finish</th>
                                    <th className="px-6 py-3 border-b-2 border-gray-300 text-sm leading-4 text-blue-500 tracking-wider">Lesson Count</th>

                                </tr>
                            </thead>
                            <tbody className="bg-white  ">
                                <tr>
                                    <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">{weekCount}</td>
                                    <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">{startDate}</td>
                                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-blue-900 text-sm leading-5">{endDate}</td>
                                    <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">0</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="m-0 md:m-2 xl:m-10 overflow-x-auto">
                        <h1 className="flex justify-start text-2xl ml-8 md:ml-4 my-2">Schedule</h1>
                        <table className="min-w-full">
                            <thead>
                                <tr className="">
                                    <th className="px-3 py-2 border-b-2 border-gray-300 text-xs md:text-sm text-left leading-4 text-blue-500 tracking-wider">#</th>
                                    <th className="px-3 py-2 border-b-2 border-gray-300 text-sm leading-4 text-blue-500 tracking-wider">1</th>
                                    <th className="px-3 py-2 border-b-2 border-gray-300 text-sm leading-4 text-blue-500 tracking-wider">2</th>
                                    <th className="px-3 py-2 border-b-2 border-gray-300 text-sm leading-4 text-blue-500 tracking-wider">3</th>
                                    <th className="px-3 py-2 border-b-2 border-gray-300 text-sm leading-4 text-blue-500 tracking-wider">4</th>
                                    <th className="px-3 py-2 border-b-2 border-gray-300 text-sm leading-4 text-blue-500 tracking-wider">5</th>
                                    <th className="px-3 py-2 border-b-2 border-gray-300 text-sm leading-4 text-blue-500 tracking-wider">6</th>
                                    <th className="px-3 py-2 border-b-2 border-gray-300 text-sm leading-4 text-blue-500 tracking-wider">7</th>
                                    <th className="px-3 py-2 border-b-2 border-gray-300 text-sm leading-4 text-blue-500 tracking-wider">8</th>
                                    <th className="px-3 py-2 border-b-2 border-gray-300 text-sm leading-4 text-blue-500 tracking-wider">9</th>
                                    <th className="px-3 py-2 border-b-2 border-gray-300 text-sm leading-4 text-blue-500 tracking-wider">10</th>
                                    <th className="px-3 py-2 border-b-2 border-gray-300 text-sm leading-4 text-blue-500 tracking-wider">11</th>
                                    <th className="px-3 py-2 border-b-2 border-gray-300 text-sm leading-4 text-blue-500 tracking-wider">12</th>
                                    <th className="px-3 py-2 border-b-2 border-gray-300 text-sm leading-4 text-blue-500 tracking-wider">13</th>
                                    <th className="px-3 py-2 border-b-2 border-gray-300 text-sm leading-4 text-blue-500 tracking-wider">14</th>

                                </tr>
                            </thead>
                            <tbody className="bg-white  ">

                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row my-4 xl:my-8 ml-0 lg:ml-32">
                    <div className="m-0 md:m-2 xl:m-10 overflow-x-auto">
                        <h1 className="flex justify-start text-2xl ml-8 md:ml-4 my-2">Lessons</h1>
                        <table className="min-w-full">
                            <thead>
                                <tr className="">
                                    <th className="px-6 py-3 border-b-2 border-gray-300 text-sm text-left leading-4 text-blue-500 tracking-wider">Lesson Name</th>
                                    <th className="px-6 py-3 border-b-2 border-gray-300 text-sm leading-4 text-blue-500 tracking-wider">Instructor</th>
                                    <th className="px-6 py-3 border-b-2 border-gray-300 text-sm leading-4 text-blue-500 tracking-wider">Absence</th>
                                    <th className="px-6 py-3 border-b-2 border-gray-300 text-sm leading-4 text-blue-500 tracking-wider">Absence Limit</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white  ">

                            </tbody>
                        </table>
                    </div>

                    <div className="m-0 md:m-2 xl:m-10  overflow-x-auto">
                        <h1 className="flex justify-start text-2xl ml-8 md:ml-4 my-2">Absence</h1>
                        <table className="min-w-full">
                            <thead>
                                <tr className="">
                                    <th className="px-6 py-3 border-b-2 border-gray-300 text-sm text-left leading-4 text-blue-500 tracking-wider">Lesson Name</th>
                                    <th className="px-6 py-3 border-b-2 border-gray-300 text-sm leading-4 text-blue-500 tracking-wider">Day</th>
                                    <th className="px-6 py-3 border-b-2 border-gray-300 text-sm leading-4 text-blue-500 tracking-wider">Slot</th>
                                    <th className="px-6 py-3 border-b-2 border-gray-300 text-sm leading-4 text-blue-500 tracking-wider">Week</th>
                                    <th className="px-6 py-3 border-b-2 border-gray-300 text-sm leading-4 text-blue-500 tracking-wider">Date</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white  ">

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )


}


export default SemesterDetail