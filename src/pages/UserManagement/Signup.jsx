/**
 * Signup component for patient registration.
 * 
 * This component renders a signup form for patients to register their details.
 * It includes fields for personal information and the closest person's details.
 * The form data is managed using the useState hook, and the handleChange function
 * updates the state as the user inputs data. The handleSubmit function handles
 * form submission, sending the data to the server and navigating to the login
 * page upon successful signup.
 * 
 * @component
 * @example
 * return (
 *   <Signup />
 * )
 */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { handlePatientSignup } from "../../Services/patientService";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    age: "",
    address: "",
    contactNumber: "",
    email: "",
    password: "",
    closestPerson: {
      firstName: "",
      lastName: "",
      address: "",
      contactNumber: "",
    },
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    // Firstname and Lastname validation
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required.";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required.";

    // Date of birth validation (simple check to ensure it's filled)
    if (!formData.dateOfBirth) newErrors.dateOfBirth = "Date of birth is required.";

    // Age validation (should be a positive number and reasonable)
    if (!formData.age || formData.age <= 0 || formData.age > 120) newErrors.age = "Please enter a valid age.";

    // Contact number validation (simple length check)
    if (!formData.contactNumber.match(/^[0-9]{10}$/)) newErrors.contactNumber = "Contact number must be 10 digits.";

    // Email validation
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = "Please enter a valid email.";

    // Password validation (at least 6 characters, 1 uppercase, 1 number)
    if (!formData.password.match(/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/)) {
      newErrors.password = "Password must be at least 6 characters long, with at least one uppercase letter and one number.";
    }

    // Closest person's contact number validation
    if (!formData.closestPerson.contactNumber.match(/^[0-9]{10}$/)) {
      newErrors.closestPersonContactNumber = "Closest person's contact number must be 10 digits.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes("closestPerson")) {
      const fieldName = name.split(".")[1];
      setFormData((prevData) => ({
        ...prevData,
        closestPerson: {
          ...prevData.closestPerson,
          [fieldName]: value,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const response = await handlePatientSignup(formData);
      console.log("Signup response:", response.status);

      if (response.status === 201) {
        console.log("Response is 201, navigating...");
        const result = response.data;
        console.log("Signup successful:", result);
        navigate("/login");
      } else {
        const errorData = await response.data;
        console.error("Signup failed:", errorData);
      }
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  return (
    <div className="container max-w-lg p-8 mx-auto mt-10 bg-white rounded-lg shadow-lg">
      <h2 className="mb-4 text-2xl font-bold text-center text-blue-600">Patient Signup</h2>
      <form onSubmit={handleSubmit}>
        <h3 className="mb-2 text-xl font-bold text-gray-800">Your Details</h3>

        <div className="mb-4">
          <label className="block mb-2 text-lg font-semibold text-gray-700">Firstname</label>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
            onChange={handleChange}
            required
          />
          {errors.firstName && <p className="text-red-500">{errors.firstName}</p>}
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-lg font-semibold text-gray-700">Lastname</label>
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
            onChange={handleChange}
            required
          />
          {errors.lastName && <p className="text-red-500">{errors.lastName}</p>}
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-lg font-semibold text-gray-700">DOB</label>
          <input
            type="date"
            name="dateOfBirth"
            placeholder="Date of Birth"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
            onChange={handleChange}
            required
          />
          {errors.dateOfBirth && <p className="text-red-500">{errors.dateOfBirth}</p>}
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-lg font-semibold text-gray-700">Gender</label>
          <div className="flex items-center gap-4">
            <div>
              <input
                type="radio"
                name="gender"
                value="Male"
                onChange={handleChange}
                required
                className="mr-1"
              />
              <label className="text-gray-600">Male</label>
            </div>
            <div>
              <input
                type="radio"
                name="gender"
                value="Female"
                onChange={handleChange}
                required
                className="mr-1"
              />
              <label className="text-gray-600">Female</label>
            </div>
            <div>
              <input
                type="radio"
                name="gender"
                value="Other"
                onChange={handleChange}
                required
                className="mr-1"
              />
              <label className="text-gray-600">Other</label>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-lg font-semibold text-gray-700">Age</label>
          <input
            type="number"
            name="age"
            placeholder="Age"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
            onChange={handleChange}
            required
          />
          {errors.age && <p className="text-red-500">{errors.age}</p>}
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-lg font-semibold text-gray-700">Address</label>
          <input
            type="text"
            name="address"
            placeholder="Address"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
            onChange={handleChange}
            required
          />
          {errors.address && <p className="text-red-500">{errors.address}</p>}
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-lg font-semibold text-gray-700">Contact Number</label>
          <input
            type="text"
            name="contactNumber"
            placeholder="Contact Number"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
            onChange={handleChange}
            required
          />
          {errors.contactNumber && <p className="text-red-500">{errors.contactNumber}</p>}
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-lg font-semibold text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
            onChange={handleChange}
            required
          />
          {errors.email && <p className="text-red-500">{errors.email}</p>}
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-lg font-semibold text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
            onChange={handleChange}
            required
          />
          {errors.password && <p className="text-red-500">{errors.password}</p>}
        </div>

        <h3 className="mb-2 text-xl font-bold text-gray-800">Closest Person Details</h3>

        <div className="mb-4">
          <label className="block mb-2 text-lg font-semibold text-gray-700">Firstname</label>
          <input
            type="text"
            name="closestPerson.firstName"
            placeholder="First Name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
            onChange={handleChange}
            required
          />
          {errors.closestPersonFirstName && <p className="text-red-500">{errors.closestPersonFirstName}</p>}
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-lg font-semibold text-gray-700">Lastname</label>
          <input
            type="text"
            name="closestPerson.lastName"
            placeholder="Last Name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
            onChange={handleChange}
            required
          />
          {errors.closestPersonLastName && <p className="text-red-500">{errors.closestPersonLastName}</p>}
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-lg font-semibold text-gray-700">Address</label>
          <input
            type="text"
            name="closestPerson.address"
            placeholder="Address"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
            onChange={handleChange}
            required
          />
          {errors.closestPersonAddress && <p className="text-red-500">{errors.closestPersonAddress}</p>}
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-lg font-semibold text-gray-700">Contact Number</label>
          <input
            type="text"
            name="closestPerson.contactNumber"
            placeholder="Contact Number"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
            onChange={handleChange}
            required
          />
          {errors.closestPersonContactNumber && <p className="text-red-500">{errors.closestPersonContactNumber}</p>}
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 font-bold text-white transition bg-blue-500 rounded-lg hover:bg-blue-600"
        >
          Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;
