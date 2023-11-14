package com.example.lifeplus.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class SearchDTO {
    private String title;
    private String url;
}
