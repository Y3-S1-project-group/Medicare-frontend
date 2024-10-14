// RBAC-frontend/src/pages/NurseDashboard.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';

/*
This component represents a Nurse Dashboard where a nurse can view and edit their profile information. 
It fetches the nurse's data from an API when the component mounts and allows the nurse to edit and save their profile details.
*/

const NurseDashboard = () => {
    // State to hold nurse's profile data
    const [nurseData, setNurseData] = useState({
        firstName: '',
        lastName: '',
        hospital: '',
        dob: '',
        address: '',
        contactNumber: '',
        email: '',
    });

    // State to manage edit mode
    const [editMode, setEditMode] = useState(false);

    // useEffect hook to fetch nurse data when the component mounts
    useEffect(() => {
        const fetchNurseData = async () => {
            const token = localStorage.getItem('token');
            try {
                const res = await axios.get('http://localhost:5000/api/user/profile', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setNurseData(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchNurseData();
    }, []);

    // Function to enable edit mode
    const handleEdit = () => {
        setEditMode(true);
    };

    // Function to handle changes in input fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNurseData({ ...nurseData, [name]: value });
    };

    // Function to save the updated profile data
    const handleSave = async () => {
        const token = localStorage.getItem('token');
        try {
            await axios.put('http://localhost:5000/api/user/profile', nurseData, {
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
            <h2>Nurse Dashboard</h2>
            <div>
                <label>First Name: </label>
                {editMode ? (
                    <input name="firstName" value={nurseData.firstName} onChange={handleChange} />
                ) : (
                    <span>{nurseData.firstName}</span>
                )}
            </div>
            <div>
                <label>Last Name: </label>
                {editMode ? (
                    <input name="lastName" value={nurseData.lastName} onChange={handleChange} />
                ) : (
                    <span>{nurseData.lastName}</span>
                )}
            </div>
            <div>
                <label>Hospital: </label>
                {editMode ? (
                    <input name="hospital" value={nurseData.hospital} onChange={handleChange} />
                ) : (
                    <span>{nurseData.hospital}</span>
                )}
            </div>
            <div>
                <label>Date of Birth: </label>
                {editMode ? (
                    <input name="dob" type="date" value={nurseData.dob} onChange={handleChange} />
                ) : (
                    <span>{new Date(nurseData.dob).toLocaleDateString()}</span>
                )}
            </div>
            <div>
                <label>Address: </label>
                {editMode ? (
                    <input name="address" value={nurseData.address} onChange={handleChange} />
                ) : (
                    <span>{nurseData.address}</span>
                )}
            </div>
            <div>
                <label>Contact Number: </label>
                {editMode ? (
                    <input name="contactNumber" value={nurseData.contactNumber} onChange={handleChange} />
                ) : (
                    <span>{nurseData.contactNumber}</span>
                )}
            </div>
            <div>
                <label>Email: </label>
                <span>{nurseData.email}</span> {/* Email is not editable */}
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

export default NurseDashboard;