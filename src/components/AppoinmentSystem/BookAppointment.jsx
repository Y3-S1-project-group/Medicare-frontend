import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AppointmentForm = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [doctors, setDoctors] = useState([
    { name: 'Dr. John Smith', timeSlots: ['09:00 AM', '10:00 AM', '11:00 AM'] },
    { name: 'Dr. Emily Johnson', timeSlots: ['01:00 PM', '02:00 PM', '03:00 PM'] },
    { name: 'Dr. Michael Williams', timeSlots: ['09:30 AM', '10:30 AM', '01:30 PM'] },
    { name: 'Dr. Sarah Brown', timeSlots: ['08:00 AM', '09:00 AM', '11:00 AM'] },
    { name: 'Dr. David Garcia', timeSlots: ['12:00 PM', '01:00 PM', '03:00 PM'] },
    { name: 'Dr. Sophia Lee', timeSlots: ['02:30 PM', '03:30 PM', '04:30 PM'] },
    { name: 'Dr. Daniel Taylor', timeSlots: ['09:15 AM', '10:15 AM', '11:15 AM'] },
    { name: 'Dr. Olivia Martinez', timeSlots: ['12:45 PM', '01:45 PM', '02:45 PM'] },
    { name: 'Dr. Benjamin Clark', timeSlots: ['08:30 AM', '09:30 AM', '10:30 AM'] },
    { name: 'Dr. Isabella Rodriguez', timeSlots: ['11:00 AM', '12:00 PM', '02:00 PM'] },
    { name: 'Dr. Matthew Lewis', timeSlots: ['07:30 AM', '08:30 AM', '09:30 AM'] },
    { name: 'Dr. Chloe Walker', timeSlots: ['10:00 AM', '11:00 AM', '12:00 PM'] },
    { name: 'Dr. James Young', timeSlots: ['01:30 PM', '02:30 PM', '03:30 PM'] },
    { name: 'Dr. Abigail King', timeSlots: ['09:45 AM', '10:45 AM', '12:45 PM'] },
    { name: 'Dr. Alexander Green', timeSlots: ['08:00 AM', '09:00 AM', '10:00 AM'] },
    { name: 'Dr. Ella Baker', timeSlots: ['01:15 PM', '02:15 PM', '03:15 PM'] },
    { name: 'Dr. Samuel Adams', timeSlots: ['09:00 AM', '10:00 AM', '11:00 AM'] },
    { name: 'Dr. Grace Parker', timeSlots: ['11:30 AM', '12:30 PM', '01:30 PM'] },
    { name: 'Dr. Lucas Campbell', timeSlots: ['02:00 PM', '03:00 PM', '04:00 PM'] }
  ]);
  
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term) {
      const filtered = doctors.filter(doctor =>
        doctor.name.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredDoctors(filtered);
    } else {
      setFilteredDoctors([]);
    }
  };

  const selectDoctor = (doctor) => {
    setSearchTerm(doctor.name);
    setFilteredDoctors([]);
    setSelectedDoctor(doctor.name);
    setSelectedTime('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedTime) {
      alert('Please select a time before booking an appointment.');
      return;
    }

    const appointmentData = {
      fullName: document.getElementById('fullName').value,
      gender: document.getElementById('gender').value,
      email: document.getElementById('email').value,
      doctor: selectedDoctor,
      date: document.getElementById('date').value,
      time: selectedTime,
    };

    try {
      const response = await fetch('http://localhost:5000/Appointment/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(appointmentData),
      });

      if (response.ok) {
        navigate('/PaymentGate');
      } else {
        alert('Failed to book appointment: ' + response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while booking the appointment.');
    }
  };

  const today = new Date().toISOString().split('T')[0];

  const handleTimeSelection = (time) => {
    setSelectedTime(time);
  };

  return (
    <div style={{ 
      width: '60vw', 
      maxWidth: '100%', 
      backgroundColor: 'white', 
      borderRadius: '10px', 
      overflow: 'hidden', 
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
      margin: '0 auto', 
      marginTop: "80px", 
      marginLeft: 'auto',
      marginRight: '20px'
    }}>
      <div style={{ background: 'linear-gradient(to right, #3b82f6, #06b6d4)', padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ color: 'white', fontSize: '1.25rem', fontWeight: 'bold' }}>Book an Appointment</h1>
        <div style={{ backgroundColor: 'white', borderRadius: '50%', padding: '0.5rem' }}>
          <svg xmlns="http://www.w3.org/2000/svg" style={{ height: '24px', width: '24px', color: '#3b82f6' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
      </div>

      <div style={{ padding: '1.5rem' }}>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center' }}>
            <label htmlFor="fullName" style={{ marginRight: '1rem', fontWeight: 'bold', color: '#4a5568', width: '150px' }}>Full name:</label>
            <input id="fullName" type="text" style={{ flex: 1, padding: '0.5rem', border: '1px solid #e2e8f0', borderRadius: '5px', fontSize: '1rem' }} required />
          </div>
          
          <div style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center' }}>
            <label htmlFor="gender" style={{ marginRight: '1rem', fontWeight: 'bold', color: '#4a5568', width: '150px' }}>Gender:</label>
            <select id="gender" style={{ flex: 1, padding: '0.5rem', border: '1px solid #e2e8f0', borderRadius: '5px', fontSize: '1rem' }} required>
              <option value="" disabled selected>Select your gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center' }}>
            <label htmlFor="email" style={{ marginRight: '1rem', fontWeight: 'bold', color: '#4a5568', width: '150px' }}>Email:</label>
            <input id="email" type="email" style={{ flex: 1, padding: '0.5rem', border: '1px solid #e2e8f0', borderRadius: '5px', fontSize: '1rem' }} required />
          </div>

          <div style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', position: 'relative' }}>
            <label htmlFor="doctor" style={{ marginRight: '1rem', fontWeight: 'bold', color: '#4a5568', width: '150px' }}>Doctor:</label>
            <input 
              id="doctor" 
              type="text" 
              value={searchTerm}
              onChange={handleSearch}
              style={{ flex: 1, padding: '0.5rem', border: '1px solid #e2e8f0', borderRadius: '5px', fontSize: '1rem' }} 
              required
            />
            {filteredDoctors.length > 0 && (
              <ul style={{ 
                position: 'absolute', 
                top: '100%', 
                right: 0,
                width: 'calc(100% - 160px)',
                backgroundColor: 'white', 
                border: '1px solid #e2e8f0', 
                borderRadius: '5px', 
                maxHeight: '150px', 
                overflowY: 'auto', 
                zIndex: 1,
                padding: '0',
                listStyleType: 'none' 
              }}>
                {filteredDoctors.map((doctor, index) => (
                  <li 
                    key={index} 
                    onClick={() => selectDoctor(doctor)} 
                    style={{ 
                      padding: '0.5rem', 
                      cursor: 'pointer', 
                      backgroundColor: '#fff',
                      transition: 'background-color 0.2s ease',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f0f0f0'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}
                  >
                    {doctor.name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center' }}>
            <label htmlFor="date" style={{ marginRight: '1rem', fontWeight: 'bold', color: '#4a5568', width: '150px' }}>Date:</label>
            <input id="date" type="date" style={{ flex: 1, padding: '0.5rem', border: '1px solid #e2e8f0', borderRadius: '5px', fontSize: '1rem' }} required min={today} />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ fontWeight: 'bold', color: '#4a5568' }}>Select Time:</label>
            <div style={{ 
                display: 'flex', 
                flexWrap: 'wrap', 
                justifyContent: 'center',
                marginTop: '0.5rem' 
            }}>
              {doctors.filter(doc => doc.name === selectedDoctor).map((doctor) => (
                doctor.timeSlots.map((time, index) => (
                  <button 
                    key={index} 
                    type="button" 
                    onClick={() => handleTimeSelection(time)} 
                    style={{ 
                      marginRight: '0.5rem', 
                      marginBottom: '0.5rem', 
                      padding: '0.5rem 1rem', 
                      border: '1px solid #e2e8f0', 
                      borderRadius: '5px', 
                      backgroundColor: selectedTime === time ? '#3b82f6' : '#ffffff', 
                      color: selectedTime === time ? 'white' : '#3b82f6',
                      transition: 'background-color 0.2s ease, color 0.2s ease',
                      cursor: 'pointer'
                    }}
                  >
                    {time}
                  </button>
                ))
              ))}
            </div>
          </div>
          
          <button type="submit" style={{ 
            width: '50%', 
            padding: '0.75rem', 
            backgroundColor: '#3b82f6', 
            color: 'white', 
            border: 'none', 
            borderRadius: '5px', 
            fontSize: '1rem', 
            cursor: 'pointer',
            transition: 'background-color 0.2s ease' 
          }}>
            Book Appointment
          </button>
        </form>
      </div>
    </div>
  );
};

export default AppointmentForm;