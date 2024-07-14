'use client';
import Link from 'next/link';
import { Card, Button } from '@/utils/primeComponents';
import ContentView from '@/components/ContentView';
import { getModuleItems } from '@/services';
import { useEffect, useState } from 'react';
import ContentSkeleton from '@/components/Skeleton/ContentSkeleton';

const ProductDiscounts = () => {
  const moduleName = 'productDiscount';
  const itemUrl = 'productos/descuentos';
  const [productDescounts, setProductDescounts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getProductDiscounts = async () => {
    const data = await getModuleItems(moduleName);
    setProductDescounts(data);
    setIsLoading(false);
  };

  useEffect(() => {
    getProductDiscounts();
  }, []);

  return (
    <>
      <Link href="/productos" className="mb-6 block">
        <i className="pi pi-arrow-left mr-2"></i>Volver
      </Link>
      <Card title="Lista de Descuentos" className="mb-6">
        {isLoading ? (
          <ContentSkeleton />
        ) : (
          <>
            <ContentView
              items={productDescounts}
              moduleName={moduleName}
              itemUrl={itemUrl}
              setCategories={setProductDescounts}
            />
          </>
        )}
        <Link href="/productos/descuentos/nuevo">
          <Button label="Nuevo descuento" className="w-full mt-4" />
        </Link>
      </Card>
    </>
  );
};

export default ProductDiscounts;
