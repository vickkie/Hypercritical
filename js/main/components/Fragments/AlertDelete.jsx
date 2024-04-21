//! THis component is duplicated and not in use currently

import React from "react";
import Swal from "sweetalert2";

export default function AlertDelete({ handleDelete }) {
  const handleConfirmDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete(); // Call the delete function if the user confirms
      }
    });
  };

  return (
    <React.Fragment>
      {/* The SweetAlert2 dialog will be triggered by handleConfirmDelete, so no need for a Dialog component here. */}
    </React.Fragment>
  );
}
