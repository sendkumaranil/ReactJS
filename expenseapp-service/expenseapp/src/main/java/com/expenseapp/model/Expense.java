package com.expenseapp.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.Instant;

@NoArgsConstructor
@Data
@Entity
@Table(name = "expense")
public class Expense {

    @Id
    private long id;

    private Instant expensedate;

    private String description;

    private String location;

    @ManyToOne
    private Category category;

    @ManyToOne
    private User user;

    public long getId() {
        return this.id;
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
