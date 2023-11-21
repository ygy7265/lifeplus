package com.example.lifeplus.dto;

import com.example.lifeplus.entity.Calendar;
import jakarta.validation.constraints.NotNull;
import lombok.*;


import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class CalendarDTO {


    private String id;
    @NotNull(message = "title cannot be null")
    private String title;
    @NotNull(message = "content cannot be null")
    private String content;
    @NotNull(message = "date cannot be null")
    private String date;
    @NotNull(message = "time cannot be null")
    private String time;
    private LocalDateTime datetime;
    @NotNull(message = "email cannot be null")
    private String email;

    public static Calendar toCalendar(CalendarDTO dto) {
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
