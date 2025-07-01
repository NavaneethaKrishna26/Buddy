package com.buddyserver.buddy.controller;

import com.buddyserver.buddy.model.Goal;
import com.buddyserver.buddy.service.GoalService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/goals")
@CrossOrigin(origins = "http://localhost:3000")  // React dev server origin
public class GoalController {

    private final GoalService goalService;

    public GoalController(GoalService goalService) {
        this.goalService = goalService;
    }

    @GetMapping
    public ResponseEntity<List<Goal>> getGoals() {
        return ResponseEntity.ok(goalService.getAllGoals());
    }

    @PostMapping
    public ResponseEntity<Goal> addGoal(@RequestBody Goal goal) {
        Goal savedGoal = goalService.saveGoal(goal);
        return ResponseEntity.ok(savedGoal);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGoal(@PathVariable Long id) {
        try {
            goalService.deleteGoal(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
}
