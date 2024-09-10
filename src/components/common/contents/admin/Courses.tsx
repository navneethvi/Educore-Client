import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { adminApproveCourse, getAllCourses } from "../../../../redux/admin/adminActions";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../store/store";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TableBody from "@mui/material/TableBody";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#4A5568",
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

const shimmerStyle = `
  @keyframes shimmer {
    0% {
      background-position: -1000px 0;
    }
    100% {
      background-position: 1000px 0;
    }
  }
`;

interface Course {
  _id: string;
  title: string;
  category: string;
  price: number;
  tutor_data: { name: string }[];
  is_approved: boolean;
  enrollments?: number;
  thumbnail: string;
}

const Courses: React.FC = () => {
  const [showApproved, setShowApproved] = useState(true);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [imageLoadingMap, setImageLoadingMap] = useState<Map<string, boolean>>(
    new Map<string, boolean>()
  );

  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const { adminToken } = useSelector((state: RootState) => state.admin);

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      const token = adminToken as string;

      const response: any = await dispatch(getAllCourses({ token }));
      console.log("response ===>", response);

      if (response.payload) {
        setCourses(response.payload);

        // Initialize image loading state
        const initialLoadingMap: Map<string, boolean> = new Map(
          response.payload.map((course: Course) => [course._id, true])
        );
        setImageLoadingMap(initialLoadingMap);
      } else {
        setCourses([]);
      }

      setLoading(false);
    };

    fetchCourses();
  }, [dispatch, adminToken]);

  const handleCourseClick = (courseId: string) => {
    console.log("Course ID:", courseId);
    navigate(`/admin/course/${courseId}`);
  };

  const handleApprove = async (courseId: string) => {
    const token = adminToken as string;
  
    Swal.fire({
      title: 'Are you sure you want to approve this course?',
      text: "This action will approve the course and make it available to students.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#bbb',
      confirmButtonText: 'Yes, approve it!',
      cancelButtonText: 'No, cancel!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await dispatch(adminApproveCourse({ token, courseId }));
          Swal.fire({
            title: 'Approved!',
            text: 'The course has been approved successfully.',
            icon: 'success',
            confirmButtonText: 'OK',
          });
        } catch (error) {
          Swal.fire({
            title: 'Error!',
            text: 'There was an error approving the course. Please try again.',
            icon: 'error',
            confirmButtonText: 'OK',
          });
        }
      }
    });
  };
  

  const handleReject = async (courseId: string) => {
    const token = adminToken as string;
    // await dispatch(rejectCourse({ courseId, token }));
    // Optionally, refetch courses after rejection
    // await fetchCourses();
  };

  const filteredCourses = showApproved
    ? courses.filter((course) => course.is_approved)
    : courses.filter((course) => !course.is_approved);

  const handleImageLoad = (courseId: string) => {
    setImageLoadingMap((prev) => new Map(prev).set(courseId, false));
  };

  return (
    <>
      <style>{shimmerStyle}</style>
      <div className="heading mb-6 px-4">
        <h1 className="text-3xl font-semibold text-gray-800">Courses</h1>
      </div>
      <div className="flex justify-end mb-6 px-4">
        <button
          onClick={() => setShowApproved(!showApproved)}
          className={`px-4 py-2 rounded text-white ${
            showApproved ? "bg-gray-800 hover:bg-gray-700" : "bg-gray-600 hover:bg-gray-500"
          }`}
        >
          {showApproved ? "Show Pending Courses" : "Show Approved Courses"}
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-[300px]">
          <CircularProgress />
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <TableContainer
            component={Paper}
            style={{ maxHeight: "500px", overflowY: "auto" }}
          >
            <Table aria-label="courses table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="left">Image</StyledTableCell>
                  <StyledTableCell align="center">Title</StyledTableCell>
                  <StyledTableCell align="center">Category</StyledTableCell>
                  <StyledTableCell align="center">Price</StyledTableCell>
                  <StyledTableCell align="center">Tutor</StyledTableCell>
                  {showApproved && (
                    <StyledTableCell align="center">
                      Enrollments
                    </StyledTableCell>
                  )}
                  <StyledTableCell align="center">
                    Approval
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    Actions
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredCourses.length > 0 ? (
                  filteredCourses.map((course) => (
                    <StyledTableRow key={course._id}>
                      <StyledTableCell align="left">
                        <div className="shimmer-wrapper">
                          {imageLoadingMap.get(course._id) && (
                            <div className="shimmer" />
                          )}
                          <img
                            src={course.thumbnail}
                            alt={course.title}
                            className={`image ${
                              imageLoadingMap.get(course._id)
                                ? "image-hidden"
                                : "image-loaded"
                            }`}
                            onLoad={() => handleImageLoad(course._id)}
                            onError={() => handleImageLoad(course._id)}
                          />
                        </div>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {course.title}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {course.category}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        ${course.price}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {course.tutor_data
                          .map((tutor) => tutor.name)
                          .join(", ")}
                      </StyledTableCell>
                      {showApproved && (
                        <StyledTableCell align="center">
                          {course.enrollments || 0}
                        </StyledTableCell>
                      )}
                      <StyledTableCell align="center">
                       {!course.is_approved? (
                          <button
                          onClick={() => handleApprove(course._id)}
                          className="bg-purple-600 text-white text-xs px-6 py-2 rounded-full"
                        >
                          Approve
                        </button>
                       ): (
                        <button
                        onClick={() => handleReject(course._id)}
                        className="bg-red-600 text-white text-xs px-6 py-2 rounded-full"
                      >
                        Reject
                      </button>
                       )}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                       
                        
                        
                        <button
                          onClick={() => handleCourseClick(course._id)}
                          className="bg-gray-800 text-white text-xs px-6 py-2 rounded-full "
                        >
                          Go to Course
                        </button>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))
                ) : (
                  <TableRow>
                    <StyledTableCell colSpan={8} align="center">
                      <Alert severity="info">No courses available</Alert>
                    </StyledTableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </motion.div>
      )}
    </>
  );
};

export default Courses;
