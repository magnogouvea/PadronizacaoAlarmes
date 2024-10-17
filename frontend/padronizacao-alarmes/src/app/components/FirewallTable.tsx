import { Button } from '@/components/ui/button';

interface FirewallTableProps {
  data: AlarmData[];
  onEdit: (item: AlarmData) => void;
  onDelete: (id: number) => void;
}

export function FirewallTable({ data, onEdit, onDelete }: FirewallTableProps) {
  return (
    <table className="min-w-full bg-white">
      <thead className="bg-gray-100">
        <tr>
          <th>ID</th>
          <th>Dispositivo</th>
          <th>Dados Pretendidos</th>
          <th>Observações</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id} className="border-b">
            <td>{item.id}</td>
            <td>{item.dispositivo}</td>
            <td>{item.dadosPretendidos}</td>
            <td>{item.observacoes}</td>
            <td>
              <Button onClick={() => onEdit(item)}>Editar</Button>
              <Button onClick={() => onDelete(item.id)} className="ml-2">Excluir</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

