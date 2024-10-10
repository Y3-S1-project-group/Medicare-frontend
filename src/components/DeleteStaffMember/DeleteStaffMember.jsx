import React, { useState } from "react";
import swal from "sweetalert";
import axios from "axios";

const DeleteStaffMember = ({ staffId }) => {
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleDelete = () => {
    axios
      .delete(`http://localhost:5000/api/staff/deleteStaff/${staffId}`) // Adjusted API endpoint for staff deletion
      .then((response) => {
        console.log(response.data);
        swal({
          text: "Staff member deleted successfully",
          icon: "success",
          buttons: {
            confirm: { text: "OK" },
          },
        }).then(() => {
          handleCloseModal();
          window.location.reload(); // Optionally reload the page to refresh the staff list
        });
      })
      .catch((error) => {
        console.error("Error deleting staff member:", error);
        swal({
          text: "There was an error deleting the staff member",
          icon: "error",
          buttons: {
            confirm: { text: "OK" },
          },
        });
      });
  };

  return (
    <div>
      {/* Delete button */}
      <button className="btn" onClick={handleShowModal}>
        Delete
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 overflow-auto flex items-center justify-center">
          <div className="fixed inset-0 transition-opacity" onClick={handleCloseModal}>
            <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
          </div>
          <div className="relative bg-white p-8 rounded-lg shadow-xl max-w-xl w-full">
            <h2 className="text-lg font-semibold mb-4">
              Are you sure you want to delete this staff member?
            </h2>
            <div className="flex justify-end">
              <button
                className="bg-gray-300 text-black py-2 px-4 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring focus:ring-blue-200 mr-4"
                onClick={handleCloseModal}
              >
                Cancel
              </button>
              <button
                className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-400"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteStaffMember;
