import { useState, useEffect } from "react"

const UISLesson = ({ lesson, selectedLessons, onSelectLesson }) => {
    const [slots] = useState(lesson.slots)
    const [instructor, setInstructor] = useState(lesson.instructor)
    const [fixedSlots, setFixedSlots] = useState([])

    useEffect(() => {
        const days = ["Mon", "Tue", "Wed", "Thu", "Fri"]

        let daySlot = [[], [], [], [], []]

        for (let i = 0; i < slots.length; i++) {
            const resSlot = slots[i]
            daySlot[resSlot[0]].push(resSlot[1])
        }

        let day
        const fixedSlot = []
        for (let j = 0; j < daySlot.length; j++) {
            daySlot[j].length > 0 ? (day = `${days[j]} `) : (day = "null")
            for (let k = 0; k < daySlot[j].length; k++) {
                day += `${daySlot[j][k]}`
                if (k < daySlot[j].length - 1) day += ","
            }
            day !== "null" && fixedSlot.push(`${day} `)
        }

        const resInstructor = lesson.instructor.split(" ")
        setInstructor(resInstructor[resInstructor.length - 1])

        setFixedSlots(fixedSlot)
    }, [lesson, slots])

    return (
        <tr className="hover:bg-gray-100">
            <td className="px-4 py-2 border-b border-gray-500">
                <div className="text-sm text-left leading-5 text-blue-900">
                    {lesson.name}
                </div>
            </td>
            <td className="px-4 py-2 whitespace-nowrap border-b text-blue-900 border-gray-500 text-sm leading-5">
                {lesson.code}.{lesson.section}
            </td>
            <td className="px-4 py-2 whitespace-nowrap border-b text-blue-900 border-gray-500 text-sm leading-5">
                {lesson.ects}
            </td>
            <td className="px-4 py-2 border-b text-blue-900 border-gray-500 text-sm leading-5">
                {instructor}
            </td>
            <td className="px-4 py-2 whitespace-nowrap border-b text-blue-900 border-gray-500 text-sm leading-5">
                <div className="flex flex-row justify-center">
                    {fixedSlots.map((slot, index) => {
                        let day_hour = slot.split(" ")
                        return (
                            <div
                                className="pr-2 font-bold flex flex-row"
                                key={index}
                            >
                                {day_hour[0]}{" "}
                                <div className="font-normal pl-1">
                                    {day_hour[1]}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </td>
            <td className="px-4 py-2 whitespace-nowrap border-b text-blue-900 border-gray-500 text-sm leading-5">
                {lesson.absenceLimit}
            </td>
            <td className="px-4 py-2 whitespace-nowrap border-b text-blue-900 border-gray-500 text-sm leading-5">
                <input
                    onChange={() => onSelectLesson()}
                    checked={selectedLessons.includes(lesson)}
                    type="checkbox"
                />
            </td>
        </tr>
    )
}

export default UISLesson
