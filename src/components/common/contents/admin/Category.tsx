import React, { useState, useEffect } from "react";
import { Box, Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Stack, Pagination } from "@mui/material";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../../store/store";
import { fetchCategories, addCategory } from "../../../../redux/admin/adminActions";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Category: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const {
    categories: { data: categories = [], loading, error, totalPages },
    adminToken,
  } = useSelector((state: RootState) => state.admin);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(5);
  const [newCategory, setNewCategory] = useState("");

  useEffect(() => {
    if (adminToken) {
      dispatch(fetchCategories({ token: adminToken, page }));
    }
  }, [dispatch, adminToken, page]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const handleAddCategory = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!newCategory.trim()) {
      toast.error("Please enter a category name!");
      return;
    }

    if (!adminToken) {
      toast.error("Admin token is missing!");
      return;
    }

    dispatch(addCategory({ token: adminToken, name: newCategory.trim() }))
      .unwrap()
      .then(() => {
        toast.success("Category added successfully!");
        setNewCategory("");

        // Refetch the categories to include the new one
        dispatch(fetchCategories({ token: adminToken, page }));
      })
      .catch((err) => {
        toast.error(`${err}`);
      });
  };

  return (
    <Box>
      <div className="heading">
        <h1 className="text-2xl font-semibold">Category</h1>
      </div>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="flex-start"
        p={4}
        height="100%"
      >
        {/* Left Side - Category Table */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          style={{ flex: 2, marginRight: "20px" }}
        >
          <TableContainer component={Paper} sx={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", borderRadius: "8px" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{
                      backgroundColor: "#808999",
                      color: "#fff",
                      fontWeight: "bold",
                      fontSize: "16px",
                      textAlign: "left",
                      padding: "16px",
                    }}
                  >
                    Category Name
                  </TableCell>
                  <TableCell
                    sx={{
                      backgroundColor: "#808999",
                      color: "#fff",
                      fontWeight: "bold",
                      fontSize: "16px",
                      textAlign: "center",
                      padding: "16px",
                    }}
                  >
                    Number of Courses
                  </TableCell>
                  <TableCell
                    sx={{
                      backgroundColor: "#808999",
                      color: "#fff",
                      fontWeight: "bold",
                      fontSize: "16px",
                      textAlign: "center",
                      padding: "16px",
                    }}
                  >
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {categories.length === 0 && !loading && !error && (
                  <TableRow>
                    <TableCell colSpan={3} align="center">
                      No categories found.
                    </TableCell>
                  </TableRow>
                )}
                {categories.map((category) => (
                  <motion.tr
                    key={category._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                  >
                    <TableCell sx={{ padding: "16px" }}>
                      {category.name}
                    </TableCell>
                    <TableCell align="center" sx={{ padding: "16px" }}>
                      {category.course ? category.course.length : 0}
                    </TableCell>
                    <TableCell align="center" sx={{ padding: "16px" }}>
                      <Button
                        variant="contained"
                        color="secondary"
                        // onClick={() => deleteCategory(category._id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </motion.tr>
                ))}
                {loading && (
                  <TableRow>
                    <TableCell colSpan={3} align="center">
                      Loading...
                    </TableCell>
                  </TableRow>
                )}
                {/* {error && (
                  <TableRow>
                    <TableCell colSpan={3} align="center" color="error">
                      Error: {error}
                    </TableCell>
                  </TableRow>
                )} */}
              </TableBody>
            </Table>
          </TableContainer>
          <Stack spacing={2} mt={2} alignItems="center">
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              color="secondary"
            />
          </Stack>
        </motion.div>
        {/* Right Side - Add Category Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          style={{ flex: 1 }}
        >
          <Box
            component="form"
            onSubmit={handleAddCategory}
            display="flex"
            flexDirection="column"
            alignItems="center"
            p={4}
            sx={{
              backgroundColor: "#ffffff",
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              border: "1px solid #e0e0e0",
              width: "100%",
              maxWidth: "400px",
              margin: "auto",
            }}
          >
            <h1 className="text-center mb-8  font-medium text-gray-600">
              Add New Category
            </h1>
            <TextField
              label="Category Name"
              variant="outlined"
              fullWidth
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Button
              type="submit"
              variant="contained"
              color="secondary"
            >
              Add Category
            </Button>
          </Box>
        </motion.div>
      </Box>
      <ToastContainer />
    </Box>
  );
};

export default Category;
