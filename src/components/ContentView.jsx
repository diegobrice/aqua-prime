'use client';
import { Button } from 'primereact/button';
import { DataView } from 'primereact/dataview';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';

export default function ContentView({ categories }) {
  const router = useRouter();

  const accept = async (id) => {
    try {
      const res = await fetch(`/api/client/category/${id}`, {
        method: 'DELETE',
      });
      router.refresh();
    } catch (error) {
      console.log(error.message);
    }
  };

  const reject = () => {
    console.log('reject');
  };

  const confirm = (id) => {
    confirmDialog({
      message: 'Estas seguro de eliminar este tipo de cliente?',
      icon: 'pi pi-info-circle',
      defaultFocus: 'reject',
      acceptClassName: 'p-button-danger',
      accept: () => accept(id),
      reject,
    });
  };

  const itemTemplate = (category) => {
    return (
      <>
        <div
          className="flex justify-between flex-1 mb-2 border-b border-gray-500"
          key={category._id}
        >
          <div className="self-center">
            <div className="text-xl">{category.name}</div>
          </div>
          <div className="flex gap-2 mb-2">
            <Link href={`/clientes/tipos/${category._id}`}>
              <Button icon="pi pi-pencil" text></Button>
            </Link>

            <Button
              onClick={() => confirm(category._id)}
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

    let list = items.map((category) => {
      return itemTemplate(category);
    });

    return <div className="grid grid-nogutter">{list}</div>;
  };

  return (
    <div className="card">
      <ConfirmDialog />
      <DataView
        value={categories}
        listTemplate={listTemplate}
        paginator
        rows={10}
      />
    </div>
  );
}
