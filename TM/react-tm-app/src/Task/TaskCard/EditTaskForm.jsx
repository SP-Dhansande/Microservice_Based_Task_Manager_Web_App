import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Autocomplete, Button, Grid, TextField } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchTasksById, updateTask } from '../../ReduxToolkit/TaskSlice';
import { useLocation } from 'react-router-dom';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const tags = ["Angular", "React", "Spring Boot"];

export default function EditTaskForm({ item, open, handleClose }) {
  const dispatch = useDispatch();
  const location = useLocation();
  const queryParam = new URLSearchParams(location.search);
  const taskId = queryParam.get("taskId");
  const { task } = useSelector(store => store);
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    description: "",
    tags: [],
    deadline: null,  // Set initial value to null to work with DateTimePicker
  });

  const [selectedTags, setSelectedTags] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleTagsChange = (event, value) => {
    setSelectedTags(value);
    setFormData({ ...formData, tags: value });
  };

  const handleDeadlineChange = (date) => {
    setFormData({ ...formData, deadline: date });
  };

  const formatDate = (input) => {
    let {
      $y: year,
      $M: month,
      $D: day,
      $H: hours,
      $m: minutes,
      $s: seconds,
      $ms: milliseconds,
    } = input;
    const date = new Date(year, month, day, hours, minutes, seconds, milliseconds);
    const formattedDate = date.toISOString();
    return formattedDate;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { deadline } = formData;
    const formattedDeadline = formatDate(deadline);
    const updatedFormData = { ...formData, deadline: formattedDeadline, tags: selectedTags };
    console.log("formData", updatedFormData, "deadline:", updatedFormData.deadline);
     dispatch(updateTask({id:taskId,updatedTaskData:formData}))
    handleClose();
  };

  useEffect(() => {
    dispatch(fetchTasksById(taskId))
  }, [taskId]);
  useEffect(() => {
   if(task.taskDetails)setFormData(task.taskDetails)
  }, [task.taskDetails]);
  


  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12}>
              <TextField
                label="Title"
                fullWidth
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Image URL"
                fullWidth
                name="image"
                value={formData.image}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description"
                fullWidth
                multiline
                rows={4}
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                multiple
                id="multiple-limit-tags"
                options={tags}
                value={selectedTags}
                onChange={handleTagsChange}
                getOptionLabel={(option) => option}
                renderInput={(params) => (
                  <TextField {...params} label="Tags" variant="outlined" />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  className="w-full"
                  label="Deadline"
                  value={formData.deadline}
                  onChange={handleDeadlineChange}
                  renderInput={(params) => (
                    <TextField {...params} variant="outlined" fullWidth />
                  )}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                className="customButton"
                sx={{ padding: ".9rem" }}
              >
                Update Task
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Modal>
  );
}
