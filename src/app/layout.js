import { Inter } from 'next/font/google';
import './globals.css';
import { PrimeReactProvider } from 'primereact/api';
import 'primereact/resources/themes/lara-dark-blue/theme.css';
import 'primeicons/primeicons.css';
import { Navbar } from '@/components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Aqua App',
  description: 'Generated by create next app',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <PrimeReactProvider>
        <body className={inter.className}>
          <Navbar />
          <main className="bg-gray-900 min-h-screen">
            <div className="p-5 pt-8 max-w-screen-sm mx-auto">{children}</div>
          </main>
        </body>
      </PrimeReactProvider>
    </html>
  );
}