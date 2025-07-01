package com.buddyserver.buddy.repo;

import com.buddyserver.buddy.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Long> {
}
