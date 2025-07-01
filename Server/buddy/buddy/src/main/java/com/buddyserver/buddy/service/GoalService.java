package com.buddyserver.buddy.service;

import com.buddyserver.buddy.model.Goal;
import com.buddyserver.buddy.repo.GoalRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GoalService {

    private final GoalRepository goalRepository;

    public GoalService(GoalRepository goalRepository) {
        this.goalRepository = goalRepository;
    }

    public List<Goal> getAllGoals() {
        return goalRepository.findAll();
    }

    public Goal saveGoal(Goal goal) {
        return goalRepository.save(goal);
    }
    public void deleteGoal(Long id) {
        goalRepository.deleteById(id);
    }
}
