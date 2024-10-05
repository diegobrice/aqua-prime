import { confirm } from '@/utils/confirmDialog';
import { getFormatedTime } from '@/utils/timeZoneConversion';
import Link from 'next/link';
import { Button } from 'primereact/button';
import { ConfirmDialog } from 'primereact/confirmdialog';

const { Card } = require('primereact/card');

const OrderCard = ({
  moduleName,
  order,
  itemUrl,
  setCategories,
  editable,
  deleteItem,
}) => {
  if (order === undefined) return null;

  const getDate = (stringDate) => {
    const formatedDate = new Date(stringDate);
    const { peruDate, peruTime } = getFormatedTime(formatedDate);
    return `${peruDate} - ${peruTime}`;
  };

  return (
    <div className="card w-full flex justify-content-center pb-4">
      <div className="w-full border rounded-lg overflow-hidden shadow bg-gray-800 border-gray-700">
        <div className="p-2 px-4 bg-gray-700 md:flex justify-between items-center">
          <div>
            <Link href={`/${itemUrl}/${order._id}`}>
              <h5 className="font-bold tracking-tight text-white">
                {order.client?.name}
              </h5>
            </Link>
            <div className="font-normal text-gray-400">
              <Link href={`/${itemUrl}/${order._id}`}>
                <p>
                  <i className="pi pi-map-marker mr-2"></i>
                  {order.client?.address}
                </p>
                <p>
                  <i className="pi pi-map-marker mr-2"></i>
                  {order.client?.addressTwo}
                </p>
              </Link>
              {order.status === 'completed' && (
                <div className="font-normal ">
                  <a href={`tel:${order.client?.phoneNumber}`}>
                    <i className="pi pi-phone mr-2"></i>
                    {order.client?.phoneNumber}
                  </a>
                </div>
              )}
            </div>
          </div>
          {order.status === 'pending' && (
            <div className="font-normal text-gray-200 text-xl">
              <a href={`tel:${order.client?.phoneNumber}`}>
                <i className="pi pi-phone mr-2"></i>
                {order.client?.phoneNumber}
              </a>
            </div>
          )}
        </div>
        <hr className="border-gray-700" />
        <div className="p-2 px-4">
          {/* <h5 className="font-bold tracking-tight text-gray-900 dark:text-white">
            Productos
          </h5> */}
          <ol className="text-gray-400">
            {order.products.map((product) => (
              <li key={product._id}>
                [{product.productCategory}] {product.name} {product.quantity} x
                S/.{product.price.toFixed(2)}
              </li>
            ))}
          </ol>
          {/* <div class="text-right">
            <p>Total: S/.{order.totalPrice.toFixed(2)}</p>
          </div> */}
        </div>
        <hr className="border-gray-700" />
        <div className="flex justify-between items-center p-2 px-4">
          <div className="text-gray-400">
            {order.status === 'completed' && (
              <p>
                Monto total:{' '}
                <span className="font-bold">
                  S/. {order.amount?.toFixed(2)}
                </span>
              </p>
            )}
            {order.status === 'pending' && (
              <p>Fecha de pedido: {getDate(order.createdDate)}</p>
            )}
            {order.status === 'completed' && (
              <p>Fecha de entrega: {getDate(order.deliveredDate)}</p>
            )}
          </div>
          {order.status === 'pending' && (
            <div>
              <Link href={`/${itemUrl}/${order._id}`}>
                <Button
                  className="p-0"
                  icon="pi pi-send"
                  size="large"
                  text
                ></Button>
              </Link>
              <Button
                className="p-0"
                onClick={() => confirm(order._id, moduleName, deleteItem)}
                icon="pi pi-trash"
                size="large"
                text
              ></Button>
            </div>
          )}
          {order.status === 'completed' && (
            <div>
              <Link href={`/${itemUrl}/${order._id}`}>
                <Button className="p-0" icon="pi pi-eye" size="large"></Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
