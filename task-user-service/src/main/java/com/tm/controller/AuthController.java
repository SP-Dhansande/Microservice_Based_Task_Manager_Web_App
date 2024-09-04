package com.tm.controller;
import com.tm.service.CoustomUserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tm.config.JwtProvider;
import com.tm.modal.User;
import com.tm.repositories.UserRepository;
import com.tm.request.LoginRequest;
import com.tm.response.AuthResponse;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private CoustomUserServiceImpl coustomUserServiceImpl;



    @PostMapping("/signup")
    public ResponseEntity <AuthResponse> createUserHandler(@RequestBody User user)throws Exception {
       String email=user.getEmail();
       String password=user.getPassword();
       String username=user.getUsername();
       String role=user.getRole();
       User isEmailExist=userRepository.findByEmail(email);
       if (isEmailExist!=null){
        throw new Exception("Email is already used with another account");
       }
       User createdUser=new User();
       createdUser.setEmail(email);
       createdUser.setPassword(passwordEncoder.encode(password));
       createdUser.setUsername(username);
       createdUser.setRole(role);
       System.out.println("Username to be saved: " + createdUser.getUsername());
       userRepository.save(createdUser);

       Authentication authentication = new UsernamePasswordAuthenticationToken(email, password);
       SecurityContextHolder.getContext().setAuthentication(authentication);
       String token=JwtProvider.generateToken(authentication);
       AuthResponse authResponse=new AuthResponse();
       authResponse.setJwt(token);//setting token
       authResponse.setMessage("Register Success");
       authResponse.setStatus(true);
       return new  ResponseEntity <>(authResponse,HttpStatus.OK);
}

@PostMapping("/signin")
public ResponseEntity<AuthResponse> signIn(@RequestBody LoginRequest loginRequest) {
      String userName =loginRequest.getEmail();
      String password=loginRequest.getPassword();
      System.out.println(userName +"..............."+password);
      
      Authentication authentication=authenticate(userName,password);
      SecurityContextHolder.getContext().setAuthentication(authentication);
      String token=JwtProvider.generateToken(authentication);
      AuthResponse authResponse=new AuthResponse();
      authResponse.setJwt(token);
      authResponse.setMessage("Login Success");

      authResponse.setStatus(true);
      return new ResponseEntity<>(authResponse, HttpStatus.OK);

}

private Authentication authenticate(String userName, String password) {
      UserDetails userDetails =  coustomUserServiceImpl.loadUserByUsername(userName);
      System.out.println("sign in userdetails-"+userDetails);
      if (userDetails == null) {
            System.out.println("signin user details is null"+userDetails);
            throw new BadCredentialsException("Invalid user name or password");
      }
      if (!passwordEncoder.matches(password, userDetails.getPassword())) {
            System.out.println("signin user details password is not match"+userDetails);
            throw new BadCredentialsException("Invalid user name or password");
      }
      return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());     
      

    
}
}