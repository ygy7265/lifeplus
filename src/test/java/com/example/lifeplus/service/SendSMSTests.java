package com.example.lifeplus.service;


import net.nurigo.java_sdk.api.Message;
import net.nurigo.java_sdk.exceptions.CoolsmsException;
import org.json.simple.JSONObject;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Value;

import java.util.HashMap;

public class SendSMSTests {
    @Value("${sms-key}")
    private String api_key;
    @Value("${smsSecret-key}")
    private String api_secret;
    @Value("${userphone}")
    private String phone;
    @Test
    public void sendSms(){

        Message coolsms = new Message(api_key,api_secret);
        JSONObject MockitoResponse = new JSONObject();
        MockitoResponse.put("result_code","Success");

        HashMap<String,String> params = new HashMap<String,String>();

        params.put("to","LifePlus");
        params.put("from",phone);
        params.put("type","SMS");
        params.put("text","Test");
        params.put("app_version","test app 1.2");

        try{
            JSONObject obj = (JSONObject) coolsms.send(params);
            System.out.println(obj.toString());
        }catch (CoolsmsException e){
            System.out.println(e.getMessage());
            System.out.println(e.getCode());
        }
    }
}
