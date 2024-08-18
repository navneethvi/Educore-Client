import * as React from "react";
import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudents } from "../../../../redux/admin/adminActions";
import { AppDispatch, RootState } from "../../../../store/store";
import { TableBody, CircularProgress } from "@mui/material";
import { motion } from "framer-motion";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#808999",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const Students: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
 const {
  students: { data: students, loading, error, totalPages },
  adminToken,
} = useSelector((state: RootState) => state.admin);

  const [page, setPage] = useState(1);
  const [loadingPage, setLoadingPage] = useState(false);

  useEffect(() => {
    if (adminToken) {
      dispatch(fetchStudents({ token: adminToken, page }));
    }
  }, [dispatch, adminToken, page]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
    setLoadingPage(true);

    // Reset loadingPage after 1 second
    setTimeout(() => {
      setLoadingPage(false);
    }, 1500);
  };

  return (
    <>
      <div className="heading mb-6">
        <h1 className="text-2xl font-semibold">Students</h1>
      </div>
      <div className="w-full px-4">
        {loading && (
          <div className="flex justify-center items-center h-[300px]">
            <CircularProgress />
          </div>
        )}
        {error && <Alert severity="error">{error}</Alert>}
        {!loading && !error && students.length > 0 ? (
          <>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <TableContainer component={Paper} className="w-full">
                <Table aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>Name</StyledTableCell>
                      <StyledTableCell align="left">Email</StyledTableCell>
                      <StyledTableCell align="left">Phone</StyledTableCell>
                      <StyledTableCell align="left">Activity</StyledTableCell>
                      <StyledTableCell align="left">Manage</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {students.map((student) => (
                      <StyledTableRow key={student._id}>
                        <StyledTableCell component="th" scope="row">
                          {student.name}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {student.email}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {student.phone}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {student.activity || "Active"}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          <Button variant="contained" color="secondary">
                            Block
                          </Button>
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </motion.div>

            <div className="pagination flex justify-center mt-10">
              <Stack spacing={2} mt={2}>
                <Pagination
                  count={totalPages}
                  page={page}
                  onChange={handlePageChange}
                  color="secondary"
                />
              </Stack>
            </div>

            {loadingPage && (
              <motion.div
                className="flex justify-center mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                style={{ minHeight: '64px' }} 
              >
              </motion.div>
            )}
          </>
        ) : (
          <Alert severity="info">No students available</Alert>
        )}
      </div>
    </>
  );
};

export default Students;
