import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useEffect } from 'react';

const CartView = ({ setAmount, cart, setCart, editable }) => {
  useEffect(() => {
    setAmount(getTotalPrice());
  }, []);

  const getTotalPrice = () => {
    console.log(cart.length);

    const totalPrice = cart.reduce(
      (acc, curr) => acc + curr.price * curr.quantity,
      0
    );
    return totalPrice.toFixed(2);
  };

  const increaseQuantity = (productId) => {
    const updatedCart = cart.map((item) =>
      item._id === productId ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updatedCart);
    setAmount(getTotalPrice());
  };

  const decreaseQuantity = (productId) => {
    const updatedCart = cart
      .map((item) =>
        item._id === productId ? { ...item, quantity: item.quantity - 1 } : item
      )
      .filter((item) => item.quantity > 0); // Remove cart with quantity 0
    setCart(updatedCart);
    if (updatedCart.length === 0) {
      setAmount(0);
    } else {
      setAmount(getTotalPrice());
    }
  };

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item._id !== productId);
    setCart(updatedCart);
  };

  const nameContent = (product) => (
    <div>
      <p>
        [{product.productCategory}] -
        <span className="font-bold"> {product.name}</span>
      </p>
      <p>{product.description}</p>
    </div>
  );

  const quantityContent = (product) => (
    <>
      {editable && (
        <div className="flex gap-2 justify-end">
          <button onClick={() => decreaseQuantity(product._id)}>
            <i className="pi pi-minus-circle"></i>
          </button>
          <span>{product.quantity}</span>
          <button onClick={() => increaseQuantity(product._id)}>
            <i className="pi pi-plus-circle"></i>
          </button>
        </div>
      )}
      {!editable && (
        <div className="flex gap-2 justify-center">
          <span className="text-center">{product.quantity}</span>
        </div>
      )}
    </>
  );

  const deleteContent = (product) => (
    <div className="flex gap-2">
      <button onClick={() => removeFromCart(product._id)}>
        <i className="pi pi-times-circle"></i>
      </button>
    </div>
  );

  const priceContent = (product) => (
    <div>
      <p>S/. {product.price.toFixed(2)}</p>
    </div>
  );

  const totalContent = (product) => (
    <div>
      <p className="font-bold">
        S/. {(product.price * product.quantity).toFixed(2)}
      </p>
    </div>
  );

  const footerTemplate = () => {
    const totalPrice = cart.reduce(
      (acc, curr) => acc + curr.price * curr.quantity,
      0
    );
    return (
      <div className="flex justify-end font-bold w-full">
        <p>S/. {totalPrice.toFixed(2)}</p>
      </div>
    );
  };

  return (
    <div className="card mb-4">
      <DataTable
        value={cart}
        size={'small'}
        footer={footerTemplate}
        emptyMessage="Carrito vacio"
      >
        <Column
          alignHeader="center"
          field="name"
          header="Producto"
          style={{ minWidth: '180px' }}
          body={nameContent}
        ></Column>
        <Column
          alignHeader="right"
          align="right"
          field="price"
          header="Precio"
          style={{ minWidth: '100px' }}
          body={priceContent}
        ></Column>
        <Column
          alignHeader="right"
          align="right"
          field="quantity"
          header="Cantidad"
          body={quantityContent}
        ></Column>
        <Column
          alignHeader="right"
          align="right"
          field="total"
          header="Total"
          style={{ minWidth: '100px' }}
          body={totalContent}
        ></Column>
        {/* <Column field="action" body={deleteContent}></Column> */}
      </DataTable>
    </div>
  );
};

export default CartView;
