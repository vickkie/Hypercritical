import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { getAuth, signOut } from "firebase/auth"; // Import signOut from Firebase
import { getDatabase, ref, onValue, off } from "firebase/database";
import Container from "@mui/material/Container";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import Table from "@mui/material/Table";

import ResponsiveAppBar from "./elements/Header";

const Dashboard = () => {
  const { currentUser } = useAuth();
  const auth = getAuth();
  const navigate = useNavigate();

  const [consultations, setConsultations] = useState({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    const db = getDatabase();
    const consultationRef = ref(db, "consultations");

    const handleData = (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        setConsultations(data);
      } else {
        console.log("No data available");
        setConsultations({});
      }
    };

    onValue(consultationRef, handleData, (error) => {
      console.error("Error fetching data:", error);
    });

    return () => {
      off(consultationRef, "value", handleData);
    };
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (!currentUser) {
    navigate("/login");
    return null;
  }

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login"); // Redirect to login page after logout
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const consultationRows = Object.values(consultations).map((consultation, index) => (
    <TableRow key={index}>
      <TableCell>{consultation.name}</TableCell>
      <TableCell>{consultation.email}</TableCell>
      <TableCell>{consultation.budget}</TableCell>
      <TableCell>{consultation.consultationType}</TableCell>
      <TableCell>{new Date(consultation.date).toLocaleDateString()}</TableCell>
      <TableCell>{consultation.message}</TableCell>
    </TableRow>
  ));

  return (
    <div>
      <ResponsiveAppBar onLogout={handleLogout} />
      <Container maxWidth="lg">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Budget</TableCell>
                <TableCell>Consultation Type</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Message</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{consultationRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)}</TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={consultationRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Container>
    </div>
  );
};

export default Dashboard;
