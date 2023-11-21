package com.example.lifeplus.controller;

import com.example.lifeplus.dto.CalendarDTO;
import com.example.lifeplus.entity.Calendar;
import com.example.lifeplus.service.CalendarService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.boot.context.properties.bind.BindResult;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindingResult;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.ObjectError;
import org.springframework.validation.annotation.Validated;
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
    public ResponseEntity<?> addCalendar(@Validated @RequestBody CalendarDTO calendarDTO, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            List<ObjectError> errors = bindingResult.getAllErrors();
            log.info(errors);
            return new ResponseEntity<>(errors.get(0).getDefaultMessage(), HttpStatus.BAD_REQUEST);
        }

        String datetime = calendarDTO.getDate() + "T" + calendarDTO.getTime();
        LocalDateTime localDateTime = LocalDateTime.parse(datetime, DateTimeFormatter.ISO_LOCAL_DATE_TIME);

        calendarDTO.setDatetime(localDateTime);
        log.info(calendarDTO.getTime());
        log.info(calendarDTO.getEmail());
        List<CalendarDTO> responsDTO = calendarService.addCalendar(calendarDTO);


        return new ResponseEntity<>(responsDTO, HttpStatus.OK);
    }

    @DeleteMapping("/deleteCalendar/{id}")
    public ResponseEntity<String> deleteCalendar(@PathVariable String id) {
        CalendarDTO dto = new CalendarDTO();
        dto.setId(id);
        log.info(dto.getId());
        return calendarService.deleteCalendar(dto);
    }

    @PutMapping("/updateCalendar")
    public ResponseEntity<?> updateCalendar(@Validated @RequestBody CalendarDTO calendarDTO, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            List<ObjectError> errors = bindingResult.getAllErrors();
            return new ResponseEntity<>(errors.get(0).getDefaultMessage(), HttpStatus.BAD_REQUEST);
        }

        return ResponseEntity.ok(calendarService.updateCalendar(calendarDTO));
    }

    @GetMapping("/selectCalendar/{email}")
    public ResponseEntity<?> selectCalendar(@PathVariable String email) {

        CalendarDTO calendarDTO = new CalendarDTO();
        calendarDTO.setEmail(email);
        List<CalendarDTO> responseList = calendarService.selectCalendar(calendarDTO);

        if (responseList != null && !responseList.isEmpty()) {
            return new ResponseEntity<>(responseList, HttpStatus.OK);
        } else {
            // 리스트 조회 실패
            return new ResponseEntity<>(responseList, HttpStatus.NOT_FOUND);
        }
    }
}
