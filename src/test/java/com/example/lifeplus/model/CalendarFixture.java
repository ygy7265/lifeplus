package com.example.lifeplus.model;

import com.example.lifeplus.dto.CalendarDTO;
import com.example.lifeplus.entity.Calendar;

public class CalendarFixture {

    public static CalendarDTO deleted(String id){
        return CalendarDTO
                .builder()
                .id(id)
                .build();
    }

    public static CalendarDTO seleted(String email){
        return CalendarDTO
                .builder()
                .email(email)
                .build();
    }

    public static CalendarDTO updeated(){
        return CalendarDTO
                .builder()
                .build();
    }
}
