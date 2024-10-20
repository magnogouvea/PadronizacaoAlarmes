package com.projetopessoal.pradonizacaoalarmes.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.springframework.hateoas.RepresentationModel;

import java.io.Serial;
import java.io.Serializable;


@Data
@Entity
@Table(name = "firewall")
public class FirewallModel extends RepresentationModel<FirewallModel> implements Serializable {
  @Serial
  private static final long serialVersionUID = 1L;

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;
  @NotBlank(message = "Dispositivo não pode ser vazio")
  private String dispositivo;
  
  private String dadosPretendidos;
  private String observacoes;
  private boolean nomePadronizado;
  private boolean wks;
  private boolean ip;
  private boolean ping;
  private boolean uptime;
  private boolean fonteAlimentacao;
  private boolean memoria;
  private boolean temperatura;
  private boolean cpu;
  private boolean cooler;
  private boolean tensao;
  private boolean lanTraffic;
  private boolean wanTraffic;
  private boolean vlan50;
  private boolean vlan55;
  private boolean mpls201;
  private boolean mpls508;
  private boolean desinatarioSyslog;
  private boolean netflowV9;
  private boolean syslogAtualizado;
}
