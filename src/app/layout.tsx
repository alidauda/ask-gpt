import NextAuthProvider from '@/helpers/nextauth';
import './globals.css';

import QueryProvider from './queryProvider';
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body>
                  <NextAuthProvider>{children}</NextAuthProvider>

      </body>
    </html>
  );
}
