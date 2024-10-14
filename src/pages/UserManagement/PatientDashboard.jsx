// RBAC-frontend/src/pages/PatientDashboard.jsx
/**
 * This component represents a Patient Dashboard where patient details are displayed and can be edited.
 * It fetches patient data from an API when the component mounts and allows the user to edit and save the data.
 * The component uses React hooks for state management and side effects.
 */

import { useEffect, useState } from 'react';
import axios from 'axios';

const PatientDashboard = () => {
    // State to hold patient data
    const [patientData, setPatientData] = useState({
        firstName: '',
        lastName: '',
        dob: '',
        address: '',
        contactNumber: '',
        email: '',
    });

    // State to manage edit mode
    const [editMode, setEditMode] = useState(false);

    // useEffect to fetch patient data when the component mounts
    useEffect(() => {
        const fetchPatientData = async () => {
            const token = localStorage.getItem('token');
            try {
                const res = await axios.get('http://localhost:5000/api/user/profile', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setPatientData(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchPatientData();
    }, []);

    // Function to enable edit mode
    const handleEdit = () => {
        setEditMode(true);
    };

    // Function to handle input changes and update patient data state
    const handleChange = (e) => {
        const { name, value } = e.target;
        setPatientData({ ...patientData, [name]: value });
    };

    // Function to save the updated patient data
    const handleSave = async () => {
        const token = localStorage.getItem('token');
        try {
            await axios.put('http://localhost:5000/api/user/profile', patientData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            alert('Profile updated successfully');
            setEditMode(false);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div>
            <h2>Patient Dashboard</h2>
            <div>
                <label>First Name: </label>
                {editMode ? (
                    <input name="firstName" value={patientData.firstName} onChange={handleChange} />
                ) : (
                    <span>{patientData.firstName}</span>
                )}
            </div>
            <div>
                <label>Last Name: </label>
                {editMode ? (
                    <input name="lastName" value={patientData.lastName} onChange={handleChange} />
                ) : (
                    <span>{patientData.lastName}</span>
                )}
            </div>
            <div>
                <label>Date of Birth: </label>
                {editMode ? (
                    <input name="dob" type="date" value={patientData.dob} onChange={handleChange} />
                ) : (
                    <span>{new Date(patientData.dob).toLocaleDateString()}</span>
                )}
            </div>
            <div>
                <label>Address: </label>
                {editMode ? (
                    <input name="address" value={patientData.address} onChange={handleChange} />
                ) : (
                    <span>{patientData.address}</span>
                )}
            </div>
            <div>
                <label>Contact Number: </label>
                {editMode ? (
                    <input name="contactNumber" value={patientData.contactNumber} onChange={handleChange} />
                ) : (
                    <span>{patientData.contactNumber}</span>
                )}
            </div>
            <div>
                <label>Email: </label>
                <span>{patientData.email}</span> {/* Email is not editable */}
            </div>
            <div>
                {editMode ? (
                    <button onClick={handleSave}>Save</button>
                ) : (
                    <button onClick={handleEdit}>Edit</button>
                )}
            </div>
        </div>
    );
};

export default PatientDashboard;