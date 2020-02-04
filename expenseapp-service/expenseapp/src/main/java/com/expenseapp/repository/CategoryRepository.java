package com.expenseapp.repository;

import com.expenseapp.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CategoryRepository extends JpaRepository<Category,Long> {
    Category findByName(String name);

    @Query(value = "SELECT * FROM CATEGORY WHERE USER_ID=:userid"
            ,nativeQuery = true)
    List<Category> findByUserId(@Param("userid") Long userId);
}
