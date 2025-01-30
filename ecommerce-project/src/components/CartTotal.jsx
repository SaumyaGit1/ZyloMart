import React, { useContext } from "react";
import Title from "./Title";
import { ShopContext } from "../context/ShopContext";

function CartTotal() {
  const { currency, deliveryCharge, getCartAmount, products } = useContext(ShopContext);

  if (!products || products.length === 0) {
    return <p>Loading cart details...</p>;
  }

  return (
    <div className="w-full">
      <div className="text-2xl">
        <Title text1={"CART"} text2={"TOTALS"} />
      </div>
      <div className="flex flex-col gap-2 mt-2 text-sm">
        <div className="flex justify-between">
          <p>Subtotal</p>
          <p>{currency}{getCartAmount()}.00</p>
        </div>
        <hr />
        <div className="flex justify-between">
          <p>Shipping Fee</p>
          <p>{currency}{deliveryCharge}</p>
        </div>
        <hr />
        <div className="flex justify-between">
          <b>Total</b>
          <b>{currency}{getCartAmount() === 0 ? 0 : getCartAmount() + deliveryCharge}</b>
        </div>
      </div>
    </div>
  );
}


export default CartTotal;
