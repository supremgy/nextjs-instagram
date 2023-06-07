import Navbar from '@/components/Navbar';
import './globals.css';
import { Open_Sans } from 'next/font/google';
import AuthContext from '../context/AuthContext';
import SWRConfigContext from '../context/SWRConfigContext';
import { Metadata } from 'next';
const openSans = Open_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'Instagram',
    template: 'Instagram | %s',
  },
  description: 'Instagram Photos',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className={openSans.className}>
      <body className='w-full bg-neutral-50 overflow-auto'>
        <AuthContext>
          <header className='sticky top-0 bg-white z-10 border-b'>
            <div className='max-w-screen-xl mx-auto'>
              <Navbar />
            </div>
          </header>
          <main className='w-full flex max-w-screen-xl mx-auto justify-center'>
            <SWRConfigContext>{children}</SWRConfigContext>
          </main>
        </AuthContext>
        <div id='portal' />
      </body>
    </html>
  );
}
