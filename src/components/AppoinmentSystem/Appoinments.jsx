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
    
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md relative overflow-hidden mt-5 ml-72"> {/* Increased width here */}
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
        <h2 className="text-center text-xl font-bold mb-4 text-black">Personal Details</h2>

        <div className="flex justify-center mb-4">
          <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center">
            <User size={48} className="text-gray-700" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4 text-lg">
          <div>
            <p><span className="font-semibold">Name:</span> Lahiru Theekshana</p>
            <p><span className="font-semibold">Address:</span> Wallawa, Kurunegala</p>
            <p><span className="font-semibold">NIC:</span> 200012349801</p>
          </div>
          <div>
            <p><span className="font-semibold">Mobile Number:</span> 0771234567</p>
            <p><span className="font-semibold">Age:</span> 24 Years</p>
          </div>
        </div>

        <h3 className="text-center text-2xl font-bold mb-4">My Appointments</h3>

        {/* Display appointments dynamically */}
        <div className="grid grid-cols-2 gap-4">
          {appointments.length > 0 ? (
            appointments.map((appointment, index) => (
              <div key={appointment._id} className="bg-gray-200 p-4 rounded-lg shadow-sm relative text-left">
                <p className="font-bold text-center mb-2 text-xl">Appointment {index + 1}</p>
                <p><span className="font-semibold text-lg ml-5">Name:</span> {appointment.fullName}</p>
                <p><span className="font-semibold text-lg ml-5">Email:</span> {appointment.email}</p>
                <p><span className="font-semibold text-lg ml-5">Doctor:</span> {appointment.doctor}</p>
                <p><span className="font-semibold text-lg ml-5">Date:</span> {new Date(appointment.date).toLocaleDateString()}</p>
                <p><span className="font-semibold text-lg ml-5">Time:</span> {appointment.time}</p>

                {/* Delete Icon */}
                <div className="absolute top-2 right-2 cursor-pointer text-red-500" onClick={() => handleDelete(appointment._id)}>
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
