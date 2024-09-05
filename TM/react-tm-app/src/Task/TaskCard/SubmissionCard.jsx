import React from 'react';
import { Button, IconButton } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from 'react-redux';
import { acceptDeclineSubmissions } from '../../ReduxToolkit/SubmissionSlice';

export const SubmissionCard = ({item}) => {
    const dispatch=useDispatch();

    const handleAcceptDecline = (status) => {
        dispatch(acceptDeclineSubmissions({id:item.id,status}))
        console.log(status);
    };

    // Replace `true` with your actual condition if necessary
   
    return (
        <div className='rounded-md bg-black p-5 flex items-center justify-between'>
            <div className="space-y-2">
                <div className="flex items-center gap-2">
                    <span>Github:</span>
                    <div className="flex items-center gap-2 text-[#c24dd0]">
                        <OpenInNewIcon />
                        <a href={item.gitHubUrl} target="_blank" rel="noopener noreferrer">Go To Link</a>
                    </div>
                </div>
                <div className="flex items-center gap-2 text-xs">
                    <p>Submission Time:</p>
                    <p className='text-gray-400'>{item.submissionTime}</p>
                </div>
            </div>
            <div>
                {item.status==="PENDING" ? (
                    <div className='flex gap-5'>
                        <IconButton color='success' onClick={() => handleAcceptDecline("ACCEPTED")}>
                            <CheckIcon className='text-green-500' />
                        </IconButton>
                        <IconButton color='error' onClick={() => handleAcceptDecline("DECLINED")}>
                            <CloseIcon className='text-red-500' />
                        </IconButton>
                    </div>
                ) : (
                    <Button color={item.status==="ACCEPTED"? "success":"error"} size="small" variant="outlined">
                       {item.status} 
                    </Button>
                )}
            </div>
        </div>
    );
};
