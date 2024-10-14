/**
 * This component, `AddStaffMember`, is a React functional component that provides a form
 * for adding a new staff member. It includes the following functionalities:
 * 
 * - State Management:
 *   - `isModalOpen`: A boolean state to control the visibility of the modal.
 *   - `formData`: An object state to store the form input values.
 *   - `errors`: An object state to store validation error messages.
 * 
 * - Event Handlers:
 *   - `handleShowModal`: Opens the modal by setting `isModalOpen` to true.
 *   - `handleCloseModal`: Closes the modal, resets the form data and errors.
 *   - `handleChange`: Updates the form data state when an input field changes.
 *   - `handleFileChange`: Updates the form data state when a file input changes.
 *   - `validateForm`: Validates the form data and sets error messages if any field is invalid.
 *   - `handleSubmit`: Handles form submission, validates the form, and sends a POST request to the server.
 * 
 * - JSX Structure:
 *   - A button to open the modal.
 *   - A modal containing the form with various input fields for staff details.
 *   - Error messages displayed next to the respective input fields if validation fails.
 *   - Submit and cancel buttons to handle form submission and modal closing.
 */

import React, { useState } from "react";
import axios from "axios";
import "../../Styles/addStaffMember.css"; 
import swal from "sweetalert";

const AddStaffMember = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    ID: "",
    FirstName: "",
    LastName: "",
    Gender: "",
    Role: "",
    PhoneNumber: "",
    Address: "",
    DOB: "",
    NIC: "",
    Email: "",
    Password: "",
    ConfirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  const handleShowModal = () => setIsModalOpen(true);
  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Reset form and errors when closing the modal
    setFormData({
      ID: "",
      FirstName: "",
      LastName: "",
      Gender: "",
      Role: "",
      PhoneNumber: "",
      Address: "",
      DOB: "",
      NIC: "",
      Email: "",
      Password: "",
      ConfirmPassword: "",
    });
    setErrors({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: files[0]
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    if (!formData.ID) {
      newErrors.ID = "Staff ID is required";
      isValid = false;
    }
    if (!formData.FirstName) {
      newErrors.FirstName = "First name is required";
      isValid = false;
    }
    if (!formData.LastName) {
      newErrors.LastName = "Last name is required";
      isValid = false;
    }
    if (!formData.Gender) {
      newErrors.Gender = "Gender is required";
      isValid = false;
    }
    if (!formData.Role) {
      newErrors.Role = "Role is required";
      isValid = false;
    }
    if (!formData.PhoneNumber || formData.PhoneNumber.length !== 10) {
      newErrors.PhoneNumber = "Valid phone number is required";
      isValid = false;
    }
    if (!formData.DOB) {
      newErrors.DOB = "Date of birth is required";
      isValid = false;
    }
    if (!formData.NIC) {
      newErrors.NIC = "NIC is required";
      isValid = false;
    }
    if (!formData.Email) {
      newErrors.Email = "Email is required";
      isValid = false;
    }
    if (!formData.Password) {
      newErrors.Password = "Password is required";
      isValid = false;
    }
    if (formData.Password !== formData.ConfirmPassword) {
      newErrors.ConfirmPassword = "Passwords do not match";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post("http://localhost:5000/api/staff/addStaff", formData);
        console.log(response.data);
        swal({
          text: "Staff member registered successfully",
          icon: "success",
          buttons: {
            cancel: { text: "Cancel" },
            confirm: { text: "OK" },
          },
        }).then(() => {
          handleCloseModal();
          window.location.reload();
        });
      } catch (error) {
        console.error("Error registering staff member:", error);
        alert("Failed to register staff member");
      }
    }
  };

  return (
    <div>
      <button
        className="btn"
        onClick={handleShowModal}
      >Add Staff Member<span className="circle">+</span>
      </button>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <form onSubmit={handleSubmit} className="add-staff-form">
              <div className="form-row">
                <input
                  type="text"
                  name="ID"
                  value={formData.ID}
                  onChange={handleChange}
                  placeholder="ID"
                />
                {errors.ID && <div className="text-red-600">{errors.ID}</div>}
                <select
                  name="Role"
                  value={formData.Role}
                  onChange={handleChange}
                >
                  <option value="">Role</option>
                  <option value="Doctor">Doctor</option>
                  <option value="Nurse">Nurse</option>
                  <option value="Technician">Technician</option>
                  <option value="Administrative staff">Administrative staff</option>

                </select>
                {errors.Role && <div className="text-red-600">{errors.Role}</div>}
              </div>
              <div className="form-row">
                <input
                  type="text"
                  name="FirstName"
                  value={formData.FirstName}
                  onChange={handleChange}
                  placeholder="First Name"
                />
                {errors.FirstName && <div className="text-red-600">{errors.FirstName}</div>}
                <input
                  type="text"
                  name="LastName"
                  value={formData.LastName}
                  onChange={handleChange}
                  placeholder="Last Name"
                />
                {errors.LastName && <div className="text-red-600">{errors.LastName}</div>}
              </div>
              <div className="form-row">
                <select
                  name="Gender"
                  value={formData.Gender}
                  onChange={handleChange}
                >
                  <option value="">Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                {errors.Gender && <div className="text-red-600">{errors.Gender}</div>}
                <input
                  type="text"
                  name="PhoneNumber"
                  value={formData.PhoneNumber}
                  onChange={handleChange}
                  placeholder="Phone Number"
                />
                {errors.PhoneNumber && <div className="text-red-600">{errors.PhoneNumber}</div>}
              </div>
              <div className="form-row">
                <input
                  type="text"
                  name="Address"
                  value={formData.Address}
                  onChange={handleChange}
                  placeholder="Address"
                />
                <input
                  type="date"
                  name="DOB"
                  value={formData.DOB}
                  onChange={handleChange}
                />
                {errors.DOB && <div className="text-red-600">{errors.DOB}</div>}
              </div>
              <div className="form-row">
                <input
                  type="text"
                  name="NIC"
                  value={formData.NIC}
                  onChange={handleChange}
                  placeholder="NIC"
                />
                {errors.NIC && <div className="text-red-600">{errors.NIC}</div>}
                <input
                  type="email"
                  name="Email"
                  value={formData.Email}
                  onChange={handleChange}
                  placeholder="Email"
                />
                {errors.Email && <div className="text-red-600">{errors.Email}</div>}
              </div>
              <div className="form-row">
                <input
                  type="password"
                  name="Password"
                  value={formData.Password}
                  onChange={handleChange}
                  placeholder="Password"
                />
                {errors.Password && <div className="text-red-600">{errors.Password}</div>}
                <input
                  type="password"
                  name="ConfirmPassword"
                  value={formData.ConfirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm Password"
                />
                {errors.ConfirmPassword && <div className="text-red-600">{errors.ConfirmPassword}</div>}
              </div>
              <div className="form-actions">
                <button type="button" className="cancel-btn" onClick={handleCloseModal}>Cancel</button>
                <button type="submit" className="register-btn">Register</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddStaffMember;
