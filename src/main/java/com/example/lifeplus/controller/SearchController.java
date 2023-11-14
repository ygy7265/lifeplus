package com.example.lifeplus.controller;

import com.example.lifeplus.dto.NewsDTO;
import com.example.lifeplus.dto.SearchDTO;
import com.example.lifeplus.service.NewsService;
import com.example.lifeplus.service.SearchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class SearchController {

    @Autowired
    private SearchService searchService;

    @GetMapping("/search")
    public List<SearchDTO> news() throws Exception{

       List<SearchDTO> searchdto = searchService.getNewList();

        return  searchdto;
    }
}
