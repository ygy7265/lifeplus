package com.example.lifeplus.controller;

import com.example.lifeplus.dto.NewsDTO;
import com.example.lifeplus.service.NewsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class NewsController {

    @Autowired
    private NewsService newsService;

    @GetMapping("/news")
    public ResponseEntity<?> news() throws Exception {
        ResponseEntity<?> newsdto = newsService.getNewList();

        return newsdto;
    }
}
