//App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

//Staff Management
import AdminStaffMember from './pages/AdminStaffMember/AdminStaffMember';

function App() {
  
  return (
    <Router>
      <main>
        <Routes>
        {/*Staff Management*/}
        {/*<Route path="/StaffMember" name="StaffMember" element={<ClientInventory/>} />*/}
         <Route path="/adminStaffMember" name="adminStaffMember" element={<AdminStaffMember/>}/>

        </Routes>
      </main>
    </Router>
  );
}

export default App;
