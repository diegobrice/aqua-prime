'use client';
import Link from 'next/link';
import FormGroup from '@/components/FormGroup';
import { Card, Button } from '@/utils/primeComponents';
import { useEffect, useState } from 'react';
import ContentSkeleton from '@/components/Skeleton/ContentSkeleton';
import ContentView from '@/components/ContentView';
import { getModuleItems } from '@/services';

const Order = () => {
  const moduleName = 'order';
  const itemUrl = 'pedidos';
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getOrders = async () => {
    const data = await getModuleItems(moduleName);
    setOrders(data);
    setIsLoading(false);
  };

  useEffect(() => {
    getOrders();
  }, []);
  return (
    <>
      <Link href="/pedidos" className="mb-6 block">
        <i className="pi pi-arrow-left mr-2"></i>Volver
      </Link>
      <Card title="Vista Pedido" className="mb-6">
        {isLoading ? (
          <ContentSkeleton />
        ) : (
          <>
            <h2>Pedido #3123213</h2>
            <p>Detalle del pedido</p>
          </>
        )}
      </Card>
    </>
  );
};

export default Order;
