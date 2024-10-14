//App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

//Staff Management
<<<<<<< HEAD
import AdminStaffMember from './pages/StaffManagementPages/AdminStaffMember/AdminStaffMember';
import ClientStaffMembers from './pages/StaffManagementPages/ClientStaffMembers/ClientStaffMembers';
=======
import AdminStaffMember from './pages/AdminStaffMember/AdminStaffMember';
import ClientStaffMembers from './pages/ClientStaffMembers/ClientStaffMembers'

import Report from './pages/Report/Report';
import Shift from './pages/Shift/Shift';


//AppointmentSystem
import BookAppointment from './pages/AppointmentSystem/BookAppointment';
import PaymentGate from './pages/AppointmentSystem/PaymentGate';
import ViewAppoinments from './pages/AppointmentSystem/ViewAppoinments';

>>>>>>> 2064ccf3ae406dbd42ca9695ef672482d0949b3b
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
        

          {/* AppointmentSystem */}
          <Route path="/BookAppointment" name="BookAppointment" element={<BookAppointment/>} />
          <Route path="/PaymentGate" name="PaymentGate" element={<PaymentGate/>} />
          <Route path="/ViewAppoinments" name="ViewAppoinments" element={<ViewAppoinments/>} />
       
        

        </Routes>
      </main>
    </Router>
  );
}

export default App;
