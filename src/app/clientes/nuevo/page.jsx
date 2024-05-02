'use client';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import FormGroup from '@/components/FormGroup';
import {
  Button,
  Card,
  Dropdown,
  InputMask,
  InputText,
  Skeleton,
} from '@/utils/primeComponents';
import {
  createModuleItem,
  getModuleItem,
  getModuleItems,
  updateModuleItem,
} from '@/services';
import Link from 'next/link';

const NewClient = () => {
  const moduleName = 'client';
  const [newClient, setNewClient] = useState({});
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const params = useParams();

  const getClient = async () => {
    setIsLoading(true);
    const data = await getModuleItem(moduleName, params.id);
    setNewClient(data);
    setSelectedCategory({ name: data.clientCategory });
    setIsLoading(false);
  };

  const createClient = async () => {
    try {
      const res = await createModuleItem(moduleName, newClient);
      if (res.status === 200) {
        router.push('/clientes');
        router.refresh();
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const updateClient = async () => {
    try {
      await updateModuleItem(moduleName, params.id, newClient);
      router.push('/clientes');
      router.refresh();
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!params.id) {
      await createClient();
    } else {
      await updateClient();
    }
  };

  const handleChange = (e) => {
    if (e.target.name === 'clientCategory') {
      setNewClient({
        ...newClient,
        [e.target.name]: e.target.value.name,
      });
      setSelectedCategory(e.target.value);
    } else {
      setNewClient({
        ...newClient,
        [e.target.name]: e.target.value,
      });
    }
  };

  const cardTitle = params.id ? 'Editar Cliente' : 'Nuevo Cliente';

  const adaptClientCategoriesData = (data) => {
    const formattedData = data.map((el) => ({ name: el.name }));
    setCategories(formattedData);
  };

  const getClientCategories = async () => {
    const data = await getModuleItems('clientCategory');
    adaptClientCategoriesData(data);
  };

  useEffect(() => {
    getClientCategories();
    if (params.id) {
      getClient();
    }
  }, [params.id]);

  return (
    <>
      <Link href="/clientes" className="mb-6 block">
        <i className="pi pi-arrow-left mr-2"></i>Volver
      </Link>
      <Card title={cardTitle}>
        <form onSubmit={handleSubmit}>
          {isLoading ? (
            <>
              <Skeleton height="2rem" width="10rem" className="mb-2"></Skeleton>
              <Skeleton height="3rem" className="mb-4"></Skeleton>
              <Skeleton height="2rem" width="10rem" className="mb-2"></Skeleton>
              <Skeleton height="3rem" className="mb-4"></Skeleton>
              <Skeleton height="2rem" width="10rem" className="mb-2"></Skeleton>
              <Skeleton height="3rem" className="mb-4"></Skeleton>
              <Skeleton height="2rem" width="10rem" className="mb-2"></Skeleton>
              <Skeleton height="3rem" className="mb-4"></Skeleton>
              <Skeleton height="2rem" width="10rem" className="mb-2"></Skeleton>
              <Skeleton height="3rem" className="mb-4"></Skeleton>
              <Skeleton height="2rem" width="10rem" className="mb-2"></Skeleton>
              <Skeleton height="3rem" className="mb-4"></Skeleton>
            </>
          ) : (
            <>
              <FormGroup>
                <label htmlFor="name">Nombre</label>
                <InputText
                  onChange={handleChange}
                  value={newClient.name}
                  name="name"
                  id="name"
                />
              </FormGroup>
              <FormGroup>
                <label htmlFor="address">Direccion</label>
                <InputText
                  onChange={handleChange}
                  value={newClient.address}
                  name="address"
                  id="address"
                />
              </FormGroup>
              <FormGroup>
                <label htmlFor="addressTwo">Referencia</label>
                <InputText
                  onChange={handleChange}
                  value={newClient.addressTwo}
                  name="addressTwo"
                  id="addressTwo"
                />
              </FormGroup>
              <FormGroup>
                <label htmlFor="phoneNumber">Celular</label>
                <InputMask
                  onChange={handleChange}
                  value={newClient.phoneNumber}
                  name="phoneNumber"
                  id="phoneNumber"
                  mask="999-999-999"
                  placeholder="999-999-999"
                ></InputMask>
              </FormGroup>
              <FormGroup>
                <label htmlFor="additionalPhoneNumber">Celular 2</label>
                <InputMask
                  onChange={handleChange}
                  value={newClient.additionalPhoneNumber}
                  name="additionalPhoneNumber"
                  id="additionalPhoneNumber"
                  mask="999-999-999"
                  placeholder="999-999-999"
                ></InputMask>
              </FormGroup>
              <FormGroup>
                <label htmlFor="clientCategory">Tipo Cliente</label>
                <Dropdown
                  onChange={handleChange}
                  value={selectedCategory}
                  name="clientCategory"
                  id="clientCategory"
                  options={categories}
                  optionLabel="name"
                  placeholder="Selecciona un tipo"
                />
              </FormGroup>
            </>
          )}
          <FormGroup>
            <Button label="Guardar" className="w-full mt-4" />
          </FormGroup>
        </form>
      </Card>
    </>
  );
};

export default NewClient;
