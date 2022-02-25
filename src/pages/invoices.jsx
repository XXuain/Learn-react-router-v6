/** @format */
import { Outlet, useSearchParams } from 'react-router-dom';
import { getInvoices } from '../data';
import QueryNavLink from '../componets/QueryNavLink';

export default function Invoices() {
  let invoices = getInvoices();
  let [searchParams, setSearchParams] = useSearchParams();
  // console.log('searchParams >> ', Object.fromEntries(searchParams.entries()));

  return (
    <div style={{ display: 'flex' }}>
      <nav
        style={{
          borderRight: 'solid 1px',
          padding: '1rem',
        }}
      >
        <input
          value={searchParams.get('filter') || ''}
          onChange={(event) => {
            let filter = event.target.value;
            filter ? setSearchParams({ filter }) : setSearchParams({});
          }}
        />

        {invoices
          .filter((invoice) => {
            let filter = searchParams.get('filter');
            if (!filter) return true;
            let name = invoice.name.toLowerCase();
            return name.startsWith(filter.toLowerCase());
          })
          .map((invoice) => (
            <QueryNavLink
              // style={{ display: 'block', margin: '1rem 0' }}
              to={`/invoices/${invoice.number}`}
              key={invoice.number}
            >
              {invoice.name}
            </QueryNavLink>
          ))}
      </nav>
      <Outlet />
    </div>
  );
}
