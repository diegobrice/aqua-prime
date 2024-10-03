'use client';
import Link from 'next/link';
import FormGroup from '@/components/FormGroup';
import { Card, Button, TabPanel, TabView } from '@/utils/primeComponents';
import { useEffect, useState } from 'react';
import ContentSkeleton from '@/components/Skeleton/ContentSkeleton';
import OrderView from '@/components/OrderView';
import { getModuleItems } from '@/services';

const Order = () => {
  const moduleName = 'order';
  const itemUrl = 'pedidos';
  const [pendingOrders, setPendingOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getOrders = async () => {
    const data = await getModuleItems(moduleName);
    const filteredPending = data.filter((order) => order.status === 'pending');
    const filteredCompleted = data.filter(
      (order) => order.status === 'completed'
    );
    setPendingOrders(filteredPending);
    setCompletedOrders(filteredCompleted);
    setIsLoading(false);
  };

  useEffect(() => {
    getOrders();
  }, []);
  return (
    <>
      <Link href="/" className="mb-6 block">
        <i className="pi pi-arrow-left mr-2"></i>Volver
      </Link>
      <Card title="Lista de Pedidos" className="mb-6">
        {isLoading ? (
          <ContentSkeleton />
        ) : (
          <>
            <TabView>
              <TabPanel header="Pendientes">
                <OrderView items={pendingOrders} itemUrl={itemUrl}></OrderView>
              </TabPanel>
              <TabPanel header="Completadas">
                <OrderView
                  items={completedOrders}
                  itemUrl={itemUrl}
                ></OrderView>
              </TabPanel>
            </TabView>
          </>
        )}
        <FormGroup>
          <Link href="/pedidos/nuevo">
            <Button label="Nuevo Pedido" className="w-full mt-12" />
          </Link>
        </FormGroup>
      </Card>
    </>
  );
};

export default Order;
