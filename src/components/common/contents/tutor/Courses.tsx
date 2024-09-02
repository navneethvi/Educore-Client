import React, { useState, useEffect } from "react";
import CourseCard from "../../CourseCard";
import { tutorFetchApprovedCourses } from "../../../../redux/tutors/tutorActions";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../store/store";

const Courses: React.FC = () => {
  const [showApproved, setShowApproved] = useState(true);
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true); // Add loading state

  const dispatch: AppDispatch = useDispatch();

  const { tutorData, tutorToken } = useSelector(
    (state: RootState) => state.tutor
  );

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true); // Set loading to true when fetching starts
      const token = tutorToken as string;
      const tutorId = tutorData?._id as string;
      const response: any = await dispatch(
        tutorFetchApprovedCourses({ token, tutorId })
      );
      setCourses(response.payload.data);
      setLoading(false); // Set loading to false when data is fetched
    };
    fetchCourses();
  }, [dispatch, tutorToken, tutorData]);

  const handleCourseClick = (courseId: string) => {
    console.log("Course ID:", courseId);
  };

  const filteredCourses = showApproved
    ? courses.filter((course) => course.is_approved)
    : courses.filter((course) => !course.is_approved);

  return (
    <>
      <div className="heading mb-2">
        <h1 className="text-2xl font-semibold">My Courses</h1>
      </div>
      <div className="flex justify-end mb-6 mr-10">
        <button
          onClick={() => setShowApproved(!showApproved)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
        >
          {showApproved ? "Show Pending Courses" : "Show Approved Courses"}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <div key={course._id}>
              <CourseCard
                title={course.title}
                category={course.category}
                price={course.price}
                originalPrice={course.originalPrice}
                tutorName={tutorData?.name as string}
                image={tutorData?.image as string}
                thumbnail={course.thumbnail}
                lessonsCount={course.lessons.length}
                duration="2h 12m"
                enrollments={course.enrollments}
                courseId={course._id}
                handleClick={handleCourseClick}
              />
            </div>
          ))
        ) : (
          <p className="text-center col-span-4">No courses found.</p>
        )}
      </div>
    </>
  );
};

export default Courses;
