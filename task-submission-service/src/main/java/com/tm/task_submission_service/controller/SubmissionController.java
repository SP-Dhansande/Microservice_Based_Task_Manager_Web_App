package com.tm.task_submission_service.controller;

import java.util.List;


import com.tm.task_submission_service.service.SubmissionService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.tm.task_submission_service.modal.Submission;
import com.tm.task_submission_service.modal.UserDto;
import com.tm.task_submission_service.service.TaskService;
import com.tm.task_submission_service.service.UserService;

@RestController
@RequestMapping("/api/submissions")
public class SubmissionController {

    @Autowired
    private SubmissionService submissionService;
    
    @Autowired
    private UserService userService;
    
    @Autowired
    private TaskService taskService;

    @PostMapping
    public ResponseEntity<Submission> submitTask(
        @RequestParam Long taskId,
        @RequestParam String gitHubUrl,
        @RequestHeader ("Authorization") String jwt
        
    )throws Exception{
       UserDto user= userService.getUserProfile(jwt);
       Submission submission=submissionService.submitTask(taskId, gitHubUrl, user.getId(), jwt);
       return new ResponseEntity<>(submission,HttpStatus.CREATED);

    }

    @GetMapping("/{id}")
    public ResponseEntity<Submission> getSubmissionById(
        @PathVariable Long id,
        @RequestHeader ("Authorization") String jwt
       
    )throws Exception{
        UserDto user= userService.getUserProfile(jwt);
        Submission submission=(Submission) submissionService.getTaskSubmissionByTaskId(id);
        return new ResponseEntity<>(submission,HttpStatus.OK);
    }
    @GetMapping
    public ResponseEntity<List<Submission>> getAllSubmission(
        @RequestHeader ("Authorization") String jwt
      
    )throws Exception{
        UserDto user= userService.getUserProfile(jwt);
        List<Submission>submissions=(List<Submission>) submissionService.getAllTaskSubmissions();
        return new ResponseEntity<>(submissions,HttpStatus.OK);
    }
    @GetMapping("/task/{taskId}")
    public ResponseEntity<List<Submission>> getAllSubmission(
        @PathVariable Long taskId,
        @RequestHeader ("Authorization") String jwt
       
    )throws Exception{
        UserDto user= userService.getUserProfile(jwt);
        List<Submission>submissions=(List<Submission>) submissionService.getTaskSubmissionByTaskId(taskId);
        return new ResponseEntity<>(submissions,HttpStatus.OK);
    }
    @PutMapping("/{submissionId}")
    public ResponseEntity<Submission> acceptOrDeclineSubmission(
        @PathVariable Long submissionId,
        @RequestParam String status,
        @RequestHeader ("Authorization") String jwt
        
    )throws Exception{
        UserDto user= userService.getUserProfile(jwt);
        Submission submission=(Submission) submissionService.acceptDeclineSubmission(submissionId, status);
        return new ResponseEntity<>(submission,HttpStatus.OK);
    }
    
}
