import { BrowserRouter } from 'react-router-dom';

import { AuthProvider } from 'src/modules/auth';
import { Routes } from 'src/Routes';
import { ChakraProvider } from 'src/shared/design-system';
import { ScrollToTop } from 'src/shared/navigation';
import { EnhancedApolloProvider } from 'src/utils/apollo';

import { Layout } from './shared/layout';

export function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <AuthProvider>
          <EnhancedApolloProvider>
            <ScrollToTop />
            <Layout>
              <Routes />
            </Layout>
          </EnhancedApolloProvider>
        </AuthProvider>
      </BrowserRouter>
    </ChakraProvider>
  );
}

