import React, { createContext } from "react";
import { products } from "../assets/assets";
export const ShopContext = createContext();
function ShopContextProvider(props) {
  const currency = "$";
  const delivery_charge = 10;
  const values = {
    currency,
    delivery_charge,
    products,
  };

  return (
    <ShopContext.Provider values={values}>
      {props.childern}
    </ShopContext.Provider>
  );
}

export default ShopContextProvider;
