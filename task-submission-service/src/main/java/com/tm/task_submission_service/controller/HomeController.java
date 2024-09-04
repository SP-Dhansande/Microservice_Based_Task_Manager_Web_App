package com.tm.task_submission_service.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {
    // Home controller for Task Submission Service
    // Add welcome message, API documentation, etc. here.
    @GetMapping("/submission")
    public ResponseEntity<String> homeController(){
        return ResponseEntity.ok("Welcome to Task Submission Service");
    }
    
}
