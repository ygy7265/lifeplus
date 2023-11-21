package com.example.lifeplus.dto;

import com.example.lifeplus.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MemberResponseDTO {

    private String email;
    private String name;

    public static MemberResponseDTO of(Member member) {
        return MemberResponseDTO.builder()
                .email(member.getEmail())
                .name(member.getName())
                .build();
    }
}
