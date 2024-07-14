'use client';
import Link from 'next/link';
import FormGroup from '@/components/FormGroup';
import { Card, Button } from '@/utils/primeComponents';
import { useEffect, useState } from 'react';
import ContentSkeleton from '@/components/Skeleton/ContentSkeleton';
import ContentView from '@/components/ContentView';
import { getModuleItems } from '@/services';

const Product = () => {
  const moduleName = 'product';
  const itemUrl = 'productos';
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getProducts = async () => {
    const data = await getModuleItems(moduleName);
    setProducts(data);
    setIsLoading(false);
  };

  useEffect(() => {
    getProducts();
  }, []);
  return (
    <>
      <Link href="/" className="mb-6 block">
        <i className="pi pi-arrow-left mr-2"></i>Volver
      </Link>
      <Card title="Lista de Productos" className="mb-6">
        {isLoading ? (
          <ContentSkeleton />
        ) : (
          <>
            <ContentView
              items={products}
              moduleName={moduleName}
              itemUrl={itemUrl}
              setCategories={setProducts}
            />
          </>
        )}
        <FormGroup>
          <Link href="/productos/nuevo">
            <Button label="Nuevo Producto" className="w-full mt-12" />
          </Link>
        </FormGroup>
        <FormGroup>
          <Link href="/productos/descuentos">
            <Button label="Descuentos" className="w-full" />
          </Link>
        </FormGroup>
        <FormGroup>
          <Link href="/productos/tipos">
            <Button label="Tipos de Productos" className="w-full" />
          </Link>
        </FormGroup>
      </Card>
    </>
  );
};

export default Product;
