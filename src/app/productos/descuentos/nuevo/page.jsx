'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  getModuleItem,
  getModuleItems,
  createModuleItem,
  updateModuleItem,
} from '@/services';
import {
  Card,
  Button,
  Dropdown,
  InputNumber,
  Skeleton,
} from '@/utils/primeComponents';
import FormGroup from '@/components/FormGroup';
import { useFormik } from 'formik';
import { productDiscountValidationSchema } from '@/schemas';

const ProductDiscount = () => {
  const moduleName = 'productDiscount';
  const router = useRouter();
  const params = useParams();
  const [products, setProducts] = useState([]);
  const [productsList, setProductsList] = useState([]);
  const [clientCategories, setClientCategories] = useState([]);
  const [initialData, setInitialData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const getProductDiscount = async () => {
    setIsLoading(true);
    const data = await getModuleItem(moduleName, params.id);
    const products = await getModuleItems('product');
    const price = findProductPrice(products, data.product.name);
    data.price = price;
    setInitialData(data);
    setIsLoading(false);
  };

  const findProductPrice = (products, name) => {
    const product = products.find(
      (product) => product.name.toLowerCase() === name.toLowerCase()
    );
    return product ? product.price : null;
  };

  const cardTitle = params.id
    ? 'Editar producto con descuento'
    : 'Nuevo producto con descuento';

  const getProducts = async () => {
    const data = await getModuleItems('product');
    setProductsList(data);
    const formattedData = data.map((el) => ({ name: el.name }));
    setProducts(formattedData);
  };

  const getClientCategories = async () => {
    const data = await getModuleItems('clientCategory');
    const formattedData = data.map((el) => ({ name: el.name }));
    setClientCategories(formattedData);
  };

  useEffect(() => {
    getClientCategories();
    getProducts();
    if (params.id) {
      getProductDiscount();
    }
  }, [params.id]);

  const MyForm = ({ initialData }) => {
    const createProductDiscount = async () => {
      try {
        const res = await createModuleItem(moduleName, formik.values);
        if (res.status === 200) {
          router.push('/productos/descuentos');
          router.refresh();
        }
      } catch (error) {
        //TODO: VALIDATE ITEM DOESNT EXIST IN DB evitar duplicado
        console.log(error.message);
      }
    };

    const updateProductDiscount = async () => {
      try {
        const res = await updateModuleItem(
          moduleName,
          params.id,
          formik.values
        );
        if (res.status === 200) {
          router.push('/productos/descuentos');
          router.refresh();
        }
      } catch (error) {
        //TODO: VALIDATE ITEM DOESNT EXIST IN DB
        console.log(error.message);
      }
    };

    const handleSubmit = async () => {
      if (!params.id) {
        await createProductDiscount();
      } else {
        await updateProductDiscount();
      }
    };

    const formik = useFormik({
      initialValues: initialData,
      validationSchema: productDiscountValidationSchema,
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

    const findProductPriceByName = (name) => {
      const product = productsList.find(
        (product) => product.name.toLowerCase() === name.toLowerCase()
      );
      return product ? product.price : null;
    };

    const handleDropdownChange = (e) => {
      const price = findProductPriceByName(e.value.name);
      formik.setFieldValue('price', price);
      formik.handleChange(e);
    };

    return (
      <form onSubmit={formik.handleSubmit}>
        {isLoading ? (
          <>
            <Skeleton height="2rem" width="10rem" className="mb-4"></Skeleton>
            <Skeleton height="2.5rem" className="mb-4"></Skeleton>
            <Skeleton height="2rem" width="10rem" className="mb-4"></Skeleton>
            <Skeleton height="2.5rem" className="mb-4"></Skeleton>
            <Skeleton height="2rem" width="10rem" className="mb-4"></Skeleton>
            <Skeleton height="2.5rem" className="mb-4"></Skeleton>
            <Skeleton height="2rem" width="10rem" className="mb-4"></Skeleton>
            <Skeleton height="2.5rem" className="mb-4"></Skeleton>
          </>
        ) : (
          <>
            <FormGroup>
              <label htmlFor="product">Producto*</label>
              <Dropdown
                id="product"
                name="product"
                options={products}
                optionLabel="name"
                placeholder="Selecciona un producto"
                value={formik.values.product}
                onChange={handleDropdownChange}
                onBlur={formik.handleBlur}
              />
              {getFormErrorMessage('product')}
            </FormGroup>
            <FormGroup>
              <label htmlFor="clientCategory">Tipo Cliente*</label>
              <Dropdown
                id="clientCategory"
                name="clientCategory"
                options={clientCategories}
                optionLabel="name"
                placeholder="Selecciona un tipo"
                value={formik.values.clientCategory}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {getFormErrorMessage('clientCategory')}
            </FormGroup>
            <FormGroup>
              <label htmlFor="price">Precio Regular*</label>
              <InputNumber
                id="price"
                name="price"
                value={formik.values.price}
                mode="currency"
                currency="PEN"
                locale="es-PE"
                disabled
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor="discountedPrice">Nuevo Precio*</label>
              <InputNumber
                id="discountedPrice"
                name="discountedPrice"
                value={formik.values.discountedPrice}
                onValueChange={formik.handleChange}
                onBlur={formik.handleBlur}
                mode="currency"
                currency="PEN"
                locale="es-PE"
              />
              {getFormErrorMessage('discountedPrice')}
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
      <Link href="/productos/descuentos" className="mb-6 block">
        <i className="pi pi-arrow-left mr-2"></i>Volver
      </Link>
      <Card title={cardTitle}>
        <MyForm initialData={initialData} />
      </Card>
    </>
  );
};

export default ProductDiscount;
