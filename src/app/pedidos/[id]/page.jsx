'use client';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import ClientCard from '@/components/ClientCard';
import FormGroup from '@/components/FormGroup';
import ProductsView from '@/components/ProductsView';
import CartView from '@/components/CartView';
import {
  Button,
  Card,
  InputText,
  InputTextarea,
  Skeleton,
  Dropdown,
  InputNumber,
} from '@/utils/primeComponents';
import { getModuleItems, getModuleItem, updateModuleItem } from '@/services';
import Link from 'next/link';
import { payMethods } from '@/utils/payMethods';

const EditOrder = () => {
  const moduleName = 'order';
  const [isLoading, setIsLoading] = useState(true);
  const [order, setOrder] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cart, setCart] = useState([]);
  const [orderDetails, setOrderDetails] = useState([]);
  const router = useRouter();
  const params = useParams();
  const cardTitle = 'Detalle del Pedido';

  const getOrder = async () => {
    const data = await getModuleItem(moduleName, params.id);
    setOrder(data);
    setCart(data.products);
    setIsLoading(false);
  };

  const getProducts = async () => {
    const data = await getModuleItems('product');
    const categoryData = [
      ...new Set(data.map((product) => product.productCategory)),
    ].map((categoria) => ({ name: categoria }));
    setCategories(categoryData);
    setProducts(data);
  };

  useEffect(() => {
    getOrder();
    getProducts();
  }, [params.id]);

  const MyForm = () => {
    const updateOrder = async (formData) => {
      try {
        const res = await updateModuleItem(moduleName, params.id, formData);
        if (res.status === 200) {
          router.push('/pedidos');
          router.refresh();
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      const formData = {
        ...order,
        products: cart,
        status: 'completed',
        deliveredDate: new Date(),
        payMethod: orderDetails.payMethod,
        amount: orderDetails.amount,
      };
      updateOrder(formData);
    };

    const handleChange = (e) => {
      setOrderDetails({ ...orderDetails, [e.target.name]: e.target.value });
    };

    const addToCart = (product) => {
      const existingProduct = cart.find((item) => item._id === product._id);

      if (existingProduct) {
        const updatedCart = cart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        setCart(updatedCart);
      } else {
        setCart([...cart, { ...product, quantity: 1 }]);
      }
    };

    return (
      <form onSubmit={handleSubmit}>
        {isLoading ? (
          <>
            <Skeleton height="2rem" width="10rem" className="mb-2"></Skeleton>
            <Skeleton height="3rem" className="mb-4"></Skeleton>
            <Skeleton height="2rem" width="10rem" className="mb-2"></Skeleton>
            <Skeleton height="6rem" className="mb-4"></Skeleton>
          </>
        ) : (
          <>
            <ClientCard client={order.client} />
            {order.client.name && (
              <div className="mt-6 mb-4">
                <p className="my-2">2. Agregar productos:</p>
                <div className="flex gap-2">
                  {categories.map((category) => {
                    return (
                      <Button
                        className="text-white bg-cyan-800 border-none"
                        key={category.name}
                        label={category.name}
                        onClick={() => {
                          const filteredProducts = products.filter(
                            (p) => p.productCategory === category.name
                          );
                          setSelectedProducts(filteredProducts);
                        }}
                      />
                    );
                  })}
                </div>
              </div>
            )}
            {products && (
              <ProductsView products={selectedProducts} addToCart={addToCart} />
            )}{' '}
            {cart.length > 0 && <CartView cart={cart} setCart={setCart} />}
            <div className="grid grid-cols-2 gap-4">
              <FormGroup>
                <label htmlFor="payMethod">Metodo de pago:</label>
                <Dropdown
                  id="payMethod"
                  name="payMethod"
                  options={payMethods}
                  optionLabel="name"
                  placeholder="Selecciona un tipo"
                  value={orderDetails.payMethod}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <label htmlFor="amount">Monto Total:</label>
                <InputNumber
                  id="amount"
                  name="amount"
                  mode="currency"
                  currency="PEN"
                  locale="es-PE"
                  value={orderDetails.amount}
                  onValueChange={handleChange}
                />
              </FormGroup>
            </div>
            {/* <FormGroup>
              <label htmlFor="observations">Observaciones:</label>
              <InputTextarea
                autoResize
                id="observations"
                name="observations"
                value={orderDetails.observations}
                onChange={handleChange}
              />
            </FormGroup> */}
          </>
        )}
        <FormGroup>
          <Button
            type="submit"
            label="Guardar"
            className="w-full mt-4"
            disabled={isLoading || cart.length === 0}
          />
        </FormGroup>
      </form>
    );
  };

  return (
    <>
      <Link href="/pedidos" className="mb-6 block">
        <i className="pi pi-arrow-left mr-2"></i>Volver
      </Link>
      <Card title={cardTitle}>
        <MyForm />
      </Card>
    </>
  );
};

export default EditOrder;
