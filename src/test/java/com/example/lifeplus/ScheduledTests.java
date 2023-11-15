package com.example.lifeplus;

import com.example.lifeplus.repository.CalendarRepository;
import com.example.lifeplus.service.ScheduledService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;


@RunWith(SpringRunner.class)
@SpringBootTest
public class ScheduledTests {

    @Autowired
    private CalendarRepository repository;

    @Test
    @Transactional
    public void dataSelectTest(){
        String userEmail = "a102";
        LocalDateTime now = LocalDateTime.now();

        // 기존의 LocalDateTime에 현재 날짜와 시간 설정
        LocalDateTime date = LocalDateTime.of(now.getYear(), now.getMonth(), now.getDayOfMonth(), 15, 30, 45);
        repository.findByEmailAndDateTimeGreaterThan(userEmail,date);
    }
}
