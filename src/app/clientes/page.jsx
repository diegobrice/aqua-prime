'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import FormGroup from '@/components/FormGroup';
import { Card, Button, InputText } from '@/utils/primeComponents';
import { getModuleItems } from '@/services';
import ContentSkeleton from '@/components/Skeleton/ContentSkeleton';
import ContentView from '@/components/ContentView';

const Client = () => {
  const moduleName = 'client';
  const itemUrl = 'clientes';
  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const getClients = async () => {
    const data = await getModuleItems(moduleName);
    setClients(data);
    setFilteredClients(data);
    setIsLoading(false);
  };

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    const filtered = clients.filter((client) =>
      client.name.toLowerCase().includes(term)
    );
    setFilteredClients(filtered);
    setSearchTerm(term);
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
        <FormGroup>
          <InputText
            type="text"
            placeholder="Buscar por nombre"
            value={searchTerm}
            onChange={handleSearch}
          />
        </FormGroup>
        {isLoading ? (
          <ContentSkeleton />
        ) : (
          <>
            <ContentView
              items={filteredClients}
              moduleName={moduleName}
              itemUrl={itemUrl}
              setCategories={setClients}
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
