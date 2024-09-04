package com.tm.task_submission_service;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@EnableFeignClients
@ComponentScan(basePackages = "com.tm.task_submission_service")
public class TaskSubmissionServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(TaskSubmissionServiceApplication.class, args);
	}

}
