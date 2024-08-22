import React, { useState } from 'react';
import { Card, CardContent, TextField, Button, Typography, Box, MenuItem, Select, InputLabel, FormControl, Grid } from '@mui/material';
import { Upload } from '@mui/icons-material';

const AddCourses: React.FC = () => {
  const [lessons, setLessons] = useState<number>(1);
  
  // Track filenames separately for video, materials, and homework for each lesson
  const [fileNames, setFileNames] = useState<{ video: string[], materials: string[], homework: string[] }>({
    video: Array(lessons).fill(''),
    materials: Array(lessons).fill(''),
    homework: Array(lessons).fill('')
  });

  const addLesson = () => {
    setLessons(lessons + 1);
    setFileNames({
      video: [...fileNames.video, ''],
      materials: [...fileNames.materials, ''],
      homework: [...fileNames.homework, '']
    });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, index: number, type: 'video' | 'materials' | 'homework') => {
    const fileName = event.target.files?.[0]?.name || '';
    const updatedFileNames = { ...fileNames };
    updatedFileNames[type][index] = fileName;
    setFileNames(updatedFileNames);
  };

  return (
    <>
      <h1>Add Course</h1>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Box component="form" noValidate autoComplete="off">
            <TextField
              label="Title"
              type="text"
              id="title"
              fullWidth
              sx={{ mb: 2, mt: 4 }}
            />
            <TextField
              label="Description"
              variant="outlined"
              multiline
              rows={4}
              fullWidth
              sx={{ mb: 2 }}
            />
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Category</InputLabel>
              <Select
                label="Category"
                defaultValue=""
              >
                <MenuItem value="programming">Programming</MenuItem>
                <MenuItem value="design">Design</MenuItem>
                <MenuItem value="marketing">Marketing</MenuItem>
                {/* Add more categories as needed */}
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Level</InputLabel>
              <Select
                label="Level"
                defaultValue=""
              >
                <MenuItem value="beginner">Beginner</MenuItem>
                <MenuItem value="intermediate">Intermediate</MenuItem>
                <MenuItem value="advanced">Advanced</MenuItem>
                {/* Add more levels as needed */}
              </Select>
            </FormControl>
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle1">Upload Thumbnail</Typography>
              <Button
                variant="contained"
                component="label"
                startIcon={<Upload />}
              >
                Upload Thumbnail
                <input
                  type="file"
                  hidden
                />
              </Button>
            </Box>
            <TextField
              label="Price"
              variant="outlined"
              type="number"
              fullWidth
              sx={{ mb: 2 }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={6} sx={{ overflowY: 'auto', maxHeight: 'calc(100vh - 200px)' }}>
          {Array.from({ length: lessons }).map((_, index) => (
            <Card key={index} sx={{ maxWidth: 400, margin: 'auto', padding: 1, mb: 2, backgroundColor: '#f5f5f5' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Add Lesson {index + 1}
                </Typography>
                <Box component="form" noValidate autoComplete="off" sx={{ '& .MuiTextField-root': { mb: 2 } }}>
                  <TextField
                    label="Title"
                    variant="outlined"
                    fullWidth
                    size="small"
                  />
                  <TextField
                    label="Goal"
                    variant="outlined"
                    fullWidth
                    size="small"
                  />
                  <Box sx={{ mb: 1 }}>
                    <Typography variant="subtitle1">Upload Video</Typography>
                    <Button
                      variant="contained"
                      component="label"
                      startIcon={<Upload />}
                    >
                      {fileNames.video[index] || 'Upload Video'}
                      <input
                        type="file"
                        hidden
                        onChange={(e) => handleFileChange(e, index, 'video')}
                      />
                    </Button>
                  </Box>
                  <Box sx={{ mb: 1 }}>
                    <Typography variant="subtitle1">Upload Materials</Typography>
                    <Button
                      variant="contained"
                      component="label"
                      startIcon={<Upload />}
                    >
                      {fileNames.materials[index] || 'Upload Materials'}
                      <input
                        type="file"
                        hidden
                        onChange={(e) => handleFileChange(e, index, 'materials')}
                      />
                    </Button>
                  </Box>
                  <Box sx={{ mb: 1 }}>
                    <Typography variant="subtitle1">Upload Homework</Typography>
                    <Button
                      variant="contained"
                      component="label"
                      startIcon={<Upload />}
                    >
                      {fileNames.homework[index] || 'Upload Homework'}
                      <input
                        type="file"
                        hidden
                        onChange={(e) => handleFileChange(e, index, 'homework')}
                      />
                    </Button>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ))}
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={addLesson}
          >
            Add More Lessons
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default AddCourses;
