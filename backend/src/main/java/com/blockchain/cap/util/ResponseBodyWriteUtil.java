package com.blockchain.cap.util;

import com.blockchain.cap.api.response.BaseResponseBody;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.collect.ImmutableMap;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Calendar;
import java.util.Map;
import java.util.Optional;

/**
 *  컨트롤러가 아닌 곳에서, 서버 응답값(바디)를 직접 변경 및 전달하기 위한 유틸
 */

public class ResponseBodyWriteUtil {

    public static void sendApiResponse(HttpServletResponse response, BaseResponseBody body) throws IOException {
        response.setStatus(HttpStatus.OK.value());
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setCharacterEncoding("UTF-8");
        response.getOutputStream().write(new ObjectMapper().writeValueAsString(body).getBytes());
    }

    public static void sendError(HttpServletRequest request, HttpServletResponse response, Exception ex, HttpStatus httpStatus) throws IOException {
        response.setStatus(httpStatus.value());
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setCharacterEncoding("UTF-8");
        String message=Optional.ofNullable(ex.getMessage()).orElse("");
        Map<String,Object> data=ImmutableMap.of(
                "timestamp", Calendar.getInstance().getTime(),
                "status", httpStatus.value(),
                "error", ex.getClass().getSimpleName(),
                "message", message,
                "path", request.getRequestURI()
        );
        PrintWriter pw=response.getWriter();
        pw.print(new ObjectMapper().writeValueAsString(data));
        pw.flush();
    }

    public static void sendError(HttpServletRequest request, HttpServletResponse response, Exception ex) throws IOException {
        sendError(request, response, ex, HttpStatus.UNAUTHORIZED);
    }

}
