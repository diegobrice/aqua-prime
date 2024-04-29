'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getModuleItem, createModuleItem, updateModuleItem } from '@/services';
import { Card, Button, InputText } from '@/utils/primeComponents';
import FormGroup from '@/components/FormGroup';

const ClientCategory = () => {
  const moduleName = 'clientCategory';
  const [newClientCategory, setNewClientCategory] = useState({
    name: '',
  });
  const router = useRouter();
  const params = useParams();

  const getClientCategory = async () => {
    const data = await getModuleItem(moduleName, params.id);
    setNewClientCategory({ name: data.name });
  };

  const createClientCategory = async () => {
    try {
      const res = await createModuleItem(moduleName, newClientCategory);
      if (res.status === 200) {
        router.push('/clientes/tipos');
        router.refresh();
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const updateClientCategory = async () => {
    try {
      await updateModuleItem(
        moduleName,
        params.id,
        newClientCategory
      );
      router.push('/clientes/tipos');
      router.refresh();
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!params.id) {
      await createClientCategory();
    } else {
      await updateClientCategory();
    }
  };

  const handleChange = (e) => {
    setNewClientCategory({
      ...newClientCategory,
      [e.target.name]: e.target.value,
    });
  };

  const cardTitle = params.id
    ? 'Editar tipo de cliente'
    : 'Nuevo tipo de cliente';

  useEffect(() => {
    if (params.id) {
      getClientCategory();
    }
  }, [params.id]);

  return (
    <>
      <Link href="/clientes/tipos" className="mb-6 block">
        <i className="pi pi-arrow-left mr-2"></i>Volver
      </Link>
      <Card title={cardTitle}>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <label htmlFor="name">Nombre</label>
            <InputText
              onChange={handleChange}
              value={newClientCategory.name}
              name="name"
              id="name"
            />
          </FormGroup>
          <FormGroup>
            <Button type="submit" label="Guardar" className="w-full mt-4" />
          </FormGroup>
        </form>
      </Card>
    </>
  );
};

export default ClientCategory;
