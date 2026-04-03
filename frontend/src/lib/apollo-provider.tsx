'use client';

import { ApolloProvider } from '@apollo/client';
import { createApolloClient } from '@/lib/apollo-client';
import { ReactNode, useState } from 'react';

export function ApolloWrapper({ children }: { children: ReactNode }) {
  const [client] = useState(() => createApolloClient());

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
