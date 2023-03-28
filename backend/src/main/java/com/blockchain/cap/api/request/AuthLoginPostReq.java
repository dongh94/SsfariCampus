package com.blockchain.cap.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

/**
 *  유저 로그인 API ([POST] /api/v1/auth/login) 요청에 필요한 리퀘스트 바디 정의
 */

@ApiModel("AuthLoginPostRequest")
@Getter
@Setter
public class AuthLoginPostReq {

    @ApiModelProperty(name="유저 아이디", example="ssafy")
    String loginId;
    @ApiModelProperty(name="유저 비밀번호", example="1234")
    String password;

}
