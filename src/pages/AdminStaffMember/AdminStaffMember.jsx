import React from 'react'

import DisplayStaffMembers from '../../components/DisplayStaffMember/DisplayStaffMembers'
//import SideNavBar from '../../components/SideNav/SideNavBar'
//import StaffMemberReport from '../../components/StaffMemberReport/StaffMemberReport';
import AddStaffMember from '../../components/AddStaffMember/AddStaffMember';

const AdminStaffMember = () => {
  return (
    <>
      

      <div className="ml-2 mt-8 px-2">
        {/*<StaffMemberReport />*/}
        <AddStaffMember />

        <br />
        <br />
        <DisplayStaffMembers />
      </div>
    </>
  );
}

export default AdminStaffMember

