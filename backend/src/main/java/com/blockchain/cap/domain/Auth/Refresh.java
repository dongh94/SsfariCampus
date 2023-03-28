package com.blockchain.cap.domain.Auth;

import com.blockchain.cap.domain.BaseTimeEntity;
import lombok.*;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class Refresh  extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(insertable=false, updatable=false) // 기본키는 변경될 일이 없으므로 읽기전용 설정
    private long id;

    @Column(nullable=false)
    private String refreshToken;
}
