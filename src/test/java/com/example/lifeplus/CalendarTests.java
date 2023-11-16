package com.example.lifeplus;

import com.example.lifeplus.dto.CalendarDTO;
import com.example.lifeplus.entity.Calendar;
import com.example.lifeplus.model.CalendarFixture;
import com.example.lifeplus.repository.CalendarRepository;
import com.example.lifeplus.service.CalendarService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class CalendarTests {


    @Test
    @DisplayName("일정 삭제 테스트")
    public void deleteCalendarTest(){
        CalendarRepository calendarRepository = Mockito.mock(CalendarRepository.class);
        CalendarService calendarService = new CalendarService(calendarRepository);
        String id = "6555ecd9f6dc885258b65b19";
        CalendarDTO calendar = CalendarFixture.deleted(id);
        if(calendarRepository.existsById(calendar.getId())){
            calendarService.deleteCalendar(calendar);
            System.out.println("삭제성공!");
        }else{
            throw new RuntimeException("삭제실패,아이디찾을수없음");
        }
    }
}
