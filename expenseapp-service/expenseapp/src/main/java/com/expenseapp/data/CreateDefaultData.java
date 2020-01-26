package com.expenseapp.data;

import com.expenseapp.model.Category;
import com.expenseapp.model.Expense;
import com.expenseapp.model.User;
import com.expenseapp.repository.CategoryRepository;
import com.expenseapp.repository.ExpenseRepository;
import com.expenseapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.time.Instant;

@Service
public class CreateDefaultData {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ExpenseRepository expenseRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @PostConstruct
    public void createDefaultUsers(){
        User user1=new User("anil.kumar@gmail.com","Anil","Kumar",
                "anil.kumar@gmail.com",bCryptPasswordEncoder.encode("anilkumar"));
        User user2=new User("rupesh.verma@gmail.com","Rupesh","Verma",
                "rupesh.verma@gmail.com",bCryptPasswordEncoder.encode("rupeshverma"));
        User user3=new User("anjali.kushwaha@gmail.com","Anjali","Kushwaha",
                "anjali.kushwaha@gmail.com",bCryptPasswordEncoder.encode("anjalikushwaha"));

        userRepository.save(user1);
        userRepository.save(user2);
        userRepository.save(user3);

        Category category1=new Category("Travel");
        Category category2=new Category("Grocery");
        Category category3=new Category("Apparel");

        categoryRepository.save(category1);
        categoryRepository.save(category2);
        categoryRepository.save(category3);

        Instant date=Instant.now();
        Expense expense1=new Expense(date,"Goa Trip","Goa",category1,user1);
        Expense expense2=new Expense(date,"Grocery","Bangalore",category2,user1);

        expenseRepository.save(expense1);
        expenseRepository.save(expense2);
    }
}
