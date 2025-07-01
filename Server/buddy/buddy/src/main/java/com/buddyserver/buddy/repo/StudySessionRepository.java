package com.buddyserver.buddy.repo;

import com.buddyserver.buddy.model.StudySession;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudySessionRepository extends JpaRepository<StudySession, Long> {
}
