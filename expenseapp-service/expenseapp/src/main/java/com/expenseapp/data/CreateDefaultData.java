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
                "anil.kumar@gmail.com",bCryptPasswordEncoder.encode("Welcome@123"),"8012345002");
        User user2=new User("rupesh.verma@gmail.com","Rupesh","Verma",
                "rupesh.verma@gmail.com",bCryptPasswordEncoder.encode("Welcome@123"),"9912387221");
        User user3=new User("anjali.kushwaha@gmail.com","Anjali","Kushwaha",
                "anjali.kushwaha@gmail.com",bCryptPasswordEncoder.encode("Welcome@123"),"7234512345");

        userRepository.save(user1);
        userRepository.save(user2);
        userRepository.save(user3);

        Category category1=new Category("Travel",user3);
        Category category2=new Category("Grocery",user3);
        Category category3=new Category("Apparel",user3);

        Category category4=new Category("Travel",user1);
        Category category5=new Category("Grocery",user1);

        Category category6=new Category("Apparel",user2);
        Category category7=new Category("Travel",user2);

        categoryRepository.save(category1);
        categoryRepository.save(category2);
        categoryRepository.save(category3);
        categoryRepository.save(category4);
        categoryRepository.save(category5);
        categoryRepository.save(category6);
        categoryRepository.save(category7);

        Instant date=Instant.now();
        Expense expense1=new Expense(date,"Goa Trip","Goa",category4,user1);
        Expense expense2=new Expense(date,"Grocery","Bangalore",category5,user1);

        expenseRepository.save(expense1);
        expenseRepository.save(expense2);

        Expense expense3=new Expense(date,"Mysore Trip","Mysore",category6,user2);
        Expense expense4=new Expense(date,"Jeans","Bangalore",category7,user2);

        expenseRepository.save(expense3);
        expenseRepository.save(expense4);

        Expense expense5=new Expense(date,"Agra Trip","Agra",category1,user3);
        Expense expense6=new Expense(date,"Grocery","Bangalore",category2,user3);
        Expense expense7=new Expense(date,"Sweater","Bangalore",category3,user3);

        expenseRepository.save(expense5);
        expenseRepository.save(expense6);
        expenseRepository.save(expense7);
    }
}
