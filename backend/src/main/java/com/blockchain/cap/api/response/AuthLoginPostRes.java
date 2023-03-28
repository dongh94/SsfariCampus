package com.blockchain.cap.api.response;

import com.blockchain.cap.domain.User.User;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

/**
 *  유저 로그인 API ([POST] /api/v1/auth) 요청에 대한 응답값 정의
 */

@ApiModel("AuthLoginPostResponse")
@Getter
@Setter
public class AuthLoginPostRes extends BaseResponseBody {

    @ApiModelProperty(name="JWT access 인증 토큰", example="ekdif123SDKVIdf1231...")
    String accessToken;
    @ApiModelProperty(name="유저 정보")
    User user;

    public static AuthLoginPostRes of(Integer statusCode, String message, String accessToken, User user) {
        AuthLoginPostRes res = new AuthLoginPostRes();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setAccessToken(accessToken);
        res.setUser(user);
        return res;
    }

}
