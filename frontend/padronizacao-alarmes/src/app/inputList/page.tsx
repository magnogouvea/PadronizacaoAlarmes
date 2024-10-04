"use client";

import { useState } from "react";

interface AlarmData {
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

export default function SendAlarmData() {
  const [formData, setFormData] = useState<AlarmData>({
    dispositivo: '',
    dadosPretendidos: '',
    observacoes: '',
    nomePadronizado: false,
    wks: false,
    ip: false,
    ping: false,
    uptime: false,
    fonteAlimentacao: false,
    memoria: false,
    temperatura: false,
    cpu: false,
    cooler: false,
    tensao: false,
    lanTraffic: false,
    wanTraffic: false,
    vlan50: false,
    vlan55: false,
    mpls201: false,
    mpls508: false,
    destinatarioSyslog: false,
    netflowV9: false,
    syslogAtualizado: false,
  });

  const [responseMessage, setResponseMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const finalValue = type === 'checkbox' ? checked : value || '';
    setFormData({
      ...formData,
      [name]: finalValue,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/firewall', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Erro ao enviar os dados');
      }

      setResponseMessage('Dados enviados com sucesso!');
    } catch (error) {
      setResponseMessage('Erro ao enviar os dados.');
      console.error('Erro:', error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6">Enviar Dados do Dispositivo</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-1">
          <label className="block mb-2 text-lg font-semibold">Dispositivo:</label>
          <input
            type="text"
            name="dispositivo"
            value={formData.dispositivo}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded p-3 text-lg"
          />
        </div>

        <div className="col-span-1">
          <label className="block mb-2 text-lg font-semibold">Dados Pretendidos:</label>
          <input
            type="text"
            name="dadosPretendidos"
            value={formData.dadosPretendidos || ''}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-3 text-lg"
          />
        </div>

        <div className="col-span-1">
          <label className="block mb-2 text-lg font-semibold">Observações:</label>
          <input
            type="text"
            name="observacoes"
            value={formData.observacoes || ''}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-3 text-lg"
          />
        </div>

        {[
          { label: 'Nome Padronizado', name: 'nomePadronizado' },
          { label: 'WKS', name: 'wks' },
          { label: 'IP', name: 'ip' },
          { label: 'Ping', name: 'ping' },
          { label: 'Uptime', name: 'uptime' },
          { label: 'Fonte de Alimentação', name: 'fonteAlimentacao' },
          { label: 'Memória', name: 'memoria' },
          { label: 'Temperatura', name: 'temperatura' },
          { label: 'CPU', name: 'cpu' },
          { label: 'Cooler', name: 'cooler' },
          { label: 'Tensão', name: 'tensao' },
          { label: 'LAN Traffic', name: 'lanTraffic' },
          { label: 'WAN Traffic', name: 'wanTraffic' },
          { label: 'VLAN 50', name: 'vlan50' },
          { label: 'VLAN 55', name: 'vlan55' },
          { label: 'MPLS 201', name: 'mpls201' },
          { label: 'MPLS 508', name: 'mpls508' },
          { label: 'Destinatário Syslog', name: 'destinatarioSyslog' },
          { label: 'Netflow V9', name: 'netflowV9' },
          { label: 'Syslog Atualizado', name: 'syslogAtualizado' },
        ].map(({ label, name }) => (
          <div key={name} className="col-span-1 flex items-center">
            <input
              type="checkbox"
              name={name}
              checked={formData[name]}
              onChange={handleChange}
              className="form-checkbox h-6 w-6 text-blue-600 mr-2"
            />
            <label className="text-lg">{label}</label>
          </div>
        ))}

        <div className="col-span-1 md:col-span-3">
          <button type="submit" className="w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600 transition text-lg">
            Enviar
          </button>
        </div>
      </form>

      {responseMessage && (
        <p className="mt-4 text-center text-green text-lg">{responseMessage}</p>
      )}
    </div>
  );
}
