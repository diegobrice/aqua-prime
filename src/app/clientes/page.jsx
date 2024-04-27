import Link from 'next/link';
import FormGroup from '@/components/FormGroup';
import { Card, Button } from '@/utils/primeComponents';

const Client = () => {
  return (
    <>
      <Card title="Lista de Clientes" className="mb-6">
        <ul className="flex gpa-x-4 flex-col gap-4">
          <li>
            <Link href="/clientes/1">Cliente 1</Link>
          </li>
          <li>
            <Link href="/clientes/2">Cliente 2</Link>
          </li>
        </ul>
        <FormGroup>
          <Link href="/clientes/nuevo">
            <Button label="Nuevo Cliente" className="w-full mt-12" />
          </Link>
        </FormGroup>
        <FormGroup>
          <Link href="/clientes/tipos">
            <Button label="Tipos de Cliente" className="w-full" />
          </Link>
        </FormGroup>
      </Card>
    </>
  );
};

export default Client;
