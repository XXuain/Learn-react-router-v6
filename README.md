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

## nested routes

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

## params routes

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

## index routes

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
