package com.expenseapp.repository;

import com.expenseapp.model.Expense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {

    @Query(value = "SELECT * FROM EXPENSE exp WHERE exp.USER_ID = :userid ",nativeQuery = true)
    List<Expense> findByUserId(@Param("userid") Long userId);
}
