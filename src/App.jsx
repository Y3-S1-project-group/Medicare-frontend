//App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

//Staff Management
import AdminStaffMember from './pages/AdminStaffMember/AdminStaffMember';
import ClientStaffMembers from './pages/ClientStaffMembers/ClientStaffMembers'

import Report from './pages/Report/Report';
import Shift from './pages/Shift/Shift';

function App() {
  
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
        

          
       
        

        </Routes>
      </main>
    </Router>
  );
}

export default App;
