package com.blockchain.cap.api.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

/**
 *  유저 엑세스 토큰 재발급 API ([POST] /api/v1/reaccess) 요청에 대한 응답값 정의
 */

@ApiModel("ReAccessPostResponse")
@Getter
@Setter
public class ReAccessPostRes extends BaseResponseBody {
    @ApiModelProperty(name="JWT access 인증 토큰", example="ekdif123SDKVIdf1231...")
    String accessToken;

    public static ReAccessPostRes of(Integer statusCode, String message, String accessToken) {
        ReAccessPostRes res = new ReAccessPostRes();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setAccessToken(accessToken);
        return res;
    }
}
