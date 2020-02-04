package com.expenseapp.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;


@Data
@Entity
@Table(name = "category")
public class Category {

    @Id
    @GeneratedValue
    private long id;

    private String name;

    @ManyToOne
    private User user;

    public Category(){

    }

    public Category(String name,User user) {
        this.name = name;
        this.user=user;
    }

    public long getId() {
        return this.id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
