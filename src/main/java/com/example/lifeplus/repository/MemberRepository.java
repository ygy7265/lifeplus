package com.example.lifeplus.repository;

import com.example.lifeplus.entity.Member;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MemberRepository extends MongoRepository<Member,Long> {
    Optional<Member> findByEmail(String email);
}
