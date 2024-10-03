'use client';
import Link from 'next/link';
import { Button, DataView, ConfirmDialog } from '@/utils/primeComponents';
import { confirm } from '@/utils/confirmDialog';
import Empty from './Empty';

export default function OrderView({ items, itemUrl }) {
  const itemTemplate = (item) => {
    const totalPrice = item.products.reduce(
      (acc, curr) => acc + curr.price * curr.quantity,
      0
    );
    return (
      <div
        className="flex justify-between flex-1 mb-2 border-b border-gray-500"
        key={item._id}
      >
        <div className="self-center">
          <p>{item.client.name}</p>
        </div>

        <div className="self-center">
          <p>{item.status}</p>
        </div>

        <div className="self-center">
          <p>{item.products.length}</p>
        </div>

        <div className="self-center">
          <p>S/. {totalPrice.toFixed(2)}</p>
        </div>

        <div className="flex gap-2 mb-2">
          <Link href={`/${itemUrl}/${item._id}`}>
            <Button icon="pi pi-pencil" text></Button>
          </Link>
        </div>
      </div>
    );
  };

  const listTemplate = (items) => {
    if (!items || items.length === 0) return <Empty />;

    return (
      <div className="grid grid-nogutter">
        {items.map((item) => itemTemplate(item))}
      </div>
    );
  };

  return (
    <div className="card">
      <ConfirmDialog />
      <DataView
        value={items}
        dataKey={itemUrl}
        listTemplate={listTemplate}
        paginator
        rows={10}
      />
    </div>
  );
}
