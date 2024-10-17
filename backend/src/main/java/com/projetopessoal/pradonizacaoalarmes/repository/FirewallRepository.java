package com.projetopessoal.pradonizacaoalarmes.repository;

import com.projetopessoal.pradonizacaoalarmes.model.FirewallModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FirewallRepository extends JpaRepository<FirewallModel, Integer> {
  boolean existsByDispositivo(String dispositivo);
  Page<FirewallModel> findByDispositivoContainingIgnoreCase(String dispositivo, Pageable pageable);
}
