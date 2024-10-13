import React from 'react'

import DisplayStaffMembers from '../../../components/AdminStaffManagementcomponents/DisplayStaffMember/DisplayStaffMembers';
import SideNavBar from '../../../components/SideNavBar/SideNavBar';

const AdminStaffMember = () => {
  return (
    <>
      
      
      <div className="ml-2 mt-8 px-2">
        
        <br />
        <br />
        <SideNavBar />
        <DisplayStaffMembers />
      </div>
    </>
  );
}

export default AdminStaffMember

