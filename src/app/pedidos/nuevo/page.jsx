'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import ClientCard from '@/components/ClientCard';
import FormGroup from '@/components/FormGroup';
import ProductsView from '@/components/ProductsView';
import CartView from '@/components/CartView';
import {
  Button,
  Card,
  Dropdown,
  InputTextarea,
  Skeleton,
} from '@/utils/primeComponents';
import { createModuleItem, getModuleItems } from '@/services';
import Link from 'next/link';

const NewOrder = () => {
  const moduleName = 'order';
  const [isLoading, setIsLoading] = useState(true);
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState('');
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [cart, setCart] = useState([]);
  const router = useRouter();
  const inputRef = useRef(null);
  const cardTitle = 'Nuevo Pedido';

  const getClients = async () => {
    setIsLoading(true);
    const data = await getModuleItems('client');
    setClients(data);
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
    getProducts();
    getClients();
  }, []);

  const MyForm = () => {
    const createOrder = async (formData) => {
      try {
        const res = await createModuleItem(moduleName, formData);
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
        client: selectedClient,
        products: cart,
        status: 'pending',
        createdDate: new Date(),
        deliveredDate: null,
        observations: inputRef.current.value,
      };
      createOrder(formData);
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

    const handleCategoryDropdownChange = (e) => {
      setSelectedCategory({ name: e.target.value });
      const filteredProducts = products.filter(
        (p) => p.productCategory === e.target.value.name
      );
      setSelectedProducts(filteredProducts);
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
            <FormGroup>
              <label htmlFor="client">1. Seleccionar cliente:</label>
              <Dropdown
                id="client"
                name="client"
                options={clients}
                optionLabel="name"
                placeholder="Selecciona un cliente"
                value={selectedClient}
                onChange={(e) => setSelectedClient(e.target.value)}
              />
            </FormGroup>
            {selectedClient.name && <ClientCard client={selectedClient} />}
            {selectedClient.name && (
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
                          setSelectedCategory(category);
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
            <FormGroup>
              <label htmlFor="observations">Observaciones:</label>
              <InputTextarea
                autoResize
                id="observations"
                name="observations"
                ref={inputRef}
              />
            </FormGroup>
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

export default NewOrder;
