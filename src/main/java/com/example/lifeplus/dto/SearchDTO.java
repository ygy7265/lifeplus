package com.example.lifeplus.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SearchDTO {
    private String title;
    private String url;
}
