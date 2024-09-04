package com.tm.task_submission_service.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tm.task_submission_service.modal.Submission;
import java.util.List;

@Repository
public interface SubmissionRepository extends JpaRepository<Submission,Long>{

    List<Submission> findByTaskId(Long taskId);


    
}
