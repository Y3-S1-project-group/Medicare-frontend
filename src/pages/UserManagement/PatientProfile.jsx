import React, { useEffect, useState } from 'react';
import { getPatientProfile } from '../../Services/patientService';

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
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-2xl">
        <h2 className="mb-4 text-2xl font-bold text-blue-600">Your Profile</h2>
        <p><strong>First Name:</strong> {profile.firstName}</p>
        <p><strong>Last Name:</strong> {profile.lastName}</p>
        <p><strong>Date of Birth:</strong> {new Date(profile.dateOfBirth).toLocaleDateString()}</p>
        <p><strong>Gender:</strong> {profile.gender}</p>
        <p><strong>Age:</strong> {profile.age}</p>
        <p><strong>Address:</strong> {profile.address}</p>
        <p><strong>Contact Number:</strong> {profile.contactNumber}</p>
        <p><strong>Email:</strong> {profile.email}</p>
        <h3 className="mt-4 text-lg font-semibold">Closest Person</h3>
        <p><strong>First Name:</strong> {profile.closestPerson.firstName}</p>
        <p><strong>Last Name:</strong> {profile.closestPerson.lastName}</p>
        <p><strong>Address:</strong> {profile.closestPerson.address}</p>
        <p><strong>Contact Number:</strong> {profile.closestPerson.contactNumber}</p>
      </div>
    </div>
  );
};

export default PatientProfile;
