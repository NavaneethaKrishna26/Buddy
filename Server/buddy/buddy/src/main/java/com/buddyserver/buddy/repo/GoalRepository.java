package com.buddyserver.buddy.repo;

import com.buddyserver.buddy.model.Goal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GoalRepository extends JpaRepository<Goal, Long> {
    // No extra methods needed now
}
