package com.buddyserver.buddy.repo;

import com.buddyserver.buddy.model.Note;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NoteRepository extends JpaRepository<Note, Long> {
    // no additional methods needed for basic CRUD
}
