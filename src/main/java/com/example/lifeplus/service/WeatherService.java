package com.example.lifeplus.service;

import com.example.lifeplus.dto.WeatherDTO;
import org.json.JSONObject;
import org.json.XML;
import org.springframework.stereotype.Service;

import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
@Service
public class WeatherService {

    public String WeatherData(WeatherDTO wDTO){
        StringBuffer result = new StringBuffer();
        String jsonPrintString = null;
        try {
            String apiUrl = "https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?" +
                    "serviceKey=5DbM%2Bixaa1TEWY1m9IHk4I28i2qjwOQi2dvdBPk4CFsK6owVcm4VX%2F9CQYhsz67zxv2LBGl9hIonupgOwQFCng%3D%3D" +
                    "&pageNo=1" +
                    "&numOfRows=30" +
                    "&dataType=XML" +
                    "&base_date="+wDTO.getDate()+
                    "&base_time=0500" +
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
