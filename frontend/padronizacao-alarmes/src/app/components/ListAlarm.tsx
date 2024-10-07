"use client";

import { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import SendAlarmData from "../inputList/page";

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
  const [searchTerm, setSearchTerm] = useState("");
  const [IsModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/firewall");
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

  const filteredData = data.filter((item) =>
    item.dispositivo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className="text-center text-xl">Loading...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dados do Firewall</h1>
      <input
        type="text"
        placeholder="Busca de dispositivo"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded w-full"
      />
      <button
        className="mb-4 bg-blue-500 text-white py-2 px-4 rounded"
        onClick={() => setIsModalOpen(true)}
      >
        Adiciona novo dispositivo
      </button>
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-black text-white">
            {[
              "ID",
              "Dispositivo",
              "Dados Pretendidos",
              "Observações",
              "Nome Padronizado",
              "WKS",
              "IP",
              "Ping",
              "Uptime",
              "Fonte de Alimentação",
              "Memória",
              "Temperatura",
              "CPU",
              "Cooler",
              "Tensão",
              "LAN Traffic",
              "WAN Traffic",
              "VLAN 50",
              "VLAN 55",
              "MPLS 201",
              "MPLS 508",
              "Destinatário Syslog",
              "Netflow V9",
              "Syslog Atualizado",
            ].map((header) => (
              <th key={header} className="border border-gray-300 px-4 py-2">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredData.length === 0 ? (
            <tr>
              <td colSpan={24} className="text-center py-4">
                Nenhum dado encontrado
              </td>
            </tr>
          ) : (
            filteredData.map((item) => (
              <tr key={item.id} className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">{item.id}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.dispositivo}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.dadosPretendidos}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.observacoes}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.nomePadronizado ? "Sim" : "Não"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.wks ? "Sim" : "Não"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.ip ? "Sim" : "Não"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.ping ? "Sim" : "Não"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.uptime ? "Sim" : "Não"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.fonteAlimentacao ? "Sim" : "Não"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.memoria ? "Sim" : "Não"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.temperatura ? "Sim" : "Não"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.cpu ? "Sim" : "Não"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.cooler ? "Sim" : "Não"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.tensao ? "Sim" : "Não"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.lanTraffic ? "Sim" : "Não"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.wanTraffic ? "Sim" : "Não"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.vlan50 ? "Sim" : "Não"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.vlan55 ? "Sim" : "Não"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.mpls201 ? "Sim" : "Não"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.mpls508 ? "Sim" : "Não"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.destinatarioSyslog ? "Sim" : "Não"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.netflowV9 ? "Sim" : "Não"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.syslogAtualizado ? "Sim" : "Não"}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <Dialog open={IsModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg ">
            <h2 className="text-2xl font-bold mb-4">
              Adicionar Novo Dispositivo
            </h2>
            <SendAlarmData />{" "}
            <button
              className="mt-4 bg-black text-white py-2 px-4 rounded"
              onClick={() => setIsModalOpen(false)}
            >
              Fechar
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
