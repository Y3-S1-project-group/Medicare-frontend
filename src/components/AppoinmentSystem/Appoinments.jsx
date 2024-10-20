import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Make sure you have axios installed
import { User, Trash } from 'lucide-react';

const PersonalProfile = () => {
  const [appointments, setAppointments] = useState([]);


  // Fetch appointments when the component mounts
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('http://localhost:5000/Appoint/');
        setAppointments(response.data);
        console.log("Fetched appointments:", response.data); // Log fetched appointments
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, []);


  // Function to handle appointment deletion with confirmation
  const handleDelete = async (appointmentId) => {
    const confirmed = window.confirm("Are you sure you want to delete this appointment?");
    if (confirmed) {
      try {
        await axios.delete(`http://localhost:5000/Appoint/delete/${appointmentId}`);
        console.log(`Deleted appointment with ID: ${appointmentId}`); // Log deleted appointment ID
        setAppointments(prevAppointments => prevAppointments.filter(appointment => appointment._id !== appointmentId));
      } catch (error) {
        console.error("Error deleting appointment:", error);
      }
    }
  };


  return (
    
    <div className="relative max-w-4xl p-6 mx-auto mt-5 overflow-hidden bg-white rounded-lg shadow-md ml-72"> {/* Increased width here */}
      {/* Background pattern */}
      <div className="absolute inset-0 z-0">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <pattern id="pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="#E5E7EB" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#pattern)" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <h2 className="mb-4 text-xl font-bold text-center text-black">Personal Details</h2>

        <div className="flex justify-center mb-4">
          <div className="flex items-center justify-center w-24 h-24 bg-gray-300 rounded-full">
            <User size={48} className="text-gray-700" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4 text-lg">
          <div>
            <p><span className="font-semibold">Name:</span> Nipun Jayasinghe</p>
            <p><span className="font-semibold">Address:</span> Minuwangoda</p>
            <p><span className="font-semibold">NIC:</span> 200036201281</p>
          </div>
          <div>
            <p><span className="font-semibold">Mobile Number:</span> 0704435850</p>
            <p><span className="font-semibold">Age:</span> 24 Years</p>
          </div>
        </div>

        <h3 className="mb-4 text-2xl font-bold text-center">My Appointments</h3>

        {/* Display appointments dynamically */}
        <div className="grid grid-cols-2 gap-4">
          {appointments.length > 0 ? (
            appointments.map((appointment, index) => (
              <div key={appointment._id} className="relative p-4 text-left bg-gray-200 rounded-lg shadow-sm">
                <p className="mb-2 text-xl font-bold text-center">Appointment {index + 1}</p>
                <p><span className="ml-5 text-lg font-semibold">Name:</span> {appointment.fullName}</p>
                <p><span className="ml-5 text-lg font-semibold">Email:</span> {appointment.email}</p>
                <p><span className="ml-5 text-lg font-semibold">Doctor:</span> {appointment.doctor}</p>
                <p><span className="ml-5 text-lg font-semibold">Date:</span> {new Date(appointment.date).toLocaleDateString()}</p>
                <p><span className="ml-5 text-lg font-semibold">Time:</span> {appointment.time}</p>

                {/* Delete Icon */}
                <div className="absolute text-red-500 cursor-pointer top-2 right-2" onClick={() => handleDelete(appointment._id)}>
                  <Trash size={20} />
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-2 text-center">No appointments found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonalProfile;
