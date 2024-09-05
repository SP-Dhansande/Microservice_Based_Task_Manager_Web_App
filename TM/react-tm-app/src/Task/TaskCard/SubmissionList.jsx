import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { SubmissionCard } from './SubmissionCard';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchSubmissionsByTaskId } from '../../ReduxToolkit/SubmissionSlice';
import { useLocation } from 'react-router-dom';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const submissions = [1, 2, 3]; // Example array with unique items

export default function SubmissionList({ open, handleClose }) {
  const dispatch = useDispatch();
  const location = useLocation();
  const queryParam = new URLSearchParams(location.search);
  const taskId = queryParam.get("taskId");
  const {submission}=useSelector(store=>store);
  useEffect(() => {
    if(taskId){
      dispatch(fetchSubmissionsByTaskId(taskId))
    }
    
  }, [taskId])
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>
            {submission.submissions.length > 0 ? (
              <div>
                {submission.submissions.map((item, index) => (
                  <SubmissionCard item={item} /> // Add a key prop to each component
                ))}
              </div>
            ) : (
              <div className="text-center">
                No submission found
              </div>
            )}
          </div>
        </Box>
      </Modal>
    </div>
  );
}
