package org.tristan.mediaserver.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.UUID;

@Entity
@Table(name = "user")
public class User {

    @Id
    @GeneratedValue()
    private final UUID id;

    @Column(nullable = false)
    private final String username;

    @Column(nullable = false)
    private final String password;

    @Column(nullable = false)
    private final boolean isAdmin;

    protected User() {
        id = null;
        username = null;
        password = null;
        isAdmin = false;
    }

    public User(String username, String password, Boolean isAdmin) {
        this.id = null;
        this.username = username;
        this.password = password;
        this.isAdmin = isAdmin;
    }

    public UUID getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    @JsonIgnore
    public String getPassword() {
        return password;
    }

    public boolean isAdmin() {
        return isAdmin;
    }
}
