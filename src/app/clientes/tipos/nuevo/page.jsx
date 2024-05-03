'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getModuleItem, createModuleItem, updateModuleItem } from '@/services';
import { Card, Button, InputText, Skeleton } from '@/utils/primeComponents';
import FormGroup from '@/components/FormGroup';
import { useFormik } from 'formik';
import { clientCategoryValidationSchema } from '@/schemas';

const ClientCategory = () => {
  const moduleName = 'clientCategory';
  const router = useRouter();
  const params = useParams();
  const [initialData, setInitialData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const getClientCategory = async () => {
    setIsLoading(true);
    const data = await getModuleItem(moduleName, params.id);
    setInitialData(data);
    setIsLoading(false);
  };

  const cardTitle = params.id
    ? 'Editar tipo de cliente'
    : 'Nuevo tipo de cliente';

  useEffect(() => {
    if (params.id) {
      getClientCategory();
    }
  }, [params.id]);

  const MyForm = ({ initialData }) => {
    const createClientCategory = async () => {
      try {
        const res = await createModuleItem(moduleName, formik.values);
        if (res.status === 200) {
          router.push('/clientes/tipos');
          router.refresh();
        }
      } catch (error) {
        //TODO: VALIDATE ITEM DOESNT EXIST IN DB
        console.log(error.message);
      }
    };

    const updateClientCategory = async () => {
      try {
        await updateModuleItem(moduleName, params.id, formik.values);
        router.push('/clientes/tipos');
        router.refresh();
      } catch (error) {
        //TODO: VALIDATE ITEM DOESNT EXIST IN DB
        console.log(error.message);
      }
    };

    const handleSubmit = async () => {
      if (!params.id) {
        await createClientCategory();
      } else {
        await updateClientCategory();
      }
    };

    const formik = useFormik({
      initialValues: initialData,
      validationSchema: clientCategoryValidationSchema,
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

    const validateNoDuplicate = () => {
      return false;
    };

    return (
      <form onSubmit={formik.handleSubmit}>
        {isLoading ? (
          <>
            <Skeleton height="2rem" width="10rem" className="mb-4"></Skeleton>
            <Skeleton height="2.5rem" className="mb-4"></Skeleton>
          </>
        ) : (
          <FormGroup>
            <label htmlFor="name">Nombre</label>
            <InputText
              id="name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {getFormErrorMessage('name')}
          </FormGroup>
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
      <Link href="/clientes/tipos" className="mb-6 block">
        <i className="pi pi-arrow-left mr-2"></i>Volver
      </Link>
      <Card title={cardTitle}>
        <MyForm initialData={initialData} />
      </Card>
    </>
  );
};

export default ClientCategory;
