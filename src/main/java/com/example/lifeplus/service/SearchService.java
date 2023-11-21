package com.example.lifeplus.service;

import com.example.lifeplus.dto.SearchDTO;
import jakarta.annotation.PostConstruct;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;


@Service
public class SearchService {

    //private static String SEARCH_URL ="https://keyzard.org/realtimekeyword";
    private static String SEARCH_URL = "https://www.donga.com/news/Entertainment/List?ymd=20231114&m=";

    @PostConstruct
    public ResponseEntity<?> getNewList() throws IOException {
        List<SearchDTO> newList = new ArrayList<>();

        Document document = Jsoup.connect(SEARCH_URL)
                .userAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3")
                .get();
        Elements contents = document.select(".articleList");

        for (Element content : contents) {
            SearchDTO news = SearchDTO.builder()
                    .title(content.select(".rightList > .tit > a").text())
                    .url(content.select(".rightList > .tit > a").attr("abs:href"))
                    .build();

            newList.add(news);
        }
        if (newList != null && !newList.isEmpty()) {
            return new ResponseEntity<>(newList, HttpStatus.OK);
        } else {
            // 리스트 조회 실패
            return new ResponseEntity<>("찾을수없음", HttpStatus.NOT_FOUND);
        }

    }


}
