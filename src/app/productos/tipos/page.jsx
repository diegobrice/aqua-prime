'use client';
import Link from 'next/link';
import { Card, Button } from '@/utils/primeComponents';
import ContentView from '@/components/ContentView';
import { getModuleItems } from '@/services';
import { useEffect, useState } from 'react';
import ContentSkeleton from '@/components/Skeleton/ContentSkeleton';

const ProductCategories = () => {
  const moduleName = 'productCategory';
  const itemUrl = 'productos/tipos';
  const [productCategories, setProductCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getProductCategories = async () => {
    const data = await getModuleItems(moduleName);
    setProductCategories(data);
    setIsLoading(false);
  };

  useEffect(() => {
    getProductCategories();
  }, []);

  return (
    <>
      <Link href="/productos" className="mb-6 block">
        <i className="pi pi-arrow-left mr-2"></i>Volver
      </Link>
      <Card title="Lista de tipos de Producto" className="mb-6">
        {isLoading ? (
          <ContentSkeleton />
        ) : (
          <>
            <ContentView
              items={productCategories}
              moduleName={moduleName}
              itemUrl={itemUrl}
              setCategories={setProductCategories}
            />
          </>
        )}
        <Link href="/productos/tipos/nuevo">
          <Button label="Nuevo tipo de producto" className="w-full mt-4" />
        </Link>
      </Card>
    </>
  );
};

export default ProductCategories;
