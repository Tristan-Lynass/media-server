package org.tristan.mediaserver.controller;

import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RepositoryRestController
@RequestMapping("/api")
public class AuthenticationController {

  @GetMapping("/xsrf")
  public void xsrf() {
    // Dummy endpoint to initialise a CSRF token, the actual work is done by the CsrfFilter
  }
}
