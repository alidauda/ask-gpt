import NextAuthProvider from '@/helpers/nextauth';
import './globals.css';
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import QueryProvider from './queryProvider';
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const queryClient = new QueryClient()

  return (
    <html lang='en'>
      <body>
      {/* <QueryClientProvider client={queryClient}> */}
      <NextAuthProvider>{children}</NextAuthProvider>
    {/* </QueryClientProvider> */}

      </body>
    </html>
  );
}
