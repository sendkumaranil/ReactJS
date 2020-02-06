package com.expenseapp.controller;

import com.expenseapp.model.Category;
import com.expenseapp.model.User;
import com.expenseapp.repository.CategoryRepository;
import com.expenseapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/categories")
public class CategoryController {

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/")
    public List<Category> getAllCategories(){
        return categoryRepository.findAll();
    }

    /*@GetMapping("/{id}")
    public ResponseEntity<?> getCategoryById(@PathVariable("id") long id){
        Optional<Category> category=categoryRepository.findById(id);
        return category.map(response -> ResponseEntity.ok().body(response))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }*/

    @PostMapping("/")
    public ResponseEntity<Category> createCategory(@Valid @RequestBody Category category) throws URISyntaxException {
        User user=userRepository.findByUsername(category.getUser().getUsername());
        category.setUser(user);
        Category result=categoryRepository.save(category);
        return ResponseEntity.created(new URI("/api/categories/"+result.getId())).body(result);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Category> updateCategory(@Valid @RequestBody Category category){
        Category result=categoryRepository.save(category);
        return ResponseEntity.ok().body(result);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCategory(@PathVariable("id") long id){
        categoryRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{username}")
    public ResponseEntity<?> categoryByUsername(@PathVariable("username") String username){
        User user= userRepository.findByUsername(username);

        List<Category> categories=categoryRepository.findByUserId(user.getId());
        return ResponseEntity.ok(categories);
    }
}
