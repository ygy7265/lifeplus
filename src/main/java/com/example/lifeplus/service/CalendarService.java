package com.example.lifeplus.service;

import com.example.lifeplus.dto.CalendarDTO;
import com.example.lifeplus.entity.Calendar;
import com.example.lifeplus.repository.CalendarRepository;
import com.example.lifeplus.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;


@Log4j2
@Service
@RequiredArgsConstructor
public class CalendarService {

    private final CalendarRepository calendarRepository;

    @Transactional
    public List<CalendarDTO> addCalendar(CalendarDTO calendarDTO){

        Calendar calendar = calendarDTO.toCalendar(calendarDTO);
        calendarRepository.save(calendar);

        List<CalendarDTO> responseDTO = selectCalendar(calendarDTO);
        return responseDTO;
    }

    public ResponseEntity<String> deleteCalendar(CalendarDTO calendarDTO){
        Calendar calendar = calendarDTO.toCalendar(calendarDTO);
        log.info(calendar.getId());

        if(calendarRepository.existsById(calendar.getId())){
            calendarRepository.deleteById(calendar.getId());
            return ResponseEntity.ok("삭제성공!");
        }else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("삭제실패,아이디를 찾을수없습니다.");
        }


    }

    public CalendarDTO updateCalendar(CalendarDTO calendarDTO){
        Calendar calendar = calendarDTO.toCalendar(calendarDTO);
       return Calendar.toDTO(calendarRepository.save(calendar));
    }

    public List<CalendarDTO> selectCalendar(CalendarDTO calendarDTO){

        ModelMapper modelMapper = new ModelMapper();
        Calendar calendar = calendarDTO.toCalendar(calendarDTO);

        List<CalendarDTO> responseDTO  = calendarRepository.findByEmail(calendar.getEmail()).stream().map(entity-> modelMapper.map(entity,CalendarDTO.class)).toList();


        return responseDTO;
    }
}
