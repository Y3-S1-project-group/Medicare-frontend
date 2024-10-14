//App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

//Staff Management
import AdminStaffMember from './pages/AdminStaffMember/AdminStaffMember';
import ClientStaffMembers from './pages/ClientStaffMembers/ClientStaffMembers'

import Report from './pages/Report/Report';
import Shift from './pages/Shift/Shift';

//User Management
import Login from './pages/UserManagement/Login';
import AdminDashboard from './pages/UserManagement/AdminDashboard';
import DoctorDashboard from './pages/UserManagement/DoctorDashboard';
import NurseDashboard from './pages/UserManagement/NurseDashboard';
import PatientDashboard from './pages/UserManagement/PatientDashboard';
import PrivateRoute from './components/PrivateRoute';
import Signup from './pages/UserManagement/Signup';

function App() {
  const role = localStorage.getItem('role');

  return (
    <Router>
      <main>
        <Routes>
        {/*Staff Management*/}
        <Route path="/ClientStaffMembers" name="StaffMember" element={<ClientStaffMembers/>} />
         <Route path="/adminStaffMember" name="adminStaffMember" element={<AdminStaffMember/>}/>

        {/*Report*/}
        <Route path="/report" name="report" element={<Report/>}/>

        {/*SHIFT*/}
        <Route path="/shift" name="shift" element={<Shift/>}/>
        
        <Route path="/" element={<Login />} />

        <Route path="/signup" element={<Signup />} />

        {/* Protected routes */}
        <Route 
          path="/admin" 
          element={
            <PrivateRoute role={role} allowedRoles={['admin']}>
              <AdminDashboard />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/doctor" 
          element={
            <PrivateRoute role={role} allowedRoles={['doctor']}>
              <DoctorDashboard />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/nurse" 
          element={
            <PrivateRoute role={role} allowedRoles={['nurse']}>
              <NurseDashboard />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/patient" 
          element={
            <PrivateRoute role={role} allowedRoles={['patient']}>
              <PatientDashboard />
            </PrivateRoute>
          } 
        />

        {/* Redirect any other path to login */}
        <Route path="*" element={<Navigate to="/" />} />
          
       
        

        </Routes>
      </main>
    </Router>
  );
}

export default App;
