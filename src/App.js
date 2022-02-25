/** @format */
import React from 'react';
import {
  Link,
  Outlet,
  Routes,
  Route,
  useResolvedPath,
  useMatch,
} from 'react-router-dom';
import Expenses from './pages/expenses';
import Invoices from './pages/invoices';
import Invoice from './pages/invoice';
import Shoes from './pages/shoes';
import Descendant from './pages/descendant';

const About = React.lazy(() => import('./pages/About'));
const Dashboard = React.lazy(() => import('./pages/Dashboard'));

function App() {
  return (
    <div>
      <h1>Bookkeeper!</h1>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="expenses" element={<Expenses />} />
          <Route path="invoices" element={<Invoices />}>
            <Route
              index
              element={
                <main style={{ padding: '1rem' }}>
                  <p>Select an invoice</p>
                </main>
              }
            />
            <Route path=":invoiceId" element={<Invoice />} />
          </Route>
          <Route path="descendant/*" element={<Descendant />} />
          <Route path="shoes" element={<Shoes />} />

          {/* lazy loading */}
          <Route
            path="about"
            element={
              <React.Suspense fallback={<>...</>}>
                <About />
              </React.Suspense>
            }
          />
          <Route
            path="dashboard/*"
            element={
              <React.Suspense fallback={<>...</>}>
                <Dashboard />
              </React.Suspense>
            }
          />

          {/* no match route */}
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </div>
  );
}

function Layout() {
  return (
    <div>
      <nav
        style={{
          borderBottom: 'solid 1px',
          paddingBottom: '1rem',
        }}
      >
        <ul>
          <li>
            <CustomLink to="/">Home</CustomLink>
          </li>
          <li>
            <CustomLink to="/invoices">Invoices</CustomLink>
          </li>
          <li>
            <CustomLink to="/expenses">Expenses</CustomLink>
          </li>
          <li>
            <CustomLink to="/shoes">Shoes</CustomLink>
          </li>
          <li>
            <CustomLink to="/descendant">Descendant</CustomLink>
          </li>
          <li>
            <CustomLink to="/about">About</CustomLink>
          </li>
          <li>
            <CustomLink to="/dashboard/messages">
              Messages (Dashboard)
            </CustomLink>
          </li>
        </ul>
      </nav>
      <hr />
      <Outlet />
    </div>
  );
}

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

function CustomLink({ children, to, ...props }) {
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname, end: true });

  return (
    <div>
      <Link
        style={{ textDecoration: match ? 'underline' : 'none' }}
        to={to}
        {...props}
      >
        {children}
      </Link>
      {match && ' (active)'}
    </div>
  );
}

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}

export default App;
