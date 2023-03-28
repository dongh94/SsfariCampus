package com.blockchain.cap.domain.Goods;

import com.blockchain.cap.domain.BaseTimeEntity;
import com.blockchain.cap.domain.User.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class Goods extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(insertable=false, updatable=false) // 기본키는 변경될 일이 없으므로 읽기전용 설정
    private long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "seller_id")
    private User seller;
    @Enumerated(EnumType.STRING)
    private Categorie categoryId;

    @Column(nullable=false)
    private String title;
    @Column(nullable=false)
    private int sellPrice;
    @Column(nullable=false)
    private int viewCount;
    @Column(nullable=false)
    private String goodsDescription;

}
