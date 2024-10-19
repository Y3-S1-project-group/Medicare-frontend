//App.jsx
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";

//User Management
import PatientLogin from "./pages/UserManagement/PatientLogin";
import Signup from "./pages/UserManagement/Signup";
import ForgotPassword from "./pages/UserManagement/ForgotPassword";
import VerifyOTP from "./pages/UserManagement/VerifyOTP";
import ResetPassword from "./pages/UserManagement/ResetPassword";

//Staff Management
import AdminStaffMember from "./pages/AdminStaffMember/AdminStaffMember";
import ClientStaffMembers from "./pages/ClientStaffMembers/ClientStaffMembers";

import Report from "./pages/Report/Report";
import Shift from "./pages/Shift/Shift";

//AppointmentSystem
import BookAppointment from "./pages/AppointmentSystem/BookAppointment";
import PaymentGate from "./pages/AppointmentSystem/PaymentGate";
import ViewAppoinments from "./pages/AppointmentSystem/ViewAppoinments";

function App() {
  return (
    <Router>
      <main>
        <Routes>

          {/* User Management */}
          <Route path="/login" element={<PatientLogin/>} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verifyotp" element={<VerifyOTP />} />
          <Route path="/reset-password/:hash" element={<ResetPassword />} />

          {/*Staff Management*/}
          <Route
            path="/ClientStaffMembers"
            name="StaffMember"
            element={<ClientStaffMembers />}
          />
          <Route
            path="/adminStaffMember"
            name="adminStaffMember"
            element={<AdminStaffMember />}
          />

          {/*Report*/}
          <Route path="/report" name="report" element={<Report />} />

          {/*SHIFT*/}
          <Route path="/shift" name="shift" element={<Shift />} />

          {/* AppointmentSystem */}
          <Route
            path="/BookAppointment"
            name="BookAppointment"
            element={<BookAppointment />}
          />
          <Route
            path="/PaymentGate"
            name="PaymentGate"
            element={<PaymentGate />}
          />
          <Route
            path="/ViewAppoinments"
            name="ViewAppoinments"
            element={<ViewAppoinments />}
          />

          {/* Redirect any other path*/}
          <Route path="*" element={<Navigate to="/" />} />

        </Routes>
      </main>
    </Router>
  );
}

export default App;
