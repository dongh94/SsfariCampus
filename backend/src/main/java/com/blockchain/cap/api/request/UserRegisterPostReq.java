package com.blockchain.cap.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

/**
 *  회원가입 API ([POST] /api/v1/user/register) 요청에 필요한 리퀘스트 바디 정의
 */

@ApiModel("UserRegisterPostRequest")
@Getter
@Setter
public class UserRegisterPostReq {

    @ApiModelProperty(name="회원 아이디", example="ssafy")
    String loginId;
    @ApiModelProperty(name="회원 비밀번호", example="1234")
    String password;
    @ApiModelProperty(name="핸드폰 번호", example="01000000000")
    String phone;
    @ApiModelProperty(name="회원 이름", example="홍길동")
    String name;
    @ApiModelProperty(name="회원 이메일", example="ssafy@edu.com")
    String email;

}
