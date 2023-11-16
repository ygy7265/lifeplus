package com.example.lifeplus.repository;

import com.example.lifeplus.entity.Calendar;
import com.example.lifeplus.entity.Member;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface CalendarRepository extends MongoRepository<Calendar,String> {
    Optional<Calendar> findById(String id);
    boolean existsById(String id);
    List<Calendar> findByEmail(String email);

    //List<Calendar> findByEmailAndDateTimeGreaterThan(String email, LocalDateTime currentDateTime);

}
