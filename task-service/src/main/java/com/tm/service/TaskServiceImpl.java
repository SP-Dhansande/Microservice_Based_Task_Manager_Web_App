package com.tm.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tm.modal.Task;
import com.tm.modal.TaskStatus;
import com.tm.repository.TaskRepository;

@Service
public class TaskServiceImpl implements TaskService {
    @Autowired
    private TaskRepository taskRepository;

    @Override
    public Task createTask(Task task, String requesterRole) throws Exception {
        if (!requesterRole.equals(("ROLE_ADMIN"))) {
            throw new Exception("only admin can create task");
        }
        task.setStatus(TaskStatus.PENDING);
        task.setCreatedAt(LocalDateTime.now());
        return taskRepository.save(task);
    }

    @Override
    public Task getTaskById(Long id) throws Exception {
            return taskRepository.findById(id).orElseThrow(() -> new Exception("task not found with id " + id));
    }

    @Override
    public List<Task> getAllTask(TaskStatus status) {
            List<Task> allTasks=taskRepository.findAll();
            List<Task>filteredTasks= allTasks.stream().filter(task -> status==null||task.getStatus().name().equalsIgnoreCase(status.toString())).collect(Collectors.toList());
            return filteredTasks;
           
    }

    @Override
    public Task updateTask(Long id, Task updateTask, Long userId) throws Exception {
              Task existingTask=getTaskById(id);
             if(updateTask.getTitle()!=null){
                existingTask.setTitle(updateTask.getTitle());
             }
             if(updateTask.getDescription()!=null){
                existingTask.setDescription(updateTask.getDescription());
             }
             if(updateTask.getStatus()!=null){
                existingTask.setStatus(updateTask.getStatus());
             }
             if (updateTask.getImage()!=null) {
                existingTask.setImage(updateTask.getImage());
                
             }
             if (updateTask.getDeadLine()!=null) {
                existingTask.setDeadLine(updateTask.getDeadLine());
                
             }
             //existingTask.setUpdatedAt(LocalDateTime.now());
             return taskRepository.save(existingTask);

    }

    @Override
    public void deleteTask(Long id) throws Exception {
            getTaskById(id);
            taskRepository.deleteById(id);
    }

    @Override
    public Task assignTaskToUser(Long userId, Long taskId) throws Exception {
                 Task task=getTaskById(taskId);
                 task.setAssignedUserId(userId);
                task.setStatus(TaskStatus.ASSIGNED);
                 return taskRepository.save(task);
    }

    @Override
    public List<Task> assignedUsersTask(Long userId, TaskStatus taskStatus) {
            List<Task> allTask=taskRepository.findByAssignedUserId(userId);
            List<Task> filteredTasks= allTask.stream().filter(task -> taskStatus==null||task.getStatus().name().equalsIgnoreCase(taskStatus.toString())).collect(Collectors.toList());
            return filteredTasks;

           

    }
    @Override
    public Task completeTask(Long taskId) throws Exception {
            Task task=getTaskById(taskId);
             task.setStatus(TaskStatus.DONE);
             return taskRepository.save(task);


    }

}
