<!-- @format -->

# Learn-react-router-v6

```
yarn add react-router-dom@6
```

connect your app to the browser's URL

```javascript
import { BrowserRouter } from "react-router-dom";
...
<BrowserRouter>
    <App />
</BrowserRouter>
```

## Nested routes

```javascript
// index.js
...
<Routes>
    <Route path="/" element={<App />} />
    <Route path="expenses" element={<Expenses />} />
    <Route path="invoices" element={<Invoices />} />
</Routes>
// to >>
...
<Routes>
    <Route path="/" element={<App />}>
        <Route path="expenses" element={<Expenses />} />
        <Route path="invoices" element={<Invoices />} />
    </Route>
</Routes>
```

```javascript
// App.js
import { Outlet } from 'react-router-dom';
...
<div>
    <Outlet />
</div>
```

## Index routes

the main content area goes blank! We can fix this with an `index` route or `path=""`.

```javascript
<Route path="invoices" element={<Invoices />}>
  <Route
    index // path=""
    element={
      <main style={{ padding: '1rem' }}>
        <p>Select an invoice</p>
      </main>
    }
  />
  <Route path=":invoiceId" element={<Invoice />} />
</Route>
```

## Active navLinks

To display the link as the active link the user is looking at.

Changed the style from a simple object to a function that returns an object.

```javascript

import { NavLink, Outlet } from "react-router-dom";
...
<NavLink
    style={({ isActive }) => {
        return {
            display: "block",
            margin: "1rem 0",
            color: isActive ? "red" : "",
        };
    }}
    to={`/invoices/${invoice.number}`}
    key={invoice.number}>
    {invoice.name}
</NavLink>
```

Do the same thing with className on NavLink:

```javascript

// normal string
<NavLink className="red" />

// function
<NavLink className={({ isActive }) => isActive ? "red" : "blue"} />

```

## Params routes `useParams`

```javascript
// index.js
<Routes>
  <Route path="/" element={<App />} />
  <Route path="expenses" element={<Expenses />} />
  <Route path="invoices" element={<Invoices />}>
    <Route path=":invoiceId" element={<Invoice />} />
  </Route>
</Routes>
```

```javascript
// invoices.jsx
import { useParams } from 'react-router-dom';
let params = useParams();
console.log(params.invoiceId);
```

## Search params `useSearchParams`

They are at the end after a `?`. You've seen them across the web like `"/login?success=1"` or `"/shoes?brand=nike&sort=asc&sortby=price"`.
easy to read and manipulate the search params with `useSearchParams`
It works a lot like `React.useState()` but stores and sets the state in the URL search params instead of in memory.

```javascript
import { useSearchParams } from 'react-router-dom';
...
let [searchParams, setSearchParams] = useSearchParams();
console.log('searchParams', searchParams); // URLSearchParams {}
console.log('searchParams >> ', Object.fromEntries(searchParams.entries())); // 轉為 object
```

Use `get()`

```javascript
// https://.../user?filter=123&name=yyy
console.log(searchParams.get('filter')); // 123
```

Set search params

```javascript
setSearchParams({ filter });
setSearchParams({}); // set empty
```

## `useLocation` get URL info

Returns a location that tells us information about the URL
A location looks something like this:

```json
{
  "pathname": "/invoices",
  "search": "?filter=sa",
  "hash": "",
  "state": null,
  "key": "ae4cz2j"
}
```

## Custom behavior

Additive selected nav, to see `components/BankLink`

## Navigating Programmatically `useNavigate`

The programmer to change the URL

```javascript
import { useNavigate } from 'react-router-dom';
...
<button
  onClick={() => {
    deleteInvoice(invoice.number);
    navigate('/invoices'); // to invoices page
  }}
>
  Delete
</button>

```

## Descendant routes

To put a `*` at the end of the parent route's path

```javascript
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="dashboard/*" element={<Dashboard />} /> // *
    </Routes>
  );
}

function Dashboard() {
  return (
    <div>
      <p>Look, more routes!</p>
      <Routes>
        <Route path="/" element={<DashboardGraphs />} />
        <Route path="invoices" element={<InvoiceList />} />
      </Routes>
    </div>
  );
}
```

## Object routes `useRoutes`

```javascript
import { useRoutes } from 'react-router-dom';
function ObjectRoute() {
  let routes = [
    {
      path: '/',
      element: <Layout />,
      children: [
        { path: '', element: <Home /> }, // index can use path: ''
        {
          path: 'courses',
          element: <Courses />,
          children: [
            { index: true, element: <CoursesIndex /> },
            { path: '/courses/:id', element: <Course /> },
          ],
        },
        { path: '*', element: <NoMatch /> },
      ],
    },
  ];

  let element = useRoutes(routes);
  return <div>ObjectRoute{element}</div>;
}
```
