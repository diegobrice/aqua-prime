import Link from 'next/link';

export default function Home() {
  return (
    <main>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold">AquaApp</h1>
        <div className="navbar">
          <Link href="/pedido/nuevo">Nuevo Pedido</Link>
          <Link href="/reportes">Reportes</Link>
          <Link href="/pedidos">Pedidos</Link>
          <Link href="/productos">Productos</Link>
          <Link href="/clientes">Clientes</Link>
        </div>
      </div>
    </main>
  );
}
