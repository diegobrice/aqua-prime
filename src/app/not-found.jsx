import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container mx-auto p-4">
      <div className="text-center mt-12">
        <i className="pi pi-exclamation-triangle mr-2 text-6xl"></i>
        <h2 className="text-2xl font-bold">Error 404</h2>
        <p className="mb-4">No se pudo encontrar la pagina solicitada.</p>
        <Link href="/">Volver al inicio</Link>
      </div>
    </div>
  );
}
