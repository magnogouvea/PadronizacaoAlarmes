import React, { useEffect, useState } from "react";
import { useMediaQuery } from '@/hooks/use-media-query';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Pagination } from '@/components/ui/pagination';
import { useToast } from '@/components/ui/use-toast';
import { FirewallTable } from './FirewallTable';
import { EditFirewallForm } from './EditFirewallForm';


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
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editedData, setEditedData] = useState<AlarmData | null>(null);
  const { toast } = useToast();
  const isMobile = useMediaQuery('(max-width: 768px)');

  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/firewall');
        const result = await response.json();
        setData(result.content);
      } catch (error) {
        console.error("Erro ao buscar dados", error);
        toast({
          title: "Erro",
          description: "Não foi possível carregar os dados dos firewalls.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [toast]);

  const handleEdit = (item: AlarmData) => {
    setEditingId(item.id);
    setEditedData(item);
  };

  const handleSave = async () => {
    if (!editedData) return;

    try {
      const response = await fetch(`http://localhost:8080/api/firewall/${editedData.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editedData),
      });

      if (response.ok) {
        setData(data.map(item => item.id === editedData.id ? editedData : item));
        setEditingId(null);
        setEditedData(null);
        toast({
          title: "Sucesso",
          description: "Dados do firewall atualizados com sucesso.",
          variant: "success",
        });
      }
    } catch (error) {
      console.error("Erro ao salvar dados", error);
      toast({
        title: "Erro",
        description: "Não foi possível atualizar os dados do firewall.",
        variant: "destructive",
      });
    }
  };

const createFirewall = async (data: AlarmData) => {
  const response = await fetch('/api/firewall', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (response.ok) {
    // Atualizar a lista de firewalls
  }
};

const updateFirewall = async (id: number, data: AlarmData) => {
  const response = await fetch(`/api/firewall?id=${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (response.ok) {
    // Atualizar a lista de firewalls
  }
};

const deleteFirewall = async (id: number) => {
  const response = await fetch(`/api/firewall?id=${id}`, { method: 'DELETE' });
  if (response.ok) {
    // Remover o firewall da lista
  }
};

  const filteredData = data.filter(item =>
    item.dispositivo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (isMobile) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Dados do Firewall</h1>
        <Input
          type="text"
          placeholder="Pesquisar por dispositivo"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-4"
        />
        {currentItems.map((item) => (
          <div key={item.id} className="card mb-4 p-4 border rounded shadow">
            <h2 className="text-xl font-semibold">{item.dispositivo}</h2>
            <p>ID: {item.id}</p>
            <p>Dados Pretendidos: {item.dadosPretendidos}</p>
            <p>Observações: {item.observacoes}</p>
            <p>Nome Padronizado: {item.nomePadronizado ? "Sim" : "Não"}</p>
            {/* Adicione mais campos conforme necessário */}
            <Button onClick={() => handleEdit(item)} className="mt-2">Editar</Button>
          </div>
        ))}
        <Pagination
          currentPage={currentPage}
          totalCount={filteredData.length}
          pageSize={itemsPerPage}
          onPageChange={setCurrentPage}
        />
      </div>
    );
  }

  return (
     <div>
      <h1>Dados do Firewall</h1>
      <Input
        type="text"
        placeholder="Pesquisar por dispositivo"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {editingId ? (
        <EditFirewallForm
          editedData={editedData!}
          onChange={setEditedData!}
          onSave={handleSave}
          onCancel={() => setEditingId(null)}
        />
      ) : (
        <FirewallTable
          data={currentItems}
          onEdit={handleEdit}
          onDelete={deleteFirewall}
        />
      )}
    </div>
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dados do Firewall</h1>
      <Input
        type="text"
        placeholder="Pesquisar por dispositivo"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4"
      />
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Dispositivo</th>
              <th className="px-4 py-2">Dados Pretendidos</th>
              <th className="px-4 py-2">Observações</th>
              <th className="px-4 py-2">Nome Padronizado</th>
              <th className="px-4 py-2">WKS</th>
              <th className="px-4 py-2">IP</th>
              <th className="px-4 py-2">Ping</th>
              <th className="px-4 py-2">Uptime</th>
              <th className="px-4 py-2">Fonte de Alimentação</th>
              <th className="px-4 py-2">Memória</th>
              <th className="px-4 py-2">Temperatura</th>
              <th className="px-4 py-2">CPU</th>
              <th className="px-4 py-2">Cooler</th>
              <th className="px-4 py-2">Tensão</th>
              <th className="px-4 py-2">LAN Traffic</th>
              <th className="px-4 py-2">WAN Traffic</th>
              <th className="px-4 py-2">VLAN 50</th>
              <th className="px-4 py-2">VLAN 55</th>
              <th className="px-4 py-2">MPLS 201</th>
              <th className="px-4 py-2">MPLS 508</th>
              <th className="px-4 py-2">Destinatário Syslog</th>
              <th className="px-4 py-2">Netflow V9</th>
              <th className="px-4 py-2">Syslog Atualizado</th>
              <th className="px-4 py-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item) => (
              <tr key={item.id} className="border-b">
                {editingId === item.id ? (
                  <>
                    <td className="px-4 py-2">{item.id}</td>
                    <td className="px-4 py-2">
                      <Input
                        value={editedData?.dispositivo || ''}
                        onChange={(e) => setEditedData({...editedData!, dispositivo: e.target.value})}
                      />
                    </td>
                    <td className="px-4 py-2">
                      <Input
                        value={editedData?.dadosPretendidos || ''}
                        onChange={(e) => setEditedData({...editedData!, dadosPretendidos: e.target.value})}
                      />
                    </td>
                    <td className="px-4 py-2">
                      <Input
                        value={editedData?.observacoes || ''}
                        onChange={(e) => setEditedData({...editedData!, observacoes: e.target.value})}
                      />
                    </td>
                    {/* Adicione inputs para os outros campos booleanos */}
                    <td className="px-4 py-2">
                      <Button onClick={handleSave} className="mr-2">Salvar</Button>
                      <Button onClick={() => setEditingId(null)}>Cancelar</Button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="px-4 py-2">{item.id}</td>
                    <td className="px-4 py-2">{item.dispositivo}</td>
                    <td className="px-4 py-2">{item.dadosPretendidos}</td>
                    <td className="px-4 py-2">{item.observacoes}</td>
                    <td className="px-4 py-2">{item.nomePadronizado ? "Sim" : "Não"}</td>
                    <td className="px-4 py-2">{item.wks ? "Sim" : "Não"}</td>
                    <td className="px-4 py-2">{item.ip ? "Sim" : "Não"}</td>
                    <td className="px-4 py-2">{item.ping ? "Sim" : "Não"}</td>
                    <td className="px-4 py-2">{item.uptime ? "Sim" : "Não"}</td>
                    <td className="px-4 py-2">{item.fonteAlimentacao ? "Sim" : "Não"}</td>
                    <td className="px-4 py-2">{item.memoria ? "Sim" : "Não"}</td>
                    <td className="px-4 py-2">{item.temperatura ? "Sim" : "Não"}</td>
                    <td className="px-4 py-2">{item.cpu ? "Sim" : "Não"}</td>
                    <td className="px-4 py-2">{item.cooler ? "Sim" : "Não"}</td>
                    <td className="px-4 py-2">{item.tensao ? "Sim" : "Não"}</td>
                    <td className="px-4 py-2">{item.lanTraffic ? "Sim" : "Não"}</td>
                    <td className="px-4 py-2">{item.wanTraffic ? "Sim" : "Não"}</td>
                    <td className="px-4 py-2">{item.vlan50 ? "Sim" : "Não"}</td>
                    <td className="px-4 py-2">{item.vlan55 ? "Sim" : "Não"}</td>
                    <td className="px-4 py-2">{item.mpls201 ? "Sim" : "Não"}</td>
                    <td className="px-4 py-2">{item.mpls508 ? "Sim" : "Não"}</td>
                    <td className="px-4 py-2">{item.destinatarioSyslog ? "Sim" : "Não"}</td>
                    <td className="px-4 py-2">{item.netflowV9 ? "Sim" : "Não"}</td>
                    <td className="px-4 py-2">{item.syslogAtualizado ? "Sim" : "Não"}</td>
                    <td className="px-4 py-2">
                      <Button onClick={() => handleEdit(item)}>Editar</Button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        currentPage={currentPage}
        totalCount={filteredData.length}
        pageSize={itemsPerPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
