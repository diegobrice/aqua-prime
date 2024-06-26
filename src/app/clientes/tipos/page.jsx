'use client';
import Link from 'next/link';
import { Card, Button } from '@/utils/primeComponents';
import ContentView from '@/components/ContentView';
import { getModuleItems } from '@/services';
import { useEffect, useState } from 'react';
import ContentSkeleton from '@/components/Skeleton/ContentSkeleton';

const ClientCategories = () => {
  const moduleName = 'clientCategory';
  const itemUrl = 'clientes/tipos';
  const [clientCategories, setClientCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getClientCategories = async () => {
    const data = await getModuleItems(moduleName);
    setClientCategories(data);
    setIsLoading(false);
  };

  useEffect(() => {
    getClientCategories();
  }, []);

  return (
    <>
      <Link href="/clientes" className="mb-6 block">
        <i className="pi pi-arrow-left mr-2"></i>Volver
      </Link>
      <Card title="Lista de tipos de Cliente" className="mb-6">
        {isLoading ? (
          <ContentSkeleton />
        ) : (
          <>
            <ContentView
              items={clientCategories}
              moduleName={moduleName}
              itemUrl={itemUrl}
              setCategories={setClientCategories}
            />
          </>
        )}
        <Link href="/clientes/tipos/nuevo">
          <Button label="Nuevo tipo de cliente" className="w-full mt-4" />
        </Link>
      </Card>
    </>
  );
};

export default ClientCategories;
