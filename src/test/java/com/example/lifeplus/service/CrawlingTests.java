package com.example.lifeplus.service;

import com.example.lifeplus.dto.NewsDTO;
import com.example.lifeplus.dto.SearchDTO;
import jakarta.annotation.PostConstruct;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class CrawlingTests {




    @Test
    @DisplayName("실시간검색어가져오기 테스트")
    public void getNewListTest() throws IOException {
        //given
        List<SearchDTO> newList = new ArrayList<>();

        //when
        Document document = Jsoup.connect("https://www.donga.com/news/Entertainment/List?ymd=20231114&m=")
                             .get();

        Elements contents = document.select(".articleList");

        for(Element content : contents){
            SearchDTO news = SearchDTO.builder()
                    .title(content.select(".rightList > .tit > a").text())
                    .url(content.select(".rightList > .tit > a").attr("abs:href"))
                    .build();

            newList.add(news);
        }
        System.out.println(contents.size()+"tt"+ newList.size());
        //then
        Assertions.assertEquals(20,contents.size());
        Assertions.assertEquals(20,newList.size());

    }


    @DisplayName("뉴스리스트가져오기 테스트")
    @Test
    public void getNewsListTest() throws IOException{
        //given
        List<NewsDTO> newList = new ArrayList<>();
        int limit = 10;
        //when
        Document document = Jsoup.connect("https://www.donga.com/news/List")
                .userAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36")
                .get();

        Elements contents = document.select(".articleList ");
        List<Element> contentss = new ArrayList<>();

        if (contents.size() > limit) {
            contentss = contents.subList(0, limit);
        }
        for(Element content : contentss) {
            NewsDTO news = NewsDTO.builder()
                    .image(content.select("a img").attr("abs:src"))
                    .title(content.select(".tit a").text())
                    .content(content.select(".txt a").text())
                    .url(content.select("a").attr("abs:href"))
                    .build();

            newList.add(news);
        }

        //then
        Assertions.assertEquals(10,contentss.size());
        Assertions.assertEquals(10,newList.size());

    }

}
