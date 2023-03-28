package com.blockchain.cap.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

/**
 *  회원 정보 수정 API ([POST] /api/v1/user/update) 요청에 필요한 리퀘스트 바디 정의
 */

@ApiModel("UserUpdatePutRequest")
@Getter
@Setter
public class UserUpdatePutReq {

    @ApiModelProperty(name="회원 아이디 *(정보 수정을 위해 필수 입력)", example="ssafy")
    String loginId;
    @ApiModelProperty(name="현재 비밀번호 *(정보 수정을 위해 필수 입력)", example="1234")
    String nowPassword;
    @ApiModelProperty(name="변경할 비밀번호 (미 입력시 변경하지 않음)", example="1234")
    String changePassword;
    @ApiModelProperty(name="핸드폰 번호 (미 입력시 변경하지 않음)", example="01000000000")
    String phone;
    @ApiModelProperty(name="회원 이메일 (미 입력시 변경하지 않음)", example="ssafy@edu.com")
    String email;

}
