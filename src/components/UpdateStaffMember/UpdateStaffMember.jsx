import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import axios from "axios";
import "../../Styles/display.css";

const UpdateStaffMember = ({ staffId }) => {
  const [ID, setID] = useState("");
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [Gender, setGender] = useState("");
  const [Role, setRole] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [Address, setAddress] = useState("");
  const [DOB, setDOB] = useState("");
  const [NIC, setNIC] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false); // Modal state

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const validateForm = () => {
    const errors = {};
    let isValid = true;

    if (!ID) {
      errors.id = "Staff ID is required.";
      isValid = false;
    }

    if (!FirstName) {
      errors.firstName = "First name is required.";
      isValid = false;
    }

    if (!LastName) {
      errors.lastName = "Last name is required.";
      isValid = false;
    }

    if (!Gender) {
      errors.gender = "Gender is required.";
      isValid = false;
    }

    if (!Role) {
      errors.role = "Role is required.";
      isValid = false;
    }

    if (!PhoneNumber || PhoneNumber.length < 10 || PhoneNumber.length > 15) {
      errors.phoneNumber = "Phone number must be between 10 and 15 characters.";
      isValid = false;
    }

    if (!Address) {
      errors.address = "Address is required.";
      isValid = false;
    }

    if (!DOB) {
      errors.dob = "Date of Birth is required.";
      isValid = false;
    }

    if (!NIC) {
      errors.nic = "NIC is required.";
      isValid = false;
    }

    if (!Email) {
      errors.email = "Email is required.";
      isValid = false;
    }

    if (!Password || Password.length < 8) {
      errors.password = "Password must be at least 8 characters.";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/staff/getStaff/${staffId}`)
      .then((res) => {
        const staff = res.data;
        setID(staff.ID);
        setFirstName(staff.FirstName);
        setLastName(staff.LastName);
        setGender(staff.Gender);
        setRole(staff.Role);
        setPhoneNumber(staff.PhoneNumber);
        setAddress(staff.Address);
        setDOB(staff.DOB.substring(0, 10)); // Convert to YYYY-MM-DD format
        setNIC(staff.NIC);
        setEmail(staff.Email);
        setPassword(staff.Password);
      })
      .catch((error) => console.log(error));
  }, [staffId]);

  const handleSubmit = (e) => {
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
        .put(`http://localhost:5000/api/staff/updateStaff/${staffId}`, staffData)
        .then((response) => {
          swal({
            text: "Successfully updated.",
            icon: "success",
            buttons: {
              cancel: { text: "Cancel" },
              confirm: { text: "OK" },
            },
          }).then(() => {
            handleCloseModal();
            window.location.reload();
          });
        })
        .catch((error) => {
          console.log(error);
          alert("Update failed.");
        });
    }
  };

  return (
    <div>
      <button className="btn" onClick={handleShowModal}>
        Update Member
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
              className="bg-white absolute top-0 rounded right-0 pt-8 pl-8 pr-2 pb-2 btn"

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
            {/* Form */}
            <div className="form-container">
              <br/>
              <h2 className="rounded-box">
                <center>Update Staff Member</center>
              </h2>
              <form onSubmit={handleSubmit} className="form-table">
                <table>
                  <tbody>
                    <tr>
                      <th>
                        <label htmlFor="ID">Staff ID</label>
                      </th>
                      <td>
                        <input
                          type="text"
                          name="id"
                          value={ID}
                          onChange={(e) => setID(e.target.value)}
                        />
                        {errors.id && (
                          <span className="text-red-600">{errors.id}</span>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <th>
                        <label htmlFor="FirstName">First Name</label>
                      </th>
                      <td>
                        <input
                          type="text"
                          name="firstName"
                          value={FirstName}
                          onChange={(e) => setFirstName(e.target.value)}
                        />
                        {errors.firstName && (
                          <span className="text-red-600">{errors.firstName}</span>
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
                          name="lastName"
                          value={LastName}
                          onChange={(e) => setLastName(e.target.value)}
                        />
                        {errors.lastName && (
                          <span className="text-red-600">{errors.lastName}</span>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <th>
                        <label htmlFor="Gender">Gender</label>
                      </th>
                      <td className="data">
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
                          <span className="text-red-600">{errors.gender}</span>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <th>
                        <label htmlFor="Role">Role</label>
                      </th>
                      <td className="data">
                        <select
                          id="Role"
                          required
                          value={Role}
                          onChange={(e) => setRole(e.target.value)}
                        >
                          <option value="">Select Role</option>
                          <option value="Doctor">Doctor</option>
                          <option value="Nurse">Nurse</option>
                          <option value="Technician">Technician</option>
                          <option value="Administrative staff">Administrative staff</option>
                        </select>
                        {errors.role && (
                          <span className="text-red-600">{errors.role}</span>
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
                          name="phoneNumber"
                          value={PhoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                        {errors.phoneNumber && (
                          <span className="text-red-600">{errors.phoneNumber}</span>
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
                          name="address"
                          value={Address}
                          onChange={(e) => setAddress(e.target.value)}
                        />
                        {errors.address && (
                          <span className="text-red-600">{errors.address}</span>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <th>
                        <label htmlFor="DOB">Date of Birth</label>
                      </th>
                      <td>
                        <input
                          type="date"
                          name="dob"
                          value={DOB}
                          onChange={(e) => setDOB(e.target.value)}
                        />
                        {errors.dob && (
                          <span className="text-red-600">{errors.dob}</span>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <th>
                        <label htmlFor="NIC">NIC</label>
                      </th>
                      <td>
                        <input
                          type="text"
                          name="nic"
                          value={NIC}
                          onChange={(e) => setNIC(e.target.value)}
                        />
                        {errors.nic && (
                          <span className="text-red-600">{errors.nic}</span>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <th>
                        <label htmlFor="Email">Email</label>
                      </th>
                      <td>
                        <input
                          type="email"
                          name="email"
                          value={Email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                        {errors.email && (
                          <span className="text-red-600">{errors.email}</span>
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
                          name="password"
                          value={Password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        {errors.password && (
                          <span className="text-red-600">{errors.password}</span>
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="flex justify-center mt-4">
                  <button type="submit" className="btn">
                    Update Staff Member
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateStaffMember;
