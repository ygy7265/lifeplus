package com.example.lifeplus.controller;

import com.example.lifeplus.dto.CalendarDTO;
import com.example.lifeplus.entity.Calendar;
import com.example.lifeplus.service.CalendarService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Log4j2
@RequiredArgsConstructor
@RestController
public class CalendarController {

    private final CalendarService calendarService;
    @PostMapping("/addCalendar")
    public List<CalendarDTO> addCalendar(@RequestBody CalendarDTO calendarDTO){
        String datetime = calendarDTO.getDate()+"T"+calendarDTO.getTime();
        LocalDateTime localDateTime = LocalDateTime.parse(datetime, DateTimeFormatter.ISO_LOCAL_DATE_TIME);

        calendarDTO.setDatetime(localDateTime);
        log.info(calendarDTO.getTime());
        List<CalendarDTO> responsDTO = calendarService.addCalendar(calendarDTO);

        return responsDTO;
    }
    @DeleteMapping("/deleteCalendar/{id}")
    public ResponseEntity<String> deleteCalendar(@PathVariable String id){
        CalendarDTO dto = new CalendarDTO();
        dto.setId(id);
        log.info(dto.getId());
        return calendarService.deleteCalendar(dto);
    }
    @PutMapping("/updateCalendar")
    public ResponseEntity<CalendarDTO> updateCalendar(@RequestBody CalendarDTO calendarDTO){

        return ResponseEntity.ok(calendarService.updateCalendar(calendarDTO));
    }

    @GetMapping("/selectCalendar/{email}")
    public List<CalendarDTO> selectCalendar(@PathVariable String email){
        CalendarDTO calendarDTO = new CalendarDTO();
        calendarDTO.setEmail(email);
        List<CalendarDTO> responseList= calendarService.selectCalendar(calendarDTO);

        return responseList;
    }
}
