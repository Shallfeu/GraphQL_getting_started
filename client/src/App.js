import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
// Components
import TheHeader from './components/TheHeader';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Project from './pages/Project';

export const statusEnum = {
  new: 'Not Started',
  progress: 'In Progress',
  completed: 'Completed',
};

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
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/projects/:id" element={<Project />}></Route>
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
