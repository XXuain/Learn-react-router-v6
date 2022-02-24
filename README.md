<!-- @format -->

# Learn-react-router-v6

```
yarn add react-router-dom@6
```

connect your app to the browser's URL

```
...
import { BrowserRouter } from "react-router-dom";
...
  <BrowserRouter>
    <App />
  </BrowserRouter>
...
```

## Nested routes

```
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

```
// App.js
import { Outlet } from 'react-router-dom';
...
<div>
    <Outlet />
</div>
```

## Params routes

```
// index.js
<Routes>
    <Route path="/" element={<App />} />
    <Route path="expenses" element={<Expenses />} />
    <Route path="invoices" element={<Invoices />}>
        <Route path=":invoiceId" element={<Invoice />} />
    </Route>
</Routes>
```

```
// invoices.jsx
let params = useParams();
console.log(params.invoiceId)
```

## Index routes

the main content area goes blank! We can fix this with an "index" route.

```
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
```

## Active navLinks

To display the link as the active link the user is looking at.

Changed the style from a simple object to a function that returns an object.

```
import { NavLink, Outlet } from "react-router-dom";
<NavLink
    style={({ isActive }) => {
        return {
        display: "block",
        margin: "1rem 0",
        color: isActive ? "red" : "",
        };
    }}
    to={`/invoices/${invoice.number}`}
    key={invoice.number}
    >
    {invoice.name}
</NavLink>
...
```

Do the same thing with className on NavLink:

```
// normal string
<NavLink className="red" />

// function
<NavLink className={({ isActive }) => isActive ? "red" : "blue"} />
```
