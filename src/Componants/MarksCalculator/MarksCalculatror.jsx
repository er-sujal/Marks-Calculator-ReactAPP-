import React, { useState } from 'react';
import './MarksCalculatror.css';

const MarksCalculatror = () => {
    const [username, setUsername] = useState('');
    const [subjects, setSubjects] = useState([{ subjectName: '', ia1Marks: '', ia2Marks: '' }]);
    const [errors, setErrors] = useState({});
    const [remainingMarksData, setRemainingMarksData] = useState([]);

    const validate = () => {
        const newErrors = {};

        if (!username.trim()) {
            newErrors.username = 'Username is required';
        }

        subjects.forEach((subject, index) => {
            if (!subject.subjectName.trim()) {
                newErrors[`subjectName${index}`] = 'Subject name is required';
            } else if (!/^[a-zA-Z]+$/.test(subject.subjectName.trim())) {
                newErrors[`subjectName${index}`] = 'Subject name should contain only alphabets';
            }
            if (subject.ia1Marks === '' || isNaN(subject.ia1Marks) || subject.ia1Marks < 0 || subject.ia1Marks > 30) {
                newErrors[`ia1Marks${index}`] = 'IA1 Marks must be a number between 0 and 30';
            }
            if (subject.ia2Marks === '' || isNaN(subject.ia2Marks) || subject.ia2Marks < 0 || subject.ia2Marks > 30) {
                newErrors[`ia2Marks${index}`] = 'IA2 Marks must be a number between 0 and 30';
            }
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (validate()) {
            const remainingMarksData = subjects.map(subject => ({
                subjectName: subject.subjectName,
                remainingMarks: ((40 - (40 * (parseFloat(subject.ia1Marks) + parseFloat(subject.ia2Marks)) / 60))).toFixed(2)
            }));
            setRemainingMarksData(remainingMarksData);
            console.log('Remaining Marks Data:', remainingMarksData);
        } else {
            console.log('Validation failed. Data not submitted.');
        }
    };

    const handleInputChange = (index, event) => {
        const { name, value } = event.target;
        const newSubjects = [...subjects];
        newSubjects[index][name] = value;
        setSubjects(newSubjects);
    };

    const handleAddSubject = () => {
        setSubjects([...subjects, { subjectName: '', ia1Marks: '', ia2Marks: '' }]);
    };

    return (
        <div className="marks-calculator">
            <div className="input-container">
                <label htmlFor="username">Username: </label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                {errors.username && <div className="error">{errors.username}</div>}
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Subject Name</th>
                        <th>IA1 Marks</th>
                        <th>IA2 Marks</th>
                    </tr>
                </thead>
                <tbody>
                    {subjects.map((subject, index) => (
                        <tr key={index}>
                            <td>
                                <input
                                    type="text"
                                    name="subjectName"
                                    value={subject.subjectName}
                                    onChange={(e) => handleInputChange(index, e)}
                                    pattern="[A-Za-z]+"
                                    required
                                />
                                {errors[`subjectName${index}`] && <div className="error">{errors[`subjectName${index}`]}</div>}
                            </td>
                            <td>
                                <input
                                    type="number"
                                    name="ia1Marks"
                                    value={subject.ia1Marks}
                                    onChange={(e) => handleInputChange(index, e)}
                                    min="0"
                                    max="30"
                                    required
                                />
                                {errors[`ia1Marks${index}`] && <div className="error">{errors[`ia1Marks${index}`]}</div>}
                            </td>
                            <td>
                                <input
                                    type="number"
                                    name="ia2Marks"
                                    value={subject.ia2Marks}
                                    onChange={(e) => handleInputChange(index, e)}
                                    min="0"
                                    max="30"
                                    required
                                />
                                {errors[`ia2Marks${index}`] && <div className="error">{errors[`ia2Marks${index}`]}</div>}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={handleAddSubject}>Add Subject</button>
            <button onClick={handleSubmit}>Submit</button>

            {remainingMarksData.length > 0 && (
                <div>
                    <h2>Remaining Marks</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Subject Name</th>
                                <th>Remaining Marks</th>
                            </tr>
                        </thead>
                        <tbody>
                            {remainingMarksData.map((data, index) => (
                                <tr key={index}>
                                    <td>{data.subjectName}</td>
                                    <td>{data.remainingMarks}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default MarksCalculatror;
