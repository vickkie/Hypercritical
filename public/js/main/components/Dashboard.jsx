import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { getAuth, signOut } from "firebase/auth";
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
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

// import ResponsiveAppBar from "./elements/Header";
import MiniDrawer from "./elements/Drawer";

const Dashboard = () => {
  const { currentUser } = useAuth();
  const auth = getAuth();
  const navigate = useNavigate();

  const [consultations, setConsultations] = useState({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [expandedMessage, setExpandedMessage] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchQuery, setSearchQuery] = useState("");

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

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = ""; // Chrome requires returnValue to be set
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
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

  const toggleMessage = (index) => {
    setExpandedMessage(expandedMessage === index ? null : index);
  };

  const consultationRows = Object.values(consultations)
    .filter((consultation) => consultation.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    })
    .map((consultation, index) => (
      <React.Fragment key={index}>
        <TableRow>
          <TableCell>{consultation.name}</TableCell>
          <TableCell>{consultation.email}</TableCell>
          <TableCell>{consultation.budget}</TableCell>
          <TableCell>{consultation.consultationType}</TableCell>
          <TableCell>{new Date(consultation.date).toLocaleDateString()}</TableCell>
          <TableCell>
            <IconButton size="small" onClick={() => toggleMessage(index)}>
              {expandedMessage === index ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={expandedMessage === index} timeout="auto" unmountOnExit>
              <Box margin={1}>
                <Typography variant="body2" color="text.secondary">
                  {consultation.message}
                </Typography>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    ));

  return (
    <div>
      <Container maxWidth="lg" style={{ margin: "0px", padding: "0px" }}>
        <MiniDrawer onLogout={handleLogout}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="data table">
              <TableHead>
                <TableRow className="table-header">
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Budget</TableCell>
                  <TableCell>Consultation Type</TableCell>
                  <TableCell>
                    Date
                    <button className="sort" onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}>
                      {sortOrder === "asc" ? "▲" : "▼"}
                    </button>
                  </TableCell>
                  <TableCell>Message</TableCell>
                  <TableCell>
                    <input
                      className="searchbyname"
                      type="text"
                      placeholder="Search name"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </TableCell>
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
        </MiniDrawer>
      </Container>
    </div>
  );
};

export default Dashboard;
