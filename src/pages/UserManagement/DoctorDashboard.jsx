// This component represents a Doctor Dashboard where a doctor can view and edit their profile information.
// It fetches the doctor's data from an API when the component mounts and allows the doctor to edit and save their profile information.

import { useEffect, useState } from 'react';
import axios from 'axios';

const DoctorDashboard = () => {
    // useState hook to manage the doctor's profile data and edit mode state
    const [doctorData, setDoctorData] = useState({
        firstName: '',
        lastName: '',
        hospital: '',
        dob: '',
        address: '',
        contactNumber: '',
        email: '',
    });
    const [editMode, setEditMode] = useState(false);

    // useEffect hook to fetch the doctor's data from the API when the component mounts
    useEffect(() => {
        const fetchDoctorData = async () => {
            const token = localStorage.getItem('token');
            try {
                const res = await axios.get('http://localhost:5000/api/user/profile', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setDoctorData(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchDoctorData();
    }, []);

    // Function to enable edit mode
    const handleEdit = () => {
        setEditMode(true);
    };

    // Function to handle changes in the input fields and update the state
    const handleChange = (e) => {
        const { name, value } = e.target;
        setDoctorData({ ...doctorData, [name]: value });
    };

    // Function to save the updated profile data to the API and disable edit mode
    const handleSave = async () => {
        const token = localStorage.getItem('token');
        try {
            await axios.put('http://localhost:5000/api/user/profile', doctorData, {
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
            <h2>Doctor Dashboard</h2>
            <div>
                <label>First Name: </label>
                {editMode ? (
                    <input name="firstName" value={doctorData.firstName} onChange={handleChange} />
                ) : (
                    <span>{doctorData.firstName}</span>
                )}
            </div>
            <div>
                <label>Last Name: </label>
                {editMode ? (
                    <input name="lastName" value={doctorData.lastName} onChange={handleChange} />
                ) : (
                    <span>{doctorData.lastName}</span>
                )}
            </div>
            <div>
                <label>Hospital: </label>
                {editMode ? (
                    <input name="hospital" value={doctorData.hospital} onChange={handleChange} />
                ) : (
                    <span>{doctorData.hospital}</span>
                )}
            </div>
            <div>
                <label>Date of Birth: </label>
                {editMode ? (
                    <input name="dob" type="date" value={doctorData.dob} onChange={handleChange} />
                ) : (
                    <span>{new Date(doctorData.dob).toLocaleDateString()}</span>
                )}
            </div>
            <div>
                <label>Address: </label>
                {editMode ? (
                    <input name="address" value={doctorData.address} onChange={handleChange} />
                ) : (
                    <span>{doctorData.address}</span>
                )}
            </div>
            <div>
                <label>Contact Number: </label>
                {editMode ? (
                    <input name="contactNumber" value={doctorData.contactNumber} onChange={handleChange} />
                ) : (
                    <span>{doctorData.contactNumber}</span>
                )}
            </div>
            <div>
                <label>Email: </label>
                <span>{doctorData.email}</span> {/* Email is not editable */}
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

export default DoctorDashboard;