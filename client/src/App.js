import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// Components
import TheHeader from './components/TheHeader';
import Clients from './components/Clients';
// Utils
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import AddClientModal from './components/AddClientModal';
import Projects from './components/Projects';

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clients: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        projects: {
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache: cache,
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <TheHeader />
        <div className="container">
          <AddClientModal />
          <Projects />
          <Clients />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
