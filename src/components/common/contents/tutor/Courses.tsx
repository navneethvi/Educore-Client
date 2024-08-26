import React, { useState } from "react";
import CourseCard from "../../CourseCard";

const Courses: React.FC = () => {
  // State to toggle between approved and pending courses
  const [showApproved, setShowApproved] = useState(true);

  // Example data for approved and pending courses
  const approvedCourses = [
    {
      id: 1,
      title: "Learning Javascript With Imagination",
      category: "Development",
      price: 2999,
      originalPrice: 3999,
      // tutor: "Navaneeth V",
      // rating: 4.3,
      lessons: 2,
      duration: "2h 12m",
      enrollments: 202,
      thumbnail: "/src/assets/home-page/course-thumb.png",
      tutorProfile: "/src/assets/home-page/tutor-profile.jpeg",
    },
    {
      id: 1,
      title: "Learning Javascript With Imagination",
      category: "Development",
      price: 2999,
      originalPrice: 3999,
      // tutor: "Navaneeth V",
      // rating: 4.3,
      lessons: 2,
      duration: "2h 12m",
      enrollments: 202,
      thumbnail: "/src/assets/home-page/course-thumb.png",
      tutorProfile: "/src/assets/home-page/tutor-profile.jpeg",
    },
    {
      id: 1,
      title: "Learning Javascript With Imagination",
      category: "Development",
      price: 2999,
      originalPrice: 3999,
      // tutor: "Navaneeth V",
      // rating: 4.3,
      lessons: 2,
      duration: "2h 12m",
      enrollments: 202,
      thumbnail: "/src/assets/home-page/course-thumb.png",
      tutorProfile: "/src/assets/home-page/tutor-profile.jpeg",
    },
    {
      id: 1,
      title: "Learning Javascript With Imagination",
      category: "Development",
      price: 2999,
      originalPrice: 3999,
      // tutor: "Navaneeth V",
      // rating: 4.3,
      lessons: 2,
      duration: "2h 12m",
      enrollments: 202,
      thumbnail: "/src/assets/home-page/course-thumb.png",
      tutorProfile: "/src/assets/home-page/tutor-profile.jpeg",
    },
    {
      id: 1,
      title: "Learning Javascript With Imagination",
      category: "Development",
      price: 2999,
      originalPrice: 3999,
      // tutor: "Navaneeth V",
      // rating: 4.3,
      lessons: 2,
      duration: "2h 12m",
      enrollments: 202,
      thumbnail: "/src/assets/home-page/course-thumb.png",
      tutorProfile: "/src/assets/home-page/tutor-profile.jpeg",
    },

    // Add more approved courses here
  ];

  const pendingCourses = [
    {
      id: 1,
      title: "Pending Course Example",
      category: "Design",
      price: 1999,
      originalPrice: 2999,
      tutor: "John Doe",
      rating: 4.0,
      lessons: 3,
      duration: "3h 10m",
      enrollments: 150,
      thumbnail: "/src/assets/home-page/course-thumb.png",
      tutorProfile: "/src/assets/home-page/tutor-profile.jpeg",
    },
    // Add more pending courses here
  ];

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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {showApproved
          ? approvedCourses.map((course) => (
              <CourseCard key={course.id} {...course} />
            ))
          : pendingCourses.map((course) => (
              <CourseCard key={course.id} {...course} />
            ))}
      </div>
    </>
  );
};

export default Courses;
