/** @format */
import { Routes, Route } from 'react-router-dom';
import Invoices from './invoices';
import DescendantGraphs from './descendantGraphs';

function descendant() {
  return (
    <div>
      descendant
      <Routes>
        <Route path="/" element={<DescendantGraphs />} />
        <Route path="invoices" element={<Invoices />} />
      </Routes>
    </div>
  );
}

export default descendant;
