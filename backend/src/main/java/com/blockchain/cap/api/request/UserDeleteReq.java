package com.blockchain.cap.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

/**
 *  회원 탈퇴 API ([POST] /api/v1/user/delete) 요청에 필요한 리퀘스트 바디 정의
 */

@ApiModel("UserDeleteRequest")
@Getter
@Setter
public class UserDeleteReq {

    @ApiModelProperty(name="회원 아이디", example="ssafy")
    String loginId;
    @ApiModelProperty(name="회원 비밀번호", example="1234")
    String password;

}
