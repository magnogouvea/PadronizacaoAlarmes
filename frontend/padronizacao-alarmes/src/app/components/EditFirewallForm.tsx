import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface EditFirewallFormProps {
  editedData: AlarmData;
  onChange: (data: AlarmData) => void;
  onSave: () => void;
  onCancel: () => void;
}

export function EditFirewallForm({ editedData, onChange, onSave, onCancel }: EditFirewallFormProps) {
  return (
    <>
      <td>{editedData.id}</td>
      <td>
        <Input
          value={editedData.dispositivo}
          onChange={(e) => onChange({ ...editedData, dispositivo: e.target.value })}
        />
      </td>
      <td>
        <Input
          value={editedData.dadosPretendidos || ''}
          onChange={(e) => onChange({ ...editedData, dadosPretendidos: e.target.value })}
        />
      </td>
      <td>
        <Input
          value={editedData.observacoes || ''}
          onChange={(e) => onChange({ ...editedData, observacoes: e.target.value })}
        />
      </td>
      <td>
        <Button onClick={onSave}>Salvar</Button>
        <Button onClick={onCancel}>Cancelar</Button>
      </td>
    </>
  );
}
