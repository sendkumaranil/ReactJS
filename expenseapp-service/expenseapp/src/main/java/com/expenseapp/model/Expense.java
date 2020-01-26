package com.expenseapp.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.Instant;


@Data
@Entity
@Table(name = "expense")
public class Expense {

    @Id
    @GeneratedValue
    private long id;

    private Instant expensedate;

    private String description;

    private String location;

    @ManyToOne
    private Category category;

    @ManyToOne
    private User user;

    public Expense(){

    }

    public Expense(Instant expensedate, String description, String location, Category category, User user) {
        this.expensedate = expensedate;
        this.description = description;
        this.location = location;
        this.category = category;
        this.user = user;
    }

    public long getId() {
        return this.id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Instant getExpensedate() {
        return expensedate;
    }

    public void setExpensedate(Instant expensedate) {
        this.expensedate = expensedate;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public User getUser() {
        user.setPassword(null);
        return user;
    }

    public void setUser(User user) {
        user.setPassword(null);
        this.user = user;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;

        if (o == null || getClass() != o.getClass()) return false;

        Expense expense = (Expense) o;

        return new org.apache.commons.lang.builder.EqualsBuilder()
                .append(id, expense.id)
                .append(expensedate, expense.expensedate)
                .append(description, expense.description)
                .append(location, expense.location)
                .append(category, expense.category)
                .append(user, expense.user)
                .isEquals();
    }

    @Override
    public int hashCode() {
        return new org.apache.commons.lang.builder.HashCodeBuilder(17, 37)
                .append(id)
                .append(expensedate)
                .append(description)
                .append(location)
                .append(category)
                .append(user)
                .toHashCode();
    }

    @Override
    public String toString() {
        return "Expense{" +
                "id=" + id +
                ", expensedate=" + expensedate +
                ", description='" + description + '\'' +
                ", location='" + location + '\'' +
                ", category=" + category +
                ", user=" + user +
                '}';
    }
}
