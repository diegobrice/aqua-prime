'use client';
import Link from 'next/link';
import FormGroup from '@/components/FormGroup';
import {
  Card,
  Button,
  TabPanel,
  TabView,
  ConfirmDialog,
} from '@/utils/primeComponents';
import { useEffect, useState } from 'react';
import ContentSkeleton from '@/components/Skeleton/ContentSkeleton';
import OrderView from '@/components/OrderView';
import { getModuleItems } from '@/services';
import OrderCard from '@/components/OrderCard';

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

  const deleteItem = (id) => {
    const newItems = pendingOrders.filter((el) => el._id !== id);
    setPendingOrders(newItems);
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
            <ConfirmDialog />
            <TabView>
              <TabPanel header="Pendientes">
                {/* <OrderView
                  moduleName="order"
                  items={pendingOrders}
                  itemUrl={itemUrl}
                  setCategories={setPendingOrders}
                  editable
                ></OrderView> */}
                {pendingOrders &&
                  pendingOrders.map((order) => {
                    return (
                      <OrderCard
                        order={order}
                        moduleName="order"
                        itemUrl={itemUrl}
                        setCategories={setPendingOrders}
                        editable
                        deleteItem={deleteItem}
                        key={order._id}
                      ></OrderCard>
                    );
                  })}
                {pendingOrders.length === 0 && (
                  <h2 className="text-center mt-4">
                    <i className="pi pi-info-circle"></i> Sin elementos que
                    mostrar
                  </h2>
                )}
              </TabPanel>
              <TabPanel header="Completadas">
                {/* <OrderView
                  moduleName="order"
                  items={completedOrders}
                  itemUrl={itemUrl}
                ></OrderView> */}
                {completedOrders &&
                  completedOrders.map((order) => {
                    return (
                      <OrderCard
                        order={order}
                        moduleName="order"
                        itemUrl={itemUrl}
                        setCategories={setCompletedOrders}
                        editable
                        deleteItem={deleteItem}
                        key={order._id}
                      ></OrderCard>
                    );
                  })}
                {completedOrders.length === 0 && (
                  <h2 className="text-center mt-4">
                    <i className="pi pi-info-circle"></i> Sin elementos que
                    mostrar
                  </h2>
                )}
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
