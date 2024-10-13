import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Users, Clipboard, Calendar, FileText, Grid } from 'lucide-react';

const SideNav = () => {
  const navItems = [
    { name: 'Dashboard', icon: Home, path: '/' },
    { name: 'Staff', icon: Users, path: '/AdminStaffMember' },
    { name: 'Patients', icon: Users, path: '/' },
    { name: 'Shift', icon: Clipboard, path: '/RosterAllocation' },
    { name: 'Reports', icon: FileText, path: '/' },
    { name: 'Appointments', icon: Calendar, path: '/' },
  ];

  return (
    <div className="fixed left-0 top-0 bottom-0 w-64 bg-gradient-to-b from-blue-700 to-blue-200 text-white overflow-y-auto rounded-tr-2xl rounded-br-2xl">
      <div className="p-4">
        <Grid size={24} className="mb-2 text-white" />
      </div>
      <nav>
        <ul className="space-y-2 py-4">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link to={item.path} className="flex items-center px-6 py-2 hover:bg-blue-600 text-white">
                <item.icon size={20} className="mr-4 text-white" />
                <span className="text-lg text-white">{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-6 text-center">
        <div className="text-3xl font-bold mb-2 text-white">MEDICARE</div>
        <div className="text-white text-4xl">⚕️</div>
      </div>
    </div>
  );
};

export default SideNav;
