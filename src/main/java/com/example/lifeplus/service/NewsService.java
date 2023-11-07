package com.example.lifeplus.service;

import com.example.lifeplus.dto.NewsDTO;
import jakarta.annotation.PostConstruct;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;


@Service
public class NewsService {

    private static String News_URL ="https://www.donga.com/news/List";
    
    @PostConstruct
    public List<NewsDTO> getNewList() throws IOException{
        List<NewsDTO> newList = new ArrayList<>();

        Document document = Jsoup.connect(News_URL).get();

        Elements contents = document.select(".articleList ");
        List<Element> contentss = new ArrayList<>();
        int limit = 10; // 원하는 요소 개수
        if (contents.size() > limit) {
            contentss = contents.subList(0, limit); // 처음 10개의 요소만 선택
        }
        for(Element content : contentss){
            NewsDTO news = NewsDTO.builder()
                    .image(content.select("a img").attr("abs:src"))
                    .title(content.select(".tit a").text())
                    .content(content.select(".txt a").text())
                    .url(content.select("a").attr("abs:href"))
                    .build();

            newList.add(news);
        }


        return newList;
    }

    
}
