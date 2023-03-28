package com.blockchain.cap.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

/**
 *  사업자 회원가입 API ([POST] /api/v1/user/register/company) 요청에 필요한 리퀘스트 바디 정의
 */

@ApiModel("CompanyRegisterPostRequest")
@Getter
@Setter
public class CompanyRegisterPostReq {

    @ApiModelProperty(name="유저 아이디", example="ssafy2")
    String loginId;
    @ApiModelProperty(name="유저 비밀번호", example="1234")
    String password;
    @ApiModelProperty(name="핸드폰 번호", example="01000000000")
    String phone;
    @ApiModelProperty(name="업체명", example="싸피모직")
    String name;
    @ApiModelProperty(name="사업자등록번호", example="000-393748923-33")
    String companyNumber;

}
