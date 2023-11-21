package com.example.lifeplus.entity;

import com.example.lifeplus.dto.CalendarDTO;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
@Builder
@Document("calender")
public class Calendar {


    @Id
    private String id;

    private String title;

    private String content;

    private String date;
    private String time;
    private LocalDateTime datetime;

    private String email;

    public static CalendarDTO toDTO(Calendar calendar) {
        CalendarDTO calendarDTO = CalendarDTO.builder()
                .id(calendar.getId())
                .title(calendar.getTitle())
                .content(calendar.getContent())
                .email(calendar.getEmail())
                .time(calendar.getTime())
                .datetime(calendar.getDatetime())
                .date(calendar.getDate())
                .build();

        return calendarDTO;
    }
}
