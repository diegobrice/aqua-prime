import { PanelMenu } from "@/utils/primeComponents";


export default function Home() {
  const items = [
    {
      label: 'Nuevo Pedido',
      icon: 'pi pi-plus-circle',
      url: '/pedido/nuevo',
    },
    {
      label: 'Reportes',
      icon: 'pi pi-chart-bar',
      url: '/reportes',
    },
    {
      label: 'Pedidos',
      icon: 'pi pi-file',
      url: '/pedidos',
    },
    {
      label: 'Productos',
      icon: 'pi pi-box',
      url: '/productos',
    },
    {
      label: 'Clientes',
      icon: 'pi pi-users',
      url: '/clientes',
    },
  ];

  return (
    <main>
      <div className="container mx-auto p-4">
        <div className="card flex justify-content-center">
          <PanelMenu model={items} className="w-full md:w-20rem" />
        </div>
      </div>
    </main>
  );
}
