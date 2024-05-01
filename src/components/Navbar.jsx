import Link from 'next/link';

export const Navbar = () => {
  return (
    <div className="bg-gray-950 p-4 text-center text-2xl border-b-2 border-gray-800 font-bold">
      <Link href="/">
        <h1>Aqua App</h1>
      </Link>
    </div>
  );
};
