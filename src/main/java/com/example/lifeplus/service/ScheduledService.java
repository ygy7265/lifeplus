package com.example.lifeplus.service;

import com.example.lifeplus.dto.SmsResponseDTO;
import net.nurigo.java_sdk.api.Message;
import net.nurigo.java_sdk.exceptions.CoolsmsException;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.HashMap;

@Service
public class ScheduledService {

//    @Scheduled(fixedRate = 5000)
//    public void scheduled() {
//
//    }
    @Value("${sms-key}")
    private String api_key;
    @Value("${smsSecret-key}")
    private String api_secret;
    @Value("${userphone}")
    private String phone;
    public SmsResponseDTO sendSms(){

        Message coolsms = new Message(api_key, api_secret);
        HashMap<String, String> params = new HashMap<String, String>();

        params.put("to", phone);
        params.put("from",phone);
        params.put("type","SMS");
        params.put("text","Test");
        params.put("app_version","test app 1.2");

        try{
            JSONObject obj = (JSONObject) coolsms.send(params);
            return new SmsResponseDTO(true, obj.toJSONString(), null, 0);
        }catch (CoolsmsException e){
            System.out.println(e.getMessage());
            return new SmsResponseDTO(false, null, e.getMessage(), e.getCode());
        }
    }
}
