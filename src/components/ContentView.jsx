'use client';
import Link from 'next/link';
import { Button, DataView, ConfirmDialog } from '@/utils/primeComponents';
import { confirm } from '@/utils/confirmDialog';
import Empty from './Empty';

export default function ContentView({
  moduleName,
  items,
  itemUrl,
  setCategories,
}) {
  const deleteItem = (id) => {
    const newItems = items.filter((el) => el._id !== id);
    setCategories(newItems);
  };

  const itemTemplate = (item) => (
    <div
      className="flex justify-between flex-1 mb-2 border-b border-gray-500"
      key={item._id}
    >
      {moduleName === 'productDiscount' ? (
        <div className="self-center flex gap-2">
          <div className="text-lg">{item.clientCategory?.name}</div>
          <span>-</span>
          <div className="text-lg">{item.product?.name}</div>
        </div>
      ) : (
        <div className="self-center">
          <div className="text-xl">{item.name}</div>
        </div>
      )}
      <div className="flex gap-2 mb-2">
        <Link href={`/${itemUrl}/${item._id}`}>
          <Button icon="pi pi-pencil" text></Button>
        </Link>

        <Button
          onClick={() => confirm(item._id, moduleName, deleteItem)}
          icon="pi pi-trash"
          text
        ></Button>
      </div>
    </div>
  );

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
