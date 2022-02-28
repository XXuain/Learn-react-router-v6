import React from 'react';
import * as JSURL from 'jsurl';
import { useSearchParams } from 'react-router-dom';

function useQueryParam(key) {
  let [searchParams, setSearchParams] = useSearchParams();
  let paramValue = searchParams.get(key);

  let value = React.useMemo(() => JSURL.parse(paramValue), [paramValue]);

  let setValue = React.useCallback(
    (newValue, options) => {
      let newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set(key, JSURL.stringify(newValue));
      setSearchParams(newSearchParams, options);
    },
    [key, searchParams, setSearchParams]
  );

  return [value, setValue];
}

export default function Pizza() {
  let [pizza, setPizza] = useQueryParam('pizza');
  console.log('pizza >> ', pizza);

  function handleChange(event) {
    let form = event.currentTarget;
    let formData = new FormData(form);

    // This complex data structure is preserved in the URL in the
    // `pizza` query parameter each time a value in the form changes!
    let pizza = {
      toppings: formData.getAll('toppings'),
      crust: formData.get('crust'),
      extraSauce: formData.get('extraSauce') === 'on',
    };

    setPizza(pizza, { replace: true });
  }
  return (
    <main style={{ padding: '1rem 0' }}>
      <div>
        <form onChange={handleChange}>
          <p>What would you like on your pizza?</p>

          <p>
            <label>
              <input
                defaultChecked={pizza?.toppings.includes('pepperoni')}
                type="checkbox"
                name="toppings"
                value="pepperoni"
              />
              Pepperoni
            </label>
            <br />
            <label>
              <input
                defaultChecked={pizza?.toppings.includes('bell-peppers')}
                type="checkbox"
                name="toppings"
                value="bell-peppers"
              />
              Bell Peppers
            </label>
            <br />
            <label>
              <input
                type="checkbox"
                name="toppings"
                value="olives"
                defaultChecked={pizza?.toppings.includes('olives')}
              />
              Olives
            </label>
          </p>

          <p>
            <label>
              <input
                type="radio"
                name="crust"
                value="regular"
                defaultChecked={pizza?.crust === 'regular'}
              />
              Regular Crust
            </label>
            <br />
            <label>
              <input
                type="radio"
                name="crust"
                value="thin"
                defaultChecked={pizza?.crust === 'thin'}
              />
              Thin Crust
            </label>
            <br />
            <label>
              <input
                type="radio"
                name="crust"
                value="deep-dish"
                defaultChecked={pizza?.crust === 'deep-dish'}
              />
              Deep Dish
            </label>
          </p>

          <p>
            <label>
              <input
                type="checkbox"
                name="extraSauce"
                defaultChecked={pizza?.extraSauce}
              />
              Extra Sauce
            </label>
          </p>
        </form>

        <hr />

        <p>The current form values are:</p>

        <pre>{JSON.stringify(pizza || {}, null, 2)}</pre>
      </div>
    </main>
  );
}
