package com.expenseapp.controller;

import com.expenseapp.model.Expense;
import com.expenseapp.model.User;
import com.expenseapp.repository.ExpenseRepository;
import com.expenseapp.repository.UserRepository;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@Data
@RestController
@RequestMapping("/api/expenses")
public class ExpenseController {

    @Autowired
    private ExpenseRepository expenseRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/")
    public List<Expense> getExpenses(){

        return expenseRepository.findAll();
    }

    @PostMapping("/")
    public ResponseEntity<Expense> createExpense(@Valid @RequestBody Expense expense) throws URISyntaxException {
        User user=userRepository.findByUsername(expense.getUser().getUsername());
        expense.setUser(user);
        Expense result=expenseRepository.save(expense);
        return ResponseEntity.created(new URI("/api/expenses/"+result.getId())).body(result);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteExpense(@PathVariable("id") long id){
        expenseRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{username}")
    public ResponseEntity<?> expenseByUsername(@PathVariable("username") String username){
        User user=userRepository.findByUsername(username);
        List<Expense> expenses=expenseRepository.findByUserId(user.getId());

        return ResponseEntity.ok(expenses);
    }
}
