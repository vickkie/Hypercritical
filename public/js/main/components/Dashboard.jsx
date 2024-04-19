import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { getAuth, signOut } from "firebase/auth";
import { getDatabase, ref, onValue, off, update, remove } from "firebase/database";
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
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import TelegramIcon from "@mui/icons-material/Telegram";
import FilterListIcon from "@mui/icons-material/FilterList";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import ModeEditIcon from "@mui/icons-material/ModeEdit";

import Styles from "./styles.module.css";
// import ResponsiveAppBar from "./elements/Header";
import DrawerXDashTable from "./elements/Drawer";
import AlertDelete from "./elements/ConfirmDialog";

const Dashboard = () => {
  const { currentUser } = useAuth();
  const auth = getAuth();
  const navigate = useNavigate();

  const [consultations, setConsultations] = useState({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(7);
  const [expandedMessage, setExpandedMessage] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchQuery, setSearchQuery] = useState("");
  const [dataState, setDataState] = useState("LOADING");
  const [errorMessage, setErrorMessage] = useState("");
  const [consultationToDelete, setConsultationToDelete] = useState(null);

  const [openAlertDelete, setOpenAlertDelete] = useState(false);

  const handleClickOpen = () => {
    setOpenAlertDelete(true);
  };

  const handleClose = () => {
    setOpenAlertDelete(false);
  };

  useEffect(() => {
    const db = getDatabase();
    const consultationRef = ref(db, "consultations");

    const handleData = (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        setConsultations(data);
        for (let key in data) {
          if (!data[key].hasOwnProperty("status" || "paymentStatus")) {
            data[key].status = "Unavailable";
            data[key].paymentStatus = "Due soon";
          }
        }
        setDataState("SUCCESS");
      } else {
        console.log("No data available");
        setConsultations({});
        setIsLoading(false);
        setDataState("ERROR");
        setErrorMessage("No data available");
      }
    };

    onValue(consultationRef, handleData, (error) => {
      setDataState("ERROR");
      setErrorMessage("Error fetching data: " + error.message);
    });

    return () => {
      off(consultationRef, "value", handleData);
    };
  }, []);

  const updateConsultationStatus = async (consultationUuid, newStatus) => {
    const db = getDatabase();
    // Ensure the path correctly references the consultation using its UUID
    const consultationRef = ref(db, `consultations/${consultationUuid}`);

    try {
      await update(consultationRef, { status: newStatus });
      console.log("Consultation status updated successfully");
    } catch (error) {
      console.error("Error updating consultation status:", error);
    }
  };

  const deleteConsultation = async (consultationUuid) => {
    const db = getDatabase();
    // Ensure the path correctly references the consultation using its UUID
    const consultationRef = ref(db, `consultations/${consultationUuid}`);

    try {
      await remove(consultationRef);
      console.log("Consultation deleted successfully");
    } catch (error) {
      console.error("Error deleting consultation:", error);
    }
  };

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = ""; // browser requires returnValue to be set
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

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser, navigate]); // only if Auth changes

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

  function getNestedProperty(obj, path) {
    return path.split(".").reduce((prev, curr) => {
      return prev ? prev[curr] : undefined;
    }, obj);
  }

  // Use of useMemo for filtering and sorting
  const consultationRows = useMemo(() => {
    return Object.values(consultations)
      .filter(
        (consultation) =>
          getNestedProperty(consultation, "name") && // Safely access consultation.name
          getNestedProperty(consultation, "name").toLowerCase().includes(searchQuery.toLowerCase())
      )

      .sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
      })
      .map((consultation) => (
        <React.Fragment key={consultation.uuid}>
          <TableRow>
            <TableCell className={`${Styles.cellStyle} ${Styles.bold}`}>{consultation.name}</TableCell>
            <TableCell className={Styles.cellStyle}>{consultation.email}</TableCell>
            <TableCell className={Styles.cellStyle}>{consultation.budget}</TableCell>
            <TableCell className={Styles.cellStyle}>{consultation.consultationType}</TableCell>
            <TableCell className={Styles.cellStyle}>{new Date(consultation.date).toLocaleDateString()}</TableCell>
            <TableCell className={Styles.cellStyle}>
              <IconButton size="small" onClick={() => toggleMessage(consultation.uuid)}>
                {expandedMessage === consultation.uuid ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </IconButton>
            </TableCell>
            <TableCell className={Styles.cellStyle}>{consultation.status}</TableCell>
            <TableCell className={Styles.cellStyle} style={{ display: "flex", alignContent: "center" }}>
              <ModeEditIcon
                titleAccess="Edit"
                className="pointHere"
                onClick={() => updateConsultationStatus(consultation.uuid, "Approved")}
              ></ModeEditIcon>

              <IconButton
                aria-label="delete"
                color="primary"
                onClick={() => {
                  setConsultationToDelete(consultation.uuid);
                  handleClickOpen();
                }}
                className="pointHere"
              >
                <DeleteIcon />
              </IconButton>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={8} style={{ paddingBottom: 0, paddingTop: 0 }}>
              <Collapse in={expandedMessage === consultation.uuid} timeout="auto" unmountOnExit>
                <Box margin={1} className={Styles.messageBoxWrapper}>
                  <TelegramIcon style={{ fill: "blue" }} />
                  <Typography variant="body2" color="text.secondary" className={Styles.messageBoxDash}>
                    {consultation.message}
                  </Typography>
                </Box>
              </Collapse>
            </TableCell>
          </TableRow>
        </React.Fragment>
      ));
  }, [consultations, searchQuery, sortOrder, expandedMessage, updateConsultationStatus]);

  return (
    <div>
      <Container maxWidth="lg" className={Styles.dashInnerWrapper}>
        <AlertDelete
          handleDelete={() => deleteConsultation(consultationToDelete)}
          handleClickOpen={handleClickOpen}
          open={openAlertDelete}
          handleClose={handleClose}
        />

        <DrawerXDashTable onLogout={handleLogout}>
          <Box sx={{ minWidth: 650, height: "40px" }} className={Styles.dashTopbar}>
            <div className={Styles.dashTopbarLeft}>
              <div>
                <input
                  className="searchbyname"
                  type="text"
                  placeholder="Search name"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className={Styles.dashTopbarFilter}>
                <FilterListIcon />
                <div>Filter</div>
              </div>
            </div>
            <div className={Styles.dashTopbarRight}>
              <div className={Styles.addFloatTop}>
                <div className={Styles.addOrderFloat}>
                  <div className={Styles.addFloatBtn} aria-label="add">
                    <AddIcon />
                  </div>
                  <div className={Styles.addFloatText}>Add Order</div>
                </div>
              </div>
            </div>
          </Box>

          {dataState === "LOADING" && (
            <div className="loaderContainer">
              <div className="loader"></div>
            </div>
          )}
          {dataState === "ERROR" && <div className="errorContainer">{errorMessage}</div>}
          {dataState === "SUCCESS" && (
            <>
              <TableContainer component={Paper} style={{ borderRadius: "22px" }}>
                <Table sx={{ minWidth: 650 }} aria-label="data table">
                  <TableHead className={Styles.tableheader}>
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
                      <TableCell>Status</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody className={Styles.tablebody}>
                    {consultationRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                className={[Styles.pagination, Styles.defaultFont].join(" ")}
                rowsPerPageOptions={[7, 14, 21, 28]}
                component="div"
                count={consultationRows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                sx={{ display: "flex", justifyContent: "center", "max-height": "41px" }}
              />
            </>
          )}
        </DrawerXDashTable>
      </Container>
    </div>
  );
};

export default Dashboard;
