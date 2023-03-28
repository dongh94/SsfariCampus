package com.blockchain.cap.domain.Auth;

import org.springframework.data.jpa.repository.JpaRepository;

public interface RefreshRepository extends JpaRepository<Refresh, Long> {

    Refresh findByRefreshToken(String refreshToken);

}
