/*
This code defines a React functional component named `Login` that handles user authentication. 
It uses React hooks for state management and navigation, and Axios for making HTTP requests. 
The component includes a form where users can input their email and password to log in. 
Upon form submission, it sends a POST request to the server to authenticate the user. 
If the authentication is successful, it stores the received token and role in localStorage 
and redirects the user based on their role. If the authentication fails, it shows an alert.
*/

import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// The Login component handles user login functionality.
const Login = () => {
    // useState hooks to manage email and password input states.
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    // useNavigate hook to programmatically navigate to different routes.
    const navigate = useNavigate();

    // handleLogin function to handle form submission and user authentication.
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
            const { token, role } = res.data;

            // Check if token and role are returned
            if (token && role) {
                // Store token and role in localStorage
                localStorage.setItem('token', token);
                localStorage.setItem('role', role);

                // Redirect user based on their role
                if (role === 'admin') {
                    navigate('/admin');
                } else if (role === 'doctor') {
                    navigate('/doctor');
                } else if (role === 'nurse') {
                    navigate('/nurse');
                } else if (role === 'patient') {
                    navigate('/patient');
                }
            } else {
                // Show alert if credentials are incorrect
                alert('Login credentials are incorrect');
            }
        } catch (err) {
            // Handle the error and show alert for incorrect credentials
            console.error(err);
            alert('Login credentials are incorrect');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Email:</label>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;