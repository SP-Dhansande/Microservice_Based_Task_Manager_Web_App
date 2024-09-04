package com.tm.controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.tm.modal.Task;
import com.tm.modal.TaskStatus;
import com.tm.modal.UserDto;
import com.tm.service.TaskService;
import com.tm.service.UserService;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {
    
    @Autowired
    private TaskService taskService;
    @Autowired
    private UserService userService;

    // Create a new task
    @PostMapping
    public ResponseEntity<Task> createTask(@RequestBody Task task, @RequestHeader("Authorization") String jwt) throws Exception{
        
        UserDto user=userService.getUserProfile(jwt);
        Task createdTask=taskService.createTask(task, user.getRole());
        return new ResponseEntity<>(createdTask, HttpStatus.CREATED);
        
    }
    @GetMapping("/{id}")
    public ResponseEntity<Task> getTaskById( @PathVariable Long id ,@RequestHeader("Authorization") String jwt) throws Exception{
        
        UserDto user=userService.getUserProfile(jwt);
        Task task=taskService.getTaskById(id);
        return new ResponseEntity<>(task, HttpStatus.OK);
       
    }
    @GetMapping("/user")
    public ResponseEntity<List<Task>> getAssignedUserTask(@RequestParam(required=false) TaskStatus taskStatus,@RequestHeader("Authorization") String jwt) throws Exception{
        
        UserDto user=userService.getUserProfile(jwt);
        List<Task> tasks=taskService.assignedUsersTask(user.getId(),taskStatus);
        return new ResponseEntity<>(tasks, HttpStatus.OK);
       
    }
    @GetMapping
    public ResponseEntity<List<Task>> getAllTask(@RequestParam(required=false) TaskStatus taskStatus,@RequestHeader("Authorization") String jwt) throws Exception{
        
        UserDto user=userService.getUserProfile(jwt);
        List<Task> tasks=taskService.getAllTask(taskStatus);
        return new ResponseEntity<>(tasks, HttpStatus.OK);
       
    }
    @PutMapping("/{id}/user/{userId}/assigned")
    public ResponseEntity<Task> assignedTaskToUser(@PathVariable Long id, @PathVariable Long userId,@RequestHeader("Authorization") String jwt) throws Exception{
        
        UserDto user=userService.getUserProfile(jwt);
        //notice please
        Task tasks=taskService.assignTaskToUser(user.getId(), id);
        return new ResponseEntity<>(tasks, HttpStatus.OK);
       
    }
    @PutMapping("/{id}")
    public ResponseEntity<Task> updateTask(@PathVariable Long id, @RequestBody Task req,@RequestHeader("Authorization") String jwt) throws Exception{
        
        UserDto user=userService.getUserProfile(jwt);
        Task tasks=taskService.updateTask(id, req,user.getId());
        return new ResponseEntity<>(tasks, HttpStatus.OK);
       
    }
    @PutMapping("/{id}/complete")
    public ResponseEntity<Task> completeTask(@PathVariable Long id) throws Exception{
        Task tasks=taskService.completeTask(id);
        return new ResponseEntity<>(tasks, HttpStatus.OK);
       
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long id) throws Exception{
          taskService.deleteTask(id);;
        return new ResponseEntity<>( HttpStatus.NO_CONTENT);
       
    }


}
