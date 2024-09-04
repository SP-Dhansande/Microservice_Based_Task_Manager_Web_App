package com.tm.service;

import java.util.List;



import com.tm.modal.User;

public interface UserService {
    
    public User getUserProfile(String jwt);
    public List<User> getAllUsers();
}
