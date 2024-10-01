package com.projeto.demo.repository;

import com.projeto.demo.model.FirewallModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FirewallRepository extends JpaRepository<FirewallModel, Integer> {
  boolean existsByDispositivo(String dispositivo);
}
