'use client';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import FormGroup from '@/components/FormGroup';
import Link from 'next/link';

const ClientCategory = () => {
  const [newClientCategory, setNewClientCategory] = useState({
    name: '',
  });
  const router = useRouter();
  const params = useParams();

  const getClientCategory = async () => {
    const res = await fetch(`/api/client/category/${params.id}`);
    const data = await res.json();
    setNewClientCategory({ name: data.name });
  };

  const createClientCategory = async () => {
    try {
      const res = await fetch('/api/client/category', {
        method: 'POST',
        body: JSON.stringify(newClientCategory),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();

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
      const res = await fetch(`/api/client/category/${params.id}`, {
        method: 'PUT',
        body: JSON.stringify(newClientCategory),
        headers: {
          'Content-Type': 'application/json',
        },
      });
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

  const handleDelete = async () => {
    try {
      if (window.confirm('Are you sure to delete?')) {
        const res = await fetch(`/api/client/category/${params.id}`, {
          method: 'DELETE',
        });
        router.push('/clientes/tipos');
        router.refresh();
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleChange = (e) => {
    console.log(e);
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
  }, []);

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
          {params.id && (
            <FormGroup>
              <Button
                onClick={handleDelete}
                label="Eliminar"
                className="w-full mt-4"
              />
            </FormGroup>
          )}
        </form>
      </Card>
    </>
  );
};

export default ClientCategory;
