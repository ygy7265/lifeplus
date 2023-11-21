package com.example.lifeplus.service;

import com.example.lifeplus.dto.CalendarDTO;
import com.example.lifeplus.entity.Calendar;
import com.example.lifeplus.model.CalendarFixture;
import com.example.lifeplus.repository.CalendarRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentMatchers;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
public class CalendarServiceTest {

    @Test
    @DisplayName("일정 등록 테스트")
    public void addCalendarTest(){
        //given
        CalendarRepository calendarRepository = Mockito.mock(CalendarRepository.class);
        CalendarService calendarService = new CalendarService(calendarRepository);
        //when
        calendarService.addCalendar(CalendarFixture.add());

        //then
        Mockito.verify(calendarRepository, Mockito.times(1)).save(CalendarFixture.addentity("a101"));
    }

    @Test
    @DisplayName("일정 삭제 테스트")
    public void deleteCalendarTest(){
        //given
        CalendarRepository calendarRepository = Mockito.mock(CalendarRepository.class);
        CalendarService calendarService = new CalendarService(calendarRepository);
        String id = "6555ecd9f6dc885258b65b19";
        CalendarDTO calendar = CalendarFixture.deleted(id);

        Mockito.when(calendarRepository.existsById(id)).thenReturn(true);
        //when
        calendarService.deleteCalendar(calendar);

        //then
        Mockito.verify(calendarRepository, Mockito.times(1)).deleteById(id);

    }

    @Test
    @DisplayName("일정 조회 테스트")
    public void selectCalendarTest(){
        //given
        CalendarRepository calendarRepository = Mockito.mock(CalendarRepository.class);
        CalendarService calendarService = new CalendarService(calendarRepository);
        String email = "a101";
        CalendarDTO exceptCalendar = CalendarFixture.seleted(email);

        Mockito.when(calendarRepository.findByEmail("a101")).thenReturn(List.of(
                CalendarFixture.addentity("a101"),
                CalendarFixture.addentity("a102"),
                CalendarFixture.addentity("a103")
        ));
        //when
        List<CalendarDTO>  calendarList = calendarService.selectCalendar(exceptCalendar);
        List<Calendar> calendarResponse = calendarList.stream().map((item)->
            CalendarDTO.toCalendar(item)).toList();
        var expectResponse = List.of(CalendarFixture.addentity("a101"),
                CalendarFixture.addentity("a102"),
                CalendarFixture.addentity("a103"))
                .stream().toList();
        calendarResponse.forEach((calendaritem) -> {
            System.out.println(calendaritem.getEmail());
        });
        System.out.println("===========================");
        expectResponse.forEach((calendaritem) -> {
            System.out.println(calendaritem.getEmail());
        });

        //then
        Assertions.assertIterableEquals(expectResponse,calendarResponse);

    }

    @Test
    @DisplayName("일정 수정 테스트")
    public void updateCalendarTest(){
        //given
        CalendarRepository calendarRepository = Mockito.mock(CalendarRepository.class);
        CalendarService calendarService = new CalendarService(calendarRepository);
        //when
        System.out.println(CalendarFixture.findCalendarDate().getEmail());
        calendarService.updateCalendar(CalendarFixture.findCalendarDate());

        //then
        Mockito.verify(calendarRepository, Mockito.times(1)).save(CalendarFixture.updeated());

    }


}
