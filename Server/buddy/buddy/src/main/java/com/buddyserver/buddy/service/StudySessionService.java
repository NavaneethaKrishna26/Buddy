package com.buddyserver.buddy.service;

import com.buddyserver.buddy.model.StudySession;
import com.buddyserver.buddy.repo.StudySessionRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class StudySessionService {

    private final StudySessionRepository repository;

    public StudySessionService(StudySessionRepository repository) {
        this.repository = repository;
    }

    public StudySession saveSession(Long durationSeconds) {
        StudySession session = new StudySession(durationSeconds, LocalDateTime.now());
        return repository.save(session);
    }

    public List<StudySession> getAllSessions() {
        return repository.findAll();
    }
}
