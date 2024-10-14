/**
 * This component handles the signup process for a patient.
 * It includes a form where the user can input their personal details and the details of their closest person.
 * The form data is managed using the useState hook and submitted via an HTTP POST request using axios.
 * Upon successful signup, the user is navigated to the home page.
 */

import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    // useState hook to manage the form data state
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        age: '',
        sex: '',
        birthdate: '',
        address: '',
        contactNumber: '',
        email: '',
        password: '',
        closestPerson: {
            firstname: '',
            lastname: '',
            address: '',
            contactNumber: '',
        }
    });
    
    // useNavigate hook to programmatically navigate to different routes
    const navigate = useNavigate();

    // handleChange function to update the form data state when an input field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.includes('closestPerson')) {
            const closestPersonField = name.split('.')[1];
            setFormData((prevData) => ({
                ...prevData,
                closestPerson: {
                    ...prevData.closestPerson,
                    [closestPersonField]: value
                }
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value
            }));
        }
    };

    // handleSubmit function to handle the form submission
    // It sends the form data to the server and navigates to the home page upon success
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/auth/signup/patient', formData);
            alert('Signup successful');
            navigate('/');
        } catch (error) {
            console.error(error);
            alert('Signup failed');
        }
    };

    return (
        <div>
            <h2>Patient Signup</h2>
            <form onSubmit={handleSubmit}>
                <h3>Your Details</h3>
                <input type="text" name="firstname" placeholder="First Name" onChange={handleChange} required />
                <input type="text" name="lastname" placeholder="Last Name" onChange={handleChange} required />
                <input type="number" name="age" placeholder="Age" onChange={handleChange} required />
                <select name="sex" onChange={handleChange} required>
                    <option value="">Select Sex</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>
                <input type="text" name="address" placeholder="Address" onChange={handleChange} required />
                <input type="text" name="contactNumber" placeholder="Contact Number" onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} required />

                <h3>Closest Person&apos;s Details</h3>
                <input type="text" name="closestPerson.firstname" placeholder="First Name" onChange={handleChange} required />
                <input type="text" name="closestPerson.lastname" placeholder="Last Name" onChange={handleChange} required />
                <input type="text" name="closestPerson.address" placeholder="Address" onChange={handleChange} required />
                <input type="text" name="closestPerson.contactNumber" placeholder="Contact Number" onChange={handleChange} required />

                <button type="submit">Signup</button>
            </form>
        </div>
    );
};

export default Signup;