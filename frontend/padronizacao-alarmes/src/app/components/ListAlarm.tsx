"use client";

import { useEffect, useState } from "react";

interface AlarmData {
  id: number;
  dispositivo: string;
  dadosPretendidos: string | null;
  observacoes: string | null;
  nomePadronizado: boolean;
  wks: boolean;
  ip: boolean;
  ping: boolean;
  uptime: boolean;
  fonteAlimentacao: boolean;
  memoria: boolean;
  temperatura: boolean;
  cpu: boolean;
  cooler: boolean;
  tensao: boolean;
  lanTraffic: boolean;
  wanTraffic: boolean;
  vlan50: boolean;
  vlan55: boolean;
  mpls201: boolean;
  mpls508: boolean;
  destinatarioSyslog: boolean;
  netflowV9: boolean;
  syslogAtualizado: boolean;
}

export default function ListAlarms() {
  const [data, setData] = useState<AlarmData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/firewall');
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Erro ao buscar dados", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Dados do Firewall</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Dispositivo</th>
            <th>Dados Pretendidos</th>
            <th>Observações</th>
            <th>Nome Padronizado</th>
            <th>WKS</th>
            <th>IP</th>
            <th>Ping</th>
            <th>Uptime</th>
            <th>Fonte de Alimentação</th>
            <th>Memória</th>
            <th>Temperatura</th>
            <th>CPU</th>
            <th>Cooler</th>
            <th>Tensão</th>
            <th>LAN Traffic</th>
            <th>WAN Traffic</th>
            <th>VLAN 50</th>
            <th>VLAN 55</th>
            <th>MPLS 201</th>
            <th>MPLS 508</th>
            <th>Destinatário Syslog</th>
            <th>Netflow V9</th>
            <th>Syslog Atualizado</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.dispositivo}</td>
              <td>{item.dadosPretendidos}</td>
              <td>{item.observacoes}</td>
              <td>{item.nomePadronizado ? "Sim" : "Não"}</td>
              <td>{item.wks ? "Sim" : "Não"}</td>
              <td>{item.ip ? "Sim" : "Não"}</td>
              <td>{item.ping ? "Sim" : "Não"}</td>
              <td>{item.uptime ? "Sim" : "Não"}</td>
              <td>{item.fonteAlimentacao ? "Sim" : "Não"}</td>
              <td>{item.memoria ? "Sim" : "Não"}</td>
              <td>{item.temperatura ? "Sim" : "Não"}</td>
              <td>{item.cpu ? "Sim" : "Não"}</td>
              <td>{item.cooler ? "Sim" : "Não"}</td>
              <td>{item.tensao ? "Sim" : "Não"}</td>
              <td>{item.lanTraffic ? "Sim" : "Não"}</td>
              <td>{item.wanTraffic ? "Sim" : "Não"}</td>
              <td>{item.vlan50 ? "Sim" : "Não"}</td>
              <td>{item.vlan55 ? "Sim" : "Não"}</td>
              <td>{item.mpls201 ? "Sim" : "Não"}</td>
              <td>{item.mpls508 ? "Sim" : "Não"}</td>
              <td>{item.destinatarioSyslog ? "Sim" : "Não"}</td>
              <td>{item.netflowV9 ? "Sim" : "Não"}</td>
              <td>{item.syslogAtualizado ? "Sim" : "Não"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
