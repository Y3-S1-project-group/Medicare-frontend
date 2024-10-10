import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../../Styles/display.css";
import UpdateStaffMember from '../UpdateStaffMember/UpdateStaffMember'; // Update staff member component
import DeleteStaffMember from '../DeleteStaffMember/DeleteStaffMember'; // Delete staff member component

function DisplayStaffMembers() {
    const [staffMembers, setStaffMembers] = useState([]);

    // Fetch all staff members from the backend
    useEffect(() => {
        axios
          .get("http://localhost:5000/api/staff/getAllStaff")
          .then((res) => {
            setStaffMembers(res.data); // Set the fetched staff members in the state
          })
          .catch((error) => {
            console.error("Error fetching staff members:", error);
          });
    }, []);

    const [search, setSearch] = useState("");

    // Search handler for staff members
    function searchHandler(e) {
      e.preventDefault();
      if (search.trim().length === 0) {
        return;
      }
      axios
        .get(`http://localhost:5000/api/staff/searchStaffByRole?role=${search}`) // Adjusted search endpoint to search by role
        .then((res) => {
          setStaffMembers(res.data); // Update state with search results
        })
        .catch((error) => {
          console.log(error);
        });
    }

    return (
      <div>
        <div className="ml-64 justify-center">
          <h2>
            <center>Staff Members</center>
          </h2>
        </div>

        {/* Search bar */}
        <div className="flex justify-center">
          <form
            className="flex items-center"
            onSubmit={searchHandler}
            style={{ marginTop: "25px" }}
          >
            <input
              type="search"
              name="q"
              id="search"
              value={search}
              placeholder="Enter Staff Role" // Placeholder adjusted for role search
              onChange={(e) => setSearch(e.target.value)}
              required
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500 mr-5"
              style={{ width: "500px" }}
            />
            <button className="btn" type="submit">Search</button>
          </form>
        </div>

        {/* Table to display all staff members */}
        <div className="container mx-4 px-4 py-8">
          <table className="w-full table-auto">
            <thead>
              <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Gender</th>
                <th>Role</th>
                <th>Phone Number</th>
                <th>Email</th>
                <th>Address</th>
                <th>Date of Birth</th>
                <th>NIC</th>
                <th>Password</th> 
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {staffMembers.map((member, i) => (
                <tr key={i}>
                  <td>{member.ID}</td> {/* Display Staff ID */}
                  <td>{member.FirstName}</td> {/* Display First Name */}
                  <td>{member.LastName}</td> {/* Display Last Name */}
                  <td>{member.Gender}</td> {/* Display Gender */}
                  <td>{member.Role}</td> {/* Display Role */}
                  <td>{member.PhoneNumber}</td> {/* Display Phone Number */}
                  <td>{member.Email}</td> {/* Display Email */}
                  <td>{member.Address}</td> {/* Display Address */}
                  <td>{new Date(member.DOB).toLocaleDateString()}</td> {/* Display Date of Birth */}
                  <td>{member.NIC}</td> {/* Display National ID */}
                  <td>{member.Password}</td> {/* Display Password */}
                  <td>
                    <UpdateStaffMember staffId={member.ID} /> {/* Update button */}
                  </td>
                  <td>
                    <DeleteStaffMember staffId={member.ID} /> {/* Delete button */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
}

export default DisplayStaffMembers;
