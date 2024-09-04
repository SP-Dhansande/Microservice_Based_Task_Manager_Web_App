package com.tm.task_submission_service.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tm.task_submission_service.modal.Submission;
import com.tm.task_submission_service.modal.TaskDto;
import com.tm.task_submission_service.repository.SubmissionRepository;
@Service
public class SubmissionServiceImpl implements SubmissionService {

    @Autowired
    private SubmissionRepository submissionRepository;

    @Autowired
    private TaskService taskService;

    @Override
    public Submission submitTask(Long taskId, String gitHubUrl, Long userId,String jwt) throws Exception {
        // check if task exists
        TaskDto task=taskService.getTaskById(taskId, jwt);
        if (task!=null) {
            Submission submission=new Submission();
            submission.setTaskId(taskId);
            submission.setUserId(userId);
            submission.setGitHubUrl(gitHubUrl);
            submission.setSubmissionTime(LocalDateTime.now());
            return submissionRepository.save(submission);
 
        }
        throw new Exception("Task not found");
        
    }

    @Override
    public Submission getSubmissionById(Long submissionId) throws Exception {
        return submissionRepository.findById(submissionId).orElseThrow(()->
        new Exception("task submission not found with id"+submissionId));

    }

    @Override
    public List<Submission> getAllTaskSubmissions() {
        return submissionRepository.findAll();

    }

    @Override
    public List<Submission> getTaskSubmissionByTaskId(Long taskId) {
        return submissionRepository.findByTaskId(taskId);

    }

    @Override
    public Submission acceptDeclineSubmission(Long id, String status) throws Exception {
        List<Submission> submissions = getTaskSubmissionByTaskId(id);
        if (submissions.isEmpty()) {
            throw new Exception("No submissions found with id: " + id);
        }
        Submission submission = submissions.get(0); // Or handle the appropriate submission if there are multiple
        submission.setStatus(status);
        if (status.equals("ACCEPT")) {
            taskService.completeTask(submission.getTaskId());
        }
        return submissionRepository.save(submission);
    }
    

}
