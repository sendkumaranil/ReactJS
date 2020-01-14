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

    @JsonIgnore
    @ManyToOne
    private User user;

    public long getId() {
        return this.id;
    }
}
