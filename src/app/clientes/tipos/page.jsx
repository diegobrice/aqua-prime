import ContentView from '@/components/ContentView';
import clientCategory from '@/models/client/clientCategory';
import { connectDB } from '@/utils/mongoose';
import Link from 'next/link';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';

const loadClientCategories = async () => {
  connectDB();
  const clientCategories = await clientCategory.find();
  return clientCategories;
};

const ClientCategories = async () => {
  const clientCategories = await loadClientCategories();

  return (
    <>
      <Link href="/clientes" className="mb-6 block">
        <i className="pi pi-arrow-left mr-2"></i>Volver
      </Link>
      <Card title="Lista de tipos de Cliente" className="mb-6">
        <ContentView categories={clientCategories} />
        <Link href="/clientes/tipos/nuevo">
          <Button label="Nuevo tipo de cliente" className="w-full mt-4" />
        </Link>
      </Card>
    </>
  );
};

export default ClientCategories;
