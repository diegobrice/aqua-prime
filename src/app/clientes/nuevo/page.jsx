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
import { useFormik } from 'formik';
import { clientValidationSchema } from '@/schemas';

const NewClient = () => {
  const moduleName = 'client';
  const [categories, setCategories] = useState([]);
  const [initialData, setInitialData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const params = useParams();

  const getClient = async () => {
    setIsLoading(true);
    const data = await getModuleItem(moduleName, params.id);
    data.clientCategory = { name: data.clientCategory };
    setInitialData(data);
    setIsLoading(false);
  };

  const cardTitle = params.id ? 'Editar Cliente' : 'Nuevo Cliente';

  const getClientCategories = async () => {
    const data = await getModuleItems('clientCategory');
    const formattedData = data.map((el) => ({ name: el.name }));
    setCategories(formattedData);
  };

  useEffect(() => {
    getClientCategories();
    if (params.id) {
      getClient();
    }
  }, [params.id]);

  const MyForm = ({ initialData }) => {
    const createClient = async () => {
      try {
        const res = await createModuleItem(moduleName, formik.values);
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
        const res = await updateModuleItem(
          moduleName,
          params.id,
          formik.values
        );
        if (res.status === 200) {
          router.push('/clientes');
          router.refresh();
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    const handleSubmit = async () => {
      formik.values.clientCategory = formik.values.clientCategory.name;
      if (!params.id) {
        await createClient();
      } else {
        await updateClient();
      }
    };

    const formik = useFormik({
      initialValues: initialData,
      validationSchema: clientValidationSchema,
      onSubmit: handleSubmit,
    });

    const isFormFieldValid = (name) =>
      !!(formik.touched[name] && formik.errors[name]);

    const getFormErrorMessage = (name) => {
      return (
        isFormFieldValid(name) && (
          <small className="p-error">{formik.errors[name]}</small>
        )
      );
    };

    return (
      <form onSubmit={formik.handleSubmit}>
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
              <label htmlFor="name">Nombre*</label>
              <InputText
                id="name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {getFormErrorMessage('name')}
            </FormGroup>
            <FormGroup>
              <label htmlFor="address">Dirección*</label>
              <InputText
                id="address"
                name="address"
                value={formik.values.address}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {getFormErrorMessage('address')}
            </FormGroup>
            <FormGroup>
              <label htmlFor="addressTwo">Referencia</label>
              <InputText
                id="addressTwo"
                name="addressTwo"
                value={formik.values.addressTwo}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor="phoneNumber">Celular</label>
              <InputMask
                id="phoneNumber"
                name="phoneNumber"
                mask="999-999-999"
                placeholder="999-999-999"
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              ></InputMask>
            </FormGroup>
            <FormGroup>
              <label htmlFor="additionalPhoneNumber">Celular 2</label>
              <InputMask
                id="additionalPhoneNumber"
                name="additionalPhoneNumber"
                mask="999-999-999"
                placeholder="999-999-999"
                value={formik.values.additionalPhoneNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              ></InputMask>
            </FormGroup>
            <FormGroup>
              <label htmlFor="clientCategory">Tipo Cliente*</label>
              <Dropdown
                id="clientCategory"
                name="clientCategory"
                options={categories}
                optionLabel="name"
                placeholder="Selecciona un tipo"
                value={formik.values.clientCategory}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {getFormErrorMessage('clientCategory')}
            </FormGroup>
          </>
        )}
        <FormGroup>
          <Button
            type="submit"
            label="Guardar"
            className="w-full mt-4"
            disabled={
              isLoading || !formik.isValid || (!params.id && !formik.dirty)
            }
          />
        </FormGroup>
      </form>
    );
  };

  return (
    <>
      <Link href="/clientes" className="mb-6 block">
        <i className="pi pi-arrow-left mr-2"></i>Volver
      </Link>
      <Card title={cardTitle}>
        <MyForm initialData={initialData} />
      </Card>
    </>
  );
};

export default NewClient;
