package com.blockchain.cap.api.controller;

import com.auth0.jwt.interfaces.DecodedJWT;
import com.blockchain.cap.api.request.AuthLoginPostReq;
import com.blockchain.cap.api.response.AuthLoginPostRes;
import com.blockchain.cap.api.response.BaseResponseBody;
import com.blockchain.cap.api.response.ReAccessPostRes;
import com.blockchain.cap.api.service.UserService;
import com.blockchain.cap.domain.Auth.Refresh;
import com.blockchain.cap.domain.Auth.RefreshRepository;
import com.blockchain.cap.domain.User.User;
import com.blockchain.cap.util.JwtTokenUtil;
import io.swagger.annotations.*;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *  인증 관련 API 요청 처리를 위한 컨트롤러 정의
 */

@Api(value = "인증 API", tags = {"Auth"})
@AllArgsConstructor
@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    UserService userService;
    PasswordEncoder passwordEncoder;
    RefreshRepository refreshRepository;

    @ApiOperation(value="로그인", notes="아이디와 패스워드를 통해 로그인한다")
    @ApiResponses({
            @ApiResponse(code=200, message="성공", response=AuthLoginPostReq.class),
            @ApiResponse(code=401, message="인증 실패", response= BaseResponseBody.class),
            @ApiResponse(code=404, message="사용자 없음", response=BaseResponseBody.class),
            @ApiResponse(code=500, message="서버오류", response=BaseResponseBody.class)
    })
    @PostMapping("/login")
    public ResponseEntity<? extends BaseResponseBody> login(HttpServletResponse response, @RequestBody @ApiParam(value="로그인 정보", required=true) AuthLoginPostReq loginInfo) {
        User user = userService.getUserByLoginId(loginInfo.getLoginId());

        if(user==null) {
            return ResponseEntity.status(404).body(AuthLoginPostRes.of(404, "Not Exist", null, null));
        }
        if(!passwordEncoder.matches(loginInfo.getPassword(), user.getPassword())) {
            return ResponseEntity.status(401).body(AuthLoginPostRes.of(401, "Invalid Password", null,null));
        }

        String refreshToken = JwtTokenUtil.getRefreshToken(loginInfo.getLoginId());

        // DB 나 Redis 에 refreshToken 저장, 현재는 일단 DB
        refreshRepository.save(Refresh.builder().refreshToken(refreshToken).build());

        response.addCookie(CreateRefreshCookie(refreshToken)); // 응답 헤더에 쿠키 추가
        return ResponseEntity.ok(AuthLoginPostRes.of(200, "Success", JwtTokenUtil.getAccessToken(loginInfo.getLoginId()), user));
    }

    @ApiOperation(value = "로그아웃", notes = "로그아웃한다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공", response = BaseResponseBody.class),
            @ApiResponse(code = 401, message = "토큰 없음", response = BaseResponseBody.class),
            @ApiResponse(code = 404, message = "요청 실패", response = BaseResponseBody.class),
            @ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class)
    })
    @PostMapping("/logout")
    public ResponseEntity<? extends BaseResponseBody> logout(HttpServletRequest request, HttpServletResponse response) {
        Cookie[] cookies = request.getCookies();
        if(cookies == null) {
            return ResponseEntity.status(404).body(BaseResponseBody.of(404, "Cookies is null"));
        }

        String refreshToken = null;
        for(Cookie cookie : cookies) {
            if("refreshToken".equals(cookie.getName())) {
                refreshToken = cookie.getValue();
            }
        }
        if(refreshToken == null) {
            return ResponseEntity.status(404).body(BaseResponseBody.of(404, "Not Exist refreshToken"));
        }

        // DB 나 Redis 에서 refreshToken 조회안되면 실패 리턴, 현재는 일단 DB
        Refresh token = refreshRepository.findByRefreshToken(refreshToken);
        if(token == null) {
            return ResponseEntity.status(401).body(BaseResponseBody.of(401, "Invalid Token"));
        }

        refreshRepository.delete(token);
        response.addCookie(DeleteRefreshCookie());
        return ResponseEntity.ok(BaseResponseBody.of(200, "Success"));
    }

    @PostMapping("/reaccess")
    @ApiOperation(value = "access 토큰 재발급", notes = "access 토큰을 재발급한다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공", response = ReAccessPostRes.class),
            @ApiResponse(code = 401, message = "토큰 없음", response = BaseResponseBody.class),
            @ApiResponse(code = 404, message = "요청 실패", response = BaseResponseBody.class),
            @ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class)
    })
    public ResponseEntity<? extends BaseResponseBody> reaccess(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        if(cookies==null) {
            return ResponseEntity.status(404).body(ReAccessPostRes.of(404, "Cookies is null", null));
        }

        String refreshToken=null;
        for(Cookie cookie : cookies){
            if("refreshToken".equals(cookie.getName())){
                refreshToken=cookie.getValue();
            }
        }
        if(refreshToken==null) {
            return ResponseEntity.status(404).body(ReAccessPostRes.of(404, "Not Exist refreshToken", null));
        }

        // DB 나 Redis 에서 refreshToken 조회안되면 실패 리턴, 현재는 일단 DB
        Refresh token = refreshRepository.findByRefreshToken(refreshToken);
        if(token == null) {
            return ResponseEntity.status(401).body(ReAccessPostRes.of(401, "Invalid Token", null));
        }

        // Jwt 페이로드에 아이디 넣기
        DecodedJWT decodedJWT = JwtTokenUtil.getVerifier().verify(refreshToken.replace(JwtTokenUtil.TOKEN_PRIFIX, ""));
        String userId = decodedJWT.getSubject();
        return ResponseEntity.ok(ReAccessPostRes.of(200, "Success", JwtTokenUtil.getAccessToken(userId)));
    }

    private Cookie DeleteRefreshCookie() {
        Cookie cookie = new Cookie("refreshToken", null);
        cookie.setMaxAge(0);
        cookie.setPath("/");

        return cookie;
    }

    private Cookie CreateRefreshCookie(String refreshToken) {
        Cookie cookie = new Cookie("refreshToken", refreshToken); // 쿠키 생성
        cookie.setMaxAge(JwtTokenUtil.getRefreshTime()); // 쿠키 유효시간 설정
        cookie.setSecure(true); // HTTPS 이외의 통신에서는 쿠키 전송 금지
        cookie.setHttpOnly(true); // 스크립트로 쿠키를 탈취할 수 없도록 설정
        cookie.setPath("/");

        return cookie;
    }

}
