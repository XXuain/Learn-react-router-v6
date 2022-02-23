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

## nested-routes

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
