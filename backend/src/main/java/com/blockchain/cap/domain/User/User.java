package com.blockchain.cap.domain.User;

import com.blockchain.cap.domain.BaseTimeEntity;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name="USER_TABLE")
public class User extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(insertable=false, updatable=false) // 기본키는 변경될 일이 없으므로 읽기전용 설정
    private long id;

    @Enumerated(EnumType.STRING)
    private RoleType role;

    @Column(unique = true)
    private String loginId;
    @Column(nullable=false)
    private String password;
    @Column(nullable=false)
    private String phone;
    @Column(nullable=false)
    private String name;

    @Column
    private String email;
    @ColumnDefault("false")
    private boolean emailAuth;

    @Column
    private String companyNumber;
    @ColumnDefault("false")
    private boolean companyAuth;

    @Column
    private String wallet;
}
