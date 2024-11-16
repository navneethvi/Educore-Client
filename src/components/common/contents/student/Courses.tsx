import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { studentGetEnrolledCourses } from "../../../../redux/students/studentActions";
import { AppDispatch, RootState } from "../../../../store/store";
import CourseCard from "../../CourseCard";
import { BASE_URL } from "../../../../utils/configs";
import { Paper, InputBase, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";

const Courses: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const { studentToken, studentData } = useSelector(
    (state: RootState) => state.student
  );

  useEffect(() => {
    if (studentToken && studentData?._id) {
      setLoading(true);
      setError(null);

      dispatch(
        studentGetEnrolledCourses({
          token: studentToken,
          studentId: studentData._id,
        })
      )
        .unwrap()
        .then((fetchedCourses) => {
          setCourses(fetchedCourses);
          setLoading(false);
          fetchThumbnails(fetchedCourses);
        })
        .catch(() => {
          setError("Failed to fetch courses");
          setLoading(false);
        });
    }
  }, [dispatch, studentToken, studentData]);

  const fetchThumbnails = useCallback(async (courses: any) => {
    const updatedCourses = await Promise.all(
      courses.map(async (course: any) => {
        if (course.thumbnail) {
          try {
            const response = await fetch(
              `${BASE_URL}/course/get-presigned-url?filename=${course.thumbnail}`
            );
            const { url } = await response.json();
            return { ...course, thumbnailUrl: url };
          } catch (error) {
            console.error("Error fetching thumbnail URL:", error);
          }
        }
        return course;
      })
    );
    setCourses(updatedCourses);
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleGoToCourse = (courseId: string) => {
    navigate(`/courses/${courseId}`);
  };

  const filteredCourses = useMemo(() => {
    return courses.filter((course) =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [courses, searchTerm]);

  return (
    <>
      <Paper
        component="form"
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: 400,
          maxWidth: 600,
          margin: "0 auto",
          marginBottom: 2,
          border: 1,
          borderRadius: 10,
          borderColor: "#808999",
        }}
      >
        <InputBase
          sx={{ ml: 2, flex: 1 }}
          placeholder="Search Courses"
          inputProps={{ "aria-label": "search courses" }}
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {loading ? (
          <p>Loading courses...</p>
        ) : error ? (
          <p>{error}</p>
        ) : filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <CourseCard
              key={course._id}
              title={course.title}
              category={course.category}
              thumbnail={course.thumbnailUrl || course.thumbnail}
              courseId={course._id}
              handleGoToCourse={() => handleGoToCourse(course._id)}
              showGoToCourseButton={true}
            />
          ))
        ) : (
          <p>No courses found.</p>
        )}
      </div>
    </>
  );
};

export default Courses;
