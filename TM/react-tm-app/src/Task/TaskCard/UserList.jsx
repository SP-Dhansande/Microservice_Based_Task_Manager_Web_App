import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Avatar, ListItem, ListItemAvatar, ListItemText, Button, Divider } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getUserList } from '../../ReduxToolkit/AuthSlice'; 
import { assignedTaskToUser } from '../../ReduxToolkit/TaskSlice';
import { useLocation } from 'react-router-dom';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  outline: 'none',
  boxShadow: 24,
  p: 2,
};

export default function UserList({ open, handleClose }) {
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);
  const location = useLocation();
  const queryParam = new URLSearchParams(location.search);
  const taskId = queryParam.get('taskId');

  useEffect(() => {
    // Fetch user list with the stored JWT token
    dispatch(getUserList(localStorage.getItem('jwt')));
  }, [dispatch]);

  const handleAssignedTask = (user) => {
    dispatch(assignedTaskToUser({ userId: user.id, taskId }));
    handleClose(); // Close modal after assigning
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {auth?.users?.map((user, index) => (
          <React.Fragment key={index}>
            <div className="flex items-center justify-between w-full mb-3">
              <ListItem>
                <ListItemAvatar>
                  <Avatar src='https://cdn.pixabay.com/photo/2024/05/24/18/14/astronaut-8785566_640.png' />
                </ListItemAvatar>
                <ListItemText 
                  primary={user.username} 
                  secondary={`@${user.username.split(" ").join("_").toLowerCase()}`} 
                />
              </ListItem>
              <Button onClick={() => handleAssignedTask(user)} className="customButton">
                Select
              </Button>
            </div>
            {index !== auth.users.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </Box>
    </Modal>
  );
}
