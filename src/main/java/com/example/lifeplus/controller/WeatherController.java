package com.example.lifeplus.controller;

import com.example.lifeplus.dto.WeatherDTO;
import com.example.lifeplus.service.WeatherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class WeatherController {

    @Autowired
    private WeatherService service;

    @GetMapping("/weatherAPI")
    public String weatherAPI(@ModelAttribute WeatherDTO dto){
        String weatherData = service.WeatherData(dto);

        return weatherData;

    }
}
