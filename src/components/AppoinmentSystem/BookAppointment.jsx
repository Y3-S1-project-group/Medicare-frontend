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
  ]);
  
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  // Add a new state for temporarily highlighted time
  const [highlightedTime, setHighlightedTime] = useState('');

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
    setHighlightedTime(''); // Reset highlighted time when doctor changes
    setSelectedTime(''); // Reset selected time when doctor changes
  };

  // Modified to handle time slot highlighting
  const handleTimeHighlight = (time) => {
    setHighlightedTime(time);
    setSelectedTime(time);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if a time slot has been selected
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
      const response = await fetch('http://localhost:5000/Appoint/add', {
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
      <div style={{ 
        background: 'linear-gradient(to right, #3b82f6, #06b6d4)', 
        padding: '1rem', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center' 
      }}>
        <h1 style={{ color: 'white',
          fontSize: '1.25rem',
          fontWeight: 'bold' }}>
          Book an Appointment </h1>

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
              <option value="" disabled>Select your gender</option>
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
                      transition: 'background-color 0.3s' 
                    }} 
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e2e8f0'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}
                  >
                    {doctor.name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center' }}>
            <label htmlFor="date" style={{ marginRight: '1rem', fontWeight: 'bold', color: '#4a5568', width: '150px' }}>Appointment Date:</label>
            <input 
              id="date" 
              type="date" 
              min={today} 
              style={{ flex: 1, padding: '0.5rem', border: '1px solid #e2e8f0', borderRadius: '5px', fontSize: '1rem' }} 
              required 
            />
          </div>

          <div style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center' }}>
            <label style={{ marginRight: '1rem', fontWeight: 'bold', color: '#4a5568', width: '150px' }}>Select Time:</label>
            {selectedDoctor && doctors.find(doctor => doctor.name === selectedDoctor)?.timeSlots.map((time, index) => (
              <button 
                type="button" // Add type="button" to prevent form submission
                key={index} 
                onClick={() => handleTimeHighlight(time)}
                style={{ 
                  marginRight: '0.5rem', 
                  padding: '0.5rem', 
                  border: '1px solid #e2e8f0', 
                  borderRadius: '5px', 
                  backgroundColor: highlightedTime === time ? '#3b82f6' : 'white', 
                  color: highlightedTime === time ? 'white' : '#4a5568',
                  cursor: 'pointer'
                }}
              >
                {time}
              </button>
            ))}
          </div>

          <button 
            type="submit" 
            style={{ 
              padding: '0.5rem 1rem', 
              backgroundColor: '#3b82f6', 
              color: 'white', 
              border: 'none', 
              borderRadius: '5px', 
              fontSize: '1rem', 
              cursor: 'pointer' 
            }}
          >
            Book Appointment
          </button>
        </form>
      </div>
    </div>
  );
};

export default AppointmentForm;