import React from 'react';
import { User, Check } from 'lucide-react';

const PersonalProfile = () => {
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 z-0">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <pattern id="pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="#E5E7EB" />
          </pattern>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern)" />
        </svg>
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        <h2 className="text-center text-xl font-semibold mb-4">Personal Details</h2>
        
        <div className="flex justify-center mb-4">
          <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center">
            <User size={48} className="text-gray-600" />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
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
        
        <div className="flex justify-center mb-8">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300">
            Edit profile
          </button>
        </div>
        
        <h3 className="text-center text-lg font-semibold mb-4">My Appointments</h3>
        
        <div className="space-y-4 mb-4">
          {[
            { id: 'MC/001/244', doctor: 'Dr. Rasika', date: '01/09/2024', time: '18.00 p.m' },
            { id: 'MC/001/244', doctor: 'Dr. Mallika', date: '03/09/2024', time: '19.00 p.m' }
          ].map((appointment, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded-lg flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center mr-4">
                  <User size={24} className="text-gray-600" />
                </div>
                <div>
                  <p><span className="font-semibold">Appointment No:</span> {appointment.id}</p>
                  <p><span className="font-semibold">Doctor name:</span> {appointment.doctor}</p>
                  <p><span className="font-semibold">Date:</span> {appointment.date}</p>
                  <p><span className="font-semibold">Time:</span> {appointment.time}</p>
                </div>
              </div>
              <Check className="text-green-500" size={24} />
            </div>
          ))}
        </div>
        
        <div className="flex justify-center">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300">
            View More
          </button>
        </div>
      </div>
    </div>
  );
};

export default PersonalProfile;