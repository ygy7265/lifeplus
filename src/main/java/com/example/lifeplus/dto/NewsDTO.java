package com.example.lifeplus.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class NewsDTO {
    private String image;
    private String title;
    private String content;
    private String url;
}
