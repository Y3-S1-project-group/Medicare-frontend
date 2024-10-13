import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../../../Styles/StaffMemberCSS/display.css";
import UpdateStaffMember from '../UpdateStaffMember/UpdateStaffMember'; // Update staff member component
import DeleteStaffMember from '../DeleteStaffMember/DeleteStaffMember'; // Delete staff member component
import AddStaffMember from '../AddStaffMember/AddStaffMember';

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
      <div className="container mx-auto px-4 py-8">
        {/* Wrapper for heading and table */}
        <div className="rounded-box" style={{ width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
          <h2>
            Staff Members
          </h2>
        </div>
        
        {/* Search bar */}
        <div className="flex justify-left" style={{ marginTop: "25px" }}>
          <form className="flex items-center" onSubmit={searchHandler}>
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
        <br/>
          <AddStaffMember />
          <br/>
          <h1>Recent Medical Staff</h1>
        <br/>
        {/* Table to display all staff members */}
        <table className="w-full table-auto mt-10">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>ID</th>
              <th>Role</th>
              <th>Email</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {staffMembers.map((member, i) => (
              <tr key={i}>
                <td>{member.FirstName}</td> {/* Display First Name */}
                <td>{member.LastName}</td> {/* Display Last Name */}
                <td>{member.ID}</td> {/* Display Staff ID */}
                <td>{member.Role}</td> {/* Display Role */}
                <td>{member.Email}</td> {/* Display Email */}
                <td className='aling-center'>
                  <UpdateStaffMember staffId={member.ID} /> {/* Update button */}
                </td>
                <td className='aling-center'>
                  <DeleteStaffMember staffId={member.ID} /> {/* Delete button */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
}

export default DisplayStaffMembers;
