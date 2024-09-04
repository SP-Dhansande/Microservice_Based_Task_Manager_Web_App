package com.tm.service;

import java.util.List;

import com.tm.modal.Task;
import com.tm.modal.TaskStatus;

public interface TaskService {
    Task createTask(Task task, String requesterRole) throws Exception;

    Task getTaskById(Long id) throws Exception;

    List<Task> getAllTask(TaskStatus status);

    Task updateTask(Long id, Task updateTask, Long userId) throws Exception;

    void deleteTask(Long id) throws Exception;

    Task assignTaskToUser(Long userId, Long taskId) throws Exception;

    List<Task> assignedUsersTask(Long userId, TaskStatus taskStatus);

    Task completeTask(Long taskId) throws Exception;

}
