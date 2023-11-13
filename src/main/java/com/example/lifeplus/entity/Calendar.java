package com.example.lifeplus.entity;

import com.example.lifeplus.dto.CalendarDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Document("calender")
public class Calendar {



    @Id
    private String id;

    private String title;

    private String content;

    private String date;
    private String time;

    private String email;

    public static CalendarDTO toDTO(Calendar calendar){
        CalendarDTO calendarDTO = CalendarDTO.builder()
                .id(calendar.getId())
                .title(calendar.getTitle())
                .content(calendar.getContent())
                .email(calendar.getEmail())
                .time(calendar.getTime())
                .date(calendar.getDate())
                .build();

        return calendarDTO;
    }
}
