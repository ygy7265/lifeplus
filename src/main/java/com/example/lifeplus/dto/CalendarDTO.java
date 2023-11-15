package com.example.lifeplus.dto;

import com.example.lifeplus.entity.Calendar;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class CalendarDTO {



    private String id;

    private String title;

    private String content;

    private String date;

    private String time;
    private LocalDateTime datetime;

    private String email;

    public static Calendar toCalendar(CalendarDTO dto){
        Calendar calendar = Calendar.builder()
                .id(dto.getId())
                .title(dto.getTitle())
                .content(dto.getContent())
                .date(dto.getDate())
                .time(dto.getTime())
                .datetime(dto.getDatetime())
                .email(dto.getEmail())
                .build();

        return calendar;
    }
}
