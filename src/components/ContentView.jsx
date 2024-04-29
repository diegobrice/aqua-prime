'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { confirm } from '@/utils/confirmDialog';
import { Button, DataView, ConfirmDialog } from '@/utils/primeComponents';

export default function ContentView({ moduleName, items, itemUrl }) {
  const router = useRouter();

  const itemTemplate = (item) => {
    return (
      <div
        className="flex justify-between flex-1 mb-2 border-b border-gray-500"
        key={item._id}
      >
        <div className="self-center">
          <div className="text-xl">{item.name}</div>
        </div>
        <div className="flex gap-2 mb-2">
          <Link href={`/${itemUrl}/${item._id}`}>
            <Button icon="pi pi-pencil" text></Button>
          </Link>

          <Button
            onClick={() => confirm(item._id, moduleName, router.refresh)}
            icon="pi pi-trash"
            text
          ></Button>
        </div>
      </div>
    );
  };

  const listTemplate = (items) => {
    if (!items || items.length === 0) return null;

    let list = items.map((item) => {
      return itemTemplate(item);
    });

    return <div className="grid grid-nogutter">{list}</div>;
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
