"use client"
import { ReactNode } from "react"
import { QueryClientProvider, QueryClient } from "react-query"

type Props = {
    children: ReactNode;
};

const queryClient = new QueryClient();

export default function QueryProvider({ children }: Props) {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
}
