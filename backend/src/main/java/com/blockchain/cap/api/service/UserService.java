package com.blockchain.cap.api.service;

import com.blockchain.cap.api.request.CompanyRegisterPostReq;
import com.blockchain.cap.api.request.UserDeleteReq;
import com.blockchain.cap.api.request.UserRegisterPostReq;
import com.blockchain.cap.api.request.UserUpdatePutReq;
import com.blockchain.cap.domain.Auth.RefreshRepository;
import com.blockchain.cap.domain.User.RoleType;
import com.blockchain.cap.domain.User.User;
import com.blockchain.cap.domain.User.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public User getUserByLoginId(String phone) {
        return userRepository.findByLoginId(phone);
    }

    public boolean createUser(UserRegisterPostReq registerInfo) {
        if(userRepository.findByLoginId(registerInfo.getLoginId())!=null) {
            return false;
        }

        userRepository.save(User.builder()
                        .role(RoleType.USER)
                        .loginId(registerInfo.getLoginId())
                        .password(passwordEncoder.encode(registerInfo.getPassword()))
                        .phone(registerInfo.getPhone())
                        .name(registerInfo.getName())
                        .email(registerInfo.getEmail())
                        .build());

        return true;
    }

    public boolean createCompany(CompanyRegisterPostReq registerInfo) {
        if(userRepository.findByLoginId(registerInfo.getLoginId())!=null) {
            return false;
        }

        userRepository.save(User.builder()
                .role(RoleType.COMPANY)
                .loginId(registerInfo.getLoginId())
                .password(passwordEncoder.encode(registerInfo.getPassword()))
                .phone(registerInfo.getPhone())
                .name(registerInfo.getName())
                .companyNumber(registerInfo.getCompanyNumber())
                .build());

        return true;
    }

    public boolean update(UserUpdatePutReq updateInfo) {
        User user=userRepository.findByLoginId(updateInfo.getLoginId());
        if(!passwordEncoder.matches(updateInfo.getNowPassword(),user.getPassword())) {
            return false;
        }

        String password = Optional.ofNullable(updateInfo.getChangePassword()).map(passwordEncoder::encode).orElse(user.getPassword());
        user.setPassword(password);
        String phone = Optional.ofNullable(updateInfo.getPhone()).orElse(user.getPhone());
        user.setPhone(phone);
        String email = Optional.ofNullable(updateInfo.getEmail()).orElse(user.getEmail());
        user.setEmail(email);

        userRepository.save(user);
        return true;
    }

    public boolean delete(UserDeleteReq deleteInfo) {
        User user=userRepository.findByLoginId(deleteInfo.getLoginId());
        if(!passwordEncoder.matches(deleteInfo.getPassword(), user.getPassword())) {
            return false;
        }

        userRepository.delete(user);
        return true;
    }
}
