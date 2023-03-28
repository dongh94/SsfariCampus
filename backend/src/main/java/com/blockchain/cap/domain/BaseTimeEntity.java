package com.blockchain.cap.domain;

import lombok.Getter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.EntityListeners;
import javax.persistence.MappedSuperclass;
import java.time.LocalDateTime;

@Getter
@MappedSuperclass // 해당 Entity 를 상속할 경우, 상속되는 필드를 칼럼으로 자동으로 인식시키는 세팅
@EntityListeners(AuditingEntityListener.class) // SpringDataJPA 에서 자동으로 값을 넣어주는 세팅
public class BaseTimeEntity {

    @CreatedDate // Entity 가 생성되어 저장될 때 시간이 자동 저장
    private LocalDateTime createdAt;
    @LastModifiedDate // 조회한 Entity 의 값 변경이 이뤄질 때 시간이 자동 저장
    private LocalDateTime updateAt;

}
