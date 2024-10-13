//App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

//Staff Management
import AdminStaffMember from './pages/AdminStaffMember/AdminStaffMember';
import ClientStaffMembers from './pages/ClientStaffMembers/ClientStaffMembers';
function App() {
  
  return (
    <Router>
      <main>
        <Routes>
        {/*Staff Management*/}
        <Route path="/ClientStaffMembers" name="StaffMember" element={<ClientStaffMembers/>} />
         <Route path="/adminStaffMember" name="adminStaffMember" element={<AdminStaffMember/>}/>

        </Routes>
      </main>
    </Router>
  );
}

export default App;
