package com.projetopessoal.pradonizacaoalarmes.dtos;

public record FirewallDTO(
        @NotBlank(message = "Dispositivo não pode ser vazio")
        String dispositivo,
        boolean nomePadronizado,
        boolean wks,
        boolean ip,
        boolean ping,
        boolean uptime,
        boolean fonteAlimentacao,
        boolean memoria,
        boolean temperatura,
        boolean cpu,
        boolean cooler,
        boolean tensao,
        boolean lanTraffic,
        boolean wanTraffic,
        boolean vlan50,
        boolean vlan55,
        boolean mpls201,
        boolean mpls508,
        boolean desinatarioSyslog,
        boolean netflowV9,
        boolean syslogAtualizado
        ) {
}
