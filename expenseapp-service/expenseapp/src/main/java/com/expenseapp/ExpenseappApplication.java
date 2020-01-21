package com.expenseapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.aop.AopAutoConfiguration;

@SpringBootApplication(exclude= AopAutoConfiguration.class)
public class ExpenseappApplication {

	public static void main(String[] args) {
		SpringApplication.run(ExpenseappApplication.class, args);
	}

}
