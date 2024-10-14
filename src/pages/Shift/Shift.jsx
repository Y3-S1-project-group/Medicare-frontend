import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import SideNavBar from '../../components/SideNavBar/SideNavBar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { AlertCircle, Clock, Calendar as CalendarIcon, Users } from 'lucide-react';

const localizer = momentLocalizer(moment);

const roleColorMap = {
  'Doctor': '#4CAF50',
  'Nurse': '#2196F3',
  'Technician': '#FFC107'
};

const shiftTypeMap = {
  'Day Shift': '☀️',
  'Night Shift': '🌙',
  'On-Call': '📞',
  'Off': '🏠'
};

const Shift = () => {
  const [staffData, setStaffData] = useState([]);
  const [events, setEvents] = useState([

    {
        title: '☀️ John Doe (Doctor)',
        start: new Date(2024, 9, 15, 9, 0), // October 15, 2024, 9:00 AM
        end: new Date(2024, 9, 15, 17, 0),  // October 15, 2024, 5:00 PM
        staff: 'John Doe',
        shiftType: 'Day Shift',
        role: 'Doctor',
        backgroundColor: roleColorMap['Doctor']
      },
      {
        title: '🌙 Jane Smith (Nurse)',
        start: new Date(2024, 9, 16, 21, 0), // October 16, 2024, 9:00 PM
        end: new Date(2024, 9, 17, 5, 0),    // October 17, 2024, 5:00 AM
        staff: 'Jane Smith',
        shiftType: 'Night Shift',
        role: 'Nurse',
        backgroundColor: roleColorMap['Nurse']
      }



  ]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: '', start: null, end: null, staff: '', shiftType: '', role: '' });
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [stats, setStats] = useState({ totalStaff: 0, totalShifts: 0 });

  useEffect(() => {
    const fetchStaffData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/staff/getAllStaff');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setStaffData(data);
        setStats(prevStats => ({ ...prevStats, totalStaff: data.length }));
        setIsLoading(false);
      } catch (e) {
        console.error("An error occurred while fetching the data: ", e);
        setError(e.message);
        setIsLoading(false);
      }
    };

    fetchStaffData();
  }, []);

  useEffect(() => {
    setStats(prevStats => ({ ...prevStats, totalShifts: events.length }));
  }, [events]);

  const handleSelect = ({ start, end }) => {
    setNewEvent({ ...newEvent, start, end });
    setIsOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const staffMember = staffData.find(staff => `${staff.FirstName} ${staff.LastName}` === newEvent.staff);
    const event = {
      ...newEvent,
      title: `${shiftTypeMap[newEvent.shiftType]} ${newEvent.staff} (${staffMember.Role})`,
      role: staffMember.Role,
      backgroundColor: roleColorMap[staffMember.Role]
    };
    setEvents([...events, event]);
    setIsOpen(false);
    setNewEvent({ title: '', start: null, end: null, staff: '', shiftType: '', role: '' });
  };

  const eventStyleGetter = (event) => {
    return {
      style: {
        backgroundColor: event.backgroundColor,
        borderRadius: '8px',
        opacity: 0.8,
        color: 'white',
        border: '0px',
        display: 'block',
        fontWeight: 'bold',
        padding: '4px',
        textShadow: '1px 1px 1px rgba(0,0,0,0.3)',
      }
    };
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  const customDayPropGetter = (date) => {
    if (date.getDay() === 0 || date.getDay() === 6) {
      return {
        className: 'bg-gray-100',
        style: {
          borderRadius: '8px',
        },
      };
    }
    return {};
  };

  if (isLoading) return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
  
  if (error) return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
        <p className="font-bold">Error</p>
        <p>{error}</p>
      </div>
    </div>
  );

  return (
    <>
      <SideNavBar />
      <div className="flex h-screen bg-gray-100">
        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="bg-white shadow">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
              <h1 className="text-3xl font-bold text-gray-900">Staff Shift Management</h1>
              <div className="flex space-x-4">
                <div className="bg-blue-100 p-2 rounded-lg flex items-center">
                  <Users className="text-blue-500 mr-2" />
                  <span className="font-semibold">{stats.totalStaff} Staff</span>
                </div>
                <div className="bg-green-100 p-2 rounded-lg flex items-center">
                  <Clock className="text-green-500 mr-2" />
                  <span className="font-semibold">{stats.totalShifts} Shifts</span>
                </div>
              </div>
            </div>
          </header>
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
            <div className="container mx-auto px-6 py-8">
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Staff List</h2>
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        {['ID', 'Name', 'Role', 'Gender', 'Phone', 'Email'].map((header) => (
                          <th key={header} scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {staffData.map((staff) => (
                        <tr key={staff.ID} className="hover:bg-gray-50 transition duration-150 ease-in-out">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{staff.ID}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{`${staff.FirstName} ${staff.LastName}`}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              {staff.Role}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{staff.Gender}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{staff.PhoneNumber}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{staff.Email}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Shift Calendar</h2>
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <div className="mb-4 flex justify-between items-center">
                    {Object.entries(roleColorMap).map(([role, color]) => (
                      <div key={role} className="flex items-center">
                        <div className="w-8 h-8 rounded-full mr-2" style={{ backgroundColor: color }}></div>
                        <span className="text-lg">{role}</span>
                      </div>
                    ))}
                  </div>
                  <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 600 }}
                    selectable
                    onSelectSlot={handleSelect}
                    onSelectEvent={handleEventClick}
                    eventPropGetter={eventStyleGetter}
                    dayPropGetter={customDayPropGetter}
                    views={['month', 'week', 'day']}
                    className="rounded-lg overflow-hidden"
                    tooltipAccessor={(event) => `${event.title}\nClick for details`}
                  />
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex justify-center items-center">
          <div className="relative p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Shift</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="staff" className="block text-sm font-medium text-gray-700">Staff Member</label>
                  <select
                    id="staff"
                    value={newEvent.staff}
                    onChange={(e) => setNewEvent({ ...newEvent, staff: e.target.value })}
                    required
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  >
                    <option value="">Select a staff member</option>
                    {staffData.map((staff) => (
                      <option key={staff.ID} value={`${staff.FirstName} ${staff.LastName}`}>
                        {`${staff.FirstName} ${staff.LastName} (${staff.Role})`}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="shiftType" className="block text-sm font-medium text-gray-700">Shift Type</label>
                  <select
                    id="shiftType"
                    value={newEvent.shiftType}
                    onChange={(e) => setNewEvent({ ...newEvent, shiftType: e.target.value })}
                    required
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  >
                    <option value="">Select shift type</option>
                    {Object.keys(shiftTypeMap).map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                <div className="flex justify-between">
                  <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Add Shift
                  </button>
                  <button type="button" onClick={() => setIsOpen(false)} className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {selectedEvent && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex justify-center items-center" onClick={() => setSelectedEvent(null)}>
          <div className="relative p-5 border w-96 shadow-lg rounded-md bg-white" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-bold mb-4">{selectedEvent.title}</h3>
            <div className="space-y-2">
              <p><span className="font-semibold">Role:</span> {selectedEvent.role}</p>
              <p><span className="font-semibold">Shift Type:</span> {Object.keys(shiftTypeMap).find(key => shiftTypeMap[key] === selectedEvent.title.split(' ')[0])}</p>
              <p><span className="font-semibold">Start:</span> {moment(selectedEvent.start).format('MMMM Do YYYY, h:mm a')}</p>
              <p><span className="font-semibold">End:</span> {moment(selectedEvent.end).format('MMMM Do YYYY, h:mm a')}</p>
            </div>
            <button onClick={() => setSelectedEvent(null)} className="mt-6 w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Shift;