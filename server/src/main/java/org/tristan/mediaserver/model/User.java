package org.tristan.mediaserver.model;

import javax.persistence.*;
import java.util.UUID;

@Entity
@Table(name = "media")
public class User {
public class Media {

    @Id
    @GeneratedValue()
    private final UUID id;

    @Column(nullable = false)
    private final String username;

    @Column(nullable = false)
    private final String password;

  }
