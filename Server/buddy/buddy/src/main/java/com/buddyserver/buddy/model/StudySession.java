package com.buddyserver.buddy.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "study_sessions")
public class StudySession {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long durationSeconds;

    private LocalDateTime completedAt;

    public StudySession() {}

    public StudySession(Long durationSeconds, LocalDateTime completedAt) {
        this.durationSeconds = durationSeconds;
        this.completedAt = completedAt;
    }

    public Long getId() { return id; }

    public Long getDurationSeconds() { return durationSeconds; }
    public void setDurationSeconds(Long durationSeconds) { this.durationSeconds = durationSeconds; }

    public LocalDateTime getCompletedAt() { return completedAt; }
    public void setCompletedAt(LocalDateTime completedAt) { this.completedAt = completedAt; }
}
