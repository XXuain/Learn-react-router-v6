/** @format */
import { Link, useSearchParams } from 'react-router-dom';

const BrandLink = ({ brand, ...props }) => {
  let [params] = useSearchParams();
  let isActive = params.getAll('brand').includes(brand);
  // console.log('brands: ', params.getAll('brand'));
  // console.log('params toString: ', params, params.toString());

  if (!isActive) params.append('brand', brand);
  if (isActive) {
    params = new URLSearchParams(
      Array.from(params).filter(
        ([key, value]) => key !== 'brand' || value !== brand
      )
    );
  }

  return (
    <Link
      style={{ color: isActive ? 'red' : '' }}
      to={`/shoes?${params.toString()}`}
      {...props}
    />
  );
};
export default BrandLink;
