package com.example.lifeplus;

import com.example.lifeplus.dto.WeatherDTO;
import com.example.lifeplus.service.WeatherService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;

import java.util.stream.Stream;

class PublicDataWeatherTests {



    public static Stream<Arguments> parameterizedComplicateWeatherApiTestParameter() {
        return Stream.of(
                Arguments.of(75, 95, "20231108"),
                Arguments.of(80, 100, "20231109"),
                Arguments.of(70, 90, "20231110")
        );
    }

    @DisplayName("날씨 API 테스트")
    @MethodSource("parameterizedComplicateWeatherApiTestParameter")
    @ParameterizedTest
    public void weatherAPI(int x,int y, String date){
        WeatherService service = new WeatherService();
        WeatherDTO dto = new WeatherDTO();
        dto.setX(x);
        dto.setY(y);
        dto.setDate(date);

        String weatherData = service.WeatherData(dto);
        System.out.println("Weather Data: " + weatherData);
    }
}