import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../store/store';
import { adminFetchLessonDetails } from '../../../../redux/admin/adminActions';
import VideoPlayer from '../../VideoPlayer';

const LessonDetails: React.FC = () => {
  const location = useLocation();
  const dispatch: AppDispatch = useDispatch();
  const { lessonIndex, lessonTitle, courseId } = location.state || {};
  const [lessonDetails, setLessonDetails] = useState<any>(null);
  const { adminToken } = useSelector((state: RootState) => state.admin);

  useEffect(() => {
    console.log(location.state);
    
    if (courseId != null && lessonIndex != null) {
      
      const fetchLessonDetails = async () => {
        try {
          const response = await dispatch(
            adminFetchLessonDetails({ token: adminToken as string, courseId, lessonIndex })
          ).unwrap();
          setLessonDetails(response);
          
        } catch (error) {
          console.error("Failed to fetch lesson details:", error);
        }
      };

      fetchLessonDetails();
    }
  }, [courseId, lessonIndex, dispatch, adminToken]);

  const videoJsOptions = {
    autoplay: true,
    controls: true,
    fluid: true, // Fluid layout to fill the parent container
    preload: 'auto',
    playbackRates: [0.5, 1, 1.5, 2],
    aspectRatio: '16:9',
    controlBar: {
      volumePanel: { inline: false },
      pictureInPictureToggle: true,
      fullscreenToggle: true,
      playToggle: true,
      progressControl: true,
      remainingTimeDisplay: true,
      playbackRateMenuButton: true,
      timeDivider: true,
      currentTimeDisplay: true,
      durationDisplay: true,
    },
    plugins: {},
    sources: [
      {
        src: 'https://media.w3.org/2010/05/sintel/trailer.mp4',
        type: 'video/mp4',
      },
    ],
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 mt-10">
        Lesson {lessonIndex}: {lessonTitle}
      </h1>

      {/* Wrapper for VideoPlayer with Tailwind styles */}
      <div className="w-[800px] h-[450px] rounded-lg overflow-hidden shadow-lg">
        <VideoPlayer videoJsOptions={videoJsOptions} />
      </div>
    </div>
  );
};

export default LessonDetails;
