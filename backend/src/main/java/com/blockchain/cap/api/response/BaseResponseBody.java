package com.blockchain.cap.api.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

/**
 *  API ([POST] /api/v1/auth) 요청에 대한 공통 응답값 정의 (부모클래스)
 */

@ApiModel("기본 응답값 형태")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BaseResponseBody {

    @ApiModelProperty(name="응답 메시지")
    String message=null;
    @ApiModelProperty(name="응답 코드")
    Integer statusCode =null;

    public BaseResponseBody(Integer statusCode) {
        this.statusCode = statusCode;
    }

    public static BaseResponseBody of(Integer statusCode, String message) {
        BaseResponseBody body=new BaseResponseBody();
        body.setStatusCode(statusCode);
        body.setMessage(message);
        return body;
    }

}
