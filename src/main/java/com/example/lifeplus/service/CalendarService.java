package com.example.lifeplus.service;

import com.example.lifeplus.dto.CalendarDTO;
import com.example.lifeplus.entity.Calendar;
import com.example.lifeplus.repository.CalendarRepository;
import com.example.lifeplus.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;


@Log4j2
@Service
@RequiredArgsConstructor
public class CalendarService {

    private final CalendarRepository calendarRepository;

    public void addCalendar(CalendarDTO calendarDTO){

        Calendar calendar = calendarDTO.toCalendar(calendarDTO);
        calendarRepository.save(calendar);
    }

    public void deleteCalendar(CalendarDTO calendarDTO){
        Calendar calendar = calendarDTO.toCalendar(calendarDTO);
        log.info(calendar.getId());
        calendarRepository.deleteById(calendar.getId());
    }

    public void updateCalendar(CalendarDTO calendarDTO){
        Calendar calendar = calendarDTO.toCalendar(calendarDTO);
        calendarRepository.save(calendar);
    }

    public List<CalendarDTO> selectCalendar(CalendarDTO calendarDTO){

        ModelMapper modelMapper = new ModelMapper();
        Calendar calendar = calendarDTO.toCalendar(calendarDTO);

        List<CalendarDTO> responseDTO  = calendarRepository.findByEmail(calendar.getEmail()).stream().map(entity-> modelMapper.map(entity,CalendarDTO.class)).toList();


        return responseDTO;
    }
}
