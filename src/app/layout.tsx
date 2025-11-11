import { Outfit } from 'next/font/google';
import './globals.css';
import { ToastContainer } from 'react-toastify';
import { SidebarProvider } from '@/context/SidebarContext';
import { Providers } from './providers';

const outfit = Outfit({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.className} dark:bg-gray-900`}>
        <Providers>
          <SidebarProvider>{children}</SidebarProvider>
          <ToastContainer />
        </Providers>
      </body>
    </html>
  );
}
