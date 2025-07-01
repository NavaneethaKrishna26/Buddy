package com.buddyserver.buddy.controller;

import com.buddyserver.buddy.model.User;
import com.buddyserver.buddy.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body("Email is already registered");
        }

        // Save user as-is without password encoding
        userRepository.save(user);
        return ResponseEntity.ok("User registered successfully");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User loginData) {
        Optional<User> userOpt = userRepository.findByEmail(loginData.getEmail());
        if (userOpt.isPresent()) {
            User user = userOpt.get();

            // Simple password check (plaintext)
            if (user.getPassword().equals(loginData.getPassword())) {
                return ResponseEntity.ok(user);
            }
        }
        return ResponseEntity.badRequest().body("Invalid credentials");
    }
}
