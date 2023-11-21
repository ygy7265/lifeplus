package com.example.lifeplus.model;

import com.example.lifeplus.dto.CalendarDTO;
import com.example.lifeplus.entity.Calendar;

import java.time.LocalDateTime;

public class CalendarFixture {

    public static CalendarDTO add(){
        LocalDateTime dateformat = LocalDateTime.of(2023, 11, 17, 10, 20);
        String id = "1234";
        String title = "title1";
        String content  = "contentTest1";
        String date = "2023-11-17";
        String time = "19:20";
        LocalDateTime datetime = dateformat;
        String email = "a101";
        return CalendarDTO
                .builder()
                .id(null)
                .title(title)
                .content(content)
                .date(date)
                .time(time)
                .datetime(datetime)
                .email(email)
                .build();
    }

    public static Calendar addentity(String emailDto){
        LocalDateTime dateformat = LocalDateTime.of(2023, 11, 17, 10, 20);
        String id = null;
        String title = "title1";
        String content  = "contentTest1";
        String date = "2023-11-17";
        String time = "19:20";
        LocalDateTime datetime = dateformat;
        String email = emailDto;
        return Calendar
                .builder()
                .id(null)
                .title(title)
                .content(content)
                .date(date)
                .time(time)
                .datetime(datetime)
                .email(email)
                .build();

    }
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

    public static Calendar updeated(){
        LocalDateTime dateformat = LocalDateTime.of(2023, 11, 17, 10, 20);
        String id = "6556d498c99fe514f1dcccf4";
        String title = "title1";
        String content  = "contentTest1";
        String date = "2023-11-17";
        String time = "19:20";
        LocalDateTime datetime = dateformat;
        String email = "a101";
        return Calendar
                .builder()
                .id(id)
                .title(title)
                .content(content)
                .date(date)
                .time(time)
                .datetime(datetime)
                .email(email)
                .build();
    }
    public static CalendarDTO findCalendarDate(){
        LocalDateTime dateformat = LocalDateTime.of(2023, 11, 17, 10, 20);
        String id = "6556d498c99fe514f1dcccf4";
        String title = "title1";
        String content  = "contentTest1";
        String date = "2023-11-17";
        String time = "19:20";
        LocalDateTime datetime = dateformat;
        String email = "a101";
        return CalendarDTO
                .builder()
                .id(id)
                .title(title)
                .content(content)
                .date(date)
                .time(time)
                .datetime(datetime)
                .email(email)
                .build();
    }
}
