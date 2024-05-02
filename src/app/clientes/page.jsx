'use client';
import Link from 'next/link';
import FormGroup from '@/components/FormGroup';
import { Card, Button } from '@/utils/primeComponents';
import { useEffect, useState } from 'react';
import ContentSkeleton from '@/components/Skeleton/ContentSkeleton';
import ContentView from '@/components/ContentView';
import { getModuleItems } from '@/services';

const Client = () => {
  const moduleName = 'client';
  const itemUrl = 'clientes';
  const [clients, setClients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getClients = async () => {
    const data = await getModuleItems(moduleName);
    setClients(data);
    setIsLoading(false);
  };

  useEffect(() => {
    getClients();
  }, []);
  return (
    <>
      <Link href="/" className="mb-6 block">
        <i className="pi pi-arrow-left mr-2"></i>Volver
      </Link>
      <Card title="Lista de Clientes" className="mb-6">
        {isLoading ? (
          <ContentSkeleton />
        ) : (
          <>
            <ContentView
              items={clients}
              moduleName={moduleName}
              itemUrl={itemUrl}
              setClientCategories={setClients}
            />
          </>
        )}
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
