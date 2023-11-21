package com.example.lifeplus.dto;

public class SmsResponseDTO {

    private boolean success;
    private String messageId; // 성공 시 메시지 ID
    private String errorMessage; // 실패 시 에러 메시지
    private int errorCode; // 실패 시 에러 코드

    public SmsResponseDTO(boolean success, String messageId, String errorMessage, int errorCode) {
        this.success = success;
        this.messageId = messageId;
        this.errorMessage = errorMessage;
        this.errorCode = errorCode;
    }
}
