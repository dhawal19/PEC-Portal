import React, { useState } from 'react';

const AttendanceCard = ({ initialSubject, initialCourseCode }) => {
    const [editMode, setEditMode] = useState(false);
    const [subject, setSubject] = useState(initialSubject);
    const [courseCode, setCourseCode] = useState(initialCourseCode);
    const [classesAttended, setClassesAttended] = useState(0);
    const [totalClasses, setTotalClasses] = useState(0);

    const handleEdit = () => {
        setEditMode(true);
    };

    const handleSave = () => {
        setEditMode(false); // Exit edit mode
    };

    const handleAttendance = (attended) => {
        if (attended) {
            setClassesAttended(classesAttended + 1);
            setTotalClasses(totalClasses + 1);
        } else {
            setTotalClasses(totalClasses + 1);
        }
    };

    const handlePercentage = () => {
        return totalClasses === 0 ? 0 : Math.round((classesAttended / totalClasses) * 100);
    };

    return (
        <div className="bg-gray-200 p-4 rounded-md shadow-md mb-4 relative">
            <h3 className="text-lg font-semibold mb-2">{editMode ? 'Edit Course' : subject}</h3>
            <p className="text-sm mb-2">{editMode ? null : `Course Code: ${courseCode}`}</p>
            {editMode && (
                <div className="mb-2">
                    <input
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="border border-gray-400 rounded-md px-2 py-1 w-full"
                        placeholder="Subject"
                    />
                </div>
            )}
            {editMode && (
                <div className="mb-2">
                    <input
                        type="text"
                        value={courseCode}
                        onChange={(e) => setCourseCode(e.target.value)}
                        className="border border-gray-400 rounded-md px-2 py-1 w-full"
                        placeholder="Course Code"
                    />
                </div>
            )}
            {!editMode && (
                <div className="mb-2">
                    <p>Classes Attended: {classesAttended}</p>
                    <p>Total Classes: {totalClasses}</p>
                    <p>Percentage: {handlePercentage()}%</p>
                </div>
            )}
            <div className="absolute bottom-0 right-0 mb-2 mr-2">
                {editMode ? (
                    <button
                        onClick={handleSave}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-full shadow mr-2"
                    >
                        Save
                    </button>
                ) : (
                    <button
                        onClick={handleEdit}
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded-full shadow"
                    >
                        Edit
                    </button>
                )}
            </div>
            <div className="mt-4">
                <p className="text-sm mb-2">Attended class today?</p>
                <div className="flex">
                    <button
                        onClick={() => handleAttendance(true)}
                        className="mr-2 py-1 px-2 rounded-full bg-green-500 text-white"
                    >
                        Yes
                    </button>
                    <button
                        onClick={() => handleAttendance(false)}
                        className="py-1 px-2 rounded-full bg-red-500 text-white"
                    >
                        No
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AttendanceCard;
