/**
 * PatientProfile component fetches and displays the profile information of a patient.
 * 
 * - Uses `useState` to manage the profile data and error state.
 * - Uses `useEffect` to fetch the patient profile data when the component mounts.
 * - Displays a loading message while the profile data is being fetched.
 * - Displays an error message if there is an error fetching the profile data.
 * - Displays the patient's profile information including personal details and closest person details.
 * 
 * @component
 * @example
 * return (
 *   <PatientProfile />
 * )
 */

import React, { useEffect, useState } from 'react';
import { getPatientProfile } from '../../Services/patientService';
import SideNav from '../../components/SideNavBar/SideNavBar';

const PatientProfile = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getPatientProfile();
        setProfile(data);
      } catch (err) {
        setError("Error loading profile");
      }
    };

    fetchProfile();
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  if (!profile) {
    return <p>Loading...</p>;
  }

  return (
    <>
    <SideNav />
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-2xl">
        <h2 className="mb-4 text-2xl font-bold text-blue-600">Your Profile</h2>
        
        {/* Profile information */}
        <div className="grid grid-cols-2 gap-2">
          <strong className="text-left">First Name:</strong> 
          <p>{profile.firstName}</p>

          <strong className="text-left">Last Name:</strong> 
          <p>{profile.lastName}</p>

          <strong className="text-left">Date of Birth:</strong> 
          <p>{new Date(profile.dateOfBirth).toLocaleDateString()}</p>

          <strong className="text-left">Gender:</strong> 
          <p>{profile.gender}</p>

          <strong className="text-left">Age:</strong> 
          <p>{profile.age}</p>

          <strong className="text-left">Address:</strong> 
          <p>{profile.address}</p>

          <strong className="text-left">Contact Number:</strong> 
          <p>{profile.contactNumber}</p>

          <strong className="text-left">Email:</strong> 
          <p>{profile.email}</p>
        </div>

        {/* Closest Person Details */}
        <h3 className="mt-4 text-lg font-semibold">Closest Person</h3>
        <div className="grid grid-cols-2 gap-2">
          <strong className="text-left">First Name:</strong> 
          <p>{profile.closestPerson.firstName}</p>

          <strong className="text-left">Last Name:</strong> 
          <p>{profile.closestPerson.lastName}</p>

          <strong className="text-left">Address:</strong> 
          <p>{profile.closestPerson.address}</p>

          <strong className="text-left">Contact Number:</strong> 
          <p>{profile.closestPerson.contactNumber}</p>
        </div>
      </div>
    </div>
    </>
  );
};

export default PatientProfile;
