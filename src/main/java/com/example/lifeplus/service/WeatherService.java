package com.example.lifeplus.service;

import com.example.lifeplus.dto.WeatherDTO;
import lombok.extern.log4j.Log4j2;
import org.json.JSONObject;
import org.json.XML;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

@Log4j2
@Service
public class WeatherService {

    @Value("${shortweather-key}")
    private String apiKey;
    public String WeatherData(WeatherDTO wDTO){
        log.info(wDTO.getX());
        log.info(wDTO.getY());
        log.info(wDTO.getDate());
        log.info(wDTO.getTime());
        StringBuffer result = new StringBuffer();
        String jsonPrintString = null;
        try {
            String apiUrl = "https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?" +
                    "serviceKey="+ apiKey +
                    "&pageNo=1" +
                    "&numOfRows=30" +
                    "&dataType=XML" +
                    "&base_date="+wDTO.getDate()+
                    "&base_time="+wDTO.getTime()+"00" +
                    "&nx="+wDTO.getX()+"&ny="+wDTO.getY();
            URL url = new URL(apiUrl);
            HttpURLConnection urlConnection = (HttpURLConnection) url.openConnection();
            urlConnection.connect();
            BufferedInputStream bufferedInputStream = new BufferedInputStream(urlConnection.getInputStream());
            BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(bufferedInputStream, "UTF-8"));
            String returnLine;
            while((returnLine = bufferedReader.readLine()) != null) {
                result.append(returnLine);
            }

            JSONObject jsonObject = XML.toJSONObject(result.toString());
            jsonPrintString = jsonObject.toString();
        } catch (Exception e) {
            e.printStackTrace();
        }

        return jsonPrintString;
    }
}
