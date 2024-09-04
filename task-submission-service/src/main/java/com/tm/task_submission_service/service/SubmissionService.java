package com.tm.task_submission_service.service;

import com.tm.task_submission_service.modal.Submission;
import java.util.List;



public interface SubmissionService {

    Submission submitTask(Long taskId, String gitHubUrl, Long userId,String jwt)throws Exception;

    Submission getSubmissionById(Long submissionId) throws Exception;

    List<Submission> getAllTaskSubmissions();

    List<Submission> getTaskSubmissionByTaskId(Long taskId);

    Submission acceptDeclineSubmission(Long id, String status) throws Exception;
    













    
}
