'use client';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import FormGroup from '@/components/FormGroup';
import {
  Button,
  Card,
  Dropdown,
  InputMask,
  InputText,
} from '@/utils/primeComponents';

const NewClient = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const categories = [
    { name: 'Hogar' },
    { name: 'Horeca' },
    { name: 'Horeca Top' },
    { name: 'Otros' },
  ];
  const params = useParams();
  const cardTitle = params.id ? 'Editar Cliente' : 'Nuevo Cliente';

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('submited');
  };

  return (
    <>
      <Card title={cardTitle}>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <label htmlFor="name">Nombre</label>
            <InputText id="name" />
          </FormGroup>
          <FormGroup>
            <label htmlFor="address">Direccion</label>
            <InputText id="address" />
          </FormGroup>
          <FormGroup>
            <label htmlFor="addressTwo">Referencia</label>
            <InputText id="addressTwo" />
          </FormGroup>
          <FormGroup>
            <label htmlFor="phoneNumber">Celular</label>
            <InputMask
              id="phoneNumber"
              mask="999-999-999"
              placeholder="999-999-999"
            ></InputMask>
          </FormGroup>
          <FormGroup>
            <label htmlFor="additionalPhoneNumber">Celular 2</label>
            <InputMask
              id="additionalPhoneNumber"
              mask="999-999-999"
              placeholder="999-999-999"
            ></InputMask>
          </FormGroup>
          <FormGroup>
            <label htmlFor="clientCategory">Tipo Cliente</label>
            <Dropdown
              id="clientCategory"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.value)}
              options={categories}
              optionLabel="name"
              placeholder="Selecciona un tipo"
            />
          </FormGroup>
          <FormGroup>
            <Button label="Guardar" className="w-full mt-4" />
          </FormGroup>
        </form>
      </Card>
    </>
  );
};

export default NewClient;
