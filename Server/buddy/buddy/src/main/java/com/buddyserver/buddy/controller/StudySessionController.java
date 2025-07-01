package com.buddyserver.buddy.controller;

import com.buddyserver.buddy.model.StudySession;
import com.buddyserver.buddy.service.StudySessionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sessions")
@CrossOrigin(origins = "http://localhost:3000")
public class StudySessionController {

    private final StudySessionService service;

    public StudySessionController(StudySessionService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<StudySession> saveSession(@RequestBody SessionRequest request) {
        StudySession session = service.saveSession(request.getDurationSeconds());
        return ResponseEntity.ok(session);
    }

    @GetMapping
    public ResponseEntity<List<StudySession>> getAllSessions() {
        return ResponseEntity.ok(service.getAllSessions());
    }

    // DTO class for request payload
    public static class SessionRequest {
        private Long durationSeconds;

        public Long getDurationSeconds() {
            return durationSeconds;
        }

        public void setDurationSeconds(Long durationSeconds) {
            this.durationSeconds = durationSeconds;
        }
    }
}
