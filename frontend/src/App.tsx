import { BrowserRouter } from 'react-router-dom';

import { AuthProvider } from 'src/modules/auth';
import { Routes } from 'src/Routes';
import { ScrollToTop } from 'src/shared/navigation';
import { EnhancedApolloProvider } from 'src/utils/apollo';

import { Layout } from './shared/layout';
import { ThemeProvider } from './theme';

export function App() {
  return (
    <ThemeProvider>
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
    </ThemeProvider>
  );
}

