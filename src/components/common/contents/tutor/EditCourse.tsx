import React, { useState, useRef, useEffect } from "react";
import {
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Box,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Grid,
  Modal,
  Backdrop,
  Fade,
  IconButton,
} from "@mui/material";
import { Upload, Delete } from "@mui/icons-material";
import { motion } from "framer-motion";
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
import { Formik, Field, Form, FieldArray } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../store/store";
import { useNavigate, useParams } from "react-router-dom";
import { tutorFetchCourseDetails } from "../../../../redux/tutors/tutorActions"; // Import the thunk action
import { courseValidationSchema } from "../../../../validations/courseValidation";

interface LessonType {
  title: string;
  goal: string;
  video: string;
  materials: string;
  homework: string;
}

const EditCourse: React.FC = () => {
  const [thumbnail, setThumbnail] = useState<string>("");
  const [croppedThumbnail, setCroppedThumbnail] = useState<string>("");
  const [courseDetails, setCourseDetails] = useState<any>(null); // Manage course details locally
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { courseId } = useParams();
  const [open, setOpen] = useState(false);

  const cropperRef = useRef<ReactCropperElement>(null);
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const { tutorToken } = useSelector((state: RootState) => state.tutor);

  console.log("courseDetails =====>", courseDetails);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      if (courseId) {
        setLoading(true);
        try {
          const response = await dispatch(
            tutorFetchCourseDetails({ token: tutorToken as string, courseId })
          ).unwrap();
          setCourseDetails(response);
        } catch (error: any) {
          setError(error.message || "Failed to fetch course details");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchCourseDetails();
  }, [courseId, dispatch]);

  useEffect(() => {
    if (courseDetails) {
      setThumbnail(courseDetails.thumbnail || "");
      setCroppedThumbnail(courseDetails.thumbnail || "");
    }
  }, [courseDetails]);

  useEffect(() => {
    if (courseDetails && courseDetails.updated) {
      // Adjust based on your response
      Swal.fire({
        title: "Course Updated!",
        text: "Your course has been successfully updated.",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        navigate("/tutor/courses");
      });
    }
  }, [courseDetails, navigate]);

  const handleThumbnailUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setThumbnail(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCrop = () => {
    const cropper = cropperRef.current?.cropper;
    if (cropper) {
      const croppedCanvas = cropper.getCroppedCanvas();
      setCroppedThumbnail(croppedCanvas.toDataURL());
      setOpen(false);
    }
  };

  const handleSubmit = async (values: any) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("category", values.category);
    formData.append("level", values.level);
    formData.append("price", values.price);

    if (croppedThumbnail) {
      formData.append("thumbnail", croppedThumbnail);
    }

    values.lessons.forEach((lesson: any, index: number) => {
      formData.append(`lessons[${index}][title]`, lesson.title);
      formData.append(`lessons[${index}][goal]`, lesson.goal);
      if (lesson.video) {
        formData.append(`lessons[${index}][video]`, lesson.video);
      }
      if (lesson.materials) {
        formData.append(`lessons[${index}][materials]`, lesson.materials);
      }
      if (lesson.homework) {
        formData.append(`lessons[${index}][homework]`, lesson.homework);
      }
    });

    try {
      // Uncomment and use the actual dispatch function
      // await dispatch(
      //   tutorEditCourse({ token: tutorToken as string, courseId, courseData: formData })
      // );
    } catch (error) {
      console.error("Failed to update course:", error);
      Swal.fire({
        title: "Error!",
        text: "There was an error updating your course. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  if (!courseDetails) {
    return <Typography variant="h6">Course not found</Typography>;
  }
  return (
    <>
      <div className="heading">
        <h1 className="text-2xl font-semibold">Edit Courses</h1>
      </div>

      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1.2 }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
              repeatType: "reverse",
            }}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              backgroundColor: "#fff",
              padding: "30px",
              borderRadius: "15px",
              boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.3)",
            }}
          >
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              style={{
                width: "50px",
                height: "50px",
                border: "5px solid #1976d2",
                borderTop: "5px solid transparent",
                borderRadius: "50%",
                marginBottom: "20px",
              }}
            ></motion.div>
            <h2 style={{ margin: 0 }}>Uploading Course...</h2>
            <p style={{ marginTop: "10px", fontSize: "14px", color: "#555" }}>
              Please wait while we upload your course.
            </p>
          </motion.div>
        </motion.div>
      )}

      <Formik
        initialValues={{
          title: courseDetails.title || "",
          description: courseDetails.description || "",
          category: courseDetails.category || "",
          level: courseDetails.level || "",
          price: courseDetails.price || "",
          lessons: courseDetails.lessons || [
            { title: "", goal: "", video: "", materials: "", homework: "" },
          ],
        }}
        validationSchema={courseValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, values }) => (
          <Form>
            <Box>
              <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                  <Box component="form" noValidate autoComplete="off">
                    <Field
                      name="title"
                      as={TextField}
                      label="Title"
                      type="text"
                      fullWidth
                      sx={{ mb: 3, mt: 2 }}
                      variant="outlined"
                    />
                    <Field
                      name="description"
                      as={TextField}
                      label="Description"
                      variant="outlined"
                      multiline
                      rows={4}
                      fullWidth
                      sx={{ mb: 3 }}
                    />
                    <FormControl fullWidth sx={{ mb: 3 }}>
                      <InputLabel>Category</InputLabel>
                      <Field name="category" as={Select} label="Category">
                        <MenuItem value="programming">Programming</MenuItem>
                        <MenuItem value="design">Design</MenuItem>
                        <MenuItem value="marketing">Marketing</MenuItem>
                      </Field>
                    </FormControl>
                    <FormControl fullWidth sx={{ mb: 3 }}>
                      <InputLabel>Level</InputLabel>
                      <Field name="level" as={Select} label="Level">
                        <MenuItem value="beginner">Beginner</MenuItem>
                        <MenuItem value="intermediate">Intermediate</MenuItem>
                        <MenuItem value="advanced">Advanced</MenuItem>
                      </Field>
                    </FormControl>
                    <Field
                      name="price"
                      as={TextField}
                      label="Price"
                      variant="outlined"
                      type="number"
                      fullWidth
                      sx={{ mb: 2 }}
                    />
                    <Box
                      sx={{
                        mb: 3,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography variant="subtitle1">
                        Upload Thumbnail
                      </Typography>
                      <Box display="flex" alignItems="center">
                        <Button
                          variant="contained"
                          color="secondary"
                          component="label"
                          startIcon={<Upload />}
                          sx={{ mr: 2 }}
                        >
                          Upload Thumbnail
                          <input
                            type="file"
                            name="thumbnail"
                            hidden
                            accept="image/*"
                            onChange={handleThumbnailUpload}
                          />
                        </Button>
                        {croppedThumbnail && (
                          <Box
                            component="img"
                            src={croppedThumbnail}
                            alt="Cropped Thumbnail"
                            sx={{
                              width: 70,
                              height: 40,
                              borderRadius: "3px",
                              border: "2px solid #9c27b0",
                              objectFit: "cover",
                            }}
                          />
                        )}
                      </Box>
                    </Box>
                  </Box>
                  <Box display="flex" justifyContent="center" mt={4}>
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{
                        backgroundColor: "#000",
                        color: "#fff",
                        "&:hover": { backgroundColor: "#333" },
                      }}
                    >
                      Publish Course
                    </Button>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FieldArray
                    name="lessons"
                    render={(arrayHelpers) => (
                      <>
                        <motion.div
                          style={{
                            maxHeight: "calc(100vh - 200px)",
                            overflowY: "auto",
                          }}
                          drag="y"
                          dragConstraints={{ top: -300, bottom: 0 }}
                        >
                          {values.lessons.map(
                            (lesson: LessonType, index: number) => (
                              <Card
                                key={index}
                                sx={{
                                  maxWidth: 400,
                                  margin: "auto",
                                  padding: 1,
                                  mb: 2,
                                  backgroundColor: "#e4e4e7",
                                  position: "relative",
                                }}
                              >
                                <IconButton
                                  sx={{
                                    position: "absolute",
                                    top: 21,
                                    right: 8,
                                  }}
                                  onClick={() => arrayHelpers.remove(index)}
                                >
                                  <Delete />
                                </IconButton>
                                <CardContent>
                                  <Typography variant="h6" gutterBottom>
                                    Lesson {index + 1}
                                  </Typography>
                                  <Box
                                    component="form"
                                    noValidate
                                    autoComplete="off"
                                    sx={{
                                      "& .MuiTextField-root": { mb: 2 },
                                    }}
                                  >
                                    <Field
                                      name={`lessons.${index}.title`}
                                      as={TextField}
                                      label="Title"
                                      variant="outlined"
                                      fullWidth
                                      size="small"
                                    />
                                    <Field
                                      name={`lessons.${index}.goal`}
                                      as={TextField}
                                      label="Goal"
                                      variant="outlined"
                                      fullWidth
                                      size="small"
                                    />
                                    <Box
                                      sx={{
                                        mb: 1,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                      }}
                                    >
                                      <Typography variant="subtitle1">
                                        Video
                                      </Typography>
                                      <Button
                                        variant="contained"
                                        color="secondary"
                                        component="label"
                                        startIcon={<Upload />}
                                      >
                                        {values.lessons[index].video ||
                                          "Upload"}
                                        <input
                                          type="file"
                                          name={`lessons[${index}][video]`}
                                          hidden
                                          onChange={(e) =>
                                            setFieldValue(
                                              `lessons.${index}.video`,
                                              e.target.files?.[0]?.name || ""
                                            )
                                          }
                                        />
                                      </Button>
                                    </Box>
                                    <Box
                                      sx={{
                                        mb: 1,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                      }}
                                    >
                                      <Typography variant="subtitle1">
                                        Materials
                                      </Typography>
                                      <Button
                                        variant="contained"
                                        color="secondary"
                                        component="label"
                                        startIcon={<Upload />}
                                      >
                                        {values.lessons[index].materials ||
                                          "Upload"}
                                        <input
                                          type="file"
                                          name={`lessons[${index}][materials]`}
                                          hidden
                                          onChange={(e) =>
                                            setFieldValue(
                                              `lessons.${index}.materials`,
                                              e.target.files?.[0]?.name || ""
                                            )
                                          }
                                        />
                                      </Button>
                                    </Box>
                                    <Box
                                      sx={{
                                        mb: 1,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                      }}
                                    >
                                      <Typography variant="subtitle1">
                                        Homework
                                      </Typography>
                                      <Button
                                        variant="contained"
                                        color="secondary"
                                        component="label"
                                        startIcon={<Upload />}
                                      >
                                        {values.lessons[index].homework ||
                                          "Upload"}
                                        <input
                                          type="file"
                                          name={`lessons[${index}][homework]`}
                                          hidden
                                          onChange={(e) =>
                                            setFieldValue(
                                              `lessons.${index}.homework`,
                                              e.target.files?.[0]?.name || ""
                                            )
                                          }
                                        />
                                      </Button>
                                    </Box>
                                  </Box>
                                </CardContent>
                              </Card>
                            )
                          )}
                        </motion.div>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            position: "relative",
                            bottom: "-20px",
                          }}
                        >
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() =>
                              arrayHelpers.push({
                                title: "",
                                goal: "",
                                video: "",
                                materials: "",
                                homework: "",
                              })
                            }
                          >
                            Add Lesson
                          </Button>
                        </Box>
                      </>
                    )}
                  />
                </Grid>
              </Grid>
            </Box>
          </Form>
        )}
      </Formik>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "90%",
              maxWidth: 500,
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
            }}
          >
            <Cropper
              src={thumbnail}
              style={{ height: 400, width: "100%" }}
              aspectRatio={16 / 9}
              guides={false}
              ref={cropperRef}
            />
            <Box display="flex" justifyContent="space-between" mt={2}>
              <Button onClick={() => setOpen(false)}>Cancel</Button>
              <Button
                variant="contained"
                onClick={handleCrop}
                sx={{
                  backgroundColor: "#1976d2",
                  color: "#fff",
                  "&:hover": { backgroundColor: "#0d47a1" },
                }}
              >
                Crop & Save
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default EditCourse;
