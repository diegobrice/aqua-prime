import Link from 'next/link';
import { connectDB } from '@/utils/mongoose';
import { Card, Button } from '@/utils/primeComponents';
import clientCategory from '@/models/client/clientCategory';
import ContentView from '@/components/ContentView';

const loadClientCategories = async () => {
  connectDB();
  const clientCategories = await clientCategory.find();
  return clientCategories;
};

const ClientCategories = async () => {
  const moduleName = 'clientCategory';
  const itemUrl = 'clientes/tipos';
  const clientCategories = await loadClientCategories();

  return (
    <>
      <Link href="/clientes" className="mb-6 block">
        <i className="pi pi-arrow-left mr-2"></i>Volver
      </Link>
      <Card title="Lista de tipos de Cliente" className="mb-6">
        <ContentView
          elements={clientCategories}
          moduleName={moduleName}
          itemUrl={itemUrl}
        />
        <Link href="/clientes/tipos/nuevo">
          <Button label="Nuevo tipo de cliente" className="w-full mt-4" />
        </Link>
      </Card>
    </>
  );
};

export default ClientCategories;
