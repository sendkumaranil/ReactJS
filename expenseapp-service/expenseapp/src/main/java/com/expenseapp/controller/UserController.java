package com.expenseapp.controller;

import com.expenseapp.model.ApiResponse;
import com.expenseapp.model.User;
import com.expenseapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

@CrossOrigin(value="http://localhost:3000")
@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @PostMapping("/register-user")
    public ResponseEntity<?> createUser(@RequestBody User user){
        ApiResponse response=new ApiResponse();
        if(isUsernameExists(user.getUsername().trim())){
            response.setResponseCode(HttpStatus.CONFLICT);
            response.setMessage("username already exits");
            response.setMessageCode("USER_AVAILABLE");
            response.setMessageId("409");

            return ResponseEntity.ok(response);
        }
        if(isEmailExits(user.getEmail())){
            response.setResponseCode(HttpStatus.CONFLICT);
            response.setMessage("email already exits");
            response.setMessageCode("EMAIL_AVAILABLE");
            response.setMessageId("409");

            return ResponseEntity.ok(response);
        }
        if(isMobileExists(user.getMobilenumber())){
            response.setResponseCode(HttpStatus.CONFLICT);
            response.setMessage("mobile number already exits");
            response.setMessageCode("MOBILE_AVAILABLE");
            response.setMessageId("409");

            return ResponseEntity.ok(response);
        }

        String encodePassword=bCryptPasswordEncoder.encode(user.getPassword());
        user.setPassword(encodePassword);
        userRepository.save(user);

        response.setResponseCode(HttpStatus.CREATED);
        response.setMessage("username created successfully");
        response.setMessageCode("USER_CREATED");
        response.setMessageId("201");

        return ResponseEntity.ok(response);
    }

    private boolean isUsernameExists(String username){
        User user = userRepository.findByUsername(username);
        if(user != null) return true;
        return false;
    }
    private boolean isEmailExits(String email){
        List<User> users=userRepository.findAll();

        Optional<User> user=users.stream().filter(u -> u.getEmail().equals(email))
                                .findFirst();

        return user.isPresent() ? true : false;
    }

    private boolean isMobileExists(String mobile){
        List<User> users=userRepository.findAll();
        Optional<User> user=users.stream().filter(u -> u.getMobilenumber().equals(mobile))
                .findFirst();

        return (user.isPresent() ? true : false);
    }
}
