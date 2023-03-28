package com.blockchain.cap.api.controller;

import com.blockchain.cap.api.request.*;
import com.blockchain.cap.api.response.BaseResponseBody;
import com.blockchain.cap.api.service.UserService;
import io.swagger.annotations.*;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Objects;
import java.util.Optional;

/**
 *  회원 관련 API 요청 처리를 위한 컨트롤러 정의
 */

@Api(value = "유저 API", tags = {"User"})
@AllArgsConstructor
@RestController
@RequestMapping("/api/v1/user")
public class UserController {

    UserService userService;

    @ApiOperation(value="일반 회원가입", notes="일반 유저로 회원가입 한다")
    @ApiResponses({
            @ApiResponse(code=200, message="성공", response= AuthLoginPostReq.class),
            @ApiResponse(code=401, message="가입 실패", response= BaseResponseBody.class),
            @ApiResponse(code=500, message="서버오류", response=BaseResponseBody.class)
    })
    @PostMapping("register")
    public ResponseEntity<? extends BaseResponseBody> UserRegister(
            @RequestBody @ApiParam(value = "회원가입 정보", required = true) UserRegisterPostReq registerInfo) {
        // service 에서 DB 에 회원정보 등록하기 전에 validation 체크 필요

        if(userService.createUser(registerInfo)) {
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
        }
        return ResponseEntity.status(401).body(BaseResponseBody.of(401, "Failure"));
    }

    @ApiOperation(value="사업자 회원가입", notes="사업자로 회원가입 한다")
    @ApiResponses({
            @ApiResponse(code=200, message="성공", response= AuthLoginPostReq.class),
            @ApiResponse(code=401, message="가입 실패", response= BaseResponseBody.class),
            @ApiResponse(code=500, message="서버오류", response=BaseResponseBody.class)
    })
    @PostMapping("register/company")
    public ResponseEntity<? extends BaseResponseBody> CompanyRegister(
            @RequestBody @ApiParam(value = "회원가입 정보", required = true) CompanyRegisterPostReq registerInfo
    ) {
        // service 에서 DB 에 회원정보 등록하기 전에 validation 체크 필요

        if(userService.createCompany(registerInfo)) {
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
        }
        return ResponseEntity.status(401).body(BaseResponseBody.of(401, "Failure"));
    }

    @ApiOperation(value="회원 정보 수정", notes="회원의 정보를 수정 한다")
    @PutMapping("update")
    public ResponseEntity<? extends BaseResponseBody> UserUpdate(
            @RequestBody @ApiParam(value = "수정할 정보", required = true)UserUpdatePutReq updateInfo
            ) {
        if(userService.update(updateInfo)) {
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
        }
        return ResponseEntity.status(401).body(BaseResponseBody.of(401, "Failure"));
    }

    @ApiOperation(value="회원 탈퇴", notes="회원 탈퇴 한다")
    @DeleteMapping("delete")
    public ResponseEntity<? extends BaseResponseBody> UserDelete(
            @RequestBody @ApiParam(value = "탈퇴 시 필요한 정보", required = true) UserDeleteReq deleteInfo
    ) {
        if(userService.delete(deleteInfo)) {
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
        }
        return ResponseEntity.status(401).body(BaseResponseBody.of(401, "Failure"));
    }

}
