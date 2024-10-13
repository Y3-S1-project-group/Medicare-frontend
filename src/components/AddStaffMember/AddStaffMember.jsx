import React, { useState } from "react";
import swal from "sweetalert";
import axios from "axios";
import "../../Styles/display.css";

const AddStaffMember = () => {
  const [ID, setId] = useState("");
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [Gender, setGender] = useState("");
  const [Role, setRole] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [Address, setAddress] = useState("");
  const [DOB, setDob] = useState("");
  const [NIC, setNic] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const validateForm = () => {
    const errors = {};
    let isValid = true;

    if (!ID) {
      errors.id = "Staff ID is required";
      isValid = false;
    }

    if (!FirstName) {
      errors.firstName = "First name is required";
      isValid = false;
    }

    if (!LastName) {
      errors.lastName = "Last name is required";
      isValid = false;
    }

    if (!Gender) {
      errors.gender = "Gender is required";
      isValid = false;
    }

    if (!Role) {
      errors.role = "Role is required";
      isValid = false;
    }

    if (!PhoneNumber || PhoneNumber.length !== 10) {
      errors.phoneNumber = "Valid phone number is required";
      isValid = false;
    }

    if (!DOB) {
      errors.dob = "Date of birth is required";
      isValid = false;
    }

    if (!NIC) {
      errors.nic = "NIC is required";
      isValid = false;
    }

    if (!Email) {
      errors.email = "Email is required";
      isValid = false;
    }

    if (!Password) {
      errors.password = "Password is required";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const sendData = (e) => {
    e.preventDefault();

    const staffData = {
      ID,
      FirstName,
      LastName,
      Gender,
      Role,
      PhoneNumber,
      Address,
      DOB,
      NIC,
      Email,
      Password,
    };

    if (validateForm()) {
      axios
        .post("http://localhost:5000/api/staff/addStaff", staffData)
        .then((response) => {
          console.log(response.data);

          // Clear the form inputs
          setId("");
          setFirstName("");
          setLastName("");
          setGender("");
          setRole("");
          setPhoneNumber("");
          setAddress("");
          setDob("");
          setNic("");
          setEmail("");
          setPassword("");

          swal({
            text: "Staff member added successfully",
            icon: "success",
            buttons: {
              cancel: { text: "Cancel" },
              confirm: { text: "OK" },
            },
          }).then((value) => {
            handleCloseModal();
            window.location.reload();
          });
        })
        .catch((error) => {
          console.log("Error response:", error.response);
          console.log("Error message:", error.message);
          alert("Failed to add staff member");
        });

      handleCloseModal();
    }
  };

  return (
    <div>
      <button
        className="bg-customGreen text-white font-bold py-2 px-4 rounded mb-4 mr-4 float-right"
        onClick={handleShowModal}
      >
        <span className="mr-2">+</span> Add Staff Member
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 overflow-auto flex items-center justify-center">
          <div
            className="fixed inset-0 transition-opacity"
            onClick={handleCloseModal}
          >
            <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
          </div>
          <div className="relative bg-white p-8 rounded-lg shadow-xl max-w-xl w-full">
            <button
              className="absolute top-0 right-0 p-2 text-gray-500 hover:text-gray-700"
              onClick={handleCloseModal}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <h2>
              <center>Add Staff Member</center>
            </h2>
            {/* Form */}
            <div className="form-container">
              <form onSubmit={sendData} className="form-table">
                <table>
                  <tbody>
                    <tr>
                      <th>
                        <label htmlFor="Id">Staff ID</label>
                      </th>
                      <td>
                        <input
                          type="text"
                          id="Id"
                          placeholder="Enter Staff ID"
                          required
                          value={ID}
                          onChange={(e) => setId(e.target.value)}
                        />
                        {errors.id && <div className="text-red-600">{errors.id}</div>}
                      </td>
                    </tr>
                    <tr>
                      <th>
                        <label htmlFor="FirstName">First Name</label>
                      </th>
                      <td>
                        <input
                          type="text"
                          id="FirstName"
                          placeholder="Enter First Name"
                          required
                          value={FirstName}
                          onChange={(e) => setFirstName(e.target.value)}
                        />
                        {errors.firstName && (
                          <div className="text-red-600">{errors.firstName}</div>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <th>
                        <label htmlFor="LastName">Last Name</label>
                      </th>
                      <td>
                        <input
                          type="text"
                          id="LastName"
                          placeholder="Enter Last Name"
                          required
                          value={LastName}
                          onChange={(e) => setLastName(e.target.value)}
                        />
                        {errors.lastName && (
                          <div className="text-red-600">{errors.lastName}</div>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <th>
                        <label htmlFor="Gender">Gender</label>
                      </th>
                      <td>
                        <select
                          id="Gender"
                          required
                          value={Gender}
                          onChange={(e) => setGender(e.target.value)}
                        >
                          <option value="">Select Gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                        {errors.gender && (
                          <div className="text-red-600">{errors.gender}</div>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <th>
                        <label htmlFor="Role">Role</label>
                      </th>
                      <td>
                        <input
                          type="text"
                          id="Role"
                          placeholder="Enter Role"
                          required
                          value={Role}
                          onChange={(e) => setRole(e.target.value)}
                        />
                        {errors.role && (
                          <div className="text-red-600">{errors.role}</div>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <th>
                        <label htmlFor="PhoneNumber">Phone Number</label>
                      </th>
                      <td>
                        <input
                          type="text"
                          id="PhoneNumber"
                          placeholder="Enter Phone Number"
                          required
                          value={PhoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                        {errors.phoneNumber && (
                          <div className="text-red-600">{errors.phoneNumber}</div>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <th>
                        <label htmlFor="Address">Address</label>
                      </th>
                      <td>
                        <input
                          type="text"
                          id="Address"
                          placeholder="Enter Address"
                          value={Address}
                          onChange={(e) => setAddress(e.target.value)}
                        />
                      </td>
                    </tr>
                    <tr>
                      <th>
                        <label htmlFor="DOB">Date of Birth</label>
                      </th>
                      <td>
                        <input
                          type="date"
                          id="DOB"
                          required
                          value={DOB}
                          onChange={(e) => setDob(e.target.value)}
                        />
                        {errors.dob && <div className="text-red-600">{errors.dob}</div>}
                      </td>
                    </tr>
                    <tr>
                      <th>
                        <label htmlFor="NIC">NIC</label>
                      </th>
                      <td>
                        <input
                          type="text"
                          id="NIC"
                          placeholder="Enter NIC"
                          required
                          value={NIC}
                          onChange={(e) => setNic(e.target.value)}
                        />
                        {errors.nic && <div className="text-red-600">{errors.nic}</div>}
                      </td>
                    </tr>
                    <tr>
                      <th>
                        <label htmlFor="Email">Email</label>
                      </th>
                      <td>
                        <input
                          type="email"
                          id="Email"
                          placeholder="Enter Email"
                          required
                          value={Email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                        {errors.email && (
                          <div className="text-red-600">{errors.email}</div>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <th>
                        <label htmlFor="Password">Password</label>
                      </th>
                      <td>
                        <input
                          type="password"
                          id="Password"
                          placeholder="Enter Password"
                          required
                          value={Password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        {errors.password && (
                          <div className="text-red-600">{errors.password}</div>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="2">
                        <button
                          type="submit"
                          className="bg-customGreen text-white font-bold py-2 px-4 rounded"
                        >
                          Submit
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddStaffMember;