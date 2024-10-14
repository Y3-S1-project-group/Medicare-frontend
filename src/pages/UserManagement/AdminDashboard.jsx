// RBAC-frontend/src/pages/AdminDashboard.jsx
/*
This component renders a form for creating a new staff member in an admin dashboard. 
It uses React hooks to manage form state and Axios to send a POST request to the server 
when the form is submitted. The form includes fields for first name, last name, hospital, 
date of birth, address, contact number, email, password, and role.
*/

import { useState } from 'react';
import axios from 'axios';

// AdminDashboard component renders the form and handles form submission
const AdminDashboard = () => {
    // useState hook to manage form data state
    const [formData, setFormData] = useState({
        firstName: '', lastName: '', hospital: '', dob: '', address: '', contactNumber: '', email: '', password: '', role: 'Doctor'
    });

    // handleSubmit function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/auth/admin/create', formData);
            alert('Staff member created successfully');
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div>
            <h2>Create New Staff Member</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="First Name" onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} />
                <input type="text" placeholder="Last Name" onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} />
                <input type="text" placeholder="Hospital" onChange={(e) => setFormData({ ...formData, hospital: e.target.value })} />
                <input type="date" placeholder="DOB" onChange={(e) => setFormData({ ...formData, dob: e.target.value })} />
                <input type="text" placeholder="Address" onChange={(e) => setFormData({ ...formData, address: e.target.value })} />
                <input type="text" placeholder="Contact Number" onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })} />
                <input type="email" placeholder="Email" onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                <input type="password" placeholder="Password" onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
                <select onChange={(e) => setFormData({ ...formData, role: e.target.value })}>
                    <option value="Doctor">Doctor</option>
                    <option value="Nurse">Nurse</option>
                </select>
                <button type="submit">Create</button>
            </form>
        </div>
    );
};

export default AdminDashboard;