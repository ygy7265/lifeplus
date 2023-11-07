package com.example.lifeplus.service;

import com.example.lifeplus.dto.SearchDTO;
import jakarta.annotation.PostConstruct;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.junit.jupiter.api.Test;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class SearchServiceTest {

    @Test
    void getNewList() throws IOException{

        List<SearchDTO> newList = new ArrayList<>();

        Document document = Jsoup.connect("https://keyzard.org/realtimekeyword").get();

        Elements contents = document.select(".table tbody tr");

        for (Element content : contents) {
            SearchDTO news = SearchDTO.builder()
                    .title(content.select("td a").text())
                    .url(content.select("a").attr("abs:href"))
                    .build();

            newList.add(news);
        }
    }

}