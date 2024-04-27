'use client';
import { confirm } from '@/utils/confirmDialog';
import { Button, DataView, ConfirmDialog } from '@/utils/primeComponents';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ContentView({ moduleName, elements, itemUrl }) {
  const router = useRouter();

  const itemTemplate = (element) => {
    return (
      <>
        <div
          className="flex justify-between flex-1 mb-2 border-b border-gray-500"
          key={element._id}
        >
          <div className="self-center">
            <div className="text-xl">{element.name}</div>
          </div>
          <div className="flex gap-2 mb-2">
            <Link href={`/${itemUrl}/${element._id}`}>
              <Button icon="pi pi-pencil" text></Button>
            </Link>

            <Button
              onClick={() => confirm(element._id, moduleName, router.refresh)}
              icon="pi pi-trash"
              text
            ></Button>
          </div>
        </div>
      </>
    );
  };

  const listTemplate = (items) => {
    if (!items || items.length === 0) return null;

    let list = items.map((element) => {
      return itemTemplate(element);
    });

    return <div className="grid grid-nogutter">{list}</div>;
  };

  return (
    <div className="card">
      <ConfirmDialog />
      <DataView
        value={elements}
        listTemplate={listTemplate}
        paginator
        rows={10}
      />
    </div>
  );
}
