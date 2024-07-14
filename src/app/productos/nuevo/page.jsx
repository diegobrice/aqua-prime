'use client';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import FormGroup from '@/components/FormGroup';
import {
  Button,
  Card,
  Dropdown,
  InputNumber,
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
import { productValidationSchema } from '@/schemas';

const NewProduct = () => {
  const moduleName = 'product';
  const [categories, setCategories] = useState([]);
  const [initialData, setInitialData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const params = useParams();

  const getProduct = async () => {
    setIsLoading(true);
    const data = await getModuleItem(moduleName, params.id);
    data.productCategory = { name: data.productCategory };
    setInitialData(data);
    setIsLoading(false);
  };

  const cardTitle = params.id ? 'Editar Producto' : 'Nuevo Producto';

  const getProductCategories = async () => {
    const data = await getModuleItems('productCategory');
    const formattedData = data.map((el) => ({ name: el.name }));
    setCategories(formattedData);
  };

  useEffect(() => {
    getProductCategories();
    if (params.id) {
      getProduct();
    }
  }, [params.id]);

  const MyForm = ({ initialData }) => {
    const createProduct = async () => {
      try {
        const res = await createModuleItem(moduleName, formik.values);
        if (res.status === 200) {
          router.push('/productos');
          router.refresh();
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    const updateProduct = async () => {
      try {
        const res = await updateModuleItem(
          moduleName,
          params.id,
          formik.values
        );
        if (res.status === 200) {
          router.push('/productos');
          router.refresh();
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    const handleSubmit = async () => {
      formik.values.productCategory = formik.values.productCategory.name;
      if (!params.id) {
        await createProduct();
      } else {
        await updateProduct();
      }
    };

    const formik = useFormik({
      initialValues: initialData,
      validationSchema: productValidationSchema,
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
              <label htmlFor="description">Descripcion*</label>
              <InputText
                id="description"
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {getFormErrorMessage('description')}
            </FormGroup>
            <FormGroup>
              <label htmlFor="price">Precio*</label>
              <InputNumber
                id="price"
                name="price"
                value={formik.values.price}
                onValueChange={formik.handleChange}
                onBlur={formik.handleBlur}
                mode="currency"
                currency="PEN"
                locale="es-PE"
              />
              {getFormErrorMessage('price')}
            </FormGroup>
            <FormGroup>
              <label htmlFor="productCategory">Tipo Producto*</label>
              <Dropdown
                id="productCategory"
                name="productCategory"
                options={categories}
                optionLabel="name"
                placeholder="Selecciona un tipo"
                value={formik.values.productCategory}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {getFormErrorMessage('productCategory')}
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
      <Link href="/productos" className="mb-6 block">
        <i className="pi pi-arrow-left mr-2"></i>Volver
      </Link>
      <Card title={cardTitle}>
        <MyForm initialData={initialData} />
      </Card>
    </>
  );
};

export default NewProduct;
