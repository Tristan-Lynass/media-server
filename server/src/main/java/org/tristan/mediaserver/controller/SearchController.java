package org.tristan.mediaserver.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.tristan.mediaserver.model.Media;
import org.tristan.mediaserver.model.Tag;
import org.tristan.mediaserver.repository.MediaRepository;

import javax.transaction.Transactional;
import java.util.Optional;
import java.util.Set;

@RestController
@Transactional
@RequestMapping("/media/search")
public class SearchController {

    @Autowired
    private MediaRepository mediaRepository;

    @GetMapping
    public Page<Media> get(Pageable pageable, @PathVariable Optional<Set<Tag>> tags) {
        var media = new Media(null, null, null, null, null, null, null, null, null, tags.orElse(null));
        var example = Example.of(media);

        return this.mediaRepository.findAll(example, pageable);
    }

}
