package com.example.lifeplus.service;

import com.example.lifeplus.dto.NewsDTO;
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
public class NewsService {

    private static String News_URL = "https://www.donga.com/news/List";

    @PostConstruct
    public ResponseEntity<?> getNewList() throws IOException {
        List<NewsDTO> newList = new ArrayList<>();

        Document document = Jsoup.connect(News_URL)
                .userAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36")
                .get();

        Elements contents = document.select(".articleList ");
        List<Element> contentss = new ArrayList<>();
        int limit = 10; // 원하는 요소 개수
        if (contents.size() > limit) {
            contentss = contents.subList(0, limit); // 처음 10개의 요소만 선택
        }
        for (Element content : contentss) {
            NewsDTO news = NewsDTO.builder()
                    .image(content.select("a img").attr("abs:src"))
                    .title(content.select(".tit a").text())
                    .content(content.select(".txt a").text())
                    .url(content.select("a").attr("abs:href"))
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
